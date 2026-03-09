1. Inicialização e Estrutura de Pastas
Abra o terminal na pasta do projeto e execute:

 - ` npm init -y `: Incia o modulos no node.js e criar arquivo packe.json para configuração.
 Recomendado alterar o valor do package.json:
 "type": "commonsjs" para "type": "module",
 - ` mkdir src src/controllers src/routes src/database src/responses src/docs `  ou crie manualemnte o os diretórios seguindo o seguinte esqueleto:

  |_____
  |
  |_____src
  |        |_____controllers
  |        |_____routes
  |        |_____responses
  |        |_____database
  |        |_____docs
  |_____.env
  |_____.gitignore (` echo .> .gitignore `)

2. Instalação de Dependências
instalar tudo o que é necessário para o TypeScript, TSOA e Prisma com o adapter do Neon Tech.

Dependências de Produção: 
 - ` npm install express tsoa swagger-ui-express bcrypt dotenv morgan pg @prisma/client @prisma/adapter-pg passport-azure-ad express-session dotenv `
ou pode ser feito pacote por pacote:
 - `npm install express`
 - `npm install tsoa` 
 - `npm install swagger-ui-express` 
 - `npm install bcrypt` 
 - `npm install dotenv` 
 - `npm install morgan` 
 - `@prisma/client` 
 - `@prisma/adapter-pg` 


Dependências de Desenvolvimento
 - ` npm install -D typescript @types/node @types/express @types/bcrypt @types/morgan @types/pg @types/swagger-ui-express tsx ` 

Dependencias do Azure:
 - ` npm install --save-dev @types/passport @types/passport-azure-ad @types/express-session @types/node ` 


3. Aplicação com typescript:
 - ` npx tsc init `: inicia o typescript para aplicação e cria um arquivo tsconfig.json 
 - ` npm install -D @types/node `:Instala a tipagem do node e habilita os métodos do ambiente.
 - ` npm install --save-dev ts-node nodemon `

 - Recomendado colocar os valores necessários/preferível ou use a recomendação:
    {
    "compilerOptions": {
            "module": "NodeNext",
            "target": "ESNext",
            "moduleResolution": "NodeNext",
            "types": ["node",],
            "experimentalDecorators": true,
            "emitDecoratorMetadata": true,
            // For nodejs:
            // "lib": ["esnext"],

            "sourceMap": true,
            "declaration": true,
            "declarationMap": true,

            // Stricter Typechecking Options
            "noUncheckedIndexedAccess": true,
            "exactOptionalPropertyTypes": null,
            "strict": true,
            // "jsx": "react-jsx", // Retirado por não usar frontEnd Acoplado
            "verbatimModuleSyntax": null,
            "isolatedModules": true,
            "noUncheckedSideEffectImports": null,
            "moduleDetection": "force",
            "skipLibCheck": true,

            "resolveJsonModule": true,
            "allowSyntheticDefaultImports": true,
        }
    }


4. Configuração do TSOA
Crie este arquivo na raiz para automatizar as rotas e o Swagger, eliminando erros manuais de YAML.
 - Exemplo:
    {
    "entryFile": "src/index.ts",
    "noImplicitAdditionalProperties": "throw-if-extra",
    "controllerPathGlobs": ["src/routes/*Router.ts"],
    "routes": {
        "routesDir": "src/routes",
        "entryPoint": "src/index.ts"
    },
    "spec": {
        "outputDirectory": "src/docs",
        "specVersion": 3
    }
    }


5. utilize os comandos abaixo para gerenciar a vida do projeto:
 - ` npx prisma init `: Inicia e cria arquivos referentes a bilioteca de migrations (prisma) para aplicação do banco de dados no modelo ORM(Object-Relational-Mapping) 
 - ` npx tsoa spec `: Lê seus arquivos Router.ts e gera o arquivo src/docs/swagger.json automaticamente.

 - ` npx tsoa routes `: Cria o arquivo src/routes/routes.ts, que contém a função RegisterRoutes responsável por ativar todas as rotas no Express.

 - ` npm run dev `: Inicia o servidor em modo de desenvolvimento usando o tsx watch, que reinicia a API a cada alteração no código.

 - `npx prisma generate`: Atualiza o cliente do Prisma com base no seu arquivo schema.prisma.