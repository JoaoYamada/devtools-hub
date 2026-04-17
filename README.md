# DevTools Hub 🛠️

> Um canivete suíço profissional para desenvolvedores formatador, diff viewer, gerador de .gitignore, e mais.

## Stack

- **Next.js 14** (App Router)
- **React 18** + **TypeScript**
- **Tailwind CSS** + design system com CSS variables
- **Framer Motion** para animações
- **Lucide React** para ícones
- **React Markdown** para preview de README

## Quick Start

```bash
# 1. Entre na pasta
cd devtools-hub

# 2. Instale as dependências
npm install

# 3. Rode em desenvolvimento
npm run dev

# 4. Acesse
open http://localhost:3000
```

## Estrutura

```
devtools-hub/
├── app/
│   ├── layout.tsx                          # Root layout (meta, fontes)
│   ├── globals.css                         # Design tokens + estilos globais
│   └── (dashboard)/
│       ├── layout.tsx                      # Layout com Sidebar + Topbar
│       ├── page.tsx                        # Home / Dashboard
│       └── tools/
│           ├── explain-error/page.tsx      # Explica erros de programação
│           ├── readme-beautifier/page.tsx  # Preview de Markdown
│           ├── formatter/page.tsx          # Formata JSON, CSV, XML
│           ├── gitignore-generator/page.tsx# Gera .gitignore por stack
│           └── diff-viewer/page.tsx        # Compara dois textos
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx       # Sidebar fixa com navegação animada
│   │   ├── Topbar.tsx        # Barra superior com breadcrumbs
│   │   └── PageContainer.tsx # Wrapper animado para cada página
│   └── ui/
│       ├── ToolCard.tsx      # Card de ferramenta na home
│       ├── TextAreaTool.tsx  # Textarea profissional reutilizável
│       ├── ResultPanel.tsx   # Painel de resultado animado
│       ├── AnimatedButton.tsx# Botão com Framer Motion
│       └── TabGroup.tsx      # Grupo de abas animado
├── lib/
│   ├── utils.ts              # Funções: formatJSON, formatCSV, formatXML, diff, gitignore
│   └── navigation.ts         # Config central de rotas e ícones
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Rotas

| Rota | Ferramenta |
|------|-----------|
| `/` | Dashboard com todos os tools |
| `/tools/explain-error` | Explica erros com análise mockada |
| `/tools/readme-beautifier` | Preview de Markdown em tempo real |
| `/tools/formatter` | Formata JSON, CSV e XML |
| `/tools/gitignore-generator` | Gera .gitignore por stack |
| `/tools/diff-viewer` | Diff visual entre dois textos |

## Design System

O projeto usa CSS Variables para tokens globais:

- `--background`, `--surface`, `--surface-2` — camadas de profundidade
- `--accent`, `--accent-muted`, `--accent-subtle` — cor de destaque
- `--text-primary`, `--text-secondary`, `--text-muted` — tipografia
- `--border`, `--border-subtle` — bordas
- `--danger`, `--success`, `--warning` — estados semânticos

Fontes via Google Fonts: **Syne** (display), **DM Sans** (corpo), **JetBrains Mono** (código).
