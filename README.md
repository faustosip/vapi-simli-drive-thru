# 🚗 Dr. Donut Drive-Thru - VAPI + Simli

AI-Powered Drive-Thru Experience using **VAPI Voice AI** and **Simli Avatar Technology**.

![Dr. Donut Drive-Thru](https://img.shields.io/badge/Status-Production%20Ready-green)
![VAPI](https://img.shields.io/badge/VAPI-Voice%20AI-blue)
![Simli](https://img.shields.io/badge/Simli-Avatar-purple)
![Docker](https://img.shields.io/badge/Docker-Ready-blue)

## ✨ Features

- 🎭 **Realistic AI Avatar** - Powered by Simli with lip-sync technology
- 🗣️ **Natural Voice Conversations** - VAPI handles speech-to-text and text-to-speech
- 📋 **Real-time Order Management** - Live order updates with visual feedback
- 🔧 **Function Calling** - Automatic order processing through VAPI tools
- 📱 **Responsive Design** - Works on desktop and mobile devices
- ⚡ **Low Latency** - <500ms response times for natural conversations
- 🐳 **Docker Ready** - Production deployment with Docker & Portainer
- 🚀 **Auto-Deploy** - GitOps workflow with automatic updates

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Voice AI**: VAPI (Voice AI Platform)
- **Avatar**: Simli Client SDK
- **Styling**: Tailwind CSS with custom animations
- **Icons**: Lucide React
- **Deployment**: Docker, Portainer, GitOps

## 🚀 Quick Start

### Local Development

```bash
# Clone repository
git clone https://github.com/faustosip/vapi-simli-drive-thru.git
cd vapi-simli-drive-thru

# Install dependencies
npm install

# Configure environment
cp .env.example .env.local
# Edit .env.local with your API keys

# Run development server
npm run dev
```

### Production Deployment

📋 **[Complete Portainer Setup Guide](PORTAINER_SETUP.md)**

**Quick Docker Deploy:**
```bash
# Clone repository
git clone https://github.com/faustosip/vapi-simli-drive-thru.git
cd vapi-simli-drive-thru

# Set environment variables
export NEXT_PUBLIC_VAPI_PUBLIC_KEY="your-vapi-key"
export NEXT_PUBLIC_VAPI_ASSISTANT_ID="your-assistant-id"
export NEXT_PUBLIC_SIMLI_API_KEY="your-simli-key"
export NEXT_PUBLIC_SIMLI_FACE_ID="your-face-id"

# Deploy with Docker Compose
docker-compose up -d

# Check health
curl http://localhost:3000/api/health
```

## 🔧 Environment Configuration

### Required Environment Variables

```env
# VAPI Configuration (Required)
NEXT_PUBLIC_VAPI_PUBLIC_KEY=your-vapi-public-key-here
VAPI_PRIVATE_KEY=your-vapi-private-key-here
NEXT_PUBLIC_VAPI_ASSISTANT_ID=your-vapi-assistant-id-here

# Simli Configuration (Required)
NEXT_PUBLIC_SIMLI_API_KEY=your-simli-api-key-here
NEXT_PUBLIC_SIMLI_FACE_ID=your-simli-face-id-here

# Server Configuration (Optional)
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Where to Get API Keys

- **VAPI Keys**: [dashboard.vapi.ai](https://dashboard.vapi.ai)
- **Simli Keys**: [simli.ai](https://simli.ai)

## 🎭 VAPI Assistant Configuration

Create an assistant in VAPI dashboard with this function:

```json
{
  "name": "updateOrder",
  "description": "Update the customer's order with items, quantities, and prices",
  "parameters": {
    "type": "object",
    "properties": {
      "orderDetailsData": {
        "type": "array",
        "description": "Array of order items",
        "items": {
          "type": "object",
          "properties": {
            "name": { "type": "string", "description": "Item name" },
            "quantity": { "type": "number", "description": "Quantity" },
            "price": { "type": "number", "description": "Unit price" },
            "specialInstructions": { "type": "string", "description": "Special instructions" }
          },
          "required": ["name", "quantity", "price"]
        }
      }
    },
    "required": ["orderDetailsData"]
  }
}
```

### System Prompt for VAPI Assistant

```
You are a friendly Dr. Donut drive-thru assistant. Help customers order donuts and coffee.

## MENÚ

### DONAS
- DONA GLASEADA CON ESPECIAS DE CALABAZA: $1.29
- DONA DE PASTEL CON ESPECIAS DE CALABAZA: $1.29  
- DONA OLD FASHIONED: $1.29
- DONA GLASEADA DE CHOCOLATE: $1.09
- DONA GLASEADA DE CHOCOLATE CON CHISPITAS: $1.09
- DONA RELLENA DE FRAMBUESA: $1.09
- DONA DE PASTEL DE ARÁNDANOS: $1.09
- DONA GLASEADA DE FRESA CON CHISPITAS: $1.09
- DONA RELLENA DE LIMÓN: $1.09
- HOYOS DE DONA: $3.99

### CAFÉ Y BEBIDAS
- CAFÉ CON ESPECIAS DE CALABAZA: $2.59
- LATTE CON ESPECIAS DE CALABAZA: $4.59
- CAFÉ AMERICANO REGULAR: $1.79
- CAFÉ AMERICANO DESCAFEINADO: $1.79
- LATTE: $3.49
- CAPUCHINO: $3.49
- MACCHIATO DE CARAMELO: $3.49
- LATTE DE MOCHA: $3.49
- LATTE DE MOCHA CON CARAMELO: $3.49

INSTRUCTIONS:
1. Greet customers warmly
2. Take their order naturally
3. Call updateOrder function whenever items are added/modified
4. Confirm orders before finalizing
5. Be helpful and suggest popular items

Always use the updateOrder function when the customer adds items to their order.
```

## 🐳 Docker & Production

### Docker Images
- **Base**: Node.js 18 Alpine
- **Build**: Multi-stage optimized build
- **Size**: ~150MB compressed
- **Health**: Built-in health checks

### Features
- ✅ **Production optimized** Next.js build
- ✅ **Health checks** for monitoring
- ✅ **Auto-restart** on failure
- ✅ **Environment validation**
- ✅ **Minimal attack surface**

### Monitoring
```bash
# Health check endpoint
GET /api/health

# Response example
{
  "status": "healthy",
  "timestamp": "2025-06-02T03:42:00Z",
  "services": {
    "vapi": { "configured": true },
    "simli": { "configured": true }
  }
}
```

## 📋 How to Use

1. **Wait for Avatar**: Sophia will initialize automatically
2. **Start Conversation**: Click "Pedir" when avatar is ready
3. **Place Order**: Speak naturally to order items
4. **View Order**: Real-time order updates appear on the right
5. **Finalize**: Click "Finalizar" to complete
6. **New Order**: Start fresh for next customer

## 🔗 API Endpoints

- `POST /api/vapi` - Webhook for VAPI function calls
- `POST /api/updateOrder` - Order processing endpoint
- `GET /api/health` - Health check for monitoring
- `GET /api/vapi` - VAPI webhook health check

## 🎨 Customization

### Styling
- Modify `app/globals.css` for global styles
- Update Tailwind config in `tailwind.config.js`
- Customize colors and animations in components

### Menu Items
- Update menu in `/app/api/vapi/route.ts`
- Modify VAPI assistant system prompt
- Add new function calls as needed

### Avatar
- Change face ID in environment variables
- Customize avatar settings in `SimliAvatar.tsx`

## 🚀 Deployment Options

### 1. **Portainer (Recommended)**
- GitOps auto-deployment
- Web UI management
- Built-in monitoring
- [Complete Guide](PORTAINER_SETUP.md)

### 2. **Vercel**
```bash
# Deploy to Vercel
npm i -g vercel
vercel --prod
```

### 3. **Traditional VPS**
```bash
# Build and start
npm run build
npm start
```

### 4. **Docker**
```bash
# Build image
docker build -t vapi-simli-drive-thru .

# Run container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_VAPI_PUBLIC_KEY="your-key" \
  -e NEXT_PUBLIC_VAPI_ASSISTANT_ID="your-id" \
  -e NEXT_PUBLIC_SIMLI_API_KEY="your-key" \
  -e NEXT_PUBLIC_SIMLI_FACE_ID="your-id" \
  vapi-simli-drive-thru
```

## 🛠️ Development

### Project Structure

```
vapi-simli-drive-thru/
├── app/                 # Next.js app directory
│   ├── api/            # API routes
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/          # React components
│   ├── DriveThru.tsx   # Main component
│   ├── SimliAvatar.tsx # Avatar integration
│   └── OrderDetails.tsx # Order management
├── hooks/              # Custom React hooks
│   └── useVapi.ts      # VAPI integration
├── lib/                # Utility functions
├── types/              # TypeScript types
├── public/             # Static assets
├── Dockerfile          # Docker configuration
├── docker-compose.yml  # Docker Compose setup
└── PORTAINER_SETUP.md  # Deployment guide
```

### Key Components

- `DriveThru.tsx` - Main application component
- `SimliAvatar.tsx` - Avatar integration with state management
- `OrderDetails.tsx` - Order display and management
- `useVapi.ts` - VAPI integration hook with tool-calls support

### Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Check TypeScript types
```

## 📊 Performance

- **Voice Response**: <500ms with VAPI
- **Avatar Sync**: Real-time lip synchronization
- **Order Updates**: Instant UI updates via tool-calls
- **Bundle Size**: Optimized for fast loading
- **Memory Usage**: ~50MB RAM (production)
- **CPU Usage**: <5% idle, <20% active conversation

## 🔒 Security

- ✅ API keys stored as environment variables
- ✅ No sensitive data in client-side code
- ✅ VAPI webhooks validate incoming requests
- ✅ All communications are encrypted (HTTPS)
- ✅ Docker security best practices
- ✅ Health checks for monitoring

## 🐛 Troubleshooting

### Avatar Not Loading
```bash
# Check Simli configuration
docker logs <container> | grep -i simli

# Verify API keys
curl http://localhost:3000/api/health
```

### Voice Not Working
```bash
# Check VAPI configuration
docker logs <container> | grep -i vapi

# Test webhook endpoint
curl -X GET http://localhost:3000/api/vapi
```

### Orders Not Updating
```bash
# Check tool-calls processing
docker logs <container> | grep "tool-calls"

# Verify function call handler
docker logs <container> | grep "updateOrder"
```

### Docker Issues
```bash
# Rebuild image
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# Check container status
docker-compose ps
docker-compose logs -f
```

## 📈 Monitoring

### Health Checks
```bash
# Application health
curl http://localhost:3000/api/health

# Container health
docker inspect <container> | grep Health

# Portainer monitoring
# Access via Portainer UI > Containers > Logs & Stats
```

### Logs
```bash
# Application logs
docker logs -f <container>

# Specific component logs
docker logs <container> 2>&1 | grep "VAPI\|Simli\|Order"
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test thoroughly (local + Docker)
5. Submit a pull request

## 📝 License

This project is for demonstration purposes. Please ensure you have valid licenses for VAPI and Simli APIs.

## 📞 Support

### Documentation
- [VAPI Documentation](https://docs.vapi.ai)
- [Simli Documentation](https://docs.simli.ai)
- [Next.js Documentation](https://nextjs.org/docs)
- [Docker Documentation](https://docs.docker.com)

### Quick Links
- **GitHub Issues**: [Report bugs or request features](https://github.com/faustosip/vapi-simli-drive-thru/issues)
- **VAPI Support**: [dashboard.vapi.ai](https://dashboard.vapi.ai)
- **Simli Support**: [simli.ai](https://simli.ai)
- **Deployment Guide**: [PORTAINER_SETUP.md](PORTAINER_SETUP.md)

---

**Built with ❤️ using VAPI, Simli, Next.js, and Docker**

🚀 **Ready for production deployment with Portainer!**