import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('🔧 VAPI Webhook received:', body);

    // Handle different types of VAPI messages
    switch (body.message?.type) {
      case 'function-call':
        return handleFunctionCall(body);
      
      case 'status-update':
        console.log('📊 VAPI Status Update:', body.message);
        return NextResponse.json({ received: true });
      
      case 'transcript':
        console.log('📝 VAPI Transcript:', body.message);
        return NextResponse.json({ received: true });
      
      default:
        console.log('📩 VAPI Message:', body.message);
        return NextResponse.json({ received: true });
    }
  } catch (error) {
    console.error('❌ Error processing VAPI webhook:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function handleFunctionCall(body: any) {
  const { message } = body;
  const functionCall = message.functionCall;

  console.log('🔧 Function call received:', functionCall);

  try {
    switch (functionCall.name) {
      case 'updateOrder':
        return handleUpdateOrder(functionCall);
      
      case 'getMenu':
        return handleGetMenu(functionCall);
      
      default:
        console.log('❓ Unknown function:', functionCall.name);
        return NextResponse.json({
          result: `Function ${functionCall.name} not implemented`
        });
    }
  } catch (error) {
    console.error('❌ Error executing function:', error);
    return NextResponse.json({
      error: 'Function execution failed'
    }, { status: 500 });
  }
}

function handleUpdateOrder(functionCall: any) {
  const { parameters } = functionCall;
  
  console.log('📋 Update order called with:', parameters);
  console.log('📋 Full function call object:', JSON.stringify(functionCall, null, 2));
  
  // Validar orden data
  if (!parameters.orderDetailsData || !Array.isArray(parameters.orderDetailsData)) {
    console.error('❌ Invalid order data format:', parameters);
    return NextResponse.json({
      error: 'Formato de datos de orden inválido'
    }, { status: 400 });
  }

  // Procesar la actualización de orden
  const orderItems = parameters.orderDetailsData;
  const totalAmount = orderItems.reduce((sum: number, item: any) => {
    return sum + (item.price * item.quantity);
  }, 0);

  console.log('✅ Order processed:', {
    items: orderItems.length,
    total: totalAmount,
    orderData: orderItems
  });

  // Respuesta en español
  return NextResponse.json({
    result: `Orden actualizada exitosamente. ${orderItems.length} artículos, total: $${totalAmount.toFixed(2)}`
  });
}

function handleGetMenu(functionCall: any) {
  console.log('📋 Get menu called');
  
  const menu = {
    donas: [
      { name: "DONA GLASEADA CON ESPECIAS DE CALABAZA", price: 1.29 },
      { name: "DONA DE PASTEL CON ESPECIAS DE CALABAZA", price: 1.29 },
      { name: "DONA OLD FASHIONED", price: 1.29 },
      { name: "DONA GLASEADA DE CHOCOLATE", price: 1.09 },
      { name: "DONA GLASEADA DE CHOCOLATE CON CHISPITAS", price: 1.09 },
      { name: "DONA RELLENA DE FRAMBUESA", price: 1.09 },
      { name: "DONA DE PASTEL DE ARÁNDANOS", price: 1.09 },
      { name: "DONA GLASEADA DE FRESA CON CHISPITAS", price: 1.09 },
      { name: "DONA RELLENA DE LIMÓN", price: 1.09 },
      { name: "HOYOS DE DONA", price: 3.99 }
    ],
    bebidas: [
      { name: "CAFÉ CON ESPECIAS DE CALABAZA", price: 2.59 },
      { name: "LATTE CON ESPECIAS DE CALABAZA", price: 4.59 },
      { name: "CAFÉ AMERICANO REGULAR", price: 1.79 },
      { name: "CAFÉ AMERICANO DESCAFEINADO", price: 1.79 },
      { name: "LATTE", price: 3.49 },
      { name: "CAPUCHINO", price: 3.49 },
      { name: "MACCHIATO DE CARAMELO", price: 3.49 },
      { name: "LATTE DE MOCHA", price: 3.49 },
      { name: "LATTE DE MOCHA CON CARAMELO", price: 3.49 }
    ]
  };

  return NextResponse.json({
    result: JSON.stringify(menu)
  });
}

// Handle GET requests (for testing)
export async function GET() {
  return NextResponse.json({
    message: 'VAPI webhook endpoint is working',
    timestamp: new Date().toISOString()
  });
}