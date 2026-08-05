"use node";

import { getAuthUserId } from "@convex-dev/auth/server";
import { action } from "./_generated/server";
import { v } from "convex/values";

const GITHUB_API = "https://api.github.com";
const GITHUB_API_VERSION = "2022-11-28";

type GitHubRepository = {
  name: string;
  full_name: string;
  owner: { login: string };
  description: string | null;
  private: boolean;
  default_branch: string;
  updated_at: string;
  language: string | null;
  stargazers_count: number;
  html_url: string;
};

type GitHubTreeEntry = {
  path: string;
  mode: string;
  type: "blob" | "tree" | "commit";
  sha: string;
  size?: number;
  url: string;
};

type GitHubFile = {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string | null;
  type: "file" | "dir";
  content?: string;
  encoding?: string;
};

async function githubFetch<T>(path: string): Promise<T> {
  if (!process.env.GITHUB_TOKEN) {
    throw new Error(
      "GitHub is not connected yet. Add GITHUB_TOKEN to your Convex environment.",
    );
  }

  const response = await fetch(`${GITHUB_API}${path}`, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      "X-GitHub-Api-Version": GITHUB_API_VERSION,
      "User-Agent": "Lelu-GitHub-Browser",
    },
  });

  if (!response.ok) {
    const body = await response.text();
    if (response.status === 401) {
      throw new Error("GitHub rejected the token. Check its permissions and try again.");
    }
    if (response.status === 404) {
      throw new Error("GitHub could not find that repository or file.");
    }
    throw new Error(`GitHub returned ${response.status}: ${body.slice(0, 240)}`);
  }

  return (await response.json()) as T;
}

function requireUser(userId: string | null) {
  if (!userId) {
    throw new Error("You must be signed in to inspect a repository.");
  }
}

export const listRepositories = action({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    requireUser(userId);

    const repositories = await githubFetch<GitHubRepository[]>(
      "/user/repos?per_page=100&sort=updated&affiliation=owner,collaborator,organization_member",
    );

    return repositories.map((repository) => ({
      name: repository.name,
      fullName: repository.full_name,
      owner: repository.owner.login,
      description: repository.description,
      isPrivate: repository.private,
      defaultBranch: repository.default_branch,
      updatedAt: repository.updated_at,
      language: repository.language,
      stars: repository.stargazers_count,
      htmlUrl: repository.html_url,
    }));
  },
});

export const getRepositoryTree = action({
  args: {
    owner: v.string(),
    repo: v.string(),
    ref: v.string(),
  },
  handler: async (ctx, { owner, repo, ref }) => {
    const userId = await getAuthUserId(ctx);
    requireUser(userId);

    const tree = await githubFetch<{
      sha: string;
      truncated: boolean;
      tree: GitHubTreeEntry[];
    }>(
      `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/git/trees/${encodeURIComponent(ref)}?recursive=1`,
    );

    return {
      sha: tree.sha,
      truncated: tree.truncated,
      entries: tree.tree
        .filter((entry) => entry.type === "blob" || entry.type === "tree")
        .map((entry) => ({
          path: entry.path,
          type: entry.type,
          sha: entry.sha,
          size: entry.size ?? 0,
        })),
    };
  },
});

export const getFileContents = action({
  args: {
    owner: v.string(),
    repo: v.string(),
    path: v.string(),
    ref: v.string(),
  },
  handler: async (ctx, { owner, repo, path, ref }) => {
    const userId = await getAuthUserId(ctx);
    requireUser(userId);

    const encodedPath = path.split("/").map(encodeURIComponent).join("/");
    const file = await githubFetch<GitHubFile>(
      `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/contents/${encodedPath}?ref=${encodeURIComponent(ref)}`,
    );

    if (file.type !== "file") {
      throw new Error("That path is a directory. Choose a file to inspect.");
    }

    const decodedContent =
      file.encoding === "base64" && file.content
        ? Buffer.from(file.content.replace(/\n/g, ""), "base64").toString("utf8")
        : "GitHub did not return inline content for this file. Open it on GitHub to inspect it.";

    return {
      name: file.name,
      path: file.path,
      size: file.size,
      htmlUrl: file.html_url,
      content: decodedContent,
    };
  },
});
