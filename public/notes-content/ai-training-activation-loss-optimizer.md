---
title: AI Training - activation - loss - optimizer
date: '2026-06-04'
status: draft
tags: []
---
*A conversation about deep learning, explained like talking to a kid in Bhrikutimandap*

---

## Non-Linearity

Non-linearity is like a magic bendy straw — straight lines only go one way, but bendy ones can twist and turn to match any shape you want.

**Why do that?**
Because straight lines are too boring to draw all the curvy, wiggly patterns in real life, so we use bendy ones to catch everything.

**Multiple bends also happen?**
Yep, stacking lots of bendy straws lets you twist into super crazy shapes that one bend could never make.

**In code?**
In code we add bendy bits like ReLU or tanh after each layer so the computer can twist numbers into tricky shapes.

**Real example?**
Like when you code output = ReLU(3 * x - 5): the ReLU turns any negative number into 0, so it bends the straight line into an elbow shape.

---

## Real World Layers — Capital Market Example

For capital markets, think of layers like this:
- Layer 1 looks at raw stuff like price and volume
- Layer 2 finds wiggles like trends or momentum
- Layer 3 mixes those wiggles to guess if a stock might jump or drop

**What activation function there?**
We usually use ReLU to keep only the good signals and chop off the noisy negative ones, and tanh when we want ups and downs between -1 and 1, like showing both greed and fear.

**Line arrow text flow:**
Price + Volume → Layer 1 → ReLU → Find Trends → Layer 2 → tanh → Mix Signals → Layer 3 → ReLU → Buy/Sell Guess

---

## Student Example

Homework Scores + Study Hours → Layer 1 → ReLU → Spot Patterns → Layer 2 → tanh → Balance Good/Bad Habits → Layer 3 → ReLU → Predict Final Grade

---

## TikTok Example — Many Layers

TikTok's For You Page is like a giant stack of bendy straws working together:

- What you watch → Layer 1 → ReLU → Spot tiny clues like if you rewatch or skip
- Those clues → Layer 2 → tanh → Mix in likes, comments, watch time to see what feels fun
- That mix → Layer 3-4-5... → more ReLU → Build a picture of your taste
- Final layer → Pick the next video you'll probably love

So lots of layers keep bending and mixing all the signals — your swipes, pauses, sounds you like — until the app guesses what'll make you go "ooh" next.

---

## Optimizer

The optimizer is like the app's coach that checks every guess and says "nope, too off" or "yep, getting closer."

After TikTok shows you a video, the optimizer looks at what you did — watched all of it, skipped fast, or shared it — then tweaks all those bendy straw layers a tiny bit so next time the guess is better.

Popular coaches it uses are Adam or SGD — they just decide how big or small those tiny tweaks should be.

---

## Adam vs SGD

SGD is like a coach who takes one slow, careful step at a time down the hill to find the best answer.

Adam is a smarter coach who remembers your past steps and speeds up or slows down, so it finds the answer faster and doesn't trip as much.

TikTok usually picks Adam because it learns your taste quicker, but both just help all those layers get better at guessing.

---

## Slope and Gradient

Think of gradient as the slope that tells us which way is downhill.

For a function f(x), the gradient/slope formula is:
gradient = (how much f changes) / (how much x changes) = df/dx

In the app world: If changing a layer by a tiny bit makes your guess way worse, the slope is steep. The optimizer uses that slope to know which direction to tweak the layer so the guess gets better.

So gradient = "which way and how steep to walk downhill to the best answer."

---

## ∂L/∂w, ∂L/∂b, Delta

These are the little tweaks in backprop:

- ∂L/∂w = "If I wiggle this weight w a tiny bit, how much does the loss L go up or down?" That's the slope for each connection between layers.
- ∂L/∂b = "If I wiggle this bias b, how much does the loss change?" That's the slope for the bias knob.
- δ (delta) = The "blame signal" each layer gets. It says "hey, you were this much off, so pass the blame backward and tell earlier layers how to adjust."

So the optimizer uses ∂L/∂w and ∂L/∂b to know exactly how to nudge each weight and bias to make better guesses next time.

---

## Loss Functions — MSE and MAE

