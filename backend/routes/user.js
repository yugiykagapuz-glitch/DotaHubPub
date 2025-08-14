import express from "express";
import fetch from "node-fetch";

const router = express.Router();

const OPENDOTA_API = "https://api.opendota.com/api";

function steamIdToAccountId(steamId) {
  return String(BigInt(steamId) - 76561197960265728n);
}

let heroMapCache = null;

async function getHeroMap() {
  if (heroMapCache) return heroMapCache;
  const res = await fetch(`${OPENDOTA_API}/heroStats`);
  if (!res.ok) throw new Error("Ошибка загрузки героев");
  const heroes = await res.json();

  heroMapCache = {};
  for (const h of heroes) {
    heroMapCache[h.id] = {
      name: h.localized_name,
      icon: `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${h.name.replace(
        "npc_dota_hero_",
        ""
      )}.png`,
    };
  }
  return heroMapCache;
}

router.get("/stats", async (req, res) => {
  try {
    const { steamId } = req.user;
    if (!steamId) return res.status(400).json({ error: "Нет SteamID" });

    const accountId = steamIdToAccountId(steamId);

    const [playerRes, wlRes] = await Promise.all([
      fetch(`${OPENDOTA_API}/players/${accountId}`),
      fetch(`${OPENDOTA_API}/players/${accountId}/wl`),
    ]);

    if (!playerRes.ok || !wlRes.ok) throw new Error("OpenDota вернул ошибку");

    const player = await playerRes.json();
    const wl = await wlRes.json();

    res.json({
      profile: player,
      wl,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка получения статистики" });
  }
});

router.get("/matches", async (req, res) => {
  try {
    const { steamId } = req.user;
    const { limit = 20, offset = 0 } = req.query;
    if (!steamId) return res.status(400).json({ error: "Нет SteamID" });

    const accountId = steamIdToAccountId(steamId);
    const heroMap = await getHeroMap();

    const mRes = await fetch(
      `${OPENDOTA_API}/players/${accountId}/matches?limit=${limit}&offset=${offset}`
    );
    if (!mRes.ok) throw new Error("Ошибка загрузки матчей");
    const matches = await mRes.json();

    const enhancedMatches = matches
      .sort((a, b) => b.start_time - a.start_time)
      .map((m) => ({
        ...m,
        hero: heroMap[m.hero_id] || { name: `Hero #${m.hero_id}`, icon: null },
      }));

    res.json({
      matches: enhancedMatches,
      hasMore: matches.length === Number(limit),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка получения матчей" });
  }
});

export default router;
