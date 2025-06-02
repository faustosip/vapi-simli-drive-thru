import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SophIA - Pide con tu voz',
  description: 'AI-Powered Drive-Thru Experience with VAPI and Simli',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Global Event Debug Logger
              console.log('🔧 Setting up global event debugging...');
              
              // Original methods
              const originalAddEventListener = window.addEventListener;
              const originalDispatchEvent = window.dispatchEvent;
              
              // Override addEventListener to log event listeners
              window.addEventListener = function(type, listener, options) {
                if (type === 'orderDetailsUpdated' || type === 'testOrderUpdate') {
                  console.log('📡 EVENT LISTENER ADDED: ' + type);
                }
                return originalAddEventListener.call(this, type, listener, options);
              };
              
              // Override dispatchEvent to log dispatched events
              window.dispatchEvent = function(event) {
                if (event.type === 'orderDetailsUpdated' || event.type === 'testOrderUpdate') {
                  console.log('🚀 EVENT DISPATCHED: ' + event.type, event.detail);
                }
                return originalDispatchEvent.call(this, event);
              };
              
              console.log('✅ Global event debugging enabled');
            `,
          }}
        />
        {children}
      </body>
    </html>
  )
}