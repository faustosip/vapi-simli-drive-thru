'use client';

import { useState, useEffect } from 'react';
import { Mic, MicOff, Phone, PhoneOff } from 'lucide-react';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  specialInstructions?: string;
}

interface Order {
  items: OrderItem[];
  total: number;
}

export default function DriveThruClient() {
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [order, setOrder] = useState<Order>({ items: [], total: 0 });
  const [avatarReady, setAvatarReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initialization
  useEffect(() => {
    const timer = setTimeout(() => {
      setAvatarReady(true);
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleStartCall = () => {
    setIsConnected(true);
    console.log('Starting call...');
  };

  const handleEndCall = () => {
    setIsConnected(false);
    console.log('Ending call...');
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
    console.log('Toggle mute:', !isMuted);
  };

  const clearOrder = () => {
    setOrder({ items: [], total: 0 });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent mx-auto mb-4"></div>
          <p className="text-white text-xl">Cargando SophIA...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2">Dr. Donut</h1>
          <p className="text-xl text-white/90">Drive-Thru AI Assistant</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Avatar Section */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-2xl">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Sophia</h2>
              <p className="text-white/80">Tu Asistente de Drive-Thru</p>
            </div>

            <div className="relative bg-black/20 rounded-xl overflow-hidden mb-6" style={{ aspectRatio: '16/9' }}>
              {!avatarReady ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent"></div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-white">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-4xl">👩‍💼</span>
                    </div>
                    <p className="text-lg">¡Avatar Listo!</p>
                  </div>
                </div>
              )}
            </div>

            {/* Call Controls */}
            <div className="flex justify-center space-x-4 mb-4">
              {!isConnected ? (
                <button
                  onClick={handleStartCall}
                  disabled={!avatarReady}
                  className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-6 py-3 rounded-full flex items-center space-x-2 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <span>Pedir</span>
                </button>
              ) : (
                <>
                  <button
                    onClick={handleToggleMute}
                    className={`${
                      isMuted ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
                    } text-white px-4 py-3 rounded-full transition-colors`}
                  >
                    {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={handleEndCall}
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full flex items-center space-x-2 transition-colors"
                  >
                    <PhoneOff className="w-5 h-5" />
                    <span>Finalizar</span>
                  </button>
                </>
              )}
            </div>

            {/* Status */}
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                <span className="text-white text-sm">
                  {isConnected ? 'Conectado' : 'Desconectado'}
                </span>
              </div>
            </div>
          </div>

          {/* Order Section */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Tu Pedido</h2>
              {order.items.length > 0 && (
                <button
                  onClick={clearOrder}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Limpiar
                </button>
              )}
            </div>

            <div className="space-y-4 mb-6">
              {order.items.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-white/60 text-lg">Tu carrito está vacío</p>
                  <p className="text-white/40 text-sm mt-2">
                    Haz clic en "Pedir" para comenzar tu orden
                  </p>
                </div>
              ) : (
                order.items.map((item, index) => (
                  <div key={index} className="bg-white/10 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-white font-semibold">{item.name}</h3>
                        {item.specialInstructions && (
                          <p className="text-white/70 text-sm mt-1">
                            {item.specialInstructions}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-white font-semibold">
                          {item.quantity}x ${item.price.toFixed(2)}
                        </p>
                        <p className="text-white/80 text-sm">
                          = ${(item.quantity * item.price).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {order.items.length > 0 && (
              <div className="border-t border-white/20 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-white">Total:</span>
                  <span className="text-2xl font-bold text-white">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="mt-8 text-center">
          <p className="text-white/80">
            🚧 Demo Mode - VAPI integration will be added progressively
          </p>
        </div>
      </div>
    </div>
  );
}