# 🚀 PORTAINER DEPLOYMENT GUIDE - SWARM & STANDALONE

## ⚠️ **ERROR RESUELTO: "build, restart not supported"**

Si recibes el error:
```
Deployment error
Ignoring unsupported options: build, restart
invalid reference format
```

**CAUSA:** Tu Portainer está en modo **Docker Swarm**, que no soporta `build` y `restart`.

**SOLUCIÓN:** Usar el `docker-compose.yml` actualizado que es compatible con Swarm.

---

## 📋 **Repositorio Configurado**

✅ **GitHub Repository:** https://github.com/faustosip/vapi-simli-drive-thru  
✅ **Usuario:** faustosip  
✅ **Archivos:** Compatible con Swarm y Standalone  

---

## 🔧 **PASO 1: Identificar tu Modo de Portainer**

### **Verificar si estás en Swarm:**
1. Ir a **Portainer** → **Dashboard**
2. Buscar en la esquina superior:
   - ✅ **"Swarm"** = Docker Swarm mode
   - ✅ **"Standalone"** = Docker Compose normal

---

## 🐳 **PASO 2A: Configuración para SWARM (Recomendado)**

### **1. Crear Stack en Portainer**
- **Name:** `vapi-simli-drive-thru`
- **Build method:** ✅ **Repository**
- **Repository URL:** `https://github.com/faustosip/vapi-simli-drive-thru`
- **Reference:** `refs/heads/main`
- **Compose path:** `docker-compose.yml` ← **Usa el archivo principal**
- ✅ **Automatic updates**

### **2. Variables de Entorno (REQUERIDAS)**
```env
NEXT_PUBLIC_VAPI_PUBLIC_KEY=your-vapi-public-key-here
VAPI_PRIVATE_KEY=your-vapi-private-key-here  
NEXT_PUBLIC_VAPI_ASSISTANT_ID=your-vapi-assistant-id-here
NEXT_PUBLIC_SIMLI_API_KEY=your-simli-api-key-here
NEXT_PUBLIC_SIMLI_FACE_ID=your-simli-face-id-here
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

### **3. Deploy Stack**
- Click **Deploy the stack**
- ✅ **Sin errores de build/restart**
- El container clonará automáticamente desde GitHub

---

## 🔧 **PASO 2B: Configuración para STANDALONE**

Si tu Portainer NO está en Swarm:

### **1. Usar el archivo standalone**
- **Compose path:** `docker-compose.standalone.yml`
- Todo lo demás igual que Swarm

### **2. O cambiar Portainer a Swarm**
```bash
# En tu servidor Docker
docker swarm init
# Reiniciar Portainer
```

---

## 📊 **DIFERENCIAS ENTRE VERSIONES**

### **docker-compose.yml (SWARM):**
- ✅ Sin `build` - usa imagen base + git clone
- ✅ Sin `restart` - usa `deploy.restart_policy`
- ✅ Red `overlay` para Swarm
- ✅ Volume persistente para código
- ✅ Health checks con `wget`

### **docker-compose.standalone.yml:**
- ✅ Con `build` - construye imagen local
- ✅ Con `restart: unless-stopped`
- ✅ Red `bridge` estándar
- ✅ Health checks con `curl`

---

## 🚀 **PASO 3: Verificar Deployment**

### **1. Estado del Stack**
- Portainer → Stacks → Verificar "Running"
- Ver logs: "🚀 First time setup - cloning repository..."

### **2. Health Check**
```bash
curl http://your-server:3000/api/health
# Esperar ~2-3 minutos para el primer build
```

### **3. Aplicación Lista**
```bash
# Cuando veas en logs:
"✅ Starting application..."
"Ready on http://localhost:3000"
```

---

## 🔄 **FLUJO AUTOMÁTICO (GitOps)**

### **Cómo funciona:**
1. **Cambio en GitHub** → Push al repositorio
2. **Portainer detecta** → Auto-redeploy automático
3. **Container actualiza** → Nuevo código sin downtime
4. **Health check** → Verifica que funciona

### **Tiempos esperados:**
- **Primer deploy:** 3-5 minutos (instalar + build)
- **Updates posteriores:** 1-2 minutos (solo rebuild)
- **Rollback:** 30 segundos

---

## ⚡ **OPTIMIZACIONES INCLUIDAS**

### **Para Swarm:**
- **Replicas:** 1 (puede escalarse)
- **Memory limits:** 512MB max, 256MB reservado
- **Restart policy:** Reinicio automático en falla
- **Update strategy:** Rolling update sin downtime
- **Health monitoring:** Cada 30 segundos

### **Volumen persistente:**
- **app-data:** Mantiene node_modules entre deploys
- **Faster rebuilds:** No reinstalar dependencias cada vez

---

## 🛠️ **TROUBLESHOOTING**

### **Error: "invalid reference format"**
```bash
# Verificar variables de entorno en Portainer
# NO deben tener espacios ni caracteres especiales
```

### **Container no inicia:**
```bash
# Ver logs en Portainer
# Buscar: "Error" o "Failed"
# Verificar que todas las env vars están configuradas
```

### **App no responde después de 5 minutos:**
```bash
# Verificar logs para:
"npm install" - debe completarse
"npm run build" - debe completarse  
"npm start" - debe mostrar "Ready on port 3000"
```

### **GitOps no funciona:**
```bash
# Verificar en Portainer:
# Stack → Settings → ✅ "Automatic updates" habilitado
# Repository URL es correcto
# Branch es "main"
```

---

## 🔧 **COMANDOS ÚTILES**

### **Forzar actualización manual:**
```bash
# En Portainer UI:
Stacks → vapi-simli-drive-thru → "Update stack" → "Pull and redeploy"
```

### **Ver logs en tiempo real:**
```bash
# En Portainer UI:
Stacks → vapi-simli-drive-thru → Containers → Logs
```

### **Reiniciar stack:**
```bash
# En Portainer UI:
Stacks → vapi-simli-drive-thru → "Stop" → "Start"
```

---

## 📈 **MONITOREO**

### **Health Endpoint:**
```bash
GET http://your-server:3000/api/health

# Respuesta esperada:
{
  "status": "healthy",
  "services": {
    "vapi": { "configured": true },
    "simli": { "configured": true }
  }
}
```

### **Métricas del Container:**
- **CPU:** <10% en idle, <30% en uso
- **RAM:** ~100-300MB dependiendo del tráfico
- **Disk:** ~500MB para node_modules + código

---

## 🎯 **RESULTADO FINAL**

Con esta configuración obtendrás:

1. ✅ **Deploy sin errores** en Swarm
2. ✅ **GitOps automático** desde GitHub
3. ✅ **Sophia AI funcionando** perfectamente
4. ✅ **Auto-scaling** si es necesario
5. ✅ **Monitoring** automático
6. ✅ **Updates** sin downtime

---

## 📞 **SOPORTE RÁPIDO**

### **Si sigues teniendo problemas:**

1. **Verificar variables de entorno** en Portainer
2. **Revisar logs** del container por errores
3. **Confirmar modo Swarm/Standalone** en Portainer
4. **Usar el archivo compose correcto** según tu setup

### **Enlaces importantes:**
- 🔗 **Repo:** https://github.com/faustosip/vapi-simli-drive-thru
- 📋 **Issues:** https://github.com/faustosip/vapi-simli-drive-thru/issues
- 🏥 **Health:** `http://your-server:3000/api/health`

**¡El error está resuelto! Tu deployment debería funcionar ahora 🚀**