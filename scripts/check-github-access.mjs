// Check repo existence (public) and add origin remote (config only, no push).
import { execFileSync } from "node:child_process";

function run(args) {
  try {
    const out = execFileSync("/usr/bin/git", args, {
      encoding: "utf8",
      cwd: "/home/daytona/codebase",
      timeout: 20000,
    });
    return { ok: true, out: out.trim() };
  } catch (e) {
    return { ok: false, out: String(e.message).slice(0, 500) };
  }
}

// Check if the repo is public (anonymous API call)
try {
  const res = await fetch("https://api.github.com/repos/lapheru/leluv2", {
    headers: { Accept: "application/vnd.github+json" },
    signal: AbortSignal.timeout(10000),
  });
  const body = await res.json();
  console.log(
    "GITHUB_REPO_CHECK:",
    res.status,
    body.full_name || body.message || JSON.stringify(body).slice(0, 200),
  );
} catch (e) {
  console.log("GITHUB_REPO_CHECK: fetch failed", String(e.message).slice(0, 200));
}

// Add origin if missing (safe config change, no data sent)
const remotes = run(["remote", "-v"]);
console.log("REMOTES_BEFORE:", JSON.stringify(remotes));
if (!remotes.out) {
  console.log(
    "ADD_REMOTE:",
    JSON.stringify(
      run(["remote", "add", "origin", "https://github.com/lapheru/leluv2.git"]),
    ),
  );
}
console.log("REMOTES_AFTER:", JSON.stringify(run(["remote", "-v"])));
