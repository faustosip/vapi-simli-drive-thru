#!/bin/bash

# 🔗 CONECTAR PROYECTO LOCAL CON GITHUB
# Este script conecta tu proyecto local con el repositorio de GitHub

echo "🚀 Conectando proyecto local con GitHub..."
echo "📂 Directorio actual: $(pwd)"

# 1. Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    echo "❌ Error: No se encontró package.json"
    echo "   Asegúrate de ejecutar este script desde la raíz del proyecto"
    exit 1
fi

echo "✅ Proyecto detectado: $(grep '"name"' package.json | cut -d'"' -f4)"

# 2. Inicializar Git si no existe
if [ ! -d ".git" ]; then
    echo "🔧 Inicializando repositorio Git..."
    git init
    echo "✅ Git inicializado"
else
    echo "✅ Repositorio Git ya existe"
fi

# 3. Configurar remoto
echo "🔗 Configurando remoto de GitHub..."
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/faustosip/vapi-simli-drive-thru.git
echo "✅ Remoto configurado: https://github.com/faustosip/vapi-simli-drive-thru.git"

# 4. Fetch datos del repositorio remoto
echo "📥 Descargando datos del repositorio remoto..."
git fetch origin

# 5. Configurar rama principal
echo "🌿 Configurando rama principal..."
git branch -M main

# 6. Verificar estado
echo "📊 Estado del repositorio:"
git status --porcelain | head -10

# 7. Crear .gitignore si no existe
if [ ! -f ".gitignore" ]; then
    echo "📝 Creando .gitignore..."
    cat > .gitignore << 'EOF'
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local
.env

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

# IDE
.vscode/
.idea/

# OS
Thumbs.db

# Debug files
debug-*.js
test-*.js
*debug*.md
*test*.md
*OLD*.md
*TEMP*.md
EOF
    echo "✅ .gitignore creado"
fi

# 8. Agregar archivos
echo "📦 Agregando archivos al staging..."
git add .

# 9. Verificar cambios
CHANGES=$(git diff --cached --name-only | wc -l)
echo "📝 Archivos para commit: $CHANGES"

if [ $CHANGES -eq 0 ]; then
    echo "ℹ️ No hay cambios para commit"
    echo "✅ El proyecto ya está sincronizado con GitHub"
else
    # 10. Crear commit
    echo "💾 Creando commit..."
    git commit -m "🚀 Connect local project to GitHub

- Link local development environment
- Add all source files and configurations  
- Ready for development and deployment
- Fixes cart empty issue with tool-calls support"

    # 11. Push al repositorio
    echo "🚀 Enviando cambios a GitHub..."
    if git push -u origin main; then
        echo ""
        echo "🎉 ¡PROYECTO CONECTADO EXITOSAMENTE!"
        echo ""
        echo "📍 URLs importantes:"
        echo "   • Repositorio: https://github.com/faustosip/vapi-simli-drive-thru"
        echo "   • Commits: https://github.com/faustosip/vapi-simli-drive-thru/commits/main"
        echo "   • Configuración Portainer: https://github.com/faustosip/vapi-simli-drive-thru/blob/main/PORTAINER_SETUP.md"
        echo ""
        echo "🐳 Próximos pasos para Portainer:"
        echo "   1. Accede a tu instancia de Portainer"
        echo "   2. Crea un nuevo Stack"
        echo "   3. Usa Repository: https://github.com/faustosip/vapi-simli-drive-thru"
        echo "   4. Configura variables de entorno VAPI y Simli"
        echo "   5. Deploy automático desde GitHub"
        echo ""
        echo "✅ Tu proyecto está listo para deployment!"
    else
        echo "❌ Error al hacer push a GitHub"
        echo "   Verifica tu conexión y permisos"
        exit 1
    fi
fi

# 12. Verificar configuración final
echo ""
echo "🔍 Verificación final:"
echo "   • Git remoto: $(git remote get-url origin)"
echo "   • Rama actual: $(git branch --show-current)"
echo "   • Último commit: $(git log -1 --oneline)"
echo ""
echo "🎯 Estado: ¡LISTO PARA PORTAINER!"