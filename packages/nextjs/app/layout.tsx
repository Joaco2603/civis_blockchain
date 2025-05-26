import type { Metadata } from "next";
import { ScaffoldStarkAppWithProviders } from "~~/components/ScaffoldStarkAppWithProviders";
import "~~/styles/globals.css";
import { ThemeProvider } from "~~/components/ThemeProvider";
import { Web3Provider } from "~~/app/store/web3-provider";
import { RouteGuard } from "./routes/route-guard";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Civis - Plataforma de Votación Segura",
  description: "Sistema de votación seguro y transparente basado en blockchain",
  generator: "v0.dev"
};

const ScaffoldStarkApp = ({ children }: { children: React.ReactNode }) => {
  return (
    <html suppressHydrationWarning lang="es">
      <body suppressHydrationWarning>
        <ThemeProvider
          enableSystem
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
        >
          <ScaffoldStarkAppWithProviders>
            <Web3Provider>
              <RouteGuard>{children}</RouteGuard>
            </Web3Provider>
          </ScaffoldStarkAppWithProviders>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default ScaffoldStarkApp;
