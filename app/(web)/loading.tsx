export default function Loading() {
  return (
    <div className="animate-pulse">
      {/* Hero skeleton */}
      <div className="bg-navy-deep h-[480px] flex flex-col items-center justify-center gap-4 px-4">
        <div className="h-5 w-48 bg-white/15 rounded-full" />
        <div className="h-14 w-3/4 max-w-lg bg-white/15 rounded-xl" />
        <div className="h-5 w-1/2 max-w-sm bg-white/10 rounded-full" />
        <div className="h-12 w-80 bg-white/15 rounded-xl mt-4" />
      </div>

      {/* Service grid skeleton */}
      <section className="block">
        <div className="container grid grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-52 bg-surface-2 rounded-2xl" />
          ))}
        </div>
      </section>

      {/* News grid skeleton */}
      <section className="block alt">
        <div className="container">
          <div className="h-8 w-48 bg-border rounded mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-56 bg-surface rounded-2xl border border-border" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
