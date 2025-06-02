import dynamic from 'next/dynamic';

// Import DriveThru component with SSR disabled
const DriveThruClient = dynamic(() => import('@/components/DriveThruClient'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent mx-auto mb-4"></div>
        <p className="text-white text-xl">Cargando SophIA...</p>
        <p className="text-white text-sm mt-2">Inicializando Drive-Thru AI</p>
      </div>
    </div>
  )
});

export default function Home() {
  return <DriveThruClient />;
}