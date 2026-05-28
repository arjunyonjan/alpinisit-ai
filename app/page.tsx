"use client"

import { motion } from "framer-motion"
import { 
  Sparkles, 
  Rocket, 
  Users, 
  Wifi, 
  Coffee, 
  Wind, 
  Smartphone, 
  Users2, 
  Shield, 
  Leaf,
  ArrowRight,
  Star,
  Zap,
  Target,
  Clock,
  Brain,
  Calendar,
  Camera,
  GraduationCap,
  BookOpen
, Maximize} from "lucide-react"

export default function HomePage() {
  const features = [
    { icon: Wifi, title: "High Speed Internet", nepali: "छिटो इन्टरनेट", color: "from-blue-500 to-cyan-500" },
    { icon: Coffee, title: "Comfortable Workspace", nepali: "आरामदायी कार्यस्थल", color: "from-orange-500 to-red-500" },
    { icon: Wind, title: "AC Environment", nepali: "एसी वातावरण", color: "from-teal-500 to-green-500" },
    { icon: Smartphone, title: "Smart Class Room", nepali: "स्माटर्ड कक्षा कोठा", color: "from-purple-500 to-pink-500" },
    { icon: Users2, title: "Collaboration Space", nepali: "सहकार्य स्थान", color: "from-indigo-500 to-blue-500" },
    { icon: Shield, title: "Secure Facility", nepali: "सुरक्षित सुविधा", color: "from-red-500 to-rose-500" },
    { icon: Leaf, title: "Green & Clean Space", nepali: "हरित र सफा स्थान", color: "from-emerald-500 to-green-500" },
    { icon: Users, title: "Refreshment Zone", nepali: "रिफ्रेसमेंट जोन", color: "from-yellow-500 to-orange-500" },
  ]

  const offerings = [
    { icon: Brain, title: "AI & ML Training", nepali: "एआई र एमएल तालिम", description: "Comprehensive AI and Machine Learning programs" },
    { icon: Rocket, title: "Startup Support", nepali: "स्टाटर्डअप सहयोग", description: "Mentorship and resources for startups" },
    { icon: Users, title: "Expert Mentorship", nepali: "विशेषज्ञ मार्गदर्शन", description: "Learn from industry experts" },
  ]

  const stats = [
    { value: "500+", label: "Students Trained", icon: Users, color: "from-blue-500 to-cyan-500" },
    { value: "50+", label: "Startups Incubated", icon: Rocket, color: "from-purple-500 to-pink-500" },
    { value: "100%", label: "Placement Rate", icon: Target, color: "from-green-500 to-emerald-500" },
    { value: "24/7", label: "Support Available", icon: Clock, color: "from-orange-500 to-red-500" },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      
      {/* Logo - Centered at top */}
      <div className="absolute top-0 left-0 right-0 z-20 py-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-center">
            <div className="bg-white/90 backdrop-blur-md rounded-2xl px-6 py-3 shadow-lg border border-gray-100">
              <img 
                src="/alpinistlogo.png" 
                alt="Alpinist AI Logo" 
                className="h-12 md:h-16 w-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 pt-32 pb-20 lg:pt-40 lg:pb-32 min-h-[90vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://res.cloudinary.com/dpnxmo8ak/image/upload/v1779824074/alpinist/file_00000000af10720bb2b3b6418d424fbd_h6andc.png"
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/60"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-8 shadow-lg">
              <Sparkles className="w-4 h-4" />
              AI TRAINING LAB
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">AI</span>
              <br />
              <span className="text-white">LEARN • BUILD • INNOVATE • GROW</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-4">
              THE FUTURE IS BELIEVED INTELLIGENCE
            </p>
            
            <p className="text-lg text-blue-300 mb-8">
              एआई ट्रेनिङ ल्याब
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all flex items-center gap-2">
                Start Learning <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-3 bg-white/10 backdrop-blur-md text-white rounded-xl font-semibold border-2 border-white/30 hover:bg-white/20 transition-all">
                Explore Programs
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 text-center"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Offerings Section */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What We Offer</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Comprehensive programs designed to accelerate your success</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {offerings.map((item, idx) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="group bg-gradient-to-br from-gray-50 to-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                >
                  <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icon className="w-20 h-20 text-white/80" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-lg text-purple-600 mb-2">{item.nepali}</p>
                    <p className="text-gray-500">{item.description}</p>
                    <button className="mt-4 text-blue-600 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Modern Facility Section */}
      <section className="px-6 py-20 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-teal-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Star className="w-4 h-4" />
              MODERN FACILITY | आधुनिक सुविधा
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">World-Class Infrastructure</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">State-of-the-art facilities for optimal learning</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all group cursor-pointer"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-500">{feature.nepali}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      
            <section className="px-6 py-20 bg-gradient-to-r from-blue-900 to-purple-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-6xl mb-6">✨</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">New Skills. New Ideas. New Future.</h2>
            <p className="text-2xl text-purple-200 mb-4">नयाँ सीप. नयाँ विचार. नयाँ भविष्य.</p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto my-8 rounded-full"></div>
            <p className="text-xl mb-8">Innovate Today, Lead Tomorrow</p>
            <p className="text-lg text-blue-200 mb-2">आज नवप्रवर्तन, भोलि नेतृत्व</p>
            
            <div className="flex flex-wrap gap-4 justify-center mt-12">
              <button className="px-8 py-3 bg-white text-blue-900 rounded-xl font-semibold hover:shadow-xl transition-all flex items-center gap-2">
                Join Now <Zap className="w-5 h-5" />
              </button>
              <button className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-xl font-semibold hover:bg-white/10 transition-all">
                Learn More
              </button>
            </div>
            
            <div className="mt-12 pt-8 border-t border-white/20">
              <p className="text-lg font-semibold mb-2">Join. Learn. Create Impact.</p>
              <p className="text-sm text-blue-200">Start your journey today with Alpinist AI</p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}