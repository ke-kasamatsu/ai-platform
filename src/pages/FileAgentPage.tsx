export function FileAgentPage() {
  return (
    <div className="min-h-screen bg-[#06070e] text-[#e2e8f0] font-sans">
      <style>{`
        .g-text {
          background: linear-gradient(135deg, #6366f1, #22d3ee);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .fa-card {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          padding: 28px;
          transition: border-color 0.2s;
        }
        .fa-card:hover { border-color: rgba(255,255,255,0.13); }
        @keyframes fa-pulse { 0%,100%{opacity:1} 50%{opacity:.35} }
        .fa-pulse { animation: fa-pulse 2s infinite; }
      `}</style>

      {/* Hero */}
      <section className="px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-400/30 rounded-full px-4 py-1.5 text-xs font-semibold text-indigo-300 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 fa-pulse" />
            AI エージェント
          </div>
          <h1 className="text-4xl font-black leading-tight tracking-tight mb-5">
            業務ファイルを、AIが自動で<br />
            <span className="g-text">データに変える。</span>
          </h1>
          <p className="text-[#94a3b8] text-base leading-relaxed mb-8 max-w-xl">
            PDF も、Excel も、CSV も。取引先から届くあらゆる書類を AI が読み取り・整理・構造化。
            バックオフィスの手作業から、チームを解放します。
          </p>
          <div className="flex gap-3">
            <button className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-indigo-700 text-white text-sm font-bold px-6 py-3 rounded-lg shadow-lg shadow-indigo-500/30 hover:opacity-90 transition-opacity">
              機能を詳しく見る →
            </button>
            <button className="inline-flex items-center gap-2 bg-transparent text-[#94a3b8] border border-white/15 text-sm font-semibold px-6 py-3 rounded-lg hover:text-white hover:bg-white/5 transition-colors">
              デモを依頼する
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="border-t border-b border-white/[0.07] bg-[#0c0e1a]">
        <div className="max-w-4xl mx-auto px-8 py-10 grid grid-cols-3 divide-x divide-white/[0.07]">
          {[
            { num: "95%+", label: "AI 読み取り精度（整形済み帳票）" },
            { num: "15分→1分", label: "1件あたりの処理時間" },
            { num: "6形式", label: "対応ファイル形式（PDF / Excel / CSV 他）" },
          ].map((s) => (
            <div key={s.label} className="text-center px-6">
              <div className="text-3xl font-black g-text mb-1">{s.num}</div>
              <div className="text-xs text-[#94a3b8]">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Problems */}
      <section className="px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-bold tracking-widest text-indigo-400 uppercase mb-2">Problems</p>
          <h2 className="text-2xl font-black mb-3">こんな悩み、ありませんか？</h2>
          <p className="text-[#94a3b8] text-sm mb-8">取引先から届く書類のデータ化。毎日の繰り返しが、チームの時間と精度を奪っています。</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { n: "01", title: "フォーマットがバラバラで対応に追われる", body: "PDF・Excel・CSV など、取引先ごとにフォーマットが異なり、受け取るたびに個別対応が必要。標準化の見通しが立たない。" },
              { n: "02", title: "手入力による転記ミスと工数の増大", body: "書類を目視確認しながらシステムへ手入力する作業が毎日発生。ミスの確認作業も含めると、膨大な時間が失われている。" },
              { n: "03", title: "担当者によって処理方法がバラバラ", body: "明文化されたルールがなく、属人化が進んでいる。引き継ぎに時間がかかり、担当者が休むと業務が止まる。" },
              { n: "04", title: "データ化が遅くて分析・活用に繋がらない", body: "データ化のタイムラグで経営判断が後手に回る。AI 分析や自動レポートに活用したくても、肝心のデータが揃っていない。" },
            ].map((p) => (
              <div key={p.n} className="fa-card relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-400 to-orange-400 opacity-65" />
                <p className="text-[10px] font-extrabold tracking-widest text-[#475569] mb-2">PROBLEM {p.n}</p>
                <h3 className="text-sm font-bold mb-2">{p.title}</h3>
                <p className="text-xs text-[#94a3b8] leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-8 py-16 bg-[#0c0e1a]">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-bold tracking-widest text-indigo-400 uppercase mb-2">Features</p>
          <h2 className="text-2xl font-black mb-3">6 つのコア機能</h2>
          <p className="text-[#94a3b8] text-sm mb-8">受け取りから活用まで、必要なすべての機能をカバーしています。</p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: "📨", title: "自動受信トリガー", body: "メール・Slack からのファイル受信を自動検知。担当者が何もしなくても AI が動き始めます。", color: "bg-indigo-500/10 border-indigo-500/20" },
              { icon: "🔍", title: "ファイル種別の自動判定", body: "PDF・Excel・CSV などを内容で判定し、最適な読み取りパイプラインへ自動振り分けします。", color: "bg-cyan-500/10 border-cyan-500/20" },
              { icon: "🧠", title: "AI による内容読み取り", body: "Claude が帳票・表・文章を意味単位で理解し高精度な構造化データへ変換。スキャン PDF にも対応。", color: "bg-violet-500/10 border-violet-500/20" },
              { icon: "✅", title: "ヒューマンレビュー UI", body: "信頼度スコア付きの確認画面で、担当者は「承認」か「修正」のワンクリックだけで完了します。", color: "bg-emerald-500/10 border-emerald-500/20" },
              { icon: "📊", title: "データ出力・システム連携", body: "CSV・Excel・JSON 出力に加え、基幹システムや会計ソフトへの API 連携にも対応します。", color: "bg-amber-500/10 border-amber-500/20" },
              { icon: "📈", title: "AI による傾向分析", body: "蓄積データをもとに取引傾向・コスト推移・異常検知を自動分析。定期レポートも自動生成します。", color: "bg-red-500/10 border-red-500/20" },
            ].map((f) => (
              <div key={f.title} className="fa-card">
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center text-lg mb-4 ${f.color}`}>
                  {f.icon}
                </div>
                <h3 className="text-sm font-bold mb-2">{f.title}</h3>
                <p className="text-xs text-[#94a3b8] leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-bold tracking-widest text-indigo-400 uppercase mb-2">How It Works</p>
          <h2 className="text-2xl font-black mb-3">5 ステップで完了</h2>
          <p className="text-[#94a3b8] text-sm mb-8">ファイルが届いた瞬間から、データ活用まで。</p>
          <div className="space-y-4">
            {[
              { n: 1, title: "📨 ファイル受け取りの自動検知", body: "メールまたは Slack でファイルを受け取ると、AI が自動で起動。担当者の操作は一切不要です。" },
              { n: 2, title: "🔍 ファイル種別の自動判定", body: "PDF・Excel・CSV などを自動識別し、最適な処理パイプラインを選択。フォーマットの違いを AI が吸収します。" },
              { n: 3, title: "🧠 AI が内容を読み取り・構造化", body: "大規模言語モデルが表・数値・テキストを意味ごとに解析して構造化データに変換します。" },
              { n: 4, title: "✅ 担当者がレビュー・承認", body: "AI が抽出したデータを確認。修正が必要な箇所だけ対応するため、工数を最小化できます。" },
              { n: 5, title: "📊 データをビジネスに活用", body: "整理済みのデータを AI で分析。傾向把握・意思決定支援・レポート自動生成に活用できます。" },
            ].map((step, i) => (
              <div key={step.n} className="flex gap-4">
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 text-white font-extrabold text-sm flex items-center justify-center shadow-lg shadow-indigo-500/30">
                    {step.n}
                  </div>
                  {i < 4 && <div className="w-0.5 flex-1 min-h-4 bg-gradient-to-b from-indigo-500/40 to-transparent mt-1" />}
                </div>
                <div className="fa-card flex-1 mb-0 pb-4">
                  <h3 className="text-sm font-bold mb-1">{step.title}</h3>
                  <p className="text-xs text-[#94a3b8] leading-relaxed">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before / After */}
      <section className="px-8 py-16 bg-[#0c0e1a]">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-bold tracking-widest text-indigo-400 uppercase mb-2">Impact</p>
          <h2 className="text-2xl font-black mb-3">導入前 vs 導入後</h2>
          <p className="text-[#94a3b8] text-sm mb-8">手作業中心の現場から、AI が主役の業務フローへ。</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="fa-card">
              <p className="text-red-400 font-bold text-sm mb-4">😓 現状（導入前）</p>
              <ul className="space-y-2.5">
                {["ファイルごとに手動でデータ入力", "PDF・Excel・CSV をバラバラに処理", "転記ミスが発生・ダブルチェックが必要", "担当者によってプロセスが異なる", "データ活用が常に後手に回る", "繁忙期に処理が追いつかない"].map((t) => (
                  <li key={t} className="flex items-start gap-2 text-xs text-[#94a3b8]">
                    <span className="text-red-400 font-bold shrink-0">✗</span>{t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="fa-card border-emerald-500/25 bg-emerald-500/[0.04]">
              <p className="text-emerald-400 font-bold text-sm mb-4">🚀 導入後</p>
              <ul className="space-y-2.5">
                {["ファイル受領と同時に AI が自動処理", "どのフォーマットも同じフローで対応", "AI 抽出結果を人が確認するだけ", "プロセスが統一・属人化を解消", "整理済みデータをすぐ分析・活用", "処理量が増えてもスケールしやすい"].map((t) => (
                  <li key={t} className="flex items-start gap-2 text-xs text-[#94a3b8]">
                    <span className="text-emerald-400 font-bold shrink-0">✓</span>{t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Technology */}
      <section className="px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-bold tracking-widest text-indigo-400 uppercase mb-2">Technology</p>
          <h2 className="text-2xl font-black mb-3">採用技術</h2>
          <p className="text-[#94a3b8] text-sm mb-8">信頼性の高いクラウドサービスと最新 AI を組み合わせたパイプライン。</p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: "✦", name: "Claude（Anthropic）", body: "最高水準の大規模言語モデル。帳票・文章・表を意味単位で理解し、高精度な構造化データへ変換します。" },
              { icon: "◆", name: "Dify", body: "AI ワークフロー構築プラットフォーム。ファイル受信からデータ出力までのパイプラインを視覚的に管理できます。" },
              { icon: "☁", name: "クラウドインフラ", body: "セキュアなクラウド環境で動作。データは暗号化されて処理され、AI のトレーニングに使用されることはありません。" },
            ].map((t) => (
              <div key={t.name} className="fa-card text-center">
                <div className="text-3xl mb-3">{t.icon}</div>
                <p className="font-bold text-sm mb-2">{t.name}</p>
                <p className="text-xs text-[#94a3b8] leading-relaxed">{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
