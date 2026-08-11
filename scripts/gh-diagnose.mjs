// Diagnose token scopes and find the actual repo name for lapheru.
// Never prints the token.
import { cwd } from "node:process";

const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || "";
if (!token) {
  console.log("NO_GITHUB_TOKEN");
  process.exit(2);
}

async function api(path, opts = {}) {
  try {
    const res = await fetch(`https://api.github.com${path}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "User-Agent": "lelu-push",
        Accept: "application/vnd.github+json",
        ...opts.headers,
      },
    });
    let body = "";
    try {
      body = await res.text();
    } catch {}
    return { status: res.status, headers: res.headers, body };
  } catch (e) {
    return { status: 0, headers: null, body: String(e.message || e) };
  }
}

const user = await api("/user");
console.log("USER_STATUS:", user.status);
console.log("OAUTH_SCOPES:", user.headers?.get("x-oauth-scopes") || "(none)");
console.log("TOKEN_TYPE:", user.headers?.get("x-accepted-github-permissions") ? "fine-grained?" : "classic?");

const repos = await api("/user/repos?per_page=100&sort=updated&affiliation=owner,collaborator,organization_member");
console.log("REPOS_STATUS:", repos.status);
try {
  const list = JSON.parse(repos.body);
  console.log("REPO_COUNT:", list.length);
  for (const r of list) {
    console.log(`REPO: ${r.full_name} (${r.private ? "private" : "public"}) default=${r.default_branch} updated=${r.updated_at}`);
  }
} catch (e) {
  console.log("REPOS_BODY:", repos.body.slice(0, 500));
}

// Also probe a few likely names directly
for (const name of ["leluv2", "Lelu-", "lelu", "leluv2-phase13", "Lelu"]) {
  const r = await api(`/repos/lapheru/${name}`);
  console.log(`PROBE lapheru/${name}: HTTP ${r.status}`);
}
console.log("DONE");
