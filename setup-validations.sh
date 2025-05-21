#!/bin/bash
echo "Instalando dependencias de desarrollo..."
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-config-prettier prettier husky lint-staged @commitlint/cli @commitlint/config-conventional

echo "Actualizando scripts en package.json..."
# Usando jq para actualizar package.json
# Si no tienes jq instalado: sudo apt-get install jq o brew install jq
scripts=$(jq '.scripts.lint = "eslint \"{src,apps,libs,test}/**/*.ts\" --fix" |
  .scripts.format = "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"" |
  .scripts.test = "jest" |
  .scripts."test:cov" = "jest --coverage" |
  .scripts.prepare = "husky install"' package.json)
echo "$scripts" > package.json

lintStaged=$(jq '.["lint-staged"] = {"*.ts": ["eslint --fix", "prettier --write"]}' package.json)
echo "$lintStaged" > package.json

echo "Configurando Husky..."
npx husky install
npx husky add .husky/pre-commit "npx lint-staged"
npx husky add .husky/commit-msg "npx --no-install commitlint --edit \$1"
npx husky add .husky/pre-push "npm run test"

chmod +x .husky/pre-commit .husky/commit-msg .husky/pre-push

echo "Configuración completada exitosamente!"
