"use client"

import { motion } from "framer-motion"
import { Target, ArrowRight, Brain, Zap, Eye, Volume2, ArrowLeftRight, CircleDot, TrendingUp, TrendingDown } from "lucide-react"

export default function WeightBiasActivationPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Target className="w-4 h-4" />
            NEURAL NETWORK BASICS
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
            Weight, Bias & Activation
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Your score decides: HIT or MISS!
          </p>
          <p className="text-lg text-gray-400 mt-2"></p>
        </motion.div>

        {/* The Marble Analogy - Hero Image Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 mb-16 text-center shadow-2xl"
        >
          <div className="text-8xl mb-4">🎯 🧠 🎯</div>
          <p className="text-white text-xl font-semibold mb-2">Forward Propagation = Marble rolls through your brain</p>
          <p className="text-slate-300"></p>
          <div className="flex justify-center gap-8 mt-6 text-sm">
            <div className="text-center"><div className="w-3 h-3 rounded-full bg-blue-400 mx-auto mb-1"></div><span className="text-slate-300">Eyes (Input)</span></div>
            <ArrowRight className="text-slate-500" />
            <div className="text-center"><div className="w-3 h-3 rounded-full bg-purple-400 mx-auto mb-1 animate-pulse"></div><span className="text-slate-300">Thinking (Hidden)</span></div>
            <ArrowRight className="text-slate-500" />
            <div className="text-center"><div className="w-3 h-3 rounded-full bg-green-400 mx-auto mb-1"></div><span className="text-slate-300">Mouth (Output)</span></div>
          </div>
        </motion.div>

        {/* 1. Power = Weight */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl border border-gray-200 p-8 mb-8 shadow-lg hover:shadow-xl transition-all"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-md">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">1. Power (Weight)</h2>
              <p className="text-gray-500"></p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-2xl p-6 text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">0.7</div>
              <p className="text-blue-700 font-medium">Power Value</p>
              <p className="text-sm text-blue-500">(Flick strength)</p>
            </div>
            <div className="bg-cyan-50 rounded-2xl p-6 text-center">
              <div className="text-5xl font-bold text-cyan-600 mb-2">0.6</div>
              <p className="text-cyan-700 font-medium">Power Matters</p>
              <p className="text-sm text-cyan-500"></p>
            </div>
          </div>
          <div className="mt-6 p-4 bg-gray-50 rounded-xl text-center">
            <p className="text-gray-600">📌 <strong class="text-blue-600">Weight</strong> = How much influence this input has on the final decision</p>
          </div>
        </motion.div>

        {/* 2. Angle = Activation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl border border-gray-200 p-8 mb-8 shadow-lg hover:shadow-xl transition-all"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-md">
              <ArrowLeftRight className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">2. Angle (Activation)</h2>
              <p className="text-gray-500"></p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-purple-50 rounded-2xl p-6 text-center">
              <div className="text-5xl font-bold text-purple-600 mb-2">0.3</div>
              <p className="text-purple-700 font-medium">Angle Value</p>
              <p className="text-sm text-purple-500">(Aim direction)</p>
            </div>
            <div className="bg-pink-50 rounded-2xl p-6 text-center">
              <div className="text-5xl font-bold text-pink-600 mb-2">0.3</div>
              <p className="text-pink-700 font-medium">Angle Matters</p>
              <p className="text-sm text-pink-500"></p>
            </div>
          </div>
          <div className="mt-6 p-4 bg-gray-50 rounded-xl text-center">
            <p className="text-gray-600">📌 <strong class="text-purple-600">Activation Function</strong> = Decides how much signal passes through the neuron</p>
          </div>
        </motion.div>

        {/* 3. Luck = Bias */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl border border-gray-200 p-8 mb-8 shadow-lg hover:shadow-xl transition-all"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-md">
              <CircleDot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">3. Luck (Bias)</h2>
              <p className="text-gray-500"></p>
            </div>
          </div>
          <div className="bg-green-50 rounded-2xl p-6 text-center max-w-xs mx-auto">
            <div className="text-5xl font-bold text-green-600 mb-2">0.2</div>
            <p className="text-green-700 font-medium">Bias Value</p>
            <p className="text-sm text-green-500"></p>
          </div>
          <div className="mt-6 p-4 bg-gray-50 rounded-xl text-center">
            <p className="text-gray-600">📌 <strong class="text-green-600">Bias</strong> = Base score that shifts the decision threshold</p>
          </div>
        </motion.div>

        {/* Score Calculation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-3xl border border-indigo-200 p-8 mb-8 shadow-lg"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">🎯 Your Score Calculation</h2>
          <div className="bg-white rounded-2xl p-6 mb-4">
            <p className="font-mono text-lg text-center mb-4">
              Score = (Power × Power matters) + (Angle × Angle matters) + Luck
            </p>
            <p className="font-mono text-center text-gray-500 mb-6">
              स्कोर = (Weight × ) + (Angle × ) + Luck
            </p>
            <div className="bg-gray-100 rounded-xl p-4 font-mono text-center space-y-2">
              <p>= (0.7 × 0.6) + (0.3 × 0.3) + 0.2</p>
              <p>= 0.42 + 0.09 + 0.20</p>
              <p className="text-2xl font-bold text-indigo-600">= 0.71</p>
            </div>
          </div>
        </motion.div>

        {/* Decision */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl border-2 border-yellow-300 p-8 mb-8 shadow-lg"
        >
          <div className="text-center mb-8">
            <p className="text-2xl font-bold text-gray-800 mb-2">Is score &gt; 0.5?</p>
            <p className="text-lg text-gray-600"></p>
          </div>
          <div className="flex flex-wrap gap-8 justify-center">
            <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl p-6 text-center text-white shadow-lg min-w-[150px]">
              <TrendingUp className="w-8 h-8 mx-auto mb-2" />
              <p className="text-2xl font-bold">Yes! </p>
              <p className="text-xl">✓ HIT </p>
            </div>
            <div className="bg-gradient-to-br from-red-500 to-rose-500 rounded-2xl p-6 text-center text-white shadow-lg min-w-[150px]">
              <TrendingDown className="w-8 h-8 mx-auto mb-2" />
              <p className="text-2xl font-bold">No! </p>
              <p className="text-xl">✗ MISS </p>
            </div>
          </div>
        </motion.div>

        {/* Summary Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-3xl p-8 text-white shadow-2xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <Brain className="w-8 h-8 text-purple-400" />
            <h3 className="text-2xl font-bold">Remember: Remember</h3>
          </div>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="font-mono text-blue-300">Weight (Weight)</p>
              <p className="text-gray-300 text-sm">How hard you flick / कति बलले फ्याँक्ने</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <p className="font-mono text-purple-300">Activation (Angle)</p>
              <p className="text-gray-300 text-sm">Direction of flick / कुन दिशामा फ्याँक्ने</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <p className="font-mono text-green-300">Bias (Luck)</p>
              <p className="text-gray-300 text-sm">Base luck / पूर्वाग्रह मान</p>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-700 text-center">
            <p className="text-lg font-semibold text-cyan-400">Inside = HIT | बाहिर = </p>
          </div>
        </motion.div>

      </div>
    </main>
  )
}