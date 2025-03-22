import { MainProvider } from "@/shared/providers";
import "@/shared/styles/globals.css";
import type { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: {
    absolute: "Учебный проект по авторизации",
    template: "%s | Авторизация с нуля",
  },
  description:
    "Это учебный проект, созданный для демонстрации полного цикла авторизации пользователей",
};

const ToggleTheme = dynamic(
  () =>
    import("@/shared/components/ui/ToggleTheme").then((mod) => mod.ToggleTheme),
  {
    loading: () => <div className="w-10 h-10" />, // Плейсхолдер при загрузке
  }
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <MainProvider>
          <div className="relative flex min-h-screen flex-col">
            <ToggleTheme />
            <div className="flex h-screen w-full items-center justify-center px-4">
              {children}
            </div>
          </div>
        </MainProvider>
      </body>
    </html>
  );
}
