"use client"

import { motion } from "framer-motion"
import { Target, Brain, Zap, ArrowLeftRight, CircleDot, TrendingUp, TrendingDown } from "lucide-react"

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
          <p className="text-xl text-gray-500">Your score decides: HIT or MISS!</p>
        </motion.div>

        {/* Neuron Math Section */}
        <div className="bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 rounded-3xl p-8 mb-12 shadow-xl border-2 border-indigo-300">
          <div className="text-center mb-6">
            <span className="bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-semibold">THE NEURON</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-3">y = w·x + b</h2>
            <p className="text-gray-600">One mathematical equation = one brain cell</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-md">
              <div className="space-y-4">
                <div><span className="inline-block w-10 h-10 bg-blue-500 rounded-xl text-center text-white font-bold leading-10 mr-3">W</span><span className="font-semibold">Weight</span><p className="text-sm text-gray-500 ml-12">How hard you flick</p></div>
                <div><span className="inline-block w-10 h-10 bg-purple-500 rounded-xl text-center text-white font-bold leading-10 mr-3">x</span><span className="font-semibold">Input</span><p className="text-sm text-gray-500 ml-12">Power matters</p></div>
                <div><span className="inline-block w-10 h-10 bg-green-500 rounded-xl text-center text-white font-bold leading-10 mr-3">b</span><span className="font-semibold">Bias</span><p className="text-sm text-gray-500 ml-12">Luck</p></div>
                <div className="border-t pt-3"><span className="inline-block w-10 h-10 bg-orange-500 rounded-xl text-center text-white font-bold leading-10 mr-3">y</span><span className="font-semibold">Output</span><p className="text-sm text-gray-500 ml-12">Score: 0.71</p></div>
              </div>
            </div>
            <div className="bg-white/50 rounded-2xl p-4 border-2 border-dashed border-indigo-400 text-center">
              <div className="bg-gray-100 rounded-xl p-8 flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl mb-2">🧠</div>
                <p className="text-gray-500 text-sm">📁 Add image: public/images/neuron-diagram.png</p>
              </div>
            </div>
          </div>
        </div>

        {/* Image 1: History - Scientists & Neuron Evolution */}
        <div className="mb-12">
          <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-200">
            <img 
              src="https://res.cloudinary.com/dpnxmo8ak/image/upload/v1780451259/AI/ChatGPT_Image_Jun_2_2026_10_58_56_AM_qz0kxi.png" 
              alt="Neuron History: McCulloch-Pitts to Perceptron to Wx+b"
              className="w-full h-auto"
            />
            <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-t-2 border-indigo-200 text-center">
              <p className="text-sm font-semibold text-indigo-700">📜 1943 McCulloch-Pitts → 1958 Perceptron → 1986 Backpropagation → y = f(w·x + b)</p>
            </div>
          </div>
        </div>

        {/* Image 2: Neuron Firing Mechanism */}
        <div className="mb-12">
          <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-200">
            <img 
              src="https://res.cloudinary.com/dpnxmo8ak/image/upload/v1780451262/AI/ChatGPT_Image_Jun_2_2026_11_16_30_AM_ghn1e1.png" 
              alt="Neuron firing: x × w + b → sum → activation → output"
              className="w-full h-auto"
            />
            <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-t-2 border-blue-200 text-center">
              <p className="text-sm font-semibold text-blue-700">🧠 x × w + b → Σ sum → f = ACTIVATION (FIRE!) → y = HIT/MISS</p>
            </div>
          </div>
        </div>

        {/* Image 3: Weight and Angle Correct Prediction */}
        <div className="mb-12">
          <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-200">
            <img 
              src="https://res.cloudinary.com/dpnxmo8ak/image/upload/v1780451295/AI/ChatGPT_Image_Jun_2_2026_09_51_49_AM_rmv92m.png" 
              alt="Flick = Weight, Angle = aim, inside circle = correct prediction"
              className="w-full h-auto"
            />
            <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 border-t-2 border-orange-200 text-center">
              <p className="text-sm font-semibold text-orange-700">🎯 Flick = Weight | Angle = aim | Inside circle = Correct Prediction (HIT)</p>
            </div>
          </div>
        </div>

        {/* Weight Section */}
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-white rounded-3xl border border-gray-200 p-8 mb-8 shadow-lg">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-md">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div><h2 className="text-2xl font-bold text-gray-900">1. Weight</h2><p className="text-gray-500">How hard you flick</p></div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-2xl p-6 text-center"><div className="text-5xl font-bold text-blue-600 mb-2">0.7</div><p className="text-blue-700 font-medium">Weight Value</p><p className="text-sm text-blue-500">(Flick strength)</p></div>
            <div className="bg-cyan-50 rounded-2xl p-6 text-center"><div className="text-5xl font-bold text-cyan-600 mb-2">0.6</div><p className="text-cyan-700 font-medium">Weight Importance</p></div>
          </div>
          <div className="mt-6 p-4 bg-gray-50 rounded-xl text-center"><p className="text-gray-600">📌 <strong className="text-blue-600">Weight</strong> = How much influence this input has on the final decision</p></div>
        </motion.div>

        {/* Activation Section */}
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-white rounded-3xl border border-gray-200 p-8 mb-8 shadow-lg">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-md">
              <ArrowLeftRight className="w-6 h-6 text-white" />
            </div>
            <div><h2 className="text-2xl font-bold text-gray-900">2. Activation</h2><p className="text-gray-500">Direction of flick</p></div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-purple-50 rounded-2xl p-6 text-center"><div className="text-5xl font-bold text-purple-600 mb-2">0.3</div><p className="text-purple-700 font-medium">Activation Value</p><p className="text-sm text-purple-500">(Aim direction)</p></div>
            <div className="bg-pink-50 rounded-2xl p-6 text-center"><div className="text-5xl font-bold text-pink-600 mb-2">0.3</div><p className="text-pink-700 font-medium">Activation Importance</p></div>
          </div>
          <div className="mt-6 p-4 bg-gray-50 rounded-xl text-center"><p className="text-gray-600">📌 <strong className="text-purple-600">Activation</strong> = Decides how much signal passes through the neuron</p></div>
        </motion.div>

        {/* Bias Section */}
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-white rounded-3xl border border-gray-200 p-8 mb-8 shadow-lg">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-md">
              <CircleDot className="w-6 h-6 text-white" />
            </div>
            <div><h2 className="text-2xl font-bold text-gray-900">3. Bias</h2><p className="text-gray-500">Base luck</p></div>
          </div>
          <div className="bg-green-50 rounded-2xl p-6 text-center max-w-xs mx-auto"><div className="text-5xl font-bold text-green-600 mb-2">0.2</div><p className="text-green-700 font-medium">Bias Value</p></div>
          <div className="mt-6 p-4 bg-gray-50 rounded-xl text-center"><p className="text-gray-600">📌 <strong className="text-green-600">Bias</strong> = Base score that shifts the decision threshold</p></div>
        </motion.div>

        {/* Score Calculation */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-3xl border border-indigo-200 p-8 mb-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">🎯 Your Score Calculation</h2>
          <div className="bg-white rounded-2xl p-6">
            <p className="font-mono text-lg text-center mb-4">Score = (Weight × Weight Importance) + (Activation × Activation Importance) + Bias</p>
            <div className="bg-gray-100 rounded-xl p-4 font-mono text-center space-y-2">
              <p>= (0.7 × 0.6) + (0.3 × 0.3) + 0.2</p>
              <p>= 0.42 + 0.09 + 0.20</p>
              <p className="text-2xl font-bold text-indigo-600">= 0.71</p>
            </div>
          </div>
        </motion.div>

        {/* Decision */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl border-2 border-yellow-300 p-8 mb-8 shadow-lg">
          <div className="text-center mb-8"><p className="text-2xl font-bold text-gray-800">Is score &gt; 0.5?</p></div>
          <div className="flex flex-wrap gap-8 justify-center">
            <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl p-6 text-center text-white shadow-lg min-w-[150px]">
              <TrendingUp className="w-8 h-8 mx-auto mb-2" />
              <p className="text-2xl font-bold">YES!</p><p className="text-xl">✓ HIT</p>
            </div>
            <div className="bg-gradient-to-br from-red-500 to-rose-500 rounded-2xl p-6 text-center text-white shadow-lg min-w-[150px]">
              <TrendingDown className="w-8 h-8 mx-auto mb-2" />
              <p className="text-2xl font-bold">NO!</p><p className="text-xl">✗ MISS</p>
            </div>
          </div>
        </motion.div>

        {/* Summary Box */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-3xl p-8 text-white shadow-2xl">
          <div className="flex items-center gap-3 mb-6"><Brain className="w-8 h-8 text-purple-400" /><h3 className="text-2xl font-bold">Remember</h3></div>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4"><p className="font-mono text-blue-300">Weight</p><p className="text-gray-300 text-sm">How hard you flick</p></div>
            <div className="border-l-4 border-purple-500 pl-4"><p className="font-mono text-purple-300">Activation</p><p className="text-gray-300 text-sm">Direction of flick</p></div>
            <div className="border-l-4 border-green-500 pl-4"><p className="font-mono text-green-300">Bias</p><p className="text-gray-300 text-sm">Base luck</p></div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-700 text-center"><p className="text-lg font-semibold text-cyan-400">Inside = HIT | Outside = MISS</p></div>
        </motion.div>

      </div>
    </main>
  )
}