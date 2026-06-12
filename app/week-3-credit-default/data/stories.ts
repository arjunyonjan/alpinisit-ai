export const stories: Record<string, { title: string; sub: string; html: string }> = {
  "default-init": {
    title: "PyTorch Default Init",
    sub: "Built-in weight initialization",
    html: `<div class="space-y-4">
      <div class="bg-white border border-slate-200 rounded-xl p-4">
        <div class="flex items-center gap-2 mb-2">
          <span class="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
          <span class="font-semibold text-slate-900">Default Init</span>
          <span class="text-slate-400 text-xs"> — PyTorch's built-in init</span>
        </div>
        <div class="bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 text-xs text-amber-700">
          <svg class="w-3.5 h-3.5 inline-block -mt-0.5 mr-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
          <span class="font-medium">FucheAI</span> You're guessing a number. PyTorch's default picks a reasonable starting guess so the model can begin learning without exploding or vanishing.
        </div>
      </div>
    </div>`,
  },
  "xavier-init": {
    title: "Xavier Init",
    sub: "For tanh/sigmoid · Balances variance",
    html: `<div class="space-y-4">
      <div class="bg-white border border-slate-200 rounded-xl p-4">
        <div class="flex items-center gap-2 mb-2">
          <span class="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
          <span class="font-semibold text-slate-900">Xavier Init</span>
          <span class="text-slate-400 text-xs"> — For tanh/sigmoid activations</span>
        </div>
        <div class="bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 text-xs text-amber-700">
          <svg class="w-3.5 h-3.5 inline-block -mt-0.5 mr-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
          <span class="font-medium">FucheAI</span> Sharing crayons equally — no one gets too many or too few. Every neuron starts fair.
        </div>
        <div class="mt-2 text-xs text-slate-400">
          <span class="font-medium text-slate-500">Story:</span> Xavier Glorot & Yoshua Bengio (2010) noticed signals fade in deep sigmoid nets. Fix: keep variance same going in and out.
        </div>
      </div>
    </div>`,
  },
  "he-init": {
    title: "He Init",
    sub: "For ReLU · Doubles variance",
    html: `<div class="space-y-4">
      <div class="bg-white border border-slate-200 rounded-xl p-4">
        <div class="flex items-center gap-2 mb-2">
          <span class="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
          <span class="font-semibold text-slate-900">He Init</span>
          <span class="text-slate-400 text-xs"> — For ReLU activations</span>
        </div>
        <div class="bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 text-xs text-amber-700">
          <svg class="w-3.5 h-3.5 inline-block -mt-0.5 mr-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
          <span class="font-medium">FucheAI</span> Half the class is sleeping. Teacher talks louder. He doubles weight knowing half the neurons are asleep.
        </div>
        <div class="mt-2 text-xs text-slate-400">
          <span class="font-medium text-slate-500">Story:</span> Kaiming He et al. (2015, ResNet team) found Xavier fails with ReLU. Fix: double variance to compensate for dead neurons.
        </div>
      </div>
    </div>`,
  },
  batchnorm: {
    title: "Batch Normalization",
    sub: "Normalizes each batch",
    html: `<div class="space-y-4">
      <div class="bg-white border border-slate-200 rounded-xl p-4">
        <div class="flex items-center gap-2 mb-2">
          <span class="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
          <span class="font-semibold text-slate-900">BatchNorm</span>
          <span class="text-slate-400 text-xs"> — Normalizes each layer's output</span>
        </div>
        <div class="bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 text-xs text-amber-700">
          <svg class="w-3.5 h-3.5 inline-block -mt-0.5 mr-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
          <span class="font-medium">FucheAI</span> Before every class, a bell rings and everyone sits. BatchNorm resets each layer so it starts clean no matter how messy the previous layer was.
        </div>
        <div class="mt-2 text-xs text-slate-400">
          <span class="font-medium text-slate-500">Story:</span> Sergey Ioffe & Christian Szegedy (Google, 2015) realized normalizing each batch makes deep nets train faster and care less about starting weights.
        </div>
      </div>
    </div>`,
  },
  adam: {
    title: "Adam",
    sub: "Adaptive Moment Estimation",
    html: `<div class="space-y-4">
      <div class="bg-white border border-slate-200 rounded-xl p-4">
        <div class="flex items-center gap-2 mb-2">
          <span class="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
          <span class="font-semibold text-slate-900">Adam</span>
          <span class="text-slate-400 text-xs"> — Adaptive learning rate + momentum</span>
        </div>
        <div class="bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 text-xs text-amber-700">
          <svg class="w-3.5 h-3.5 inline-block -mt-0.5 mr-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
          <span class="font-medium">FucheAI</span> Like a smart GPS that adjusts directions per road — some roads need big turns, some need tiny adjustments. Adam customizes step size for every weight.
        </div>
        <div class="mt-2 text-xs text-slate-400">
          <span class="font-medium text-slate-500">Story:</span> Diederik Kingma & Jimmy Ba (2014) combined momentum + adaptive LR. Adam = AdaGrad + RMSProp + momentum.
        </div>
      </div>
    </div>`,
  },
  sgd: {
    title: "SGD",
    sub: "Stochastic Gradient Descent",
    html: `<div class="space-y-4">
      <div class="bg-white border border-slate-200 rounded-xl p-4">
        <div class="flex items-center gap-2 mb-2">
          <span class="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
          <span class="font-semibold text-slate-900">SGD</span>
          <span class="text-slate-400 text-xs"> — Classic gradient descent</span>
        </div>
        <div class="bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 text-xs text-amber-700">
          <svg class="w-3.5 h-3.5 inline-block -mt-0.5 mr-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
          <span class="font-medium">FucheAI</span> Like walking down a hill one tiny step at a time. Slow but steady — you'll eventually reach the bottom.
        </div>
        <div class="mt-2 text-xs text-slate-400">
          <span class="font-medium text-slate-500">Story:</span> Herbert Robbins & Sutton Monro (1951) pioneered stochastic approximation. SGD is the foundation of modern deep learning optimization.
        </div>
      </div>
    </div>`,
  },
  rmsprop: {
    title: "RMSProp",
    sub: "Root Mean Square Propagation",
    html: `<div class="space-y-4">
      <div class="bg-white border border-slate-200 rounded-xl p-4">
        <div class="flex items-center gap-2 mb-2">
          <span class="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
          <span class="font-semibold text-slate-900">RMSProp</span>
          <span class="text-slate-400 text-xs"> — Adaptive learning rate per weight</span>
        </div>
        <div class="bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 text-xs text-amber-700">
          <svg class="w-3.5 h-3.5 inline-block -mt-0.5 mr-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
          <span class="font-medium">FucheAI</span> If you're running too fast, slow down. If too slow, speed up. RMSProp adjusts learning rate per weight based on how fast it's changing.
        </div>
        <div class="mt-2 text-xs text-slate-400">
          <span class="font-medium text-slate-500">Story:</span> Geoffrey Hinton proposed RMSProp in his Coursera lecture (2012). It fixes AdaGrad's problem of monotonically decreasing learning rate.
        </div>
      </div>
    </div>`,
  },
  adamw: {
    title: "AdamW",
    sub: "Adam with Decoupled Weight Decay",
    html: `<div class="space-y-4">
      <div class="bg-white border border-slate-200 rounded-xl p-4">
        <div class="flex items-center gap-2 mb-2">
          <span class="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
          <span class="font-semibold text-slate-900">AdamW</span>
          <span class="text-slate-400 text-xs"> — Adam + decoupled weight decay</span>
        </div>
        <div class="bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 text-xs text-amber-700">
          <svg class="w-3.5 h-3.5 inline-block -mt-0.5 mr-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
          <span class="font-medium">FucheAI</span> Adam but with a cleaner way to shrink big weights. Like Adam using a separate budget for fines vs rewards.
        </div>
        <div class="mt-2 text-xs text-slate-400">
          <span class="font-medium text-slate-500">Story:</span> Ilya Loshchilov & Frank Hutter (2017) showed Adam's weight decay was wrong. Fix: decouple weight decay from adaptive gradients.
        </div>
      </div>
    </div>`,
  },
  dropout: {
    title: "Dropout",
    sub: "Randomly drops neurons during training",
    html: `<div class="space-y-4">
      <div class="bg-white border border-slate-200 rounded-xl p-4">
        <div class="flex items-center gap-2 mb-2">
          <span class="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
          <span class="font-semibold text-slate-900">Dropout</span>
          <span class="text-slate-400 text-xs"> — Prevents overfitting</span>
        </div>
        <div class="bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 text-xs text-amber-700">
          <svg class="w-3.5 h-3.5 inline-block -mt-0.5 mr-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
          <span class="font-medium">FucheAI</span> Covering some notes during a practice test — forces you to learn the material, not just memorize the page number.
        </div>
        <div class="mt-2 text-xs text-slate-400">
          <span class="font-medium text-slate-500">Story:</span> Geoffrey Hinton et al. (2012, U. of Toronto) — randomly dropping neurons prevents co-adaptation. Won ImageNet 2012.
        </div>
      </div>
    </div>`,
  },
  "weight-decay": {
    title: "Weight Decay",
    sub: "L2 regularization",
    html: `<div class="space-y-4">
      <div class="bg-white border border-slate-200 rounded-xl p-4">
        <div class="flex items-center gap-2 mb-2">
          <span class="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
          <span class="font-semibold text-slate-900">Weight Decay</span>
          <span class="text-slate-400 text-xs"> — L2 regularization</span>
        </div>
        <div class="bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 text-xs text-amber-700">
          <svg class="w-3.5 h-3.5 inline-block -mt-0.5 mr-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
          <span class="font-medium">FucheAI</span> A gardener trimming branches — cut back the wild growth so the tree stays balanced and doesn't overreach.
        </div>
        <div class="mt-2 text-xs text-slate-400">
          <span class="font-medium text-slate-500">Story:</span> Weight decay = L2 regularization. Andrey Tikhonov (1943, Soviet mathematician) first proposed regularization for ill-posed problems.
        </div>
      </div>
    </div>`,
  },
  "early-stopping": {
    title: "Early Stopping",
    sub: "Stop when validation loss plateaus",
    html: `<div class="space-y-4">
      <div class="bg-white border border-slate-200 rounded-xl p-4">
        <div class="flex items-center gap-2 mb-2">
          <span class="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
          <span class="font-semibold text-slate-900">Early Stopping</span>
          <span class="text-slate-400 text-xs"> — Prevents overfitting</span>
        </div>
        <div class="bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 text-xs text-amber-700">
          <svg class="w-3.5 h-3.5 inline-block -mt-0.5 mr-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
          <span class="font-medium">FucheAI</span> When you've practiced enough and start to get worse — stop. Better to save your energy than over-practice and get tired.
        </div>
      </div>
    </div>`,
  },
  "learning-rate": {
    title: "Learning Rate",
    sub: "Step size for gradient descent",
    html: `<div class="space-y-4">
      <div class="bg-white border border-slate-200 rounded-xl p-4">
        <div class="flex items-center gap-2 mb-2">
          <span class="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
          <span class="font-semibold text-slate-900">Learning Rate</span>
          <span class="text-slate-400 text-xs"> — Controls step size</span>
        </div>
        <div class="bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 text-xs text-amber-700">
          <svg class="w-3.5 h-3.5 inline-block -mt-0.5 mr-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
          <span class="font-medium">FucheAI</span> How big a step you take when walking. Too big — you trip. Too small — you never reach your destination.
        </div>
        <div class="mt-2 text-xs text-slate-400">
          <span class="font-medium text-slate-500">Story:</span> Leslie Smith (2015, Naval Research Lab) proposed the LR range test and cyclical learning rates for finding optimal step sizes.
        </div>
      </div>
    </div>`,
  },
  "batch-size": {
    title: "Batch Size",
    sub: "Samples per gradient update",
    html: `<div class="space-y-4">
      <div class="bg-white border border-slate-200 rounded-xl p-4">
        <div class="flex items-center gap-2 mb-2">
          <span class="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
          <span class="font-semibold text-slate-900">Batch Size</span>
          <span class="text-slate-400 text-xs"> — Samples per update</span>
        </div>
        <div class="bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 text-xs text-amber-700">
          <svg class="w-3.5 h-3.5 inline-block -mt-0.5 mr-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
          <span class="font-medium">FucheAI</span> How many practice problems you do before checking answers. Too few — noisy. Too many — takes forever to adjust.
        </div>
      </div>
    </div>`,
  },
  "hidden-layers": {
    title: "Hidden Layers",
    sub: "Depth of the network",
    html: `<div class="space-y-4">
      <div class="bg-white border border-slate-200 rounded-xl p-4">
        <div class="flex items-center gap-2 mb-2">
          <span class="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
          <span class="font-semibold text-slate-900">Hidden Layers</span>
          <span class="text-slate-400 text-xs"> — Network depth</span>
        </div>
        <div class="bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 text-xs text-amber-700">
          <svg class="w-3.5 h-3.5 inline-block -mt-0.5 mr-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
          <span class="font-medium">FucheAI</span> More thinking steps = more complexity. Like solving a puzzle — sometimes 2 steps is enough, sometimes you need 4.
        </div>
        <div class="mt-2 text-xs text-slate-400">
          <span class="font-medium text-slate-500">Story:</span> Universal approximation theorem (Cybenko 1989, Hornik 1991) — one hidden layer can approximate any function. But deeper = more efficient.
        </div>
      </div>
    </div>`,
  },
  "grid-search": {
    title: "Grid Search",
    sub: "Exhaustive hyperparameter search",
    html: `<div class="space-y-4">
      <div class="bg-white border border-slate-200 rounded-xl p-4">
        <div class="flex items-center gap-2 mb-2">
          <span class="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
          <span class="font-semibold text-slate-900">Grid Search</span>
          <span class="text-slate-400 text-xs"> — Try every combination</span>
        </div>
        <div class="bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 text-xs text-amber-700">
          <svg class="w-3.5 h-3.5 inline-block -mt-0.5 mr-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
          <span class="font-medium">FucheAI</span> Trying every combination of ingredients to find the perfect recipe. Time-consuming but you don't miss the best one.
        </div>
        <div class="mt-2 text-xs text-slate-400">
          <span class="font-medium text-slate-500">Story:</span> James Bergstra & Yoshua Bengio (2012) showed random search is more efficient than grid search for hyperparameter tuning.
        </div>
      </div>
    </div>`,
  },
}
