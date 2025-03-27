import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Layout from "@/components/Layout/Layout";
import { FinancialProvider } from "@/context/FinancialContext";

const inter = Inter({ subsets: ["latin"] }); // Use Inter font for the entire app

export const metadata: Metadata = {
  title: "Budgeting App",
  description: "Track your finances with ease",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FinancialProvider>
          <Header>
            <Layout>{children}</Layout>
          </Header>
        </FinancialProvider>
      </body>
    </html>
  );
}
