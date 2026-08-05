import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { motion } from "framer-motion";
import { ArrowRight, Code2, Github, LockKeyhole, Sparkles } from "lucide-react";
import { useNavigate } from "react-router";

export default function Landing() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#edf5ff] px-5 py-5 text-slate-900 sm:px-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-[-10rem] size-[32rem] rounded-full bg-cyan-200/45 blur-3xl" />
        <div className="absolute right-[-10rem] top-1/4 size-[34rem] rounded-full bg-indigo-200/35 blur-3xl" />
        <div className="absolute bottom-[-14rem] left-1/4 size-[28rem] rounded-full bg-amber-100/70 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-2.5rem)] w-full max-w-6xl flex-col">
        <nav className="flex items-center justify-between rounded-3xl border border-white/70 bg-white/55 px-4 py-3 shadow-[0_20px_60px_-35px_rgba(74,94,150,0.5)] backdrop-blur-xl sm:px-5">
          <button type="button" onClick={() => navigate("/")} className="flex items-center gap-3 text-left">
            <span className="flex size-10 items-center justify-center rounded-2xl bg-slate-950 text-white"><Sparkles className="size-4 text-cyan-200" /></span>
            <span><span className="block text-base font-bold tracking-tight">Lelu</span><span className="block text-[11px] font-medium text-slate-500">AI companion for code</span></span>
          </button>
          <Button onClick={() => navigate(isAuthenticated ? "/dashboard" : "/auth")} variant="outline" className="rounded-xl border-white/80 bg-white/50">{isAuthenticated ? "Open workspace" : "Sign in"}</Button>
        </nav>

        <section className="grid flex-1 items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/55 px-3 py-1.5 text-xs font-bold text-cyan-800 backdrop-blur-xl"><span className="size-1.5 rounded-full bg-emerald-500" />Private code workspace</div>
            <h1 className="max-w-2xl text-5xl font-bold leading-[1.02] tracking-[-0.06em] text-slate-950 sm:text-7xl">Meet the calmer way to inspect your code.</h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">Lelu connects to your GitHub workspace and gives you a focused place to browse repositories, open files, and understand what is already there—without the noise.</p>
            <div className="mt-9 flex flex-wrap gap-3"><Button onClick={() => navigate(isAuthenticated ? "/dashboard" : "/auth")} size="lg" className="gap-2 rounded-2xl bg-slate-950 px-6 text-white hover:bg-slate-800">{isAuthenticated ? "Open Lelu" : "Connect GitHub workspace"}<ArrowRight className="size-4" /></Button><span className="flex items-center gap-2 px-2 text-xs font-medium text-slate-500"><LockKeyhole className="size-4 text-cyan-700" />Your token stays server-side</span></div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.65, delay: 0.1 }} className="relative">
            <div className="absolute -right-3 -top-5 rounded-2xl border border-white bg-white/70 px-3 py-2 text-xs font-bold text-slate-600 shadow-sm backdrop-blur-xl">Ready when you are ✦</div>
            <div className="rounded-[2rem] border border-white/80 bg-white/55 p-4 shadow-[0_30px_90px_-40px_rgba(59,78,135,0.55)] backdrop-blur-2xl sm:p-5">
              <div className="rounded-[1.5rem] border border-white/80 bg-white/75 p-4 sm:p-5">
                <div className="flex items-center justify-between border-b border-slate-200/70 pb-4"><div className="flex items-center gap-2"><span className="flex size-8 items-center justify-center rounded-xl bg-slate-950 text-white"><Github className="size-4" /></span><div><p className="text-sm font-bold">leluv2</p><p className="text-[11px] text-slate-400">main · 42 files</p></div></div><span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-bold text-emerald-700">Connected</span></div>
                <div className="grid gap-3 py-5 sm:grid-cols-[0.75fr_1.25fr]"><div className="space-y-2 rounded-2xl bg-slate-50/90 p-3"><p className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Repository tree</p>{["src", "components", "Dashboard.tsx", "README.md"].map((item, index) => <div key={item} className={`flex items-center gap-2 rounded-lg px-2 py-2 text-xs ${index === 2 ? "bg-cyan-100/80 font-bold text-cyan-800" : "text-slate-500"}`}>{index < 2 ? <span className="text-amber-500">⌄</span> : <Code2 className="size-3.5 text-cyan-600" />}{item}</div>)}</div><div className="overflow-hidden rounded-2xl bg-slate-950 p-4"><div className="mb-4 flex gap-1.5"><span className="size-2 rounded-full bg-rose-400" /><span className="size-2 rounded-full bg-amber-300" /><span className="size-2 rounded-full bg-emerald-400" /></div><div className="space-y-2 font-mono text-[10px] leading-5"><p><span className="text-violet-300">export default</span> <span className="text-cyan-300">function</span> <span className="text-amber-200">Dashboard</span>() {'{'}</p><p className="pl-3 text-slate-400">// Lelu is ready to help</p><p className="pl-3"><span className="text-cyan-300">return</span> <span className="text-emerald-300">&lt;Workspace /&gt;</span>;</p><p>{'}'}</p></div></div></div>
                <div className="flex items-center gap-2 rounded-2xl bg-cyan-50/80 px-3 py-3 text-xs text-cyan-900"><Sparkles className="size-4 text-cyan-600" />Browse first. Ask Lelu for deeper help when you are ready.</div>
              </div>
            </div>
          </motion.div>
        </section>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/70 py-5 text-xs font-medium text-slate-500"><p>Built for focused engineering work.</p><div className="flex items-center gap-5"><span className="flex items-center gap-2"><Code2 className="size-3.5" />Repository files</span><span className="flex items-center gap-2"><LockKeyhole className="size-3.5" />Private by design</span></div></div>
      </div>
    </main>
  );
}
