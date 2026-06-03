export default function WeightBiasActivationPage() {
  return (
    <main className="min-h-screen bg-white overflow-y-auto">
      <div className="max-w-4xl mx-auto p-6 md:p-12">

        {/* Title from image */}
        <div className="min-h-screen flex flex-col justify-center mb-16">
          <h1 className="text-3xl text-black font-bold mb-2 text-center">
            Your score decides: HIT or MISS!
          </h1>
          <p className="text-xl text-black mb-8 text-center">
            तपाईको स्कोरले तय गर्छ: हिट कि मिस!
          </p>
          {/* CLOUDINARY_IMG: title-hit-or-miss */}
        </div>

        {/* 1. Power */}
        <div className="min-h-screen flex flex-col justify-center mb-16">
          <h2 className="text-2xl text-black font-medium mb-4">
            1. Power शक्ति (फिक्ने बल)
          </h2>
          <p className="text-black text-xl mb-2">0.7</p>
          <p className="text-black">× 0.6 (Power matters)</p>
          <p className="text-black">(शक्तिको महत्व)</p>
          {/* CLOUDINARY_IMG: power-boy-marble */}
        </div>

        {/* 2. Angle */}
        <div className="min-h-screen flex flex-col justify-center mb-16">
          <h2 className="text-2xl text-black font-medium mb-4">
            2. Angle कोण (निशानाको दिशा)
          </h2>
          <p className="text-black text-xl mb-2">0.3</p>
          <p className="text-black">× 0.3 (Angle matters)</p>
          <p className="text-black">(कोणको महत्व)</p>
          {/* CLOUDINARY_IMG: angle-diagram */}
        </div>

        {/* 3. Luck (Bias) */}
        <div className="min-h-screen flex flex-col justify-center mb-16">
          <h2 className="text-2xl text-black font-medium mb-4">
            3. Luck (Bias) भाग्य (बेस मान)
          </h2>
          <p className="text-black text-xl mb-2">0.2</p>
          {/* CLOUDINARY_IMG: luck-clover */}
        </div>

        {/* Your Score */}
        <div className="min-h-screen flex flex-col justify-center mb-16">
          <h2 className="text-2xl text-black font-medium mb-4">
            Your Score तपाईको स्कोर
          </h2>
          <p className="text-black text-3xl font-bold mb-4">= 0.71</p>
          <p className="text-black font-mono">
            (0.7×0.6) + (0.3×0.3) + 0.2
          </p>
          <p className="text-black font-mono">
            = 0.42 + 0.09 + 0.20
          </p>
          <p className="text-black font-mono">
            = 0.71
          </p>
          {/* CLOUDINARY_IMG: score-calculation */}
        </div>

        {/* Decision: Is score > 0.5? */}
        <div className="min-h-screen flex flex-col justify-center mb-16">
          <div className="border-2 border-yellow-500 p-4 mb-8">
            <p className="text-black text-xl">Is score &gt; 0.5 ?</p>
            <p className="text-black">के स्कोर 0.5 भन्दा ठूलो छ ?</p>
          </div>
          <div className="flex gap-8 justify-center">
            <div className="text-green-600">
              <p className="text-xl font-bold">Yes! हो!</p>
              <p className="text-xl">✓ HIT हिट</p>
            </div>
            <div className="text-red-600">
              <p className="text-xl font-bold">No! होइन!</p>
              <p className="text-xl">✗ MISS मिस</p>
            </div>
          </div>
          {/* CLOUDINARY_IMG: decision-tree */}
        </div>

        {/* HIT vs MISS visual */}
        <div className="min-h-screen flex flex-col justify-center mb-16">
          <div className="flex gap-16 justify-center items-center">
            <div className="text-center">
              <p className="text-green-600 text-xl font-bold">HIT</p>
              <p className="text-green-600">हिट</p>
            </div>
            <div className="text-center">
              <p className="text-red-600 text-xl font-bold">MISS</p>
              <p className="text-red-600">मिस</p>
            </div>
          </div>
          <p className="text-black text-center mt-8">Inside = Hit. Outside = Miss.</p>
          {/* CLOUDINARY_IMG: hit-miss-circles */}
        </div>

        {/* Remember box */}
        <div className="min-h-screen flex flex-col justify-center mb-16">
          <div className="border-2 border-yellow-500 p-6">
            <p className="text-black font-bold mb-2">Remember: याद राख्नुहोस्:</p>
            <p className="text-black mb-2">
              Score = (Power × Power matters) + (Angle × Angle matters) + Luck
            </p>
            <p className="text-black">
              स्कोर = (शक्ति × शक्तिको महत्व) + (कोण × कोणको महत्व) + भाग्य
            </p>
          </div>
          {/* CLOUDINARY_IMG: remember-box */}
        </div>

        {/* Forward Propagation */}
        <div className="min-h-screen flex flex-col justify-center mb-16">
          <p className="text-black text-center text-xl">
            Forward Propagation = Marble rolls through your brain
          </p>
          <div className="flex justify-between items-center mt-8 text-center">
            <div>
              <p className="text-black font-bold">Eyes</p>
              <p className="text-black">(Input)</p>
            </div>
            <div>
              <p className="text-black font-bold">Thinking</p>
              <p className="text-black">(Hidden)</p>
              <p className="text-3xl">?</p>
            </div>
            <div>
              <p className="text-black font-bold">Mouth</p>
              <p className="text-black">(Output)</p>
              <p className="text-xl">"HIT!"</p>
            </div>
          </div>
          {/* CLOUDINARY_IMG: forward-prop-brain */}
        </div>

        {/* Flick = Weight. Angle = Bias */}
        <div className="min-h-screen flex flex-col justify-center mb-16">
          <p className="text-black text-xl">Flick = Weight</p>
          <p className="text-black text-xl mt-4">Angle = Bias</p>
          <p className="text-black mt-8">In circle = Correct Prediction</p>
          {/* CLOUDINARY_IMG: chalk-neural-net */}
        </div>

      </div>
    </main>
  )
}