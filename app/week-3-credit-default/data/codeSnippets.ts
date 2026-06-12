export interface CodeSnippet {
  title: string
  sub: string
  html: string
  theme?: "dark" | "light"
}

export const codeSnippets: Record<string, CodeSnippet> = {
  exp1: {
    title: "weight_init.py",
    sub: "3 methods · PyTorch",
    theme: "dark",
    html: `<span class="text-slate-500"># ── Default init (PyTorch default) ──</span>
<span class="text-slate-400">def init_default(m):</span>
<span class="text-slate-400">    pass  </span><span class="text-slate-500"># uniform(-1/√fan, 1/√fan)</span>

<span class="text-slate-500"># ── Xavier / Glorot init ──</span>
<span class="text-slate-400">def init_xavier(m):</span>
<span class="text-slate-400">    if isinstance(m, nn.Linear):</span>
<span class="text-slate-400">        nn.init.xavier_uniform_(m.weight)</span>
<span class="text-slate-400">        nn.init.zeros_(m.bias)</span>

<span class="text-slate-500"># ── He / Kaiming init ──</span>
<span class="text-slate-400">def init_he(m):</span>
<span class="text-slate-400">    if isinstance(m, nn.Linear):</span>
<span class="text-slate-400">        nn.init.kaiming_uniform_(m.weight, mode='fan_in', nonlinearity='relu')</span>
<span class="text-slate-400">        nn.init.zeros_(m.bias)</span>

<span class="text-slate-500"># Applied in MLP:</span>
<span class="text-slate-400">self.apply(init_method)</span>`,
  },
  exp2: {
    title: "optimizer.py",
    sub: "4 optimizers · PyTorch",
    theme: "dark",
    html: `<span class="text-slate-500"># ── Optimizer setup ──</span>
<span class="text-slate-400">if optimizer == 'adam':</span>
<span class="text-slate-400">    opt = torch.optim.Adam(model.parameters(), lr=0.001)</span>
<span class="text-slate-400">elif optimizer == 'sgd':</span>
<span class="text-slate-400">    opt = torch.optim.SGD(model.parameters(), lr=0.01, momentum=0.9)</span>
<span class="text-slate-400">elif optimizer == 'rmsprop':</span>
<span class="text-slate-400">    opt = torch.optim.RMSprop(model.parameters(), lr=0.001)</span>
<span class="text-slate-400">elif optimizer == 'adamw':</span>
<span class="text-slate-400">    opt = torch.optim.AdamW(model.parameters(), lr=0.001, weight_decay=1e-4)</span>

<span class="text-slate-500"># ── Training loop ──</span>
<span class="text-slate-400">for epoch in range(epochs):</span>
<span class="text-slate-400">    opt.zero_grad()</span>
<span class="text-slate-400">    out = model(X_batch)</span>
<span class="text-slate-400">    loss = F.binary_cross_entropy(out, y_batch)</span>
<span class="text-slate-400">    loss.backward()</span>
<span class="text-slate-400">    opt.step()</span>`,
  },
  exp3: {
    title: "regularization.py",
    sub: "4 techniques · PyTorch",
    theme: "dark",
    html: `<span class="text-slate-500"># ── MLP with regularization ──</span>
<span class="text-slate-400">class MLP(nn.Module):</span>
<span class="text-slate-400">    def __init__(self, dropout=0.2, use_bn=True):</span>
<span class="text-slate-400">        super().__init__()</span>
<span class="text-slate-400">        self.net = nn.Sequential(</span>
<span class="text-slate-400">            nn.Linear(30, 32),</span>
<span class="text-slate-400">            nn.BatchNorm1d(32) if use_bn else nn.Identity(),</span>
<span class="text-slate-400">            nn.ReLU(),</span>
<span class="text-slate-400">            nn.Dropout(dropout),</span>
<span class="text-slate-400">            nn.Linear(32, 16),</span>
<span class="text-slate-400">            nn.BatchNorm1d(16) if use_bn else nn.Identity(),</span>
<span class="text-slate-400">            nn.ReLU(),</span>
<span class="text-slate-400">            nn.Dropout(dropout),</span>
<span class="text-slate-400">            nn.Linear(16, 1),</span>
<span class="text-slate-400">            nn.Sigmoid()</span>
<span class="text-slate-400">        )</span>

<span class="text-slate-500"># ── Early stopping ──</span>
<span class="text-slate-400">best_loss = float('inf')</span>
<span class="text-slate-400">patience, counter = 10, 0</span>
<span class="text-slate-400">for epoch in range(epochs):</span>
<span class="text-slate-400">    loss = train_one_epoch()</span>
<span class="text-slate-400">    if loss < best_loss:</span>
<span class="text-slate-400">        best_loss = loss; counter = 0</span>
<span class="text-slate-400">    else:</span>
<span class="text-slate-400">        counter += 1</span>
<span class="text-slate-400">    if counter >= patience:</span>
<span class="text-slate-400">        print(f"Early stop at epoch {epoch}")</span>
<span class="text-slate-400">        break</span>

<span class="text-slate-500"># ── Weight decay via optimizer ──</span>
<span class="text-slate-400">opt = torch.optim.Adam(model.parameters(), lr=0.001, weight_decay=1e-4)</span>`,
  },
  exp4: {
    title: "grid_search.py",
    sub: "27 combos · PyTorch",
    theme: "dark",
    html: `<span class="text-slate-500"># ── Grid search over hyperparams ──</span>
<span class="text-slate-400">from itertools import product</span>

<span class="text-slate-400">lr_list   = [0.01, 0.001, 1e-4]</span>
<span class="text-slate-400">batch_list = [64, 128, 256]</span>
<span class="text-slate-400">layer_list = [[32,16], [32,24,16], [32,24,16,8]]</span>

<span class="text-slate-400">for lr, batch, layers in product(lr_list, batch_list, layer_list):</span>
<span class="text-slate-400">    model = MLP(layer_sizes=layers)</span>
<span class="text-slate-400">    loader = DataLoader(ds, batch_size=batch, shuffle=True)</span>
<span class="text-slate-400">    opt = torch.optim.Adam(model.parameters(), lr=lr)</span>
<span class="text-slate-400">    </span>
<span class="text-slate-400">    for epoch in range(epochs):</span>
<span class="text-slate-400">        for Xb, yb in loader:</span>
<span class="text-slate-400">            loss = F.binary_cross_entropy(model(Xb), yb)</span>
<span class="text-slate-400">            loss.backward(); opt.step(); opt.zero_grad()</span>
<span class="text-slate-400">    </span>
<span class="text-slate-400">    auc = evaluate(model)</span>
<span class="text-slate-400">    print(f"lr={lr} batch={batch} layers={len(layers)} => AUC={auc:.4f}")</span>`,
  },
}
