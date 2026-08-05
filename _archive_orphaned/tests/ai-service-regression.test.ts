import AIService from "../core/AIService";

const first = AIService.getInstance();
const second = AIService.getInstance();

if (first !== second) {
  throw new Error("AIService singleton did not resolve to a single instance");
}

const unsubscribe = first.subscribeThinking(() => {
  // no-op
});

unsubscribe();
