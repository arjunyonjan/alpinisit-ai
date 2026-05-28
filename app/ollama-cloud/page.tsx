"use client"

import { motion } from "framer-motion"
import { Cloud, Terminal, Zap, Shield, Globe, Cpu, ArrowRight, Check, Sparkles, Monitor, Download, Key, Brain, Server, Workflow } from "lucide-react"

export default function OllamaCloudPage() {
  const features = [
    {
      icon: Cloud,
      title: "Cloud-Hosted Models",
      description: "Run powerful models like Gemma 4 31B directly from ollama.com — no local GPU needed.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Shield,
      title: "OAuth Authentication",
      description: "Sign in via browser with a one-time connect link. Secure, simple, and fast.",
      color: "from-violet-500 to-purple-500",
    },
    {
      icon: Zap,
      title: "Instant Inference",
      description: "Cloud models stream tokens in real-time with production-grade latency.",
      color: "from-orange-500 to-amber-500",
    },
    {
      icon: Globe,
      title: "Access Anywhere",
      description: "Use cloud models from any machine — your laptop, server, or CI pipeline.",
      color: "from-emerald-500 to-green-500",
    },
  ]

  const steps = [
    {
      step: "01",
      title: "Pull the Cloud Model",
      command: "ollama pull gemma4:31b-cloud",
      description: "Downloads the model manifest and registers the cloud endpoint.",
      icon: Download,
      color: "bg-blue-50 text-blue-700 border-blue-200",
    },
    {
      step: "02",
      title: "Run & Authenticate",
      command: "ollama run gemma4:31b-cloud",
      description: "A browser link opens for OAuth sign-in. Complete once to authenticate.",
      icon: Key,
      color: "bg-violet-50 text-violet-700 border-violet-200",
    },
    {
      step: "03",
      title: "Start Chatting",
      command: ">>> hi there",
      description: "Connected to ollama.com. Think tags show reasoning (disable with --think=false).",
      icon: Sparkles,
      color: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
  ]

  const benefits = [
    "No local GPU or hardware required",
    "Access models larger than your RAM",
    "Automatic scaling and availability",
    "Pay-per-use transparent pricing",
    "Works on any operating system",
    "Same CLI — zero learning curve",
    "Secure OAuth authentication",
    "Production-ready inference speed",
  ]

  const tips = [
    {
      title: "Disable Thinking Tags",
      command: "ollama run gemma4:31b-cloud --think=false",
      description: "Skip the reasoning output for faster, cleaner responses.",
    },
    {
      title: "Quick Exit",
      command: "/bye  or  Ctrl + D",
      description: "Leave the interactive REPL at any time.",
    },
    {
      title: "Re-authenticate",
      command: "ollama logout && ollama run <model>",
      description: "Clear your session and sign in with a different account.",
    },
  ]

  return (
    <main className="min-h-screen bg-[#f8fafc]">

      {/* Hero */}
      <section className="relative overflow-hidden px-6 pt-28 pb-16 lg:pt-36 lg:pb-24">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white to-violet-50/60" />
        <div className="absolute top-20 left-1/4 h-64 w-64 rounded-full bg-blue-200/30 blur-3xl" />
        <div className="absolute bottom-10 right-1/4 h-64 w-64 rounded-full bg-violet-200/30 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-violet-600 text-white px-5 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg">
              <Cloud className="w-4 h-4" />
              OLLAMA CLOUD
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Run AI Models
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
                From the Cloud
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto">
              No GPU. No downloads. Just <code className="px-2 py-0.5 bg-gray-100 rounded-md text-sm font-mono text-gray-700">ollama pull</code> and go.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Start Steps */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Quick Start — 3 Steps</h2>
            <p className="text-gray-500">From zero to running Gemma 4 31B in under 2 minutes</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step, idx) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="relative group"
                >
                  <div className="rounded-3xl border border-gray-200 bg-white/80 backdrop-blur-sm p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${step.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-3xl font-black text-gray-100">{step.step}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                    <div className="rounded-xl bg-gray-950 p-4 mb-4 font-mono text-sm text-green-400 overflow-x-auto">
                      <span className="text-gray-500">$</span> {step.command}
                    </div>
                    <p className="text-sm text-gray-500">{step.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-16 bg-white">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Why Ollama Cloud?</h2>
            <p className="text-gray-500">The power of large models without the hardware burden</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  viewport={{ once: true }}
                  className="rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-6 shadow-sm hover:shadow-lg transition-all"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 shadow-md`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-500">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Full Session Walkthrough */}
      <section className="px-6 py-16 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Full Session Walkthrough</h2>
            <p className="text-gray-500">What you actually see in the terminal</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-gray-200 bg-white shadow-xl overflow-hidden"
          >
            {/* Terminal Header */}
            <div className="flex items-center gap-2 px-6 py-4 bg-gray-100 border-b border-gray-200">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <span className="text-xs text-gray-500 font-mono ml-2">Terminal</span>
            </div>

            {/* Terminal Body */}
            <div className="p-6 font-mono text-sm leading-7 bg-gray-950 text-gray-300 overflow-x-auto">
              <p><span className="text-cyan-400">PS</span> <span className="text-green-400">C:\work\ai-project</span>{`>`} <span className="text-white">ollama pull gemma4:31b-cloud</span></p>
              <p className="text-gray-500">pulling manifest</p>
              <p className="text-gray-500">pulling 5eb7ea60f4a3: 100% ▕██████████████████████▏  342 B</p>
              <p className="text-gray-500">verifying sha256 digest</p>
              <p className="text-gray-500">writing manifest</p>
              <p className="text-green-400">success</p>
              <br />
              <p><span className="text-cyan-400">PS</span>{`>`} <span className="text-white">ollama run gemma4:31b-cloud</span></p>
              <p className="text-yellow-400">You need to be signed in to Ollama to run Cloud models.</p>
              <p className="text-gray-500">Navigate to: https://ollama.com/connect?name=...</p>
              <br />
              <p className="text-blue-400">Connecting to 'gemma4:31b-cloud' on 'ollama.com' ⚡</p>
              <br />
              <p><span className="text-violet-400">{'>>>'}</span> <span className="text-white">hi there</span></p>
              <p className="text-gray-500">Thinking...</p>
              <p className="text-gray-600 italic">...done thinking.</p>
              <p className="text-green-400">Hello! How can I help you today?</p>
              <br />
              <p><span className="text-violet-400">{'>>>'}</span> <span className="text-white">/bye</span></p>
              <p className="text-gray-500">Session ended.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Checklist */}
      <section className="px-6 py-16 bg-white">
        <div className="mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">What You Get</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, idx) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-sm text-gray-700">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-gray-200 bg-gradient-to-br from-blue-50 to-violet-50 p-8"
            >
              <div className="text-center mb-6">
                <Server className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                <h3 className="text-xl font-semibold text-gray-900">Local vs Cloud</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white p-5 text-center shadow-sm">
                  <Monitor className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Local</p>
                  <p className="text-2xl font-bold text-gray-900">7B–14B</p>
                  <p className="text-xs text-gray-400 mt-1">Max model size</p>
                  <p className="text-xs text-gray-400 mt-1">Needs 8–16GB VRAM</p>
                </div>
                <div className="rounded-2xl bg-gradient-to-br from-blue-500 to-violet-500 p-5 text-center shadow-lg text-white">
                  <Cloud className="w-6 h-6 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-blue-100 uppercase tracking-wide mb-2">Cloud</p>
                  <p className="text-2xl font-bold">31B+</p>
                  <p className="text-xs text-blue-100 mt-1">No hardware limits</p>
                  <p className="text-xs text-blue-100 mt-1">Zero GPU needed</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pro Tips */}
      <section className="px-6 py-16 bg-gradient-to-br from-gray-50 to-violet-50/30">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Pro Tips</h2>
            <p className="text-gray-500">Get the most out of Ollama Cloud</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {tips.map((tip, idx) => (
              <motion.div
                key={tip.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-lg transition-all"
              >
                <h3 className="font-semibold text-gray-900 mb-3">{tip.title}</h3>
                <div className="rounded-xl bg-gray-950 p-3 mb-3 font-mono text-xs text-green-400">
                  <span className="text-gray-500">$</span> {tip.command}
                </div>
                <p className="text-sm text-gray-500">{tip.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Flow */}
      <section className="px-6 py-16 bg-white">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">How It Works</h2>
            <p className="text-gray-500">Your terminal → Ollama Cloud → Model inference → Response</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg"
          >
            <div className="flex flex-wrap items-center justify-center gap-4">
              {[
                { icon: Terminal, label: "Your CLI", color: "bg-gray-100 text-gray-700" },
                { icon: Key, label: "OAuth", color: "bg-violet-100 text-violet-700" },
                { icon: Cloud, label: "ollama.com", color: "bg-blue-100 text-blue-700" },
                { icon: Server, label: "Cloud GPU", color: "bg-cyan-100 text-cyan-700" },
                { icon: Brain, label: "Gemma 4 31B", color: "bg-emerald-100 text-emerald-700" },
                { icon: Workflow, label: "Response", color: "bg-amber-100 text-amber-700" },
              ].map((item, idx) => {
                const Icon = item.icon
                return (
                  <div key={item.label} className="flex items-center gap-2">
                    <div className={`flex items-center gap-3 rounded-2xl px-5 py-3 ${item.color} font-semibold text-sm shadow-sm`}>
                      <Icon className="w-5 h-5" />
                      {item.label}
                    </div>
                    {idx < 5 && <ArrowRight className="w-4 h-4 text-gray-300 hidden sm:block" />}
                  </div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 bg-gradient-to-r from-blue-600 to-violet-600 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-5xl mb-6">🚀</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Run?</h2>
            <p className="text-xl text-blue-100 mb-8">No setup. No hardware. Just pull and run.</p>
            <div className="rounded-2xl bg-white/10 backdrop-blur-md p-6 max-w-lg mx-auto mb-8 border border-white/20">
              <code className="text-lg font-mono text-white">ollama pull gemma4:31b-cloud</code>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="px-8 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:shadow-xl transition-all flex items-center gap-2">
                Get Started <Zap className="w-5 h-5" />
              </button>
              <a
                href="https://ollama.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-white/10 backdrop-blur-md text-white rounded-xl font-semibold border-2 border-white/30 hover:bg-white/20 transition-all flex items-center gap-2"
              >
                ollama.com <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
