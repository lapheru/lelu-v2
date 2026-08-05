import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { api } from "@/convex/_generated/api";
import { useAction } from "convex/react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ChevronRight,
  CircleDot,
  FileCode2,
  Folder,
  Github,
  Loader2,
  LogOut,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

type Repository = {
  name: string;
  fullName: string;
  owner: string;
  description: string | null;
  isPrivate: boolean;
  defaultBranch: string;
  updatedAt: string;
  language: string | null;
  stars: number;
  htmlUrl: string;
};

type TreeEntry = {
  path: string;
  type: "blob" | "tree";
  sha: string;
  size: number;
};

type FileData = {
  name: string;
  path: string;
  size: number;
  htmlUrl: string;
  content: string;
};

const glassPanel =
  "border border-white/70 bg-white/60 shadow-[0_24px_70px_-35px_rgba(74,94,150,0.45)] backdrop-blur-xl";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(
    new Date(value),
  );
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const listRepositories = useAction(api.github.listRepositories);
  const getRepositoryTree = useAction(api.github.getRepositoryTree);
  const getFileContents = useAction(api.github.getFileContents);

  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [repositorySearch, setRepositorySearch] = useState("");
  const [selectedRepository, setSelectedRepository] = useState<Repository | null>(null);
  const [tree, setTree] = useState<TreeEntry[]>([]);
  const [treeSearch, setTreeSearch] = useState("");
  const [selectedFile, setSelectedFile] = useState<FileData | null>(null);
  const [loadingRepositories, setLoadingRepositories] = useState(true);
  const [loadingTree, setLoadingTree] = useState(false);
  const [loadingFile, setLoadingFile] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadRepositories = async () => {
    setLoadingRepositories(true);
    setError(null);
    try {
      setRepositories((await listRepositories()) as Repository[]);
    } catch (actionError) {
      const message = actionError instanceof Error ? actionError.message : "Unable to reach GitHub.";
      setError(message);
      toast.error("GitHub connection unavailable", { description: message });
    } finally {
      setLoadingRepositories(false);
    }
  };

  useEffect(() => {
    void loadRepositories();
  }, []);

  const visibleRepositories = useMemo(
    () =>
      repositories.filter((repository) =>
        repository.fullName.toLowerCase().includes(repositorySearch.toLowerCase()),
      ),
    [repositories, repositorySearch],
  );

  const visibleTree = useMemo(() => {
    const query = treeSearch.trim().toLowerCase();
    return tree
      .filter((entry) => !query || entry.path.toLowerCase().includes(query))
      .slice(0, 120);
  }, [tree, treeSearch]);

  const openRepository = async (repository: Repository) => {
    setSelectedRepository(repository);
    setSelectedFile(null);
    setLoadingTree(true);
    setTreeSearch("");
    try {
      const result = await getRepositoryTree({
        owner: repository.owner,
        repo: repository.name,
        ref: repository.defaultBranch,
      });
      setTree(result.entries as TreeEntry[]);
    } catch (actionError) {
      const message = actionError instanceof Error ? actionError.message : "Unable to inspect that repository.";
      toast.error("Repository inspection failed", { description: message });
      setTree([]);
    } finally {
      setLoadingTree(false);
    }
  };

  const openFile = async (entry: TreeEntry) => {
    if (!selectedRepository || entry.type !== "blob") return;
    setLoadingFile(true);
    try {
      const result = await getFileContents({
        owner: selectedRepository.owner,
        repo: selectedRepository.name,
        path: entry.path,
        ref: selectedRepository.defaultBranch,
      });
      setSelectedFile(result as FileData);
    } catch (actionError) {
      const message = actionError instanceof Error ? actionError.message : "Unable to read that file.";
      toast.error("File inspection failed", { description: message });
    } finally {
      setLoadingFile(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#edf5ff] px-4 py-4 text-slate-900 sm:px-6 lg:px-8">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-28 -top-24 size-80 rounded-full bg-cyan-200/45 blur-3xl" />
        <div className="absolute right-0 top-1/3 size-96 rounded-full bg-indigo-200/35 blur-3xl" />
        <div className="absolute bottom-[-12rem] left-1/3 size-96 rounded-full bg-amber-100/65 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-[1500px] flex-col gap-4">
        <header className={`${glassPanel} flex flex-wrap items-center justify-between gap-4 rounded-3xl px-5 py-4`}>
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-900/10">
              <Sparkles className="size-5 text-cyan-200" />
            </div>
            <div>
              <p className="text-lg font-bold tracking-tight">Lelu</p>
              <p className="text-xs font-medium text-slate-500">Your AI companion for code</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-slate-800">{user?.name || "Workspace owner"}</p>
              <p className="text-xs text-slate-500">Private workspace</p>
            </div>
            <Button variant="outline" className="gap-2 rounded-xl border-white/80 bg-white/45" onClick={handleSignOut}>
              <LogOut className="size-4" />
              Sign out
            </Button>
          </div>
        </header>

        <section className="grid min-h-0 flex-1 gap-4 lg:grid-cols-[290px_minmax(0,1fr)]">
          <aside className={`${glassPanel} flex min-h-[360px] flex-col rounded-3xl p-4`}>
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-700">Workspace</p>
                <h1 className="mt-1 text-2xl font-bold tracking-tight">Repositories</h1>
              </div>
              <div className="flex size-9 items-center justify-center rounded-xl bg-white/70 text-slate-600">
                <Github className="size-4" />
              </div>
            </div>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-3 size-4 text-slate-400" />
              <Input
                value={repositorySearch}
                onChange={(event) => setRepositorySearch(event.target.value)}
                placeholder="Search repositories"
                className="rounded-xl border-white/80 bg-white/55 pl-9"
              />
            </div>

            <div className="min-h-0 flex-1 space-y-2 overflow-y-auto pr-1">
              {loadingRepositories ? (
                <div className="flex items-center gap-2 px-2 py-4 text-sm text-slate-500">
                  <Loader2 className="size-4 animate-spin" />
                  Finding your repositories…
                </div>
              ) : visibleRepositories.length ? (
                visibleRepositories.map((repository) => (
                  <button
                    key={repository.fullName}
                    type="button"
                    onClick={() => void openRepository(repository)}
                    className={`group w-full rounded-2xl border px-3 py-3 text-left transition-all ${selectedRepository?.fullName === repository.fullName ? "border-cyan-300 bg-white/85 shadow-sm" : "border-transparent bg-white/30 hover:border-white/80 hover:bg-white/65"}`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-bold text-slate-800">{repository.name}</p>
                      <ChevronRight className="size-4 shrink-0 text-slate-400 transition-transform group-hover:translate-x-0.5" />
                    </div>
                    <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">
                      {repository.description || "No description provided."}
                    </p>
                    <div className="mt-2 flex items-center gap-2 text-[11px] font-medium text-slate-400">
                      <span>{repository.language || "Code"}</span>
                      <span>·</span>
                      <span>Updated {formatDate(repository.updatedAt)}</span>
                    </div>
                  </button>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-300/80 px-4 py-6 text-center text-sm text-slate-500">
                  {error || "No repositories matched your search."}
                </div>
              )}
            </div>
          </aside>

          <section className={`${glassPanel} min-h-0 rounded-3xl p-4 sm:p-6`}>
            {!selectedRepository ? (
              <div className="flex min-h-[500px] flex-col items-center justify-center text-center">
                <div className="mb-5 flex size-16 items-center justify-center rounded-3xl border border-white bg-white/70 text-slate-700">
                  <CircleDot className="size-7 text-cyan-600" />
                </div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-700">Lelu is ready</p>
                <h2 className="mt-2 max-w-lg text-3xl font-bold tracking-tight text-slate-900">Choose a repository to start inspecting.</h2>
                <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">Browse the codebase with a calm, focused workspace. Select a repository on the left, then open any file to read it with Lelu.</p>
              </div>
            ) : (
              <div className="flex min-h-[500px] flex-col">
                <div className="mb-5 flex flex-wrap items-start justify-between gap-4 border-b border-white/70 pb-5">
                  <div className="flex items-start gap-3">
                    <Button variant="ghost" size="icon" className="mt-0.5 rounded-xl" onClick={() => { setSelectedRepository(null); setSelectedFile(null); }}>
                      <ArrowLeft className="size-4" />
                    </Button>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-2xl font-bold tracking-tight">{selectedRepository.name}</h2>
                        <span className="rounded-full border border-white bg-white/70 px-2 py-1 text-[11px] font-bold text-slate-500">{selectedRepository.isPrivate ? "Private" : "Public"}</span>
                      </div>
                      <p className="mt-1 text-sm text-slate-500">{selectedRepository.owner} / {selectedRepository.name} · {selectedRepository.defaultBranch}</p>
                    </div>
                  </div>
                  <a href={selectedRepository.htmlUrl} target="_blank" rel="noreferrer" className="text-xs font-bold text-cyan-700 hover:text-cyan-900">View on GitHub ↗</a>
                </div>

                <div className="grid min-h-0 flex-1 gap-4 xl:grid-cols-[minmax(240px,0.42fr)_minmax(0,1fr)]">
                  <div className="min-h-0 rounded-2xl border border-white/70 bg-white/35 p-3">
                    <div className="relative mb-3">
                      <Search className="absolute left-3 top-3 size-4 text-slate-400" />
                      <Input value={treeSearch} onChange={(event) => setTreeSearch(event.target.value)} placeholder="Filter files" className="rounded-xl border-white/80 bg-white/60 pl-9" />
                    </div>
                    <div className="max-h-[58vh] space-y-1 overflow-y-auto pr-1">
                      {loadingTree ? (
                        <div className="flex items-center gap-2 px-2 py-4 text-sm text-slate-500"><Loader2 className="size-4 animate-spin" />Reading the tree…</div>
                      ) : visibleTree.length ? (
                        visibleTree.map((entry) => (
                          <button key={entry.path} type="button" onClick={() => void openFile(entry)} disabled={entry.type !== "blob"} className={`flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-left text-xs transition-colors ${selectedFile?.path === entry.path ? "bg-cyan-100/80 text-cyan-900" : "text-slate-600 hover:bg-white/70"} ${entry.type !== "blob" ? "cursor-default opacity-60" : "cursor-pointer"}`}>
                            {entry.type === "tree" ? <Folder className="size-4 shrink-0 text-amber-500" /> : <FileCode2 className="size-4 shrink-0 text-cyan-600" />}
                            <span className="truncate">{entry.path}</span>
                          </button>
                        ))
                      ) : <p className="px-2 py-4 text-sm text-slate-500">No files match that filter.</p>}
                    </div>
                  </div>

                  <div className="min-h-[420px] overflow-hidden rounded-2xl border border-slate-800/10 bg-slate-950/95 text-slate-100">
                    <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
                      <div className="flex min-w-0 items-center gap-2">
                        <div className="flex gap-1.5"><span className="size-2 rounded-full bg-rose-400" /><span className="size-2 rounded-full bg-amber-300" /><span className="size-2 rounded-full bg-emerald-400" /></div>
                        <span className="truncate font-mono text-xs text-slate-400">{selectedFile?.path || "Select a file to inspect"}</span>
                      </div>
                      {selectedFile && <button type="button" onClick={() => setSelectedFile(null)} className="rounded-lg p-1 text-slate-500 hover:bg-white/10 hover:text-white"><X className="size-4" /></button>}
                    </div>
                    <div className="max-h-[58vh] overflow-auto p-4">
                      {loadingFile ? <div className="flex items-center gap-2 text-sm text-slate-400"><Loader2 className="size-4 animate-spin" />Lelu is opening the file…</div> : selectedFile ? <pre className="whitespace-pre-wrap break-words font-mono text-xs leading-6 text-slate-300"><code>{selectedFile.content}</code></pre> : <div className="flex min-h-[360px] flex-col items-center justify-center text-center text-slate-500"><FileCode2 className="mb-3 size-8 text-cyan-400/70" /><p className="text-sm font-semibold text-slate-300">Your file preview will appear here.</p><p className="mt-1 max-w-xs text-xs leading-5">Choose a file from the repository tree to inspect its contents.</p></div>}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>
        </section>
      </div>

      <AnimatePresence>
        {error && repositories.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="fixed bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 rounded-2xl border border-rose-200 bg-white/85 px-4 py-3 text-xs text-rose-700 shadow-lg backdrop-blur-xl">
            <span>{error}</span>
            <button type="button" className="font-bold underline" onClick={() => void loadRepositories()}>Retry</button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
