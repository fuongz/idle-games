'use client'

import { createTheme, MantineProvider } from '@mantine/core'

const theme = createTheme({
  fontFamily: 'var(--font-sans), sans-serif',
})

export default function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
  return <MantineProvider theme={theme}>{children}</MantineProvider>
}
