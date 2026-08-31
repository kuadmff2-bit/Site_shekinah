import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <section className="not-found-card">
        <img className="not-found-logo" src="/shekinah-shield.png" alt="Escudo do Centro de Ensino Shekinah" />
        <small>Erro 404</small>
        <h1>Página não encontrada</h1>
        <p>O endereço que você tentou abrir não existe ou foi alterado. Volte para o site do Centro de Ensino Shekinah.</p>
        <Link href="/">Voltar para o início</Link>
      </section>
    </main>
  );
}
