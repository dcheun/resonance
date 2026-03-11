# Resonance

A text-to-speech platform with multi-organization support and AI voice generation capabilities, built with Next.js 16 and React 19.

## Project Overview

Resonance is a Next.js application designed to provide AI-powered text-to-speech services across multiple organizations. The platform supports voice management, generation tracking, and organization-specific configurations.

## Tech Stack

- **Framework**: Next.js 16.1.6 (App Router)
- **Runtime**: React 19.2.3
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 with custom dark mode support
- **Authentication**: Clerk
- **Database**: PostgreSQL with Prisma ORM
- **UI Components**: shadcn/ui
- **Package Manager**: npm

## Project Structure

```
resonance/
├── src/
│   ├── app/
│   │   ├── globals.css          # Global styles with Tailwind and shadcn
│   │   ├── layout.tsx           # Root layout with ClerkProvider
│   │   ├── page.tsx             # Home page with OrgSwitcher
│   │   ├── sign-in/[[...sign-in]]/
│   │   │   └── page.tsx         # Sign in page
│   │   ├── sign-up/[[...sign-up]]/
│   │   │   └── page.tsx         # Sign up page
│   │   ├── org-selection/
│   │   │   └── page.tsx         # Organization selection
│   │   └── test/
│   │       └── page.tsx         # Database test page
│   ├── components/
│   │   └── ui/                  # shadcn/ui components (62+ files)
│   ├── lib/
│   │   ├── db.ts                # Prisma client singleton
│   │   ├── env.ts               # Environment variable validation
│   │   └── utils.ts             # Utility functions
│   ├── hooks/
│   │   └── use-mobile.ts        # Mobile detection hook
│   └── generated/
│       └── prisma/              # Auto-generated Prisma client
├── prisma/
│   ├── schema.prisma            # Database schema
│   ├── config.ts                # Prisma CLI config
│   └── migrations/
│       └── 20260310105652_init/
│           └── migration.sql    # Database migration
├── .prettierrc                  # Prettier config
├── eslint.config.mjs            # ESLint config
├── tsconfig.json                # TypeScript config
└── package.json
```

## Authentication & Authorization

**Clerk** handles all authentication:

- Public routes: `/sign-in*`, `/sign-up*`, `/org-selection*`
- Protected routes: All other routes require authentication
- Organization flow: Redirects to org selection if no orgId is set

**Middleware** (`src/proxy.ts`):

```typescript
// Public routes are always accessible
// Non-public routes require authentication
// Routes without orgId redirect to org selection
```

## Database Schema

### Models

**Voice**

```prisma
model Voice {
  id              String @id @default(cuid())
  orgId           String?
  name            String
  description     String?
  category        VoiceCategory @default(GENERAL)
  language        String @default("en-US")
  variant         VoiceVariant
  r2ObjectKey     String
  generations     Generation[]
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
```

**Generation**

```prisma
model Generation {
  id               String @id @default(cuid())
  orgId            String
  voiceId          String?
  voice            Voice? @relation(fields: [voiceId], references: [id], onDelete: SetNull)
  text             String
  voiceName        String
  r2ObjectKey      String?
  temperature      Float
  topP             Float
  topK             Int
  repetitionPenalty Float
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt
}
```

### Enums

**VoiceVariant**: `SYSTEM` | `CUSTOM`

**VoiceCategory**: `AUDIOBOOK` | `CONVERSATIONAL` | `CUSTOMER_SERVICE` | `GENERAL` | `NARRATIVE` | `CHARACTERS` | `MEDITATION` | `MOTIVATIONAL` | `PODCAST` | `ADVERTISING` | `VOICEOVER` | `CORPORATE`

## Development Guidelines

### Code Style

- **Prettier**: 100 char width, single quotes, trailing commas, 2-space indentation
- **TypeScript**: Strict mode enabled, path aliases (`@/*` → `./src/*`)
- **Component Naming**: PascalCase for components
- **File Naming**: kebab-case for files, PascalCase for components

### Prisma Client

Singleton pattern in `src/lib/db.ts`:

```typescript
const globalForPrisma = global as unknown as {
  prisma: PrismaClient
}
const prisma = globalForPrisma.prisma || new PrismaClient({ adapter })
```

Use `prisma` from `@/lib/db` instead of creating new instances.

### Environment Variables

Use `@t3-oss/env-nextjs` for validation:

```typescript
export const env = createEnv({
  server: {
    DATABASE_URL: z.string().min(1),
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
})
```

### UI Components

Use shadcn/ui components with proper styling. Available components:

- Base: button, input, label, select, textarea
- Advanced: dialog, dropdown-menu, popover, sheet
- Data: table, card, badge, progress
- Navigation: sidebar, menubar, breadcrumb
- Forms: checkbox, radio-group, slider, toggle-group
- Feedback: toast, sonner, alert, alert-dialog
- Media: carousel, calendar, image
- Layout: collapsible, resizable, scroll-area

## Key Files

| File                   | Purpose                                                |
| ---------------------- | ------------------------------------------------------ |
| `src/lib/db.ts`        | Prisma client singleton with PostgreSQL adapter        |
| `src/lib/env.ts`       | Environment variable validation                        |
| `src/app/layout.tsx`   | Root layout with ClerkProvider and fonts               |
| `src/proxy.ts`         | Clerk middleware for authentication and org protection |
| `src/app/globals.css`  | Tailwind CSS setup with custom colors and dark mode    |
| `prisma/schema.prisma` | Database schema definition                             |
| `.prettierrc`          | Prettier configuration                                 |

## Database Setup

```bash
# Start PostgreSQL
# Update DATABASE_URL in .env file

# Run Prisma migration
npx prisma migrate dev

# Generate Prisma client
npm run prismagenerate

# Seed database (if needed)
# Add prisma seed script to package.json
```

## Known Routes

- `/` - Home page with OrganizationSwitcher
- `/sign-in` - Sign in page
- `/sign-up` - Sign up page
- `/org-selection` - Organization selection
- `/test` - Database test page

## Future Enhancements

Potential features to add:

- Voice creation and management UI
- Generation history and playback
- API routes for TTS generation
- Admin dashboard
- User management interface
- Billing integration
- Audio file upload and management

## Dependencies

Key packages:

- `@clerk/nextjs` - Authentication
- `@prisma/client` - Database client
- `@prisma/adapter-pg` - PostgreSQL adapter
- `@t3-oss/env-nextjs` - Environment validation
- `shadcn` - UI component library
- `next-themes` - Dark mode
- `radix-ui` - UI primitives
