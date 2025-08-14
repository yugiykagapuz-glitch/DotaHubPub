import express from "express";
import session from "express-session";
import passport from "passport";
import SteamStrategy from "passport-steam";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

// ====== Middleware ======
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

// ===== Content Security Policy =====
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:5173; style-src 'self' 'unsafe-inline' http://localhost:5173; img-src 'self' data: http://localhost:5173; connect-src 'self' http://localhost:5173 ws://localhost:5173; font-src 'self' data:;"
  );
  next();
});

app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// ===== Passport Steam =====
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

passport.use(
  new SteamStrategy(
    {
      returnURL: `${BACKEND_URL}/api/auth/steam/return`,
      realm: `${BACKEND_URL}/`,
      apiKey: process.env.STEAM_API_KEY,
    },
    (identifier, profile, done) => {
      profile.identifier = identifier;
      return done(null, profile);
    }
  )
);

// ===== Routes =====
app.get(
  "/api/auth/steam",
  passport.authenticate("steam", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/");
  }
);

app.get(
  "/api/auth/steam/return",
  passport.authenticate("steam", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect(`${FRONTEND_URL}/steam-login-success`);
  }
);

app.get("/api/auth/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

app.get("/api/auth/logout", (req, res) => {
  req.logout(() => {
    res.redirect(FRONTEND_URL);
  });
});

// ===== Start server =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
