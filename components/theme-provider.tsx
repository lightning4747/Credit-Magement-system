"use client"

import { useTheme } from "@/hooks/use-theme"
import type { ReactNode } from "react"

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { mounted } = useTheme()

  if (!mounted) {
    return <>{children}</>
  }

  return <>{children}</>
}
