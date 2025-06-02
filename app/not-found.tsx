export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-white mb-4">Página no encontrada</h2>
        <p className="text-white/80 mb-8">La página que buscas no existe.</p>
        <a 
          href="/" 
          className="bg-white text-orange-500 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
        >
          Volver al inicio
        </a>
      </div>
    </div>
  );
}