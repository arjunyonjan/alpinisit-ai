export interface ExperimentResult {
  name: string
  value: string
  auc: string
  winner?: boolean
}

export interface Experiment {
  id: string
  title: string
  subtitle: string
  status: "complete" | "partial" | "pending"
  statusLabel: string
  statusColor: string
  winner?: string
  winnerValue?: string
  winnerDetail?: string
  results: ExperimentResult[]
  designNote: string
  resultNote: string
  recallNote?: string
  takeaway?: string
  logNote?: string
}

export const experiments: Experiment[] = [
  {
    id: "E1",
    title: "Weight Initialization",
    subtitle: "Only swap init method — everything else identical",
    status: "complete",
    statusLabel: "✓ COMPLETE",
    statusColor: "emerald",
    winner: "Xavier",
    winnerValue: "+0.0019 AUC",
    winnerDetail: "AUC 0.770 ← best",
    results: [
      { name: "default", value: "81.35%", auc: "AUC 0.768" },
      { name: "xavier", value: "81.37%", auc: "AUC 0.770", winner: true },
      { name: "he", value: "81.35%", auc: "AUC 0.768" },
    ],
    designNote: "Everything kept identical — adam, lr=0.001, dropout=0.2, batchnorm=true, same architecture. Only the weight init method was swapped.",
    resultNote: "All three scored ~81.3% because BatchNorm reduced init sensitivity. Xavier barely won +0.0019 AUC.",
    recallNote: "Accuracy looks good (81%) but recall is only 0.345 — meaning the model misses most actual defaults. Think of a fire alarm: 81% of the time it's right, but it only catches 34 out of 100 real fires.",
    logNote: "Logged in MLflow → localhost:5000",
  },
  {
    id: "E2",
    title: "Optimizer Comparison",
    subtitle: "Adam vs SGD vs RMSProp vs AdamW — which optimizer converges best?",
    status: "complete",
    statusLabel: "✓ COMPLETE",
    statusColor: "amber",
    winner: "Adam",
    winnerValue: "AUC 0.772",
    winnerDetail: "AUC 0.772 ← best",
    results: [
      { name: "Adam", value: "81.45%", auc: "AUC 0.772", winner: true },
      { name: "SGD", value: "81.33%", auc: "AUC 0.761", winner: false },
      { name: "RMSProp", value: "81.40%", auc: "AUC 0.765", winner: false },
      { name: "AdamW", value: "81.35%", auc: "AUC 0.767", winner: false },
    ],
    designNote: "All optimizers tested with same xavier init, batch=256, dropout=0.2, batchnorm=true. Adam uses adaptive learning rates per parameter; SGD uses fixed step with momentum; RMSProp scales learning rate by gradient magnitude; AdamW adds decoupled weight decay.",
    resultNote: "Adam won with AUC 0.772 (+0.007 over SGD). Adam converged in just 16 epochs vs SGD's 100. AdamW was close (0.767) but no meaningful gain from weight decay here.",
    takeaway: "Adam is the clear winner for this task — faster convergence and better AUC. All optimizers showed similar recall (~34%) due to the class imbalance, confirming this is a data problem, not an optimizer problem.",
    logNote: "Logged in MLflow → localhost:5000",
  },
  {
    id: "E3",
    title: "Regularization Techniques",
    subtitle: "Dropout, BatchNorm, Weight Decay — which prevents overfitting best?",
    status: "partial",
    statusLabel: "⟳ RERUN",
    statusColor: "rose",
    winner: undefined,
    winnerValue: undefined,
    winnerDetail: undefined,
    results: [
      { name: "Dropout", value: "0.0 / 0.2 / 0.5", auc: "needs re-run" },
      { name: "BatchNorm", value: "on / off", auc: "needs re-run" },
      { name: "Weight Decay", value: "0 / 1e-4 / 1e-3", auc: "needs re-run" },
      { name: "Early Stopping", value: "patience=10", auc: "needs re-run" },
    ],
    designNote: "Regularization = preventing the model from just memorizing answers. Dropout randomly ignores some neurons (like covering notes during a test). BatchNorm keeps numbers stable (like clock bell before class). Weight Decay shrinks big weights (like keeping ego in check).",
    resultNote: "Partial — only baseline (no reg) completed: AUC 0.760. Previous run crashed on dropout variants.",
    logNote: "",
  },
  {
    id: "E4",
    title: "Hyperparameter Tuning",
    subtitle: "Learning rate, batch size, hidden layers — grid search for optimal config",
    status: "pending",
    statusLabel: "○ Pending",
    statusColor: "slate",
    winner: undefined,
    winnerValue: undefined,
    winnerDetail: undefined,
    results: [
      { name: "Learning Rate", value: "0.01 / 0.001 / 1e-4", auc: "" },
      { name: "Batch Size", value: "64 / 128 / 256", auc: "" },
      { name: "Hidden Layers", value: "[2] / [3] / [4]", auc: "" },
      { name: "Grid Search", value: "3×3×3 = 27 runs", auc: "" },
    ],
    designNote: "Hyperparameters = settings you choose before training (like oven temp and timer). Learning rate = how big a step the model takes. Batch size = how many examples it sees before adjusting. Hidden layers = how many thinking steps it takes. Grid search = try every combo to find the best recipe.",
    resultNote: "Pending — uses xavier init, adam, dropout=0.2",
    logNote: "",
  },
]
