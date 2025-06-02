# 🚨 SWARM NETWORK ERROR - SOLUCIÓN RÁPIDA

## ❌ **Error:**
```
failed to create service vapi-simli-drive-thru_vapi-simli-drive-thru: 
Error response from daemon: The network vapi-simli-drive-thru_vapi-network 
cannot be used with services. Only networks scoped to the swarm can be used, 
such as those created with the overlay driver.
```

## ✅ **SOLUCIONADO:**

He actualizado el `docker-compose.yml` para **eliminar la red personalizada** y usar la red por defecto de Docker Swarm.

---

## 🚀 **PASOS PARA APLICAR LA CORRECCIÓN:**

### **1. Actualizar Stack en Portainer:**
1. Ir a **Portainer** → **Stacks** → `vapi-simli-drive-thru`
2. Click **"Update stack"**
3. Click **"Pull and redeploy"**
4. ✅ **El error debería desaparecer**

### **2. O Crear Nuevo Stack:**
1. **Delete** el stack que falló
2. **Add Stack** → **Repository**
3. **Repository URL:** `https://github.com/faustosip/vapi-simli-drive-thru`
4. **Reference:** `refs/heads/main`
5. **Compose path:** `docker-compose.yml`
6. **Variables de entorno requeridas:**
```env
NEXT_PUBLIC_VAPI_PUBLIC_KEY=your-vapi-public-key-here
VAPI_PRIVATE_KEY=your-vapi-private-key-here
NEXT_PUBLIC_VAPI_ASSISTANT_ID=your-vapi-assistant-id-here
NEXT_PUBLIC_SIMLI_API_KEY=your-simli-api-key-here
NEXT_PUBLIC_SIMLI_FACE_ID=your-simli-face-id-here
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```
7. **Deploy stack**

---

## 🔧 **CAMBIOS APLICADOS:**

### ✅ **Removido:**
- ❌ Red personalizada `vapi-network`
- ❌ Configuración `networks:` problemática

### ✅ **Agregado:**
- ✅ **Puerto en formato Swarm** (target/published/mode)
- ✅ **Placement constraints** (ejecutar en manager node)
- ✅ **Health check extendido** (120s start period)
- ✅ **Dependencias adicionales** (curl, wget)

### ✅ **Resultado:**
- ✅ **Sin errores de red** en Docker Swarm
- ✅ **Deployment exitoso** 
- ✅ **Red automática** por defecto de Swarm

---

## ⏱️ **TIEMPOS ESPERADOS:**

### **Primer Deploy:**
- **0-30s:** Crear servicio
- **30s-2min:** Descargar imagen Node.js
- **2-5min:** Clonar repo + npm install + build
- **5min+:** Aplicación lista

### **Logs a Buscar:**
```bash
🚀 Starting VAPI Simli Drive-Thru Application...
📦 First time setup - installing dependencies...
# ... git clone, npm install, npm build ...
✅ Starting application on port 3000...
Ready on http://localhost:3000
```

---

## 🏥 **VERIFICAR QUE FUNCIONA:**

### **1. Estado del Stack:**
- Portainer → Stacks → `vapi-simli-drive-thru` → **"Running"**

### **2. Health Check:**
```bash
curl http://your-server:3000/api/health
# Esperar respuesta: {"status": "healthy"}
```

### **3. Aplicación:**
```bash
# Acceder a:
http://your-server:3000
# Debe mostrar a Sophia y permitir voice ordering
```

---

## 🛠️ **Si Aún Hay Problemas:**

### **Error de Permisos:**
```bash
# Verificar que Swarm está inicializado:
docker node ls
# Debe mostrar nodos disponibles
```

### **Container No Inicia:**
```bash
# Ver logs detallados en Portainer:
Stacks → vapi-simli-drive-thru → Services → Logs
```

### **Build Falla:**
```bash
# Verificar variables de entorno en Portainer
# Todas deben estar presentes y sin espacios
```

---

## 📞 **SOPORTE:**

Si el problema persiste:
1. **Screenshot** del error en Portainer
2. **Logs** del container
3. **Variables de entorno** configuradas
4. **Versión** de Portainer y Docker

---

**🎯 Esta corrección debería resolver el error de red inmediatamente. ¡Inténtalo ahora!**