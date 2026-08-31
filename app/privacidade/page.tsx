import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacidade",
  description: "Como o Centro de Ensino Shekinah trata os dados enviados pelo site.",
  alternates: { canonical: "/privacidade" },
};

export default function PrivacyPage() {
  return (
    <main className="privacy-page">
      <div className="privacy-shell">
        <Link href="/">← Voltar para o site</Link>
        <h1>Privacidade</h1>
        <p>Esta página resume como o site do Centro de Ensino Shekinah lida com informações preenchidas pelo visitante.</p>

        <section className="privacy-block">
          <h2>Pré-matrícula</h2>
          <p>Os dados preenchidos no formulário são usados para montar uma mensagem no próprio navegador e abrir o WhatsApp da secretaria. O site não grava esses dados em um banco de dados próprio durante esse fluxo.</p>
        </section>

        <section className="privacy-block">
          <h2>Quais dados podem ser preenchidos</h2>
          <p>Dependendo do formulário, podem ser informados nome, data de nascimento, CPF, RG/CIN, telefone, endereço, curso escolhido e, quando necessário, dados dos responsáveis.</p>
        </section>

        <section className="privacy-block">
          <h2>Analytics e cookies</h2>
          <p>O Google Analytics só é carregado quando houver uma identificação de Analytics configurada no site e o visitante aceitar os cookies de medição. Se o visitante recusar, o formulário e o WhatsApp continuam funcionando normalmente.</p>
        </section>

        <section className="privacy-block">
          <h2>Atendimento</h2>
          <p>Para dúvidas sobre dados enviados pelo WhatsApp, entre em contato diretamente com o Centro de Ensino Shekinah pelo número (92) 99397-7312.</p>
        </section>
      </div>
    </main>
  );
}
