import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Basic health check - verify environment variables
    const requiredEnvVars = [
      'NEXT_PUBLIC_VAPI_PUBLIC_KEY',
      'NEXT_PUBLIC_VAPI_ASSISTANT_ID', 
      'NEXT_PUBLIC_SIMLI_API_KEY',
      'NEXT_PUBLIC_SIMLI_FACE_ID'
    ];

    const missingVars = requiredEnvVars.filter(
      varName => !process.env[varName]
    );

    const status = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      version: '1.0.0',
      services: {
        vapi: {
          configured: !!process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY && !!process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID,
          publicKey: process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY ? 'present' : 'missing',
          assistantId: process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID ? 'present' : 'missing'
        },
        simli: {
          configured: !!process.env.NEXT_PUBLIC_SIMLI_API_KEY && !!process.env.NEXT_PUBLIC_SIMLI_FACE_ID,
          apiKey: process.env.NEXT_PUBLIC_SIMLI_API_KEY ? 'present' : 'missing',
          faceId: process.env.NEXT_PUBLIC_SIMLI_FACE_ID ? 'present' : 'missing'
        }
      },
      warnings: missingVars.length > 0 ? [`Missing environment variables: ${missingVars.join(', ')}`] : []
    };

    // Return unhealthy if critical env vars are missing
    if (missingVars.length > 0) {
      status.status = 'unhealthy';
      return NextResponse.json(status, { status: 503 });
    }

    return NextResponse.json(status, { status: 200 });
    
  } catch (error) {
    console.error('Health check failed:', error);
    
    return NextResponse.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 503 });
  }
}