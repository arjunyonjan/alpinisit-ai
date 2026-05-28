---
name: nextjs-metadata-layout-fix
description: Fix Next.js App Router error when "use client" layout conflicts with export const metadata by splitting into server + client layout files
source: auto-skill
extracted_at: '2026-05-28T09:04:48.657Z'
---

## Problem

In Next.js App Router, `app/layout.tsx` is a **Server Component by default**. If you add `"use client"` to it (e.g., to use `useState` for a sidebar toggle), you get a TypeScript error:

```
export const metadata: Metadata = { ... }
           ^^^^^^^^
```

This is because `metadata` exports are **only allowed in Server Components** — they are statically extracted at build time and cannot coexist with `"use client"`.

## Solution: Split into Server + Client Layout

### Step 1 — Convert `layout.tsx` to a Server Component

Remove `"use client"` and the client state/hooks. Keep `metadata`, `html`/`body` structure. Wrap children in a new `<ClientLayout>` component.

```tsx
// app/layout.tsx  (Server Component — NO "use client")
import type { Metadata } from "next"
import "./globals.css"
import ClientLayout from "./client-layout"

export const metadata: Metadata = {
  title: "My App",
  description: "Description",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
```

### Step 2 — Create `client-layout.tsx` for client-side logic

```tsx
// app/client-layout.tsx  ("use client" — handles state/hooks)
"use client"

import Sidebar, { MobileMenuButton } from "@/components/sidebar"
import { useState } from "react"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      <MobileMenuButton onClick={() => setMenuOpen(true)} />
      <div className="lg:ml-72">{children}</div>
    </>
  )
}
```

## When this applies

- Layout needs `useState`, `useEffect`, `usePathname`, or any hook
- Layout needs `"use client"` for a mobile menu toggle, theme switcher, or similar interactive feature
- You still need `metadata` (title, description, Open Graph, etc.)

## Key rule

**`metadata` exports must live in a Server Component.** Client logic goes in a separate `"use client"` child component.
