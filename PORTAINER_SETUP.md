# 🚀 PORTAINER DEPLOYMENT GUIDE

## 📋 **Repositorio Creado**

✅ **GitHub Repository:** https://github.com/faustosip/vapi-simli-drive-thru  
✅ **Usuario:** faustosip  
✅ **Archivos Docker:** Dockerfile, docker-compose.yml incluidos  

---

## 🔧 **PASO 1: Configurar Stack en Portainer**

### 1. **Acceder a Portainer**
- Ir a tu instancia de Portainer
- Navegar a **Stacks** → **Add Stack**

### 2. **Configurar Repository**
- **Name:** `vapi-simli-drive-thru`
- **Build method:** ✅ **Repository**
- **Repository URL:** `https://github.com/faustosip/vapi-simli-drive-thru`
- **Reference:** `refs/heads/main`
- **Compose path:** `docker-compose.yml`
- ✅ **Automatic updates** (GitOps mode)

### 3. **Variables de Entorno Requeridas**

Agregar estas variables en la sección **Environment variables:**

```env
# VAPI Configuration (REQUERIDO)
NEXT_PUBLIC_VAPI_PUBLIC_KEY=your-vapi-public-key-here
VAPI_PRIVATE_KEY=your-vapi-private-key-here  
NEXT_PUBLIC_VAPI_ASSISTANT_ID=your-vapi-assistant-id-here

# Simli Configuration (REQUERIDO)
NEXT_PUBLIC_SIMLI_API_KEY=your-simli-api-key-here
NEXT_PUBLIC_SIMLI_FACE_ID=your-simli-face-id-here

# Server Configuration (OPCIONAL)
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

### 4. **Deploy Stack**
- Click **Deploy the stack**
- Portainer descargará automáticamente desde GitHub
- Build del Docker image
- Deployment del contenedor

---

## 🌐 **PASO 2: Configurar DNS/Proxy (Opcional)**

Si usas un reverse proxy como Nginx o Traefik:

```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## 🔄 **PASO 3: Auto-Deploy (GitOps)**

### **Flujo Automático:**
1. **Hacer cambios** en el código local
2. **Push a GitHub** → `git push origin main`  
3. **Portainer detecta** cambios automáticamente
4. **Re-deploy** automático del stack
5. **Nueva versión** live inmediatamente

### **Manual Redeploy:**
- En Portainer → Stacks → `vapi-simli-drive-thru`
- Click **Update stack**
- Click **Pull and redeploy**

---

## ✅ **VERIFICACIÓN**

### **1. Estado del Stack**
- Portainer → Stacks → Verificar estado "Running"
- Revisar logs del contenedor

### **2. Aplicación Funcionando**
- Acceder a `http://your-server:3000`
- Verificar que Sophia aparece
- Probar iniciar una orden de voz

### **3. Variables de Entorno**
```bash
# Verificar dentro del contenedor
docker exec -it <container-name> printenv | grep VAPI
docker exec -it <container-name> printenv | grep SIMLI
```

---

## 🔧 **CONFIGURACIÓN AVANZADA**

### **Health Checks**
El docker-compose incluye health checks automáticos:
```yaml
healthcheck:
  test: ["CMD-SHELL", "curl -f http://localhost:3000/api/health || exit 1"]
  interval: 30s
  timeout: 10s
  retries: 3
```

### **Logs y Monitoring**
```bash
# Ver logs en tiempo real
docker logs -f <container-name>

# Logs de Portainer
# Portainer → Containers → Select container → Logs
```

### **Backup/Restore**
```bash
# Backup del stack
docker-compose -f docker-compose.yml config > backup-compose.yml

# Restore
# Usar Portainer UI para re-deploy desde backup
```

---

## 🛠️ **TROUBLESHOOTING**

### **Container no inicia:**
```bash
# Verificar logs
docker logs <container-name>

# Verificar variables de entorno
docker exec <container-name> printenv
```

### **Build falla:**
- Verificar que el repositorio sea público
- Confirmar que `docker-compose.yml` está en la raíz
- Revisar sintaxis del Dockerfile

### **App no responde:**
- Verificar puerto 3000 está expuesto
- Confirmar variables VAPI/Simli son correctas
- Revisar logs de la aplicación

---

## 📚 **RECURSOS**

- **GitHub Repo:** https://github.com/faustosip/vapi-simli-drive-thru
- **VAPI Dashboard:** https://dashboard.vapi.ai
- **Simli Dashboard:** https://simli.ai
- **Next.js Docs:** https://nextjs.org/docs

---

## 🎯 **RESULTADO ESPERADO**

Una vez configurado correctamente:

1. ✅ **Auto-deploy** desde GitHub
2. ✅ **Sophia AI** funcionando
3. ✅ **Órdenes de voz** procesándose
4. ✅ **UI responsiva** y moderna
5. ✅ **Actualizaciones** automáticas con cada push

**¡Tu Drive-Thru AI está listo para producción! 🚗🍩**