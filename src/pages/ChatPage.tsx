import { useState, useRef, useEffect } from "react";
import { Send, Lock, ChevronDown, Bot, User } from "lucide-react";

type LLM = {
  id: string;
  name: string;
  provider: string;
  approved: boolean;
  description: string;
};

const APPROVED_LLMS: LLM[] = [
  { id: "claude-sonnet-5", name: "Claude Sonnet 5", provider: "Anthropic", approved: true, description: "最新・高精度（推奨）" },
  { id: "claude-haiku-4-5", name: "Claude Haiku 4.5", provider: "Anthropic", approved: true, description: "高速・軽量タスク向け" },
  { id: "gpt-4o", name: "GPT-4o", provider: "OpenAI", approved: false, description: "社内未承認" },
  { id: "gemini-2", name: "Gemini 2.0", provider: "Google", approved: false, description: "社内未承認" },
];

type Message = { id: number; role: "user" | "assistant"; content: string; time: string };

const INITIAL_MESSAGES: Message[] = [
  { id: 1, role: "assistant", content: "こんにちは！社内AIアシスタントです。業務に関するご質問やタスクをお気軽にどうぞ。", time: "14:00" },
  { id: 2, role: "user", content: "Q2の売上サマリーを300字でまとめてください。", time: "14:01" },
  { id: 3, role: "assistant", content: "【Q2 売上サマリー】\n\n2026年Q2（4〜6月）の売上高は前年同期比112%の2億3,400万円となりました。主力の法人向けSaaS事業が堅調に推移し、新規契約数は前四半期比15%増の87件を達成。一方、中小企業向けプランの解約率がやや上昇（1.8%→2.3%）しており、カスタマーサクセス強化が課題です。営業利益率は前期から0.8pt改善し18.4%。下期は新製品ローンチ効果による売上加速を見込んでいます。", time: "14:01" },
];

export function ChatPage() {
  const [selectedLLM, setSelectedLLM] = useState(APPROVED_LLMS[0]);
  const [llmOpen, setLlmOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function send() {
    if (!input.trim() || loading) return;
    const userMsg: Message = { id: Date.now(), role: "user", content: input, time: new Date().toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" }) };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);
    setTimeout(() => {
      setMessages((m) => [...m, { id: Date.now() + 1, role: "assistant", content: "（モック）ご質問を承りました。実際のAPIが接続されると、ここに回答が表示されます。", time: new Date().toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" }) }]);
      setLoading(false);
    }, 1200);
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-8 py-4 border-b border-gray-100 flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-[18px] font-bold text-gray-900">チャット</h1>
          <p className="text-[12px] text-gray-400">社内承認済みモデルのみ使用可能</p>
        </div>
        {/* LLM Selector */}
        <div className="relative">
          <button
            onClick={() => setLlmOpen((o) => !o)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 hover:border-gray-300 text-[13px] text-gray-700 transition-colors"
          >
            <Lock size={12} className="text-green-500" />
            {selectedLLM.name}
            <span className="text-[11px] text-gray-400">{selectedLLM.provider}</span>
            <ChevronDown size={13} className="text-gray-400" />
          </button>
          {llmOpen && (
            <div className="absolute right-0 top-10 bg-white border border-gray-200 rounded-xl shadow-lg z-20 py-1.5 w-72">
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-3 py-1.5">使用可能なモデル</p>
              {APPROVED_LLMS.map((llm) => (
                <button
                  key={llm.id}
                  disabled={!llm.approved}
                  onClick={() => { if (llm.approved) { setSelectedLLM(llm); setLlmOpen(false); } }}
                  className={`w-full text-left px-3 py-2 flex items-center gap-3 transition-colors ${llm.approved ? "hover:bg-gray-50 text-gray-800" : "opacity-40 cursor-not-allowed"}`}
                >
                  <div className={`w-2 h-2 rounded-full shrink-0 ${llm.approved ? "bg-green-400" : "bg-gray-300"}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium">{llm.name}</p>
                    <p className="text-[11px] text-gray-400">{llm.description}</p>
                  </div>
                  {!llm.approved && <Lock size={11} className="text-gray-400 shrink-0" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
            <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${msg.role === "assistant" ? "bg-[#5b4fcf] text-white" : "bg-gray-200 text-gray-600"}`}>
              {msg.role === "assistant" ? <Bot size={14} /> : <User size={14} />}
            </div>
            <div className={`max-w-[72%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}>
              <div className={`px-4 py-3 rounded-2xl text-[13px] leading-relaxed whitespace-pre-wrap ${msg.role === "assistant" ? "bg-gray-50 text-gray-800 rounded-tl-sm" : "bg-[#5b4fcf] text-white rounded-tr-sm"}`}>
                {msg.content}
              </div>
              <span className="text-[11px] text-gray-400 px-1">{msg.time}</span>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-full bg-[#5b4fcf] text-white flex items-center justify-center shrink-0"><Bot size={14} /></div>
            <div className="bg-gray-50 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1 items-center">
              {[0, 1, 2].map((i) => (
                <span key={i} className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-8 py-4 border-t border-gray-100 shrink-0">
        <div className="flex gap-3 items-end">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
            placeholder="メッセージを入力… (Shift+Enter で改行)"
            rows={1}
            className="flex-1 resize-none border border-gray-200 rounded-xl px-4 py-3 text-[13px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#5b4fcf] transition-colors"
            style={{ maxHeight: 120 }}
          />
          <button
            onClick={send}
            disabled={!input.trim() || loading}
            className="w-10 h-10 rounded-xl bg-[#5b4fcf] text-white flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-40 shrink-0"
          >
            <Send size={15} />
          </button>
        </div>
        <p className="text-[11px] text-gray-400 mt-2">使用中: {selectedLLM.name} — 社内情報を含む会話は外部に送信されません</p>
      </div>
    </div>
  );
}
