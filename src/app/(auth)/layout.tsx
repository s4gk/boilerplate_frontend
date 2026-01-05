import { SideBackground } from './login/side-background'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="bg-background flex min-h-screen w-full gap-8 p-4">
      <SideBackground />
      {children}
    </div>
  )
}