Loss function = the "oops meter" that tells the model how wrong its guess was.

### MSE = Mean Squared Error
Take each guess, find how far off it was, square it so big mistakes hurt extra, then average them all.
MSE = (1/n) × sum( (actual - guess)² )

Like telling a kid: "If you miss the target by a lot, you get extra timeout." So it hates big errors.

### MAE = Mean Absolute Error
Just take how far off each guess was, drop any negative signs, then average.
MAE = (1/n) × sum( |actual - guess| )

Like: "Every inch you miss counts the same." So it treats all mistakes fairly.

TikTok might use MSE when it really wants to avoid huge prediction flops, or MAE when it wants steady, chill improvements.

---

## MAE vs MSE — Step by Step

Step 1: Get predictions and real answers
Actual: 5, 3, 8
Guess:  4, 5, 7

Step 2: Find the error for each one
5 - 4 = 1
3 - 5 = -2
8 - 7 = 1

Step 3A: For MAE → Make all errors positive
|1| = 1, |-2| = 2, |1| = 1
Step 4A: Average them
MAE = (1 + 2 + 1) / 3 = 1.33

Step 3B: For MSE → Square all errors
1² = 1, (-2)² = 4, 1² = 1
Step 4B: Average them
MSE = (1 + 4 + 1) / 3 = 2.0

So MAE treats all misses the same, MSE punishes that -2 miss extra hard because 4 > 2.

---

## Football Example — MAE vs MSE

Step 1: Get real goals and the model's guess
Real goals:  Man City 3, Arsenal 1, Liverpool 2
Model guess: 2, 3, 2

Step 2: Find the error for each match
3 - 2 = 1
1 - 3 = -2
2 - 2 = 0

Step 3A: MAE → Drop the minus signs
|1| = 1, |-2| = 2, |0| = 0
Step 4A: Average them
MAE = (1 + 2 + 0) / 3 = 1 goal off per match

Step 3B: MSE → Square the errors
1² = 1, (-2)² = 4, 0² = 0
Step 4B: Average them
MSE = (1 + 4 + 0) / 3 = 1.67

So MAE says "on average we're 1 goal wrong."
MSE says "that Arsenal guess was pretty bad" because squaring made the -2 error count as 4.

---

## Derivative Complexity — MAE vs MSE

MSE derivative: Loss = (actual - guess)², so ∂L/∂guess = -2(actual - guess)
Flow: Error → Multiply by -2 → Done. Super smooth.

MAE derivative: Loss = |actual - guess|
∂L/∂guess = -1 if guess too low, +1 if guess too high, weird if exactly right.
Flow: Check direction first. Sharp corner at 0 like a V.

| Feature | MSE | MAE |
|---|---|---|
| Math | Just multiply | Has to check direction |
| Slope size | Changes with error | Always just 1 or -1 |
| Smooth? | Yes, like a bowl | No, like a V |
| Good when | Big fixes for big mistakes | Steady, don't overreact |

---

## Full Flow — TikTok Examples

Same pattern every time:
Input → weight × input + bias → activation → more layers → guess → compare to real → MSE or MAE says how wrong → optimizer uses that to tweak weights

### Example 1: Will you watch the full video?
Input: Watch time = 3s, Video length = 30s
Mix: w1×3 + w2×30 + b = 1.2
Squish: ReLU(1.2) = 1.2 → Output guess = 80% chance
Real: You watched 100% = 1.0
Loss: MSE = (1.0-0.8)² = 0.04 | MAE = |1.0-0.8| = 0.2

### Example 2: Will you like the video?
Input: Liked 5 cat videos, 0 dance videos
Mix: w1×5 + w2×0 + b = -0.3
Squish: tanh(-0.3) = -0.29 → Output guess = 20% chance
Real: You didn't like = 0.0
Loss: MSE = (0.0-0.2)² = 0.04 | MAE = |0.0-0.2| = 0.2

### Example 3: How long will you stay?
Input: 11pm, 50 swipes already
Mix: w1×23 + w2×50 + b = 4.5
Squish: ReLU(4.5) = 4.5 → Output guess = 12 min
Real: You stayed 15 min
Loss: MSE = (15-12)² = 9 | MAE = |15-12| = 3

