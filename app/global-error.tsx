'use client';

// Force dynamic rendering to avoid SSR issues
export const dynamic = 'force-dynamic';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">500</h1>
        <h2 className="text-2xl font-semibold text-white mb-4">Error del servidor</h2>
        <p className="text-white/80 mb-8">Algo salió mal. Intenta nuevamente.</p>
        <button
          onClick={reset}
          className="bg-white text-orange-500 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors mr-4"
        >
          Intentar de nuevo
        </button>
        <a 
          href="/" 
          className="bg-white/20 text-white px-6 py-3 rounded-full font-semibold hover:bg-white/30 transition-colors"
        >
          Volver al inicio
        </a>
      </div>
    </div>
  );
}