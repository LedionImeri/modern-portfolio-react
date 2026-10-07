/**
 * Optional live LeetCode statistics.
 * Set VITE_LEETCODE_STATS_ENDPOINT to any URL returning JSON. `{username}` in the
 * URL is replaced with leetcode.username. Common field names are normalised:
 *   totalSolved | solvedProblem | solved, easySolved | easy, mediumSolved | medium, hardSolved | hard
 * Falls back to the manual values in config when the request fails.
 */
const pick = (o, keys) => {
  for (const k of keys) if (typeof o?.[k] === 'number') return o[k];
  return null;
};

export async function fetchLeetCodeStats(username) {
  const tpl = (import.meta.env.VITE_LEETCODE_STATS_ENDPOINT || '').trim();
  if (!tpl) return null;
  const url = tpl.replace('{username}', encodeURIComponent(username || ''));
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`LeetCode stats request failed (${res.status})`);
  const j = await res.json();
  return {
    solved: pick(j, ['totalSolved', 'solvedProblem', 'solved']),
    easy: pick(j, ['easySolved', 'easy']),
    medium: pick(j, ['mediumSolved', 'medium']),
    hard: pick(j, ['hardSolved', 'hard']),
  };
}