---

## Next Step After Error Check

Step 1: Error check done → "We were this much wrong"
Step 2: Backprop = send blame backwards → "Who caused this?"
Step 3: Get gradients → "Which way to fix it?"
Step 4: Optimizer updates → w_new = w_old - learning_rate × gradient
Step 5: Repeat → millions of times until scary good

Flow: Error check → Backprop → Update → Repeat

---

## Oscillation

When learning rate is too big, the model leaps across the valley and never lands.

Flow: Weight = 5, best = 6
Step: 5+3=8 too far → 8-3=5 too far again → 5→8→5→8 forever

Fix: Smaller learning rate, Momentum, or Adam

---

## Error Fixers — Gradient Descent Family

- Gradient Descent → Basic downhill walker. Can oscillate.
- Momentum → Remembers past steps. Rolls like a ball.
- RMSProp → Adjusts step size by gradient size.
- Adam → Combines Momentum + RMSProp. Best of both. TikTok's choice.

All do: w_new = w_old - learning_rate × gradient (just differently smart)

---

## Classified Names Flow

Input → raw data: watch time, likes, time of day
↓
Model/Architecture → Neural Network: layers, neurons, weights, biases
↓
Forward Pass → weight × input + bias → Activation: ReLU, Sigmoid, Tanh
↓
Output/Guess → "you'll watch 80%"
↓
Loss Function → Error check: MSE, MAE, Cross-Entropy
↓
Backpropagation → Blame: chain rule, calculates ∂L/∂w
↓
Optimizer → Error fixer: Gradient Descent, Momentum, RMSProp, Adam
↓
Weight Update → w_new = w_old - learning_rate × gradient
↓
Loop → Repeat until error ~ 0

---

## Fuchche Flow (Easy Names)

Input → numbers come in
↓
Mix Math → guess = weight × input + bias
↓
Squish Math → if negative make 0, else keep
↓
Error Check Math → (guess - real)²
↓
Slope Math → how much weight caused error
↓
Fix Math → new_weight = old_weight - learning_rate × slope
↓
Loop → do it all again

---

## Key Words — Fuchche Dictionary

### Weight (Importance)
Weight = "how important is this" number.
Big weight = input matters a lot. Small weight = mostly ignored.
Like volume knob — turn up if important, down if not.
10 words: Importance, Strength, Value, Multiplier, Factor, Knob, Priority, Impact, Influence, Score

### Bias (Mood)
Bias = default mood when all inputs are 0.
Like your mood before the day starts — grumpy or happy by default.
10 words: Mood, Baseline, Starting point, Habit, Default, Bonus, Extra, Head start, Gut feeling, Offset

### Squish (Press/Filter/Ignore)
Squish = press negative numbers to 0.
-5 → squish → 0, 3 → stays 3.
Also called: Ignore Math, Filter Math.
10 synonyms: Press, Squeeze, Crush, Flatten, Smush, Compress, Mash, Compact, Squash, Pulp

### Gradient (Slope)
Gradient = which way is downhill and how steep.
Big gradient = steep, small gradient = flat.
Tells optimizer: "go this way, this much step size."

### Learning Rate (Step Size)
Learning rate = how big a step to take.
Big = fast but risky. Small = safe but slow.
Lives inside Fix Math.

---

## Bhrikuti Rule

High weight = careful step feeling of the heart.
If Bhrikuti sees loose rock → weight on danger = 0.9 → heart goes dhuk dhuk → careful step.
Low weight on sky color = 0.1 → "doesn't matter, just walk."

AI copies this: high weight = big reaction, low weight = ignore.
Weight changes the feeling, feeling changes the step.

---

## GPU vs CPU — The For Loop Truth

CPU = 1 fuchche counting stones. Loops 1 million times. Slow.
GPU = 10,000 fuchches counting together. Each does 100. Done in 1 minute.

AI training = for loop inside for loop inside for loop.
GPU runs thousands of for loops in parallel.
So yes: AI IS for loops, just mega parallel version on GPU.

---

*End of Fuchche AI Guide. No formula jhol. Just real feel + simple math.*
