import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('🔧 Function call received:', JSON.stringify(body, null, 2));

    // Extract the function call details
    const message = body.message;
    if (!message || message.type !== 'function-call') {
      return NextResponse.json({ error: 'Invalid function call format' }, { status: 400 });
    }

    const functionCall = message.functionCall;
    if (!functionCall || !functionCall.name) {
      return NextResponse.json({ error: 'Missing function call name' }, { status: 400 });
    }

    // Handle updateOrder function
    if (functionCall.name === 'updateOrder') {
      try {
        const parameters = typeof functionCall.parameters === 'string' 
          ? JSON.parse(functionCall.parameters) 
          : functionCall.parameters;

        const orderData = parameters.orderDetailsData;
        
        if (!orderData || !Array.isArray(orderData)) {
          console.error('❌ Invalid order data:', orderData);
          return NextResponse.json({
            result: "Error: Formato de datos de orden inválido. Por favor, proporciona la información de la orden correctamente."
          });
        }

        console.log('📋 Processing order update:', orderData);

        // Calculate total
        const total = orderData.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const itemCount = orderData.reduce((sum, item) => sum + item.quantity, 0);

        // Format response
        const itemList = orderData.map(item => 
          `${item.quantity}x ${item.name} ($${item.price.toFixed(2)} c/u)`
        ).join(', ');

        console.log('✅ Order processed successfully');

        return NextResponse.json({
          result: `Orden actualizada exitosamente: ${itemList}. Total: ${itemCount} artículos por $${total.toFixed(2)}.`
        });

      } catch (error) {
        console.error('❌ Error processing updateOrder:', error);
        return NextResponse.json({
          result: "Error procesando la orden. Por favor, intenta nuevamente."
        });
      }
    }

    // Handle unknown functions
    console.log('❓ Unknown function:', functionCall.name);
    return NextResponse.json({
      result: `Función ${functionCall.name} no implementada.`
    });

  } catch (error) {
    console.error('❌ Server error:', error);
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}