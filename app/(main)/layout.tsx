import "@/app/globals.css";
import { Navbar } from "../components/Navbar";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning> 
        <Navbar />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
