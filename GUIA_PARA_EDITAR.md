# Guia simples — site do Centro de Ensino Shekinah

Este projeto já vem com o site completo. Você não precisa escrever o código do zero: para fazer alterações, basta abrir os arquivos indicados e trocar os textos.

## Os três arquivos principais

- `app/page.tsx`: cursos, preços, número do WhatsApp, formulário e textos da página.
- `app/globals.css`: cores, tamanhos, espaçamentos e adaptação para celular.
- `app/layout.tsx`: título e descrição exibidos pelo navegador e ao compartilhar o site.

## Alterar o WhatsApp

Abra `app/page.tsx` e procure esta linha:

```ts
const WHATSAPP_NUMBER = "5592993977312";
```

O número deve ficar apenas com algarismos, começando pelo código do Brasil `55`, seguido do DDD e do telefone.

## Alterar cursos e valores

No começo de `app/page.tsx`, procure `const courses`. Cada bloco representa um curso:

```ts
{
  id: "ingles-kids",
  short: "IK",
  image: "/courses/ingles-kids.webp",
  name: "Inglês Kids",
  description: "Descrição do curso.",
  frequency: "2 vezes por semana",
  price: "R$ 150/mês",
},
```

Troque apenas o texto que está entre aspas. Mantenha as vírgulas e os sinais como estão.

O EJA aparece como uma opção de contato, sem valor e sem participação nos combos. O botão dele abre uma conversa específica com a secretaria pelo WhatsApp.

## Alterar Instagram e Facebook

No começo de `app/page.tsx`, procure estas constantes:

```ts
const INSTAGRAM_URL = "https://www.instagram.com/centro_de_ensino_shekinah/";
const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=100093706818098";
```

Troque somente o endereço entre aspas quando a escola mudar algum perfil.

## Imagens dos cursos

As imagens ficam na pasta `public/courses`. O nome informado em `image` precisa ser exatamente igual ao nome do arquivo. As imagens foram preparadas em formato WebP para o site abrir mais rápido no celular.

## Abrir o projeto no seu computador

1. Instale o Node.js na versão LTS.
2. Abra a pasta do projeto no VS Code.
3. Abra o terminal do VS Code.
4. Cole um comando por vez:

```powershell
npm install
npm run dev
```

O terminal mostrará um endereço local. Segure `Ctrl` e clique nele para abrir o site no navegador.

## Como funciona o formulário

O visitante informa nome completo, data de nascimento, CPF, RG, telefone principal, um segundo telefone opcional e endereço. Se tiver menos de 18 anos, o site mostra automaticamente os campos de CPF do pai e da mãe. Depois, a pessoa escolhe um curso, dois cursos por R$ 180 ou três cursos por R$ 280 e clica no botão final. O site monta uma mensagem organizada e abre o WhatsApp da secretaria. Nenhum cadastro fica salvo no navegador ou em uma planilha.

## Antes de alterar

- Faça uma cópia da pasta do projeto.
- Altere uma coisa de cada vez.
- Depois de cada alteração, salve com `Ctrl + S` e confira no navegador.
- Não apague chaves `{}`, parênteses `()` ou vírgulas do código.
