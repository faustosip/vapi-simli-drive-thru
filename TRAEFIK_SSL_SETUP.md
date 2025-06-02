# 🚀 SETUP COMPLETO SOPHIA AI - TRAEFIK SSL

## ✅ **PROBLEMAS SOLUCIONADOS:**

1. **✅ Dependencias NPM** - Corregidas versiones React compatibles
2. **✅ Configuración Traefik** - Igual que tu Flowise funcionando
3. **✅ SSL Automático** - Configurado para `sophia.faustoparedesia.com`
4. **✅ Red Externa** - Usando `faustoparedesnet` existente

---

## 🔧 **PASO 1: Preparar el Servidor**

### **1. Crear Volumen Externo:**
```bash
# SSH a tu servidor
ssh usuario@tuservidor.com

# Crear volumen para Sophia
docker volume create sophia_data

# Verificar que existe
docker volume ls | grep sophia_data
```

### **2. Verificar Red y Traefik:**
```bash
# Verificar red faustoparedesnet
docker network ls | grep faustoparedesnet

# Verificar que Traefik está funcionando
docker service ls | grep traefik
# O docker ps | grep traefik
```

---

## 🚀 **PASO 2: Deploy en Portainer**

### **1. Actualizar Stack Existente:**
1. **Portainer** → **Stacks** → `vapi-simli-drive-thru`
2. **"Update stack"** → **"Pull and redeploy"**

### **2. O Crear Nuevo Stack:**
1. **Delete** stack anterior si falló
2. **Add Stack** → **Repository**
3. **Configuración:**
   - **Name:** `sophia-ai`
   - **Repository URL:** `https://github.com/faustosip/vapi-simli-drive-thru`
   - **Reference:** `refs/heads/main`
   - **Compose path:** `docker-compose.yml`
   - ✅ **Automatic updates**

### **3. Variables de Entorno (CRÍTICAS):**
```env
NEXT_PUBLIC_VAPI_PUBLIC_KEY=your-vapi-public-key-here
VAPI_PRIVATE_KEY=your-vapi-private-key-here
NEXT_PUBLIC_VAPI_ASSISTANT_ID=your-vapi-assistant-id-here
NEXT_PUBLIC_SIMLI_API_KEY=your-simli-api-key-here
NEXT_PUBLIC_SIMLI_FACE_ID=your-simli-face-id-here
```

4. **Deploy Stack**

---

## ⏱️ **PROCESO ESPERADO (5-7 MINUTOS):**

### **1. Deploy Inicial (0-30s):**
```
Creating service sophia-ai_vapi-simli-drive-thru
✅ Sin errores de red o dependencias
```

### **2. Instalación (30s-3min):**
```bash
🚀 Starting VAPI Simli Drive-Thru Application...
📦 First time setup - installing dependencies...
# Instala git, curl, wget
# git clone del repositorio
```

### **3. Build (3-6min):**
```bash
npm install --legacy-peer-deps  # ✅ Sin errores de React
npm run build                   # Compila Next.js
```

### **4. Aplicación Lista (6min+):**
```bash
✅ Starting application on port 3000...
Ready on http://localhost:3000
```

### **5. SSL Automático (6-8min):**
```bash
# Traefik configura automáticamente SSL
# Certificado Let's Encrypt para sophia.faustoparedesia.com
```

---

## 🌐 **VERIFICAR QUE FUNCIONA:**

### **1. Logs en Portainer:**
- **Stacks** → `sophia-ai` → **Services** → **Logs**
- Buscar: `Ready on http://localhost:3000`

### **2. Health Check:**
```bash
curl https://sophia.faustoparedesia.com/api/health
# Debe devolver: {"status": "healthy"}
```

### **3. Aplicación Completa:**
```bash
# Abrir en navegador:
https://sophia.faustoparedesia.com

# Debe mostrar:
- ✅ Certificado SSL válido (candado verde)
- ✅ Sophia avatar cargada
- ✅ Botón "Pedir" funcional
- ✅ Micrófono funciona (pedir permiso)
```

---

## 🔧 **CONFIGURACIÓN TRAEFIK APLICADA:**

### **Labels Configurados:**
```yaml
traefik.enable=true
traefik.http.routers.sophia.rule=Host(`sophia.faustoparedesia.com`)
traefik.http.services.sophia.loadBalancer.server.port=3000
traefik.http.routers.sophia.service=sophia
traefik.http.routers.sophia.entrypoints=websecure
traefik.http.routers.sophia.tls.certresolver=letsencryptresolver
```

### **Red y Volumen:**
- **Red:** `faustoparedesnet` (misma que Flowise)
- **Volumen:** `sophia_data` (persistente para node_modules)
- **SSL:** Automático via Let's Encrypt

---

## 🛠️ **TROUBLESHOOTING:**

### **Si el volumen no existe:**
```bash
# Error: "volume sophia_data not found"
docker volume create sophia_data
# Luego redeploy del stack
```

### **Si la red no existe:**
```bash
# Error: "network faustoparedesnet not found"
# Verificar que Traefik está corriendo
docker service ls | grep traefik
```

### **Si SSL no funciona:**
```bash
# Verificar logs de Traefik
docker service logs $(docker service ls -q --filter name=traefik)
# Buscar: "obtaining certificate for sophia.faustoparedesia.com"
```

### **Si npm install falla:**
```bash
# Ver logs del container
# Debería mostrar: "npm install --legacy-peer-deps"
# Sin errores de React version conflicts
```

---

## 📊 **MONITOREO:**

### **URLs de Verificación:**
- **App:** https://sophia.faustoparedesia.com
- **Health:** https://sophia.faustoparedesia.com/api/health
- **VAPI Test:** https://sophia.faustoparedesia.com/api/vapi

### **Metrics Esperadas:**
- **Boot Time:** 5-7 minutos first time
- **Memory:** ~300-500MB
- **CPU:** <10% idle, <30% durante conversaciones
- **SSL Score:** A+ en SSL Labs

---

## 🎯 **RESULTADO FINAL:**

Con esta configuración obtendrás:

1. ✅ **HTTPS funcionando** en `sophia.faustoparedesia.com`
2. ✅ **SSL automático** via Let's Encrypt + Traefik
3. ✅ **Sophia AI operativa** con voice ordering
4. ✅ **GitOps automático** desde GitHub
5. ✅ **Integración completa** con tu infraestructura existente
6. ✅ **Sin errores** de dependencias o redes

---

## 📞 **SOPORTE:**

### **Si necesitas ayuda:**
1. **Screenshot** de logs en Portainer
2. **Verificar** que el volumen `sophia_data` existe
3. **Confirmar** que las variables de entorno están configuradas
4. **Revisar** que Traefik está funcionando correctamente

**¡Sophia AI estará lista en 7 minutos con SSL completo! 🚀**