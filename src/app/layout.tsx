import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { Providers } from "@/app/providers";
import Toast from "@/app/ui/toast/toast";
import "./globals.scss";

const defaultFont = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pupil App",
  description: "Najlepsza aplikacja do znalezienia opieki nad zwierzętami.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={defaultFont.className}>
        <Providers>
          {children}
          <Toast />
        </Providers>
      </body>
    </html>
  );
}
