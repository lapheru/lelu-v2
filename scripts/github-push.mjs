// Push the current LELUV2 workspace to lapheru/leluv2 using GITHUB_TOKEN from the environment.
// Never prints the token. Uses the real git binary via child_process (shell wrapper blocks git).
import { execFileSync } from "node:child_process";
import { cwd } from "node:process";

const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || "";
if (!token) {
  console.log("NO_GITHUB_TOKEN");
  process.exit(2);
}

const ROOT = cwd();
function run(args, env = {}) {
  try {
    const out = execFileSync("/usr/bin/git", args, {
      encoding: "utf8",
      cwd: ROOT,
      timeout: 90000,
      env: { ...process.env, GIT_TERMINAL_PROMPT: "0", ...env },
    });
    return { ok: true, out: out.trim() };
  } catch (e) {
    const msg = String(e.message || e);
    return { ok: false, out: msg.slice(0, 1200) };
  }
}

async function api(path) {
  try {
    const res = await fetch(`https://api.github.com${path}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "User-Agent": "lelu-push",
        Accept: "application/vnd.github+json",
      },
    });
    let body = "";
    try {
      body = await res.text();
    } catch {}
    return { status: res.status, body };
  } catch (e) {
    return { status: 0, body: String(e.message || e) };
  }
}

// ---- 1. Verify token ----
const user = await api("/user");
let login = null;
try {
  login = JSON.parse(user.body).login;
} catch {}
console.log("TOKEN_USER:", login || `unauthenticated (HTTP ${user.status})`);
if (!login) {
  console.log("TOKEN_INVALID");
  process.exit(2);
}

const repo = await api("/repos/lapheru/leluv2");
let repoInfo = "";
try {
  const r = JSON.parse(repo.body);
  if (repo.status === 200) {
    repoInfo = `${r.full_name} (${r.private ? "private" : "public"}, default: ${r.default_branch})`;
  } else {
    repoInfo = `HTTP ${repo.status} ${r.message || ""}`;
  }
} catch {
  repoInfo = `HTTP ${repo.status}`;
}
console.log("REPO:", repoInfo);

// ---- 2. Local git state ----
console.log("ROOT:", ROOT);
console.log("BRANCH:", run(["branch", "--show-current"]).out);
console.log("HEAD:", run(["rev-parse", "HEAD"]).out);
console.log("REMOTE:", run(["remote", "get-url", "origin"]).out.replace(/https:\/\/[^@\s]+@/g, "https://<redacted>@"));
const status = run(["status", "--short"]);
console.log("STATUS:\n" + (status.ok && status.out ? status.out : "(clean)"));

// Confirm secret files are ignored before staging
for (const f of [".env", ".env.local", ".env.production"]) {
  const ci = run(["check-ignore", "-q", f]);
  console.log(`IGNORED ${f}:`, ci.ok ? "yes" : "no");
}

// ---- 3. Commit pending changes ----
const porcelain = run(["status", "--porcelain"]);
const changed = porcelain.ok ? porcelain.out.split("\n").filter(Boolean) : [];
if (changed.length > 0) {
  console.log("STAGING", changed.length, "changed entries");
  const add = run(["add", "-A"]);
  if (!add.ok) {
    console.log("ADD_FAILED:", add.out);
    process.exit(1);
  }
  const staged = run(["diff", "--cached", "--name-only"]);
  console.log("STAGED_FILES:\n" + (staged.out || "(none)"));
  const name = run(["config", "user.name"]).out || "lapheru";
  const email = run(["config", "user.email"]).out || "lapheru@users.noreply.github.com";
  run(["config", "user.name", name]);
  run(["config", "user.email", email]);
  const commit = run([
    "commit",
    "-m",
    "Sync current LELUV2 workspace: provider fallback registry, Genesis scene, tests, download artifact",
  ]);
  console.log("COMMIT:", commit.ok ? "ok" : "failed");
  if (!commit.ok) console.log("COMMIT_ERR:", commit.out);
} else {
  console.log("NOTHING_TO_COMMIT");
}

// ---- 4. Push ----
const authHeader = `AUTHORIZATION: Bearer ${token}`;
const push = run(["-c", `http.extraheader=${authHeader}`, "push", "origin", "main"]);
console.log("PUSH_EXIT:", push.ok ? 0 : 1);
console.log("PUSH_OUT:", push.out);
if (!push.ok) {
  console.log("PUSH_ERR:", push.err || push.out);
  process.exit(1);
}

// ---- 5. Verify remote ----
const remoteMain = run(["-c", `http.extraheader=${authHeader}`, "ls-remote", "origin", "refs/heads/main"]);
console.log("REMOTE_MAIN:", remoteMain.out);
const localHead = run(["rev-parse", "HEAD"]).out;
console.log("LOCAL_HEAD:", localHead);
console.log("MATCH:", remoteMain.out.includes(localHead) ? "YES" : "NO");
console.log("DONE");
