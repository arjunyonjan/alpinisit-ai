export default function OrientationDay2Page() {
  return (
    <main className="min-h-screen bg-neutral-100 p-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[260px_1fr]">

        <aside className="hidden lg:block">
          <div className="sticky top-8 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wider text-neutral-500">
              Sections
            </p>

            <nav className="mt-6 space-y-2">
              <SidebarItem label="01 Tokenization" />
              <SidebarItem label="02 Tensor Batching" />
              <SidebarItem label="03 Self Attention" />
              <SidebarItem label="04 Latent Space" />
              <SidebarItem label="05 RAG Systems" />
              <SidebarItem label="06 Global AI Race" />
            </nav>
          </div>
        </aside>

        <section className="rounded-3xl border border-neutral-200 bg-white p-10 shadow-sm">
          <span className="rounded-full bg-violet-100 px-4 py-1 text-sm font-medium text-violet-700">
            Orientation Day 2
          </span>

          <h1 className="mt-6 text-5xl font-black tracking-tight">
            LLM Architecture Overview
          </h1>

          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-neutral-600">
            Tokenization, embeddings, transformer attention,
            batching, retrieval systems, and AI infrastructure.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">

            <InfoCard
              title="Tokenization"
              description="Convert raw text into token IDs."
            />

            <InfoCard
              title="Tensor Batching"
              description="Align variable sequences into tensors."
            />

            <InfoCard
              title="Self Attention"
              description="Transformer attention mechanism."
            />

            <InfoCard
              title="Latent Space"
              description="Semantic vector relationships."
            />

            <InfoCard
              title="RAG Systems"
              description="Retrieval augmented generation."
            />

            <InfoCard
              title="Global AI Race"
              description="US vs China AI ecosystem."
            />

          </div>
        </section>

      </div>
    </div></main>
  );
}

type InfoCardProps = {
  title: string;
  description: string;
};

function InfoCard({
  title,
  description,
}: InfoCardProps) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
      <div className="aspect-video rounded-xl border-2 border-dashed border-neutral-300 bg-white" />

      <h2 className="mt-4 text-xl font-semibold">
        {title}
      </h2>

      <p className="mt-2 text-sm leading-relaxed text-neutral-600">
        {description}
      </p>
    </div>
  );
}

type SidebarItemProps = {
  label: string;
};

function SidebarItem({
  label,
}: SidebarItemProps) {
  return (
    <button
      className="
        block w-full rounded-xl
        border border-neutral-200
        bg-neutral-50 px-4 py-3
        text-left text-sm font-medium
        transition hover:bg-violet-50
      "
    >
      {label}
    </button>
  );
}
