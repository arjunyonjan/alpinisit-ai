import React from "react";

export default function Panel06Retrieval() {
  return (
    <section className="w-full min-h-screen bg-white flex items-center justify-center px-10 py-24">
      
      <div className="max-w-6xl w-full space-y-16">

        {/* HEADER */}
        <div className="space-y-2">
          <h2 className="text-sm tracking-[0.3em] text-gray-400 uppercase">
            06 / Retrieval Systems, Latency Tradeoffs & Cognitive Analogy
          </h2>
          <h1 className="text-4xl font-semibold text-gray-900">
            Retrieval-Augmented Intelligence Architecture
          </h1>
        </div>

        {/* RAG PIPELINE */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">

          <div className="md:col-span-5 bg-gray-50 border border-gray-100 rounded-2xl p-6 shadow-sm">
            <p className="text-sm text-gray-700 font-mono">
              User Query → Retriever → Vector DB → Context Injection → LLM Response
            </p>
          </div>

        </div>

        {/* MEMORY GRAPH VISUAL BLOCK */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Semantic Memory Graph
            </h3>
            <div className="h-64 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
              <p className="text-sm text-gray-500">
                Neural retrieval nodes connecting contextual embeddings
              </p>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Vector Database Links
            </h3>
            <div className="h-64 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
              <p className="text-sm text-gray-500">
                High-dimensional similarity search space
              </p>
            </div>
          </div>

        </div>

        {/* LATENCY VS QUALITY */}
        <div className="bg-white border border-gray-100 rounded-2xl p-10 shadow-sm space-y-6">

          <h3 className="text-xl font-medium text-gray-900">
            Quality vs Latency Tradeoff
          </h3>

          <div className="flex items-center justify-between text-sm text-gray-600 font-mono">
            <span>Fast Response</span>
            <span className="text-gray-400">↔</span>
            <span>Deep Reasoning</span>
          </div>

          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="w-2/3 h-full bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full"></div>
          </div>

        </div>

        {/* OPTIMIZATION STACK */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          {[
            "KV Cache",
            "Quantization",
            "Speculative Decoding",
            "MoE Routing"
          ].map((item) => (
            <div
              key={item}
              className="bg-white border border-gray-100 rounded-xl p-4 text-center shadow-sm"
            >
              <p className="text-sm text-gray-700 font-medium">{item}</p>
            </div>
          ))}

        </div>

        {/* COGNITIVE ANALOGY */}
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-10 space-y-4">

          <h3 className="text-xl font-medium text-gray-900">
            Human Cognitive Analogy
          </h3>

          <div className="space-y-2 text-sm text-gray-700 font-mono">
            <p>System 1: Fast Reflex Thinking</p>
            <p>System 2: Slow Reflective Reasoning</p>
          </div>

        </div>

      </div>
    </section>
  );
}
