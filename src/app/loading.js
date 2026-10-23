export default function Loading() {
  return (
    <main className="mx-auto min-h-[60vh] max-w-360 px-5 py-16 sm:px-8 lg:px-12">
      <p className="mb-4 text-[10px] font-black tracking-[0.2em] text-[#ccff00]">
        WORKOUT LIBRARY
      </p>

      <div className="mb-8 flex items-center gap-3 text-sm text-neutral-400">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/15 border-t-[#ccff00]" />
        Loading workouts…
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <div
            key={index}
            className="fitlog-skeleton overflow-hidden rounded-2xl border border-white/10 bg-[#111311]"
          >
            <div className="h-48 bg-white/4" />
            <div className="space-y-4 p-5">
              <div className="h-4 w-1/3 rounded bg-white/10" />
              <div className="h-5 w-4/5 rounded bg-white/10" />
              <div className="h-3 w-1/2 rounded bg-white/10" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}