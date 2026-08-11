// Non-destructive finalize: merge remote archive files (zips + README) with the current
// LELUV2 source tree, clean scratch scripts, then push main to lapheru/lelu-v2.
// Token from env only. Never prints the token.
import { execFileSync } from "node:child_process";
import { cwd } from "node:process";
import { rmSync, existsSync } from "node:fs";

const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || "";
if (!token) {
  console.log("NO_GITHUB_TOKEN");
  process.exit(2);
}
const REPO = "lapheru/lelu-v2";
const AUTH_URL = `https://x-access-token:${token}@github.com/${REPO}.git`;
const ROOT = cwd();

function run(args) {
  try {
    const out = execFileSync("/usr/bin/git", args, {
      encoding: "utf8",
      cwd: ROOT,
      timeout: 180000,
      env: { ...process.env, GIT_TERMINAL_PROMPT: "0" },
    });
    return { ok: true, out: out.trim() };
  } catch (e) {
    return { ok: false, out: String(e.message || e).slice(0, 1200) };
  }
}

// 0. Remove my scratch diagnostic scripts (keep them out of the repo)
for (const f of ["scripts/gh-diagnose.mjs", "scripts/gh-compare.mjs", "scripts/gh-inspect.mjs"]) {
  if (existsSync(f)) rmSync(f);
}
run(["add", "-A"]);
const cleanCommit = run(["commit", "-m", "Remove diagnostic scratch scripts"]);
console.log("CLEANUP_COMMIT:", cleanCommit.ok ? "ok" : cleanCommit.out || "nothing to commit");

// 1. Ensure remote main is fetched
const fetch = run(["fetch", AUTH_URL, "main:refs/remotes/origin/main"]);
console.log("FETCH:", fetch.ok ? "ok" : fetch.out);
const remoteSha = run(["rev-parse", "refs/remotes/origin/main"]).out;
console.log("REMOTE_MAIN:", remoteSha);

// 2. Merge remote history (unrelated) preserving the archive files
const merge = run([
  "merge",
  "--allow-unrelated-histories",
  "--no-ff",
  "-m",
  "Merge existing GitHub archive (phase 13/14 zips) with current LELUV2 source tree",
  "refs/remotes/origin/main",
]);
console.log("MERGE:", merge.ok ? "ok" : "conflict/failed");
if (!merge.ok) {
  console.log("MERGE_OUT:", merge.out);
  // Resolve README.md conflict in favor of the local project README
  const ours = run(["checkout", "--ours", "README.md"]);
  console.log("KEEP_LOCAL_README:", ours.ok ? "ok" : ours.out);
  run(["add", "README.md"]);
  const commitMerge = run(["commit", "--no-edit"]);
  console.log("MERGE_COMMIT:", commitMerge.ok ? "ok" : commitMerge.out);
}

// 3. Confirm both zip files are present in the resulting tree
for (const z of ["Lelu-Genesis-Phase14.zip", "Lelu-phase13-genesis-desktop.zip"]) {
  const has = run(["ls-tree", "HEAD", z]).out;
  console.log(`TREE_HAS ${z}:`, has ? "yes" : "NO");
}

// 4. Push
const push = run(["push", AUTH_URL, "HEAD:main"]);
console.log("PUSH_EXIT:", push.ok ? 0 : 1);
console.log("PUSH_OUT:", push.out);
if (!push.ok) {
  console.log("PUSH_ERR:", push.err || push.out);
  process.exit(1);
}

// 5. Verify
const localHead = run(["rev-parse", "HEAD"]).out;
console.log("LOCAL_HEAD:", localHead);
try {
  const res = await fetch(`https://api.github.com/repos/${REPO}/commits/main`, {
    headers: { Authorization: `Bearer ${token}`, "User-Agent": "lelu-push", Accept: "application/vnd.github+json" },
  });
  const data = await res.json();
  console.log("REMOTE_HEAD:", data.sha);
  console.log("MATCH:", data.sha === localHead ? "YES" : "NO");
  console.log("REMOTE_COMMIT_MSG:", data.commit?.message?.split("\n")[0] || "");
} catch (e) {
  console.log("VERIFY_ERROR:", String(e.message || e));
}
console.log("DONE");
