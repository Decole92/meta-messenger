import '../styles/globals.css';
import Header from './component/Header';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head />
      <body>
              {/* @ts-expect-error Server Component */}
        <Header />
        {children}</body>
    </html>
  )
}
