export default function Loading() {
  return (
    <div className="animate-pulse">
      {/* Hero skeleton */}
      <div className="bg-police-navy h-[480px] flex flex-col items-center justify-center gap-4 px-4">
        <div className="h-5 w-48 bg-white/20 rounded-full" />
        <div className="h-14 w-3/4 max-w-lg bg-white/20 rounded-xl" />
        <div className="h-5 w-1/2 max-w-sm bg-white/15 rounded-full" />
        <div className="h-12 w-80 bg-white/20 rounded-xl mt-4" />
      </div>

      {/* QuickLinks skeleton */}
      <div className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-40 bg-gray-100 rounded-2xl" />
          ))}
        </div>
      </div>

      {/* News grid skeleton */}
      <div className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="h-8 w-48 bg-gray-200 rounded mb-10" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-56 bg-gray-200 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
