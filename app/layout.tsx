// Good practice to import global styles in this root layout
import "@/components/global.css";
import { inter } from "@/components/fonts";
import SessionProvider from "@/components/session-provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
