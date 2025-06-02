#!/bin/bash

# 🚀 PREPARAR SERVIDOR PARA SOPHIA AI
# Script para configurar volumen y verificar dependencias

echo "🚀 Preparando servidor para Sophia AI..."
echo "📍 Dominio: sophia.faustoparedesia.com"
echo ""

# 1. Verificar Docker Swarm
echo "🔍 Verificando Docker Swarm..."
if docker node ls >/dev/null 2>&1; then
    echo "✅ Docker Swarm está activo"
    docker node ls
else
    echo "❌ Docker Swarm no está activo"
    echo "   Ejecuta: docker swarm init"
    exit 1
fi

echo ""

# 2. Verificar red faustoparedesnet
echo "🌐 Verificando red faustoparedesnet..."
if docker network ls | grep -q faustoparedesnet; then
    echo "✅ Red faustoparedesnet existe"
else
    echo "❌ Red faustoparedesnet no existe"
    echo "   Necesitas crear la red o verificar que Traefik esté funcionando"
    exit 1
fi

echo ""

# 3. Crear volumen sophia_data
echo "💾 Configurando volumen sophia_data..."
if docker volume ls | grep -q sophia_data; then
    echo "✅ Volumen sophia_data ya existe"
else
    echo "📦 Creando volumen sophia_data..."
    docker volume create sophia_data
    if [ $? -eq 0 ]; then
        echo "✅ Volumen sophia_data creado exitosamente"
    else
        echo "❌ Error creando volumen sophia_data"
        exit 1
    fi
fi

echo ""

# 4. Verificar Traefik
echo "🔧 Verificando Traefik..."
if docker service ls | grep -q traefik; then
    echo "✅ Traefik está funcionando como servicio"
    docker service ls | grep traefik
elif docker ps | grep -q traefik; then
    echo "✅ Traefik está funcionando como container"
    docker ps | grep traefik
else
    echo "⚠️ Traefik no detectado"
    echo "   Verifica que Traefik esté funcionando para SSL automático"
fi

echo ""

# 5. Verificar DNS
echo "🌍 Verificando DNS para sophia.faustoparedesia.com..."
SERVER_IP=$(curl -s ifconfig.me)
DOMAIN_IP=$(dig +short sophia.faustoparedesia.com)

echo "📍 IP del servidor: $SERVER_IP"
echo "📍 IP del dominio: $DOMAIN_IP"

if [ "$SERVER_IP" = "$DOMAIN_IP" ]; then
    echo "✅ DNS configurado correctamente"
else
    echo "⚠️ DNS no apunta al servidor actual"
    echo "   Configura el registro A de sophia.faustoparedesia.com → $SERVER_IP"
fi

echo ""

# 6. Resumen
echo "📋 RESUMEN DEL SETUP:"
echo "   ✅ Docker Swarm: Activo"
echo "   ✅ Red faustoparedesnet: $(docker network ls | grep faustoparedesnet | awk '{print "Existe"}')"
echo "   ✅ Volumen sophia_data: $(docker volume ls | grep sophia_data | awk '{print "Configurado"}')"
echo "   $(docker service ls | grep -q traefik && echo "✅" || echo "⚠️") Traefik: $(docker service ls | grep -q traefik && echo "Funcionando" || echo "Verificar")"

echo ""

# 7. Próximos pasos
echo "🎯 PRÓXIMOS PASOS:"
echo "   1. Ir a Portainer → Stacks"
echo "   2. Update stack 'vapi-simli-drive-thru' o crear nuevo"
echo "   3. Configurar variables de entorno VAPI/Simli"
echo "   4. Deploy stack"
echo "   5. Esperar 5-7 minutos para primer build"
echo "   6. Acceder a: https://sophia.faustoparedesia.com"

echo ""
echo "🚀 ¡Servidor listo para deployment de Sophia AI!"