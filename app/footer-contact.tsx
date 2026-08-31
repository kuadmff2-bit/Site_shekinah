import Link from "next/link";

const WHATSAPP_URL = "https://wa.me/5592993977312";
const INSTAGRAM_URL = "https://www.instagram.com/centro_de_ensino_shekinah/";
const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=100093706818098";

export default function FooterContact() {
  return (
    <section className="legal-contact-strip" aria-label="Contatos e informações legais">
      <div>
        <strong>Centro de Ensino Shekinah</strong>
        <span>Atendimento e pré-matrícula pelo WhatsApp: (92) 99397-7312</span>
      </div>
      <div className="legal-contact-links">
        <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">WhatsApp</a>
        <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Instagram</a>
        <a href={FACEBOOK_URL} target="_blank" rel="noreferrer">Facebook</a>
        <Link href="/privacidade">Privacidade</Link>
      </div>
    </section>
  );
}
