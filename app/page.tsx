import dynamic from "next/dynamic";

const Panel06Retrieval = dynamic(
  () => import("@/components/panels/Panel06Retrieval"),
  { ssr: false }
);

export default function Page() {
  return (
    <main className="w-full min-h-screen">
      <Panel06Retrieval />
    </main>
  );
}
