import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Pâmela Vieira - CRM & Painel Financeiro (Método CP12)',
  description: 'Sistema completo de gestão de alunos, leads e controle financeiro para a escola de canto da professora Pâmela Vieira.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-[#F5E9DA] text-[#0E2A47] antialiased selection:bg-[#C89A44] selection:text-[#0E2A47]">
        {children}
      </body>
    </html>
  );
}
