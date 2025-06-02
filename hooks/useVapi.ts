'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface FunctionCall {
  name: string;
  parameters?: any;
}

interface UseVapiOptions {
  publicKey: string;
  assistantId: string;
  onFunctionCall?: (functionCall: FunctionCall) => void;
}

interface UseVapiReturn {
  volumeLevel: number;
  isSessionActive: boolean;
  isSpeechActive: boolean;
  messages: Message[];
  start: () => Promise<void>;
  stop: () => void;
  toggleMute: () => void;
}

export default function useVapi({ 
  publicKey, 
  assistantId, 
  onFunctionCall 
}: UseVapiOptions): UseVapiReturn {
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [isSpeechActive, setIsSpeechActive] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isMuted, setIsMuted] = useState(false);
  
  const vapiRef = useRef<any>(null);
  const isInitialized = useRef(false);

  // Initialize VAPI
  useEffect(() => {
    if (typeof window === 'undefined' || isInitialized.current) return;

    const initVapi = async () => {
      try {
        // Dynamically import VAPI
        const { default: Vapi } = await import('@vapi-ai/web');
        
        const vapi = new Vapi(publicKey);
        vapiRef.current = vapi;

        // Set up event listeners
        vapi.on('call-start', () => {
          console.log('Call started');
          setIsSessionActive(true);
        });

        vapi.on('call-end', () => {
          console.log('Call ended');
          setIsSessionActive(false);
          setIsSpeechActive(false);
        });

        vapi.on('speech-start', () => {
          console.log('Speech started');
          setIsSpeechActive(true);
        });

        vapi.on('speech-end', () => {
          console.log('Speech ended');
          setIsSpeechActive(false);
        });

        vapi.on('volume-level', (volume: number) => {
          setVolumeLevel(volume);
        });

        vapi.on('message', (message: any) => {
          console.log('Message received:', message);
          
          if (message.type === 'transcript') {
            if (message.transcriptType === 'final') {
              setMessages(prev => [...prev, {
                role: 'user',
                content: message.transcript
              }]);
            }
          }
          
          if (message.type === 'function-call') {
            console.log('Function call:', message);
            onFunctionCall?.(message.functionCall);
          }

          if (message.type === 'tool-calls') {
            console.log('Tool calls:', message);
            message.toolCalls?.forEach((toolCall: any) => {
              if (toolCall.function) {
                onFunctionCall?.({
                  name: toolCall.function.name,
                  parameters: JSON.parse(toolCall.function.arguments || '{}')
                });
              }
            });
          }
        });

        vapi.on('error', (error: any) => {
          console.error('VAPI Error:', error);
        });

        isInitialized.current = true;
        console.log('VAPI initialized successfully');
      } catch (error) {
        console.error('Failed to initialize VAPI:', error);
      }
    };

    initVapi();

    return () => {
      if (vapiRef.current) {
        vapiRef.current.stop();
      }
    };
  }, [publicKey, onFunctionCall]);

  const start = useCallback(async () => {
    if (!vapiRef.current || !assistantId) {
      console.error('VAPI not initialized or missing assistant ID');
      return;
    }

    try {
      await vapiRef.current.start({
        assistantId: assistantId,
        assistantOverrides: {
          firstMessage: 'Hola! Bienvenido a Dr. Donut. ¿En qué puedo ayudarte hoy?'
        }
      });
    } catch (error) {
      console.error('Failed to start call:', error);
      throw error;
    }
  }, [assistantId]);

  const stop = useCallback(() => {
    if (vapiRef.current) {
      vapiRef.current.stop();
    }
  }, []);

  const toggleMute = useCallback(() => {
    if (vapiRef.current) {
      if (isMuted) {
        vapiRef.current.setMuted(false);
      } else {
        vapiRef.current.setMuted(true);
      }
      setIsMuted(!isMuted);
    }
  }, [isMuted]);

  return {
    volumeLevel,
    isSessionActive,
    isSpeechActive,
    messages,
    start,
    stop,
    toggleMute
  };
}