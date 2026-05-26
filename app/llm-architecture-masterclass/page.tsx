"use client"

export default function Page() {
  const vocab = [
    "0: <PAD>",
    "1: I",
    "2: Love",
    "3: AI",
    "4: My",
    "5: Name",
    "6: Is",
    "7: Sagar",
  ]

  return (
    <main className="min-h-screen scroll-smooth bg-[#fafafa] bg-[linear-gradient(to_right,#e5e7eb22_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb22_1px,transparent_1px)] bg-[size:64px_64px] px-6 py-20">
      <div className="mx-auto max-w-6xl relative z-10">

        {/* Sticky Navigation */}
        <div className="sticky top-6 z-50 mb-14 flex justify-center">
          <div className="flex flex-wrap items-center gap-3 rounded-full border border-white/70 bg-white/80 backdrop-blur-xl px-4 py-3 shadow-lg">
            <a href="#p1" className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">01</a>
            <a href="#p2" className="rounded-full bg-violet-50 px-4 py-2 text-sm font-medium text-violet-700">02</a>
            <a href="#p3" className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">03</a>
            <a href="#p4" className="rounded-full bg-orange-50 px-4 py-2 text-sm font-medium text-orange-700">04</a>
            <a href="#p5" className="rounded-full bg-pink-50 px-4 py-2 text-sm font-medium text-pink-700">05</a>
            <a href="#p6" className="rounded-full bg-cyan-50 px-4 py-2 text-sm font-medium text-cyan-700">06</a>
            <a href="#p7" className="rounded-full bg-purple-50 px-4 py-2 text-sm font-medium text-purple-700">07</a>
            <a href="#p8" className="rounded-full bg-red-50 px-4 py-2 text-sm font-medium text-red-700">08</a>
            <a href="#p9" className="rounded-full bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700">09</a>
            <a href="#p10" className="rounded-full bg-gradient-to-r from-red-500 to-blue-500 px-4 py-2 text-sm font-medium text-white shadow-md">10</a>
          </div>
        </div>

        {/* Header */}
        <div className="mb-20 rounded-[40px] border border-white/60 bg-white/70 p-10 shadow-2xl backdrop-blur-xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-blue-600">LLM Systems</p>
          <div className="mb-10 flex gap-3">
            <div className="h-3 w-3 animate-pulse rounded-full bg-blue-500"></div>
            <div className="h-3 w-3 animate-pulse rounded-full bg-violet-500"></div>
            <div className="h-3 w-3 animate-pulse rounded-full bg-pink-500"></div>
            <div className="h-3 w-3 animate-pulse rounded-full bg-emerald-500"></div>
          </div>
          <h1 className="max-w-5xl text-5xl font-semibold tracking-tight text-[#11181C]">Modern LLM Architecture</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600">Tokenization, tensors, latent space, transformers, attention, and self-supervised learning systems.</p>
        </div>

        {/* Reference Design Thumbnail */}
        <div className="mb-10 flex justify-center">
          <a href="/images/llm-ai.png" target="_blank" rel="noopener noreferrer" className="group relative block max-w-3xl w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white/80 hover:scale-[1.02] transition-transform duration-300">
            <img src="/images/llm-ai.png" alt="LLM Architecture Design Reference" className="w-full h-auto" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
              <div className="bg-white/90 backdrop-blur-md rounded-full px-6 py-2 text-gray-900 font-semibold text-sm flex items-center gap-2">🔍 Click to view full design</div>
            </div>
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-white">Reference Design</div>
          </a>
        </div>

        {/* Panel 1: Tokenization */}
        <div id="p1" className="mt-10 rounded-[32px] border border-white/70 bg-white/80 backdrop-blur-xl p-10 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
          <div className="relative mb-10 flex items-center gap-5">
            <div className="absolute right-0 top-[-40px] text-[140px] font-black leading-none text-gray-100">01</div>
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-50 text-2xl font-semibold text-blue-600">01</div>
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-600">Processing Text</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#11181C]">Tokenization and OpenTokenizer Core</h2>
              <p className="mt-3 max-w-3xl text-base leading-7 text-gray-600">Raw language gets transformed into structured token IDs that neural networks can mathematically process.</p>
            </div>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-3xl border border-gray-200 bg-[#fcfcfc] p-6">
              <p className="text-sm font-semibold text-[#11181C]">Word-Level Tokenizer</p>
              <p className="mt-2 text-sm text-gray-500">Traditional splitting</p>
              <div className="mt-8 rounded-2xl bg-white p-4 text-center text-lg font-medium shadow-sm">unhappy people</div>
              <div className="mt-6 text-center text-2xl text-gray-300">→</div>
              <div className="mt-6 flex gap-3">
                <div className="flex-1 rounded-2xl bg-white p-4 text-center shadow-sm">unhappy</div>
                <div className="flex-1 rounded-2xl bg-white p-4 text-center shadow-sm">people</div>
              </div>
            </div>
            <div className="rounded-3xl border border-gray-200 bg-[#fcfcfc] p-6">
              <p className="text-sm font-semibold text-[#11181C]">Sub-Word Tokenizer</p>
              <p className="mt-2 text-sm text-gray-500">Advanced WordPiece system</p>
              <div className="mt-8 rounded-2xl bg-white p-4 text-center text-lg font-medium shadow-sm">unhappy people</div>
              <div className="mt-6 text-center text-2xl text-gray-300">→</div>
              <div className="mt-6 flex flex-wrap gap-3">
                <div className="rounded-2xl bg-green-50 px-4 py-3 font-medium text-green-700">[un]</div>
                <div className="rounded-2xl bg-violet-50 px-4 py-3 font-medium text-violet-700">[##happy]</div>
                <div className="rounded-2xl bg-blue-50 px-4 py-3 font-medium text-blue-700">[people]</div>
              </div>
              <p className="mt-6 text-xs text-gray-500">## means continuation token</p>
            </div>
            <div className="rounded-3xl border border-gray-200 bg-[#fcfcfc] p-6">
              <p className="text-sm font-semibold text-[#11181C]">Vocabulary Collection</p>
              <div className="mt-6 space-y-3">
                {vocab.map((item) => (
                  <div key={item} className="rounded-2xl bg-white px-4 py-3 text-sm shadow-sm">{item}</div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Panel 2: Tensor Batching */}
        <div id="p2" className="mt-10 rounded-[32px] border border-white/70 bg-white/80 backdrop-blur-xl p-10 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
          <div className="relative mb-10 flex items-center gap-5">
            <div className="absolute right-0 top-[-40px] text-[140px] font-black leading-none text-gray-100">02</div>
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-violet-50 text-2xl font-semibold text-violet-600">02</div>
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-violet-600">Batch Processing</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#11181C]">Tensor Alignment and Batching</h2>
              <p className="mt-3 max-w-3xl text-base leading-7 text-gray-600">Neural networks process uniform tensor shapes, so shorter sequences require padding alignment.</p>
            </div>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-gray-200 bg-[#fcfcfc] p-6">
              <p className="text-sm font-semibold text-[#11181C]">Variable Length Sequences</p>
              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-3"><div className="w-20 text-sm text-gray-500">Row A</div><div className="flex gap-2"><div className="rounded-xl bg-white px-4 py-2 shadow-sm">1</div><div className="rounded-xl bg-white px-4 py-2 shadow-sm">2</div><div className="rounded-xl bg-white px-4 py-2 shadow-sm">3</div></div></div>
                <div className="flex items-center gap-3"><div className="w-20 text-sm text-gray-500">Row B</div><div className="flex gap-2"><div className="rounded-xl bg-white px-4 py-2 shadow-sm">4</div><div className="rounded-xl bg-white px-4 py-2 shadow-sm">5</div><div className="rounded-xl bg-white px-4 py-2 shadow-sm">6</div><div className="rounded-xl bg-white px-4 py-2 shadow-sm">7</div></div></div>
              </div>
            </div>
            <div className="rounded-3xl border border-gray-200 bg-[#fcfcfc] p-6">
              <p className="text-sm font-semibold text-[#11181C]">Padded Tensor</p>
              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-3"><div className="w-20 text-sm text-gray-500">Row A</div><div className="flex gap-2"><div className="rounded-xl bg-green-50 px-4 py-2 font-medium text-green-700">1</div><div className="rounded-xl bg-green-50 px-4 py-2 font-medium text-green-700">2</div><div className="rounded-xl bg-green-50 px-4 py-2 font-medium text-green-700">3</div><div className="rounded-xl bg-gray-200 px-4 py-2 font-medium text-gray-500">0</div></div></div>
                <div className="flex items-center gap-3"><div className="w-20 text-sm text-gray-500">Row B</div><div className="flex gap-2"><div className="rounded-xl bg-green-50 px-4 py-2 font-medium text-green-700">4</div><div className="rounded-xl bg-green-50 px-4 py-2 font-medium text-green-700">5</div><div className="rounded-xl bg-green-50 px-4 py-2 font-medium text-green-700">6</div><div className="rounded-xl bg-green-50 px-4 py-2 font-medium text-green-700">7</div></div></div>
              </div>
            </div>
          </div>
          <div className="mt-8 rounded-3xl border border-gray-200 bg-[#fcfcfc] p-8">
            <p className="text-sm font-semibold text-[#11181C]">Attention Mask</p>
            <div className="mt-6 flex flex-wrap gap-3"><div className="rounded-xl bg-blue-50 px-5 py-3 font-medium text-blue-700">1</div><div className="rounded-xl bg-blue-50 px-5 py-3 font-medium text-blue-700">1</div><div className="rounded-xl bg-blue-50 px-5 py-3 font-medium text-blue-700">1</div><div className="rounded-xl bg-red-50 px-5 py-3 font-medium text-red-700">0</div></div>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-gray-600">1 means valid tokens. 0 blocks padding noise and prevents meaningless tensor calculations.</p>
          </div>
        </div>

        {/* Panel 3: Latent Space */}
        <div id="p3" className="mt-10 rounded-[32px] border border-white/70 bg-white/80 backdrop-blur-xl p-10 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
          <div className="relative mb-10 flex items-center gap-5">
            <div className="absolute right-0 top-[-40px] text-[140px] font-black leading-none text-gray-100">03</div>
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-50 text-2xl font-semibold text-emerald-600">03</div>
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-600">Semantic Geometry</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#11181C]">Latent Space and Vector Calculation</h2>
              <p className="mt-3 max-w-3xl text-base leading-7 text-gray-600">Words become vectors positioned inside a massive mathematical semantic space.</p>
            </div>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-gray-200 bg-[#fcfcfc] p-8">
              <p className="text-sm font-semibold text-[#11181C]">Semantic Vector Relationship</p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-center">
                <div className="rounded-2xl bg-blue-50 px-5 py-4 font-semibold text-blue-700 shadow-sm">King</div>
                <div className="text-3xl text-gray-300">-</div>
                <div className="rounded-2xl bg-gray-100 px-5 py-4 font-semibold text-gray-700 shadow-sm">Man</div>
                <div className="text-3xl text-gray-300">+</div>
                <div className="rounded-2xl bg-pink-50 px-5 py-4 font-semibold text-pink-700 shadow-sm">Woman</div>
                <div className="text-3xl text-gray-300">=</div>
                <div className="rounded-2xl bg-violet-50 px-5 py-4 font-semibold text-violet-700 shadow-sm">Queen</div>
              </div>
            </div>
            <div className="rounded-3xl border border-gray-200 bg-[#fcfcfc] p-8">
              <p className="text-sm font-semibold text-[#11181C]">Transformer Context View</p>
              <div className="mt-8 rounded-3xl bg-white p-8 shadow-sm">
                <div className="flex flex-col items-center gap-4">
                  <div className="rounded-3xl border border-violet-200 bg-violet-50 px-8 py-10 text-center">
                    <p className="text-xs uppercase tracking-[0.2em] text-violet-500">Transformer</p>
                    <p className="mt-4 text-lg font-semibold text-violet-700">Sees Entire Sequence</p>
                  </div>
                </div>
              </div>
              <p className="mt-8 text-sm leading-7 text-gray-600">Unlike older sequential systems, transformers process the entire context window simultaneously.</p>
            </div>
          </div>
        </div>

        {/* Panel 4: Multi-Head Attention */}
        <div id="p4" className="mt-10 rounded-[32px] border border-white/70 bg-white/80 backdrop-blur-xl p-10 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
          <div className="relative mb-10 flex items-center gap-5">
            <div className="absolute right-0 top-[-40px] text-[140px] font-black leading-none text-gray-100">04</div>
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-orange-50 text-2xl font-semibold text-orange-600">04</div>
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-orange-600">Transformer Core</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#11181C]">Multi-Head Self-Attention and Matrix Math</h2>
              <p className="mt-3 max-w-3xl text-base leading-7 text-gray-600">Transformers learn relationships between tokens using parallel attention heads and tensor matrix operations.</p>
            </div>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-gray-200 bg-[#fcfcfc] p-8">
              <p className="text-sm font-semibold text-[#11181C]">Input Embedding Pipeline</p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <div className="rounded-2xl bg-blue-50 px-5 py-4 text-sm font-semibold text-blue-700 shadow-sm">Token Embedding</div>
                <div className="text-3xl text-gray-300">+</div>
                <div className="rounded-2xl bg-violet-50 px-5 py-4 text-sm font-semibold text-violet-700 shadow-sm">Positional Encoding</div>
                <div className="text-3xl text-gray-300">=</div>
                <div className="rounded-2xl bg-emerald-50 px-5 py-4 text-sm font-semibold text-emerald-700 shadow-sm">Dense Vector</div>
              </div>
            </div>
            <div className="rounded-3xl border border-gray-200 bg-[#fcfcfc] p-8">
              <p className="text-sm font-semibold text-[#11181C]">Multi-Head Attention System</p>
              <div className="mt-8 grid gap-4">
                <div className="rounded-2xl bg-blue-50 p-5"><p className="text-sm font-semibold text-blue-700">Head 1 — Syntax</p></div>
                <div className="rounded-2xl bg-violet-50 p-5"><p className="text-sm font-semibold text-violet-700">Head 2 — Pronouns</p></div>
                <div className="rounded-2xl bg-pink-50 p-5"><p className="text-sm font-semibold text-pink-700">Head 3 — Adjectives</p></div>
              </div>
              <div className="mt-10 rounded-3xl bg-white p-8 shadow-sm">
                <p className="text-sm font-semibold text-[#11181C]">Query / Key / Value Computation</p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                  <div className="rounded-2xl bg-cyan-50 px-5 py-4 font-semibold text-cyan-700">Q</div>
                  <div className="rounded-2xl bg-orange-50 px-5 py-4 font-semibold text-orange-700">K</div>
                  <div className="rounded-2xl bg-emerald-50 px-5 py-4 font-semibold text-emerald-700">V</div>
                </div>
                <div className="mt-10 overflow-x-auto rounded-2xl bg-[#11181C] p-6">
                  <code className="text-sm leading-8 text-green-400">Attention(Q,K,V) = softmax(QK^T / sqrt(d_k)) V</code>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Panel 5: Self-Supervised Learning */}
        <div id="p5" className="mt-10 rounded-[32px] border border-white/70 bg-white/80 backdrop-blur-xl p-10 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
          <div className="relative mb-10 flex items-center gap-5">
            <div className="absolute right-0 top-[-40px] text-[140px] font-black leading-none text-gray-100">05</div>
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-pink-50 text-2xl font-semibold text-pink-600">05</div>
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-pink-600">Foundational Training</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#11181C]">Self-Supervised Learning Architectures</h2>
              <p className="mt-3 max-w-3xl text-base leading-7 text-gray-600">Modern LLMs learn language patterns through massive-scale self-supervised training objectives.</p>
            </div>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-gray-200 bg-[#fcfcfc] p-8">
              <div className="flex items-center justify-between">
                <div><p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-600">Encoder Pipeline</p><h3 className="mt-2 text-2xl font-semibold text-[#11181C]">BERT</h3></div>
                <div className="rounded-2xl bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">Discriminative</div>
              </div>
              <div className="mt-8 rounded-3xl bg-white p-8 shadow-sm">
                <p className="text-sm font-semibold text-[#11181C]">Masked LM Bi-Directional Learning</p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <div className="rounded-2xl bg-gray-100 px-5 py-3 font-medium">I</div>
                  <div className="rounded-2xl bg-yellow-100 px-5 py-3 font-semibold text-yellow-800">[MASK]</div>
                  <div className="rounded-2xl bg-gray-100 px-5 py-3 font-medium">AI</div>
                  <div className="text-3xl text-gray-300">→</div>
                  <div className="rounded-2xl bg-blue-50 px-5 py-3 font-semibold text-blue-700">Love</div>
                </div>
                <p className="mt-8 text-sm leading-7 text-gray-600">BERT predicts missing masked words using left and right context simultaneously.</p>
              </div>
            </div>
            <div className="rounded-3xl border border-gray-200 bg-[#fcfcfc] p-8">
              <div className="flex items-center justify-between">
                <div><p className="text-sm font-medium uppercase tracking-[0.2em] text-violet-600">Decoder Pipeline</p><h3 className="mt-2 text-2xl font-semibold text-[#11181C]">GPT</h3></div>
                <div className="rounded-2xl bg-violet-50 px-4 py-2 text-sm font-medium text-violet-700">Generative</div>
              </div>
              <div className="mt-8 rounded-3xl bg-white p-8 shadow-sm">
                <p className="text-sm font-semibold text-[#11181C]">Causal Auto-Regressive Generation</p>
                <div className="mt-8 space-y-5">
                  <div className="rounded-2xl border border-gray-100 p-5"><p className="text-xs uppercase tracking-[0.2em] text-gray-400">Step 1</p><p className="mt-3 text-sm font-medium text-[#11181C]">&lt;SOS&gt; → I</p></div>
                  <div className="rounded-2xl border border-gray-100 p-5"><p className="text-xs uppercase tracking-[0.2em] text-gray-400">Step 2</p><p className="mt-3 text-sm font-medium text-[#11181C]">&lt;SOS&gt; I → Love</p></div>
                  <div className="rounded-2xl border border-gray-100 p-5"><p className="text-xs uppercase tracking-[0.2em] text-gray-400">Step 3</p><p className="mt-3 text-sm font-medium text-[#11181C]">&lt;SOS&gt; I Love → AI → &lt;EOS&gt;</p></div>
                </div>
                <p className="mt-8 text-sm leading-7 text-gray-600">GPT predicts the next token sequentially from left to right.</p>
              </div>
            </div>
          </div>
          <footer className="mt-12 rounded-3xl border border-gray-200 bg-[#fcfcfc] p-8">
            <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-400">Ecosystem</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-[#11181C]">Hugging Face + Transformers + PyTorch</h3>
              </div>
              <div className="rounded-3xl border border-orange-200 bg-orange-50 px-6 py-4">
                <p className="text-sm font-semibold text-orange-700">Foundation Model Infrastructure</p>
              </div>
            </div>
          </footer>
        </div>

        {/* Panel 6: Retrieval Systems */}
        <div id="p6" className="mt-10 rounded-[32px] border border-white/70 bg-white/80 backdrop-blur-xl p-10 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
          <div className="relative mb-10 flex items-center gap-5">
            <div className="absolute right-0 top-[-40px] text-[140px] font-black leading-none text-gray-100">06</div>
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-cyan-50 text-2xl font-semibold text-cyan-600">06</div>
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-600">Knowledge Access</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#11181C]">Retrieval-Augmented Generation (RAG)</h2>
              <p className="mt-3 max-w-3xl text-base leading-7 text-gray-600">Combining parametric knowledge with external data sources for accurate, up-to-date responses.</p>
            </div>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-gray-200 bg-[#fcfcfc] p-8">
              <p className="text-sm font-semibold text-[#11181C]">RAG Pipeline Architecture</p>
              <div className="mt-6 flex items-center gap-2 flex-wrap justify-center p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl">
                <div className="rounded-xl bg-white px-3 py-2 text-sm shadow-sm">User Query</div>
                <div className="text-xl text-gray-400">→</div>
                <div className="rounded-xl bg-white px-3 py-2 text-sm shadow-sm">Retriever</div>
                <div className="text-xl text-gray-400">→</div>
                <div className="rounded-xl bg-white px-3 py-2 text-sm shadow-sm">Vector DB</div>
                <div className="text-xl text-gray-400">→</div>
                <div className="rounded-xl bg-white px-3 py-2 text-sm shadow-sm">Context</div>
                <div className="text-xl text-gray-400">→</div>
                <div className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-3 py-2 text-sm text-white shadow-sm">Response</div>
              </div>
            </div>
            <div className="rounded-3xl border border-gray-200 bg-[#fcfcfc] p-8">
              <p className="text-sm font-semibold text-[#11181C]">Vector Databases</p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-white p-3 text-center shadow-sm"><p className="font-bold text-cyan-600">Pinecone</p><p className="text-xs text-gray-500">Managed</p></div>
                <div className="rounded-xl bg-white p-3 text-center shadow-sm"><p className="font-bold text-cyan-600">Weaviate</p><p className="text-xs text-gray-500">Open Source</p></div>
                <div className="rounded-xl bg-white p-3 text-center shadow-sm"><p className="font-bold text-cyan-600">Qdrant</p><p className="text-xs text-gray-500">Rust-based</p></div>
                <div className="rounded-xl bg-white p-3 text-center shadow-sm"><p className="font-bold text-cyan-600">Chroma</p><p className="text-xs text-gray-500">Python Native</p></div>
              </div>
            </div>
          </div>
          <div className="mt-6 rounded-3xl bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 p-6">
            <p className="text-sm font-semibold text-gray-900">Human Cognitive Analogy</p>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <div className="rounded-xl bg-white p-3 border-l-4 border-blue-500"><p className="font-semibold text-blue-700">System 1</p><p className="text-xs text-gray-600">Fast, automatic retrieval</p></div>
              <div className="rounded-xl bg-white p-3 border-l-4 border-purple-500"><p className="font-semibold text-purple-700">System 2</p><p className="text-xs text-gray-600">Slow, analytical reasoning</p></div>
            </div>
          </div>
          <footer className="mt-6 rounded-3xl border border-cyan-200 bg-gradient-to-r from-cyan-50 to-blue-50 p-5">
            <div className="flex flex-col md:flex-row items-center justify-between gap-3">
              <div><p className="text-sm font-semibold text-cyan-700">RAG = Best of Both Worlds</p><p className="text-xs text-gray-600">Training data + External knowledge</p></div>
              <div className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-cyan-700">Reduces Hallucinations</div>
            </div>
          </footer>
        </div>

        {/* Panel 7: Optimization & Deployment */}
        <div id="p7" className="mt-10 rounded-[32px] border border-white/70 bg-white/80 backdrop-blur-xl p-10 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
          <div className="relative mb-10 flex items-center gap-5">
            <div className="absolute right-0 top-[-40px] text-[140px] font-black leading-none text-gray-100">07</div>
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-purple-50 text-2xl font-semibold text-purple-600">07</div>
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-600">Production Ready</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#11181C]">LLM Optimization &amp; Deployment</h2>
              <p className="mt-3 max-w-3xl text-base leading-7 text-gray-600">Techniques to reduce latency, memory, and cost while maintaining quality.</p>
            </div>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-gray-200 bg-[#fcfcfc] p-8">
              <p className="text-sm font-semibold text-[#11181C]">Optimization Techniques</p>
              <div className="mt-6 space-y-3">
                <div className="rounded-xl bg-blue-50 p-3"><p className="font-semibold">Quantization</p><p className="text-xs">FP32 → INT8/INT4 (4x smaller)</p></div>
                <div className="rounded-xl bg-purple-50 p-3"><p className="font-semibold">Pruning</p><p className="text-xs">Remove unimportant weights (50% sparsity)</p></div>
                <div className="rounded-xl bg-cyan-50 p-3"><p className="font-semibold">Distillation</p><p className="text-xs">Teacher → Student (10x smaller)</p></div>
                <div className="rounded-xl bg-orange-50 p-3"><p className="font-semibold">Flash Attention</p><p className="text-xs">IO-aware algorithm (2-4x faster)</p></div>
              </div>
            </div>
            <div className="rounded-3xl border border-gray-200 bg-[#fcfcfc] p-8">
              <p className="text-sm font-semibold text-[#11181C]">Deployment Stack</p>
              <div className="mt-6 space-y-2">
                <div className="flex items-center gap-2 rounded-xl bg-white p-2 shadow-sm"><span className="text-lg">1.</span><span className="text-sm font-semibold">Inference Servers:</span><span className="text-xs text-gray-500">vLLM, TGI, llama.cpp</span></div>
                <div className="flex items-center gap-2 rounded-xl bg-white p-2 shadow-sm"><span className="text-lg">2.</span><span className="text-sm font-semibold">Model Serving:</span><span className="text-xs text-gray-500">BentoML, Ray Serve</span></div>
                <div className="flex items-center gap-2 rounded-xl bg-white p-2 shadow-sm"><span className="text-lg">3.</span><span className="text-sm font-semibold">API Gateway:</span><span className="text-xs text-gray-500">Kong, NGINX, Envoy</span></div>
                <div className="flex items-center gap-2 rounded-xl bg-white p-2 shadow-sm"><span className="text-lg">4.</span><span className="text-sm font-semibold">Monitoring:</span><span className="text-xs text-gray-500">Prometheus, Grafana</span></div>
                <div className="flex items-center gap-2 rounded-xl bg-white p-2 shadow-sm"><span className="text-lg">5.</span><span className="text-sm font-semibold">Scaling:</span><span className="text-xs text-gray-500">Kubernetes, GPU Autoscaling</span></div>
              </div>
            </div>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <div className="rounded-xl bg-white p-4 text-center shadow-sm"><div className="text-2xl">⏱️</div><p className="font-bold">TTFT</p><p className="text-xs text-gray-500">&lt; 100ms target</p></div>
            <div className="rounded-xl bg-white p-4 text-center shadow-sm"><div className="text-2xl">⚡</div><p className="font-bold">Tokens/sec</p><p className="text-xs text-gray-500">50-100 t/s</p></div>
            <div className="rounded-xl bg-white p-4 text-center shadow-sm"><div className="text-2xl">💾</div><p className="font-bold">Memory</p><p className="text-xs text-gray-500">INT4 = 4GB/7B</p></div>
          </div>
          <footer className="mt-6 rounded-3xl border border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 p-5">
            <div className="flex flex-col md:flex-row items-center justify-between gap-3">
              <div><p className="text-sm font-semibold text-purple-700">Measure → Optimize → Repeat</p></div>
              <div className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-purple-700">Production Best Practices</div>
            </div>
          </footer>
        </div>

        {/* Panel 8: Security & Safety */}
        <div id="p8" className="mt-10 rounded-[32px] border border-white/70 bg-white/80 backdrop-blur-xl p-10 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
          <div className="relative mb-10 flex items-center gap-5">
            <div className="absolute right-0 top-[-40px] text-[140px] font-black leading-none text-gray-100">08</div>
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-red-50 text-2xl font-semibold text-red-600">08</div>
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-red-600">Trust &amp; Safety</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#11181C]">LLM Security &amp; Safety</h2>
              <p className="mt-3 max-w-3xl text-base leading-7 text-gray-600">Protecting LLM systems from attacks and ensuring responsible AI deployment.</p>
            </div>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-gray-200 bg-[#fcfcfc] p-8">
              <p className="text-sm font-semibold text-[#11181C]">Common Attacks</p>
              <div className="mt-6 space-y-3">
                <div className="rounded-xl border-l-4 border-red-500 bg-red-50/30 p-3"><p className="font-semibold text-red-700">Prompt Injection</p><p className="text-xs">"Ignore previous instructions..."</p></div>
                <div className="rounded-xl border-l-4 border-orange-500 bg-orange-50/30 p-3"><p className="font-semibold text-orange-700">Jailbreaking</p><p className="text-xs">Bypassing safety filters</p></div>
                <div className="rounded-xl border-l-4 border-purple-500 bg-purple-50/30 p-3"><p className="font-semibold text-purple-700">Data Poisoning</p><p className="text-xs">Malicious training data</p></div>
              </div>
            </div>
            <div className="rounded-3xl border border-gray-200 bg-[#fcfcfc] p-8">
              <p className="text-sm font-semibold text-[#11181C]">Defense Strategies</p>
              <div className="mt-6 space-y-3">
                <div className="rounded-xl bg-green-50 p-3"><p className="font-semibold text-green-700">Input Filtering</p><p className="text-xs">Sanitize and validate inputs</p></div>
                <div className="rounded-xl bg-green-50 p-3"><p className="font-semibold text-green-700">Output Guardrails</p><p className="text-xs">Filter model responses</p></div>
                <div className="rounded-xl bg-green-50 p-3"><p className="font-semibold text-green-700">Rate Limiting</p><p className="text-xs">API keys, quotas, JWT</p></div>
              </div>
            </div>
          </div>
          <div className="mt-6 rounded-3xl bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
            <p className="text-sm font-semibold text-center text-indigo-700">Responsible AI Principles</p>
            <div className="mt-3 grid grid-cols-5 gap-2 text-center text-xs">
              <div><div className="text-xl">🎯</div><p>Fairness</p></div>
              <div><div className="text-xl">📊</div><p>Transparency</p></div>
              <div><div className="text-xl">🔒</div><p>Privacy</p></div>
              <div><div className="text-xl">✅</div><p>Accountability</p></div>
              <div><div className="text-xl">🔧</div><p>Robustness</p></div>
            </div>
          </div>
          <footer className="mt-6 rounded-3xl border border-red-200 bg-gradient-to-r from-red-50 to-orange-50 p-5">
            <div className="flex flex-col md:flex-row items-center justify-between gap-3">
              <div><p className="text-sm font-semibold text-red-700">Security is NOT Optional</p></div>
              <div className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-red-700">Trust = Adoption</div>
            </div>
          </footer>
        </div>

        {/* Panel 9: Evaluation & Monitoring */}
        <div id="p9" className="mt-10 rounded-[32px] border border-white/70 bg-white/80 backdrop-blur-xl p-10 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
          <div className="relative mb-10 flex items-center gap-5">
            <div className="absolute right-0 top-[-40px] text-[140px] font-black leading-none text-gray-100">09</div>
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-indigo-50 text-2xl font-semibold text-indigo-600">09</div>
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-indigo-600">Quality Assurance</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#11181C]">LLM Evaluation &amp; Monitoring</h2>
              <p className="mt-3 max-w-3xl text-base leading-7 text-gray-600">Measuring, tracking, and improving LLM performance in production.</p>
            </div>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-gray-200 bg-[#fcfcfc] p-8">
              <p className="text-sm font-semibold text-[#11181C]">Evaluation Metrics</p>
              <div className="mt-6 space-y-2">
                <div className="flex justify-between items-center rounded-xl bg-white p-3 shadow-sm"><span className="font-semibold">ROUGE / BLEU</span><span className="text-xs text-gray-500">N-gram overlap</span></div>
                <div className="flex justify-between items-center rounded-xl bg-white p-3 shadow-sm"><span className="font-semibold">BERTScore</span><span className="text-xs text-gray-500">Semantic similarity</span></div>
                <div className="flex justify-between items-center rounded-xl bg-white p-3 shadow-sm"><span className="font-semibold">LLM-as-Judge</span><span className="text-xs text-gray-500">GPT-4 evaluating outputs</span></div>
              </div>
            </div>
            <div className="rounded-3xl border border-gray-200 bg-[#fcfcfc] p-8">
              <p className="text-sm font-semibold text-[#11181C]">Monitoring Stack</p>
              <div className="mt-6 space-y-2">
                <div className="flex items-center gap-2 rounded-xl bg-white p-2 shadow-sm"><span className="text-lg">📊</span><span>Prometheus + Grafana</span></div>
                <div className="flex items-center gap-2 rounded-xl bg-white p-2 shadow-sm"><span className="text-lg">🔍</span><span>LangSmith / LangFuse</span></div>
                <div className="flex items-center gap-2 rounded-xl bg-white p-2 shadow-sm"><span className="text-lg">📝</span><span>Weights &amp; Biases</span></div>
              </div>
            </div>
          </div>
          <div className="mt-6 rounded-3xl bg-gradient-to-r from-indigo-50 to-blue-50 p-6">
            <p className="text-sm font-semibold text-center text-indigo-700">Industry Benchmarks (2026)</p>
            <div className="mt-3 grid grid-cols-4 gap-3 text-center">
              <div className="rounded-xl bg-white p-2"><p className="font-bold text-indigo-600">MMLU</p><p className="text-lg font-black">89.5%</p></div>
              <div className="rounded-xl bg-white p-2"><p className="font-bold text-indigo-600">GSM8K</p><p className="text-lg font-black">96.2%</p></div>
              <div className="rounded-xl bg-white p-2"><p className="font-bold text-indigo-600">HumanEval</p><p className="text-lg font-black">88.7%</p></div>
              <div className="rounded-xl bg-white p-2"><p className="font-bold text-indigo-600">HELM</p><p className="text-lg font-black">86.3%</p></div>
            </div>
          </div>
          <footer className="mt-6 rounded-3xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-blue-50 p-5">
            <div className="text-center"><p className="text-sm font-semibold text-indigo-700">You can't improve what you don't measure</p></div>
          </footer>
        </div>

        {/* Panel 10: China vs US AI Race */}
        <div id="p10" className="mt-10 rounded-[32px] border-2 border-gradient-to-r from-red-500 to-blue-500 bg-gradient-to-br from-red-50 via-white to-blue-50 p-10 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
          <div className="relative mb-10 flex items-center gap-5">
            <div className="absolute right-0 top-[-40px] text-[140px] font-black leading-none text-gray-200">10</div>
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-r from-red-500 to-blue-500 text-2xl font-semibold text-white shadow-lg">10</div>
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">Special Edition · May 2026</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#11181C]">The Global AI Race: China vs United States</h2>
              <p className="mt-3 max-w-3xl text-base leading-7 text-gray-600">Latest developments, strategic advantages, and what it means for the future of AI.</p>
            </div>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-50 to-white p-6">
              <div className="flex items-center gap-2 mb-4"><div className="text-4xl">🇺🇸</div><h3 className="text-xl font-bold text-blue-700">United States</h3></div>
              <div className="space-y-2 text-sm">
                <p><span className="font-semibold">Models:</span> GPT-5, Gemini Ultra 2, Claude 4, Llama 4</p>
                <p><span className="font-semibold">Hardware:</span> NVIDIA B200, TSMC 2nm</p>
                <p><span className="font-semibold">Investment:</span> $150B+ (2025-2026)</p>
                <p><span className="font-semibold">Advantage:</span> Innovation &amp; Scale</p>
              </div>
            </div>
            <div className="rounded-3xl border border-red-200 bg-gradient-to-br from-red-50 to-white p-6">
              <div className="flex items-center gap-2 mb-4"><div className="text-4xl">🇨🇳</div><h3 className="text-xl font-bold text-red-700">China</h3></div>
              <div className="space-y-2 text-sm">
                <p><span className="font-semibold">Models:</span> DeepSeek-V4, Qwen 2.5, ERNIE 5.0</p>
                <p><span className="font-semibold">Hardware:</span> Huawei Ascend 920C, SMIC 5nm</p>
                <p><span className="font-semibold">Investment:</span> $100B+ (2025-2026)</p>
                <p><span className="font-semibold">Advantage:</span> Speed &amp; Deployment</p>
              </div>
            </div>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-4">
            <div className="rounded-xl bg-white p-3 text-center"><p className="text-xs text-blue-600">Models</p><p className="font-bold text-blue-700">US Leads</p></div>
            <div className="rounded-xl bg-white p-3 text-center"><p className="text-xs text-red-600">Deployment</p><p className="font-bold text-red-700">China Leads</p></div>
            <div className="rounded-xl bg-white p-3 text-center"><p className="text-xs text-purple-600">Hardware</p><p className="font-bold text-purple-700">US Leads</p></div>
            <div className="rounded-xl bg-white p-3 text-center"><p className="text-xs text-green-600">Efficiency</p><p className="font-bold text-green-700">China Leads</p></div>
          </div>
          <div className="mt-6 rounded-3xl bg-gradient-to-r from-yellow-50 to-orange-50 border border-orange-200 p-5">
            <div className="flex items-center gap-2 mb-2"><span className="text-xl">📰</span><p className="font-bold text-orange-700">May 2026 Breaking</p><span className="rounded-full bg-red-500 px-2 py-0.5 text-xs text-white animate-pulse">NEW</span></div>
            <div className="grid gap-2 md:grid-cols-2 text-sm">
              <div className="rounded-lg bg-white p-2">🔴 DeepSeek-V4 releases with 1M context window</div>
              <div className="rounded-lg bg-white p-2">🔵 OpenAI announces GPT-5 reasoning breakthrough</div>
              <div className="rounded-lg bg-white p-2">🔴 Huawei unveils Ascend 920C with 1.5 PFLOPS</div>
              <div className="rounded-lg bg-white p-2">🔵 Microsoft opens AI Sovereignty cloud in EU</div>
            </div>
          </div>
          <footer className="mt-6 rounded-3xl border-2 border-gradient-to-r from-red-500 to-blue-500 bg-white p-5">
            <div className="flex flex-col md:flex-row items-center justify-between gap-3">
              <div><p className="text-sm font-semibold text-gray-900">"The race is now a sprint, not a marathon"</p><p className="text-xs text-gray-500">Both nations within 6-12 months of each other</p></div>
              <div className="rounded-xl bg-gradient-to-r from-red-500 to-blue-500 px-4 py-2 text-sm font-semibold text-white">Global AI Cold War 🔥</div>
            </div>
          </footer>
        </div>

      </div>
    </main>
  )
}