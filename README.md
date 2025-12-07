# Budget Control Application

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🛠️ Stack

![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Biome](https://img.shields.io/badge/biome-%2360A5FA.svg?style=for-the-badge&logo=biome&logoColor=white)

**Framework:** `Tanstack Start`<br />
**Router:** `Tanstack Router`

**Database:**<br/>
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Drizzle](https://img.shields.io/badge/Drizzle-%23000000?style=for-the-badge&logo=drizzle&logoColor=C5F74F)

**Styling:**<br/>
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Shadcn/ui](https://img.shields.io/badge/shadcn/ui-%23000000?style=for-the-badge&logo=shadcnui&logoColor=white)

## ⚡ Quick Start

```bash
# 1. Install dependencies
pnpm install

# 2. Run the app
pnpm dev
```

## Database Schema

To generate the database schema, run the following command:

```bash
pnpm dlx @better-auth/cli generate --output ./src/db/schema.ts
```

Generate migration file:

```bash
pnpm db:generate
```

Apply migrations to database:

```bash
pnpm db:migrate
```

## Creating a user

To create the first user, run the following command:

```bash
curl -X POST -H "Content-Type: application/json" \
-d '{"email":"a@b.com","name":"name","password":"password"}' \
http://localhost:3000/api/auth/sign-up/email
```

## 🛠️ Tools

![tmux](https://img.shields.io/badge/tmux-%23000000?style=for-the-badge&logo=tmux&logoColor=%231BB91F)
![Neovim](https://img.shields.io/badge/NeoVim-%2357A143.svg?&style=for-the-badge&logo=neovim&logoColor=white)

## 🙋🏻‍♂️ Author

◎ [Andrés Court](https://www.linkedin.com/in/alcb1310/)
