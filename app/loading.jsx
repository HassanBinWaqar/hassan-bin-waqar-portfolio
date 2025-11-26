export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative">
        {/* Animated spinner */}
        <div className="w-16 h-16 border-4 border-[#16f2b3] border-t-transparent rounded-full animate-spin"></div>
        
        {/* Pulsing background */}
        <div className="absolute inset-0 w-16 h-16 border-4 border-[#16f2b3]/20 rounded-full animate-pulse"></div>
        
        <p className="text-[#16f2b3] text-sm mt-4 text-center animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
