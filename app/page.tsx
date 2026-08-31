"use client";

import { ChangeEvent, FormEvent, useMemo, useState } from "react";

type Course = {
  id: string;
  image: string;
  name: string;
  description: string;
  frequency: string;
  price: string;
  priceLabel?: string;
  badge?: string;
  featured?: boolean;
  contactOnly?: boolean;
};

const WHATSAPP_NUMBER = "5592993977312";
const INSTAGRAM_URL = "https://www.instagram.com/centro_de_ensino_shekinah/";
const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=100093706818098";

const courses: Course[] = [
  {
    id: "ingles-kids",
    image: "/courses/ingles-kids.webp",
    name: "Inglês Kids",
    description: "Aulas leves e dinâmicas para aprender, praticar e se comunicar com confiança.",
    frequency: "2 vezes por semana",
    price: "R$ 150/mês",
  },
  {
    id: "informatica-completa",
    image: "/courses/informatica-completa.webp",
    name: "Informática Completa",
    description: "Do básico ao essencial para estudar, trabalhar e usar a tecnologia no dia a dia.",
    frequency: "2 vezes por semana",
    price: "R$ 150/mês",
  },
  {
    id: "informatica-avancada",
    image: "/courses/informatica-avancada.webp",
    name: "Informática Avançada",
    description: "Aprofunde seus conhecimentos e vá além nas ferramentas mais importantes.",
    frequency: "2 vezes por semana",
    price: "R$ 150/mês",
  },
  {
    id: "desenho-artistico",
    image: "/courses/desenho-artistico.webp",
    name: "Desenho Artístico",
    description: "Criatividade, técnica e prática para desenvolver o talento artístico.",
    frequency: "Aulas aos sábados",
    price: "R$ 150/mês",
  },
  {
    id: "teclado",
    image: "/courses/teclado.webp",
    name: "Teclado",
    description: "Aprenda a tocar e transforme o interesse pela música em habilidade.",
    frequency: "2 vezes por semana",
    price: "R$ 150/mês",
  },
  {
    id: "reforco-escolar",
    image: "/courses/reforco-escolar.webp",
    name: "Reforço Escolar",
    description: "Acompanhamento para alunos do Ensino Fundamental e Médio.",
    frequency: "2 vezes por semana",
    price: "R$ 150/mês",
  },
  {
    id: "gestao-empresarial",
    image: "/courses/gestao-empresarial.webp",
    name: "Gestão Empresarial",
    description: "6 cursos em 1: Secretariado, Operador de Caixa, Telemarketing, Marketing Pessoal, Atendente de Farmácia e Informática.",
    frequency: "3 vezes por semana",
    price: "R$ 180/mês",
    badge: "6 cursos em 1",
    featured: true,
  },
  {
    id: "eja",
    image: "/courses/eja.svg",
    name: "EJA — Educação de Jovens e Adultos",
    description: "Você recebe as apostilas para estudar em casa e, todo fim de semana, vem à nossa instituição fazer uma prova relacionada ao conteúdo da apostila estudada.",
    frequency: "Prova presencial todo fim de semana",
    price: "Informações no WhatsApp",
    priceLabel: "Como participar",
    badge: "Estude em casa",
    featured: true,
    contactOnly: true,
  },
];

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle className="social-icon-dot" cx="17.4" cy="6.7" r="1" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14.4 21v-7h2.5l.4-3h-2.9V9.1c0-.9.3-1.5 1.5-1.5h1.6V4.9c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1V11H8.5v3h2.6v7h3.3Z" />
    </svg>
  );
}

function scrollToForm() {
  document.getElementById("matricula")?.scrollIntoView({ behavior: "smooth" });
}

function formatBirthDate(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

function formatCpf(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  return digits
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1-$2");
}

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : "";
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function handleCpfInput(event: FormEvent<HTMLInputElement>) {
  const input = event.currentTarget;
  input.value = formatCpf(input.value);
  input.setCustomValidity(
    input.value.length > 0 && input.value.length < 14
      ? "Digite os 11 números do CPF."
      : "",
  );
}

function handlePhoneInput(event: FormEvent<HTMLInputElement>) {
  const input = event.currentTarget;
  input.value = formatPhone(input.value);
  const digitCount = input.value.replace(/\D/g, "").length;
  input.setCustomValidity(
    digitCount > 0 && digitCount < 10
      ? "Digite o telefone com DDD."
      : "",
  );
}

function parseBirthDate(value: string) {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value);
  if (!match) return null;

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);
  const date = new Date(year, month - 1, day, 12, 0, 0);
  const isValidDate =
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day &&
    date <= new Date();

  return isValidDate ? date : null;
}

export default function Home() {
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [formError, setFormError] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const isMinor = useMemo(() => {
    const born = parseBirthDate(birthDate);
    if (!born) return false;
    const today = new Date();
    let age = today.getFullYear() - born.getFullYear();
    const birthdayHasNotPassed =
      today.getMonth() < born.getMonth() ||
      (today.getMonth() === born.getMonth() && today.getDate() < born.getDate());
    if (birthdayHasNotPassed) age -= 1;
    return age < 18;
  }, [birthDate]);

  function handleBirthDateChange(event: ChangeEvent<HTMLInputElement>) {
    const formattedDate = formatBirthDate(event.target.value);
    event.target.setCustomValidity(
      formattedDate.length === 10 && !parseBirthDate(formattedDate)
        ? "Digite uma data de nascimento válida no formato DD/MM/AAAA."
        : "",
    );
    setBirthDate(formattedDate);
  }

  const selectedNames = useMemo(
    () => courses.filter((course) => selectedCourses.includes(course.id)).map((course) => course.name),
    [selectedCourses],
  );

  const priceSummary = useMemo(() => {
    if (selectedCourses.includes("gestao-empresarial")) return "R$ 180 por mês";
    if (selectedCourses.length === 3) return "Combo com 3 cursos: R$ 280 por mês";
    if (selectedCourses.length === 2) return "Combo: R$ 180 por mês";
    if (selectedCourses.length === 1) return "R$ 150 por mês";
    return "Escolha um curso ou monte seu combo";
  }, [selectedCourses]);

  function toggleCourse(courseId: string) {
    setFormError("");

    if (courseId === "gestao-empresarial") {
      setSelectedCourses((current) => current.includes(courseId) ? [] : [courseId]);
      return;
    }

    if (!selectedCourses.includes(courseId) && selectedCourses.filter((id) => id !== "gestao-empresarial").length >= 3) {
      setFormError("Você pode escolher no máximo três cursos para o combo.");
      return;
    }

    setSelectedCourses((current) => {
      const withoutManagement = current.filter((id) => id !== "gestao-empresarial");
      if (withoutManagement.includes(courseId)) {
        return withoutManagement.filter((id) => id !== courseId);
      }
      if (withoutManagement.length >= 3) return withoutManagement;
      return [...withoutManagement, courseId];
    });
  }

  function chooseCourse(courseId: string) {
    setSelectedCourses([courseId]);
    scrollToForm();
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (selectedCourses.length === 0) {
      setFormError("Escolha pelo menos um curso para continuar.");
      document.getElementById("course-options")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const message = [
      "*NOVA PRÉ-MATRÍCULA — SHEKINAH*",
      "",
      `*Nome completo:* ${data.get("nome")}`,
      `*Data de nascimento:* ${data.get("nascimento")}`,
      `*CPF:* ${data.get("cpf")}`,
      `*RG ou nova identidade (CIN):* ${data.get("rg")}`,
      `*Telefone principal:* ${data.get("whatsapp")}`,
      `*Segundo telefone:* ${data.get("telefone2") || "Não informado"}`,
      `*Endereço:* ${data.get("endereco")}`,
      `*Curso(s):* ${selectedNames.join(" + ")}`,
      `*Plano:* ${priceSummary}`,
      ...(isMinor
        ? [
            "*Aluno menor de 18 anos:* Sim",
            `*CPF do pai:* ${data.get("cpfPai")}`,
            `*CPF da mãe:* ${data.get("cpfMae")}`,
          ]
        : ["*Aluno menor de 18 anos:* Não"]),
      "",
      "Li as informações e desejo confirmar minha matrícula com a secretaria.",
    ].join("\n");

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  const doubtMessage = encodeURIComponent(
    "Olá! Vi o site do Centro de Ensino Shekinah e gostaria de tirar uma dúvida sobre os cursos.",
  );
  const ejaMessage = encodeURIComponent(
    "Olá! Vi as informações do EJA no site do Centro de Ensino Shekinah. Gostaria de saber como funciona o estudo pelas apostilas em casa e as provas presenciais de todo fim de semana.",
  );

  return (
    <main>
      <div className="announcement"><span>✦</span> Matrículas abertas • início imediato <span>✦</span></div>

      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Centro de Ensino Shekinah - início">
          <span className="brand-mark" aria-hidden="true">S</span>
          <span><strong>Shekinah</strong><small>Centro de Ensino</small></span>
        </a>
        <nav aria-label="Navegação principal">
          <a href="#cursos">Cursos</a>
          <a href="#combo">Combo</a>
          <a className="nav-cta" href="#matricula">Quero me matricular</a>
        </nav>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />
        <div className="hero-content">
          <div className="hero-copy">
            <p className="eyebrow">Conhecimento hoje, conquistas para sempre</p>
            <h1>O próximo passo do seu futuro começa aqui.</h1>
            <p className="hero-text">Cursos presenciais, professores qualificados e aprendizado prático para você desenvolver novas habilidades.</p>
            <div className="hero-actions">
              <button className="button button-gold" type="button" onClick={scrollToForm}>Fazer pré-matrícula</button>
            </div>
            <div className="hero-socials" aria-label="Redes sociais do Centro de Ensino Shekinah">
              <span>Acompanhe a Shekinah</span>
              <div className="social-links">
                <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" aria-label="Instagram do Centro de Ensino Shekinah"><InstagramIcon /><span>Instagram</span></a>
                <a href={FACEBOOK_URL} target="_blank" rel="noreferrer" aria-label="Facebook do Centro de Ensino Shekinah"><FacebookIcon /><span>Facebook</span></a>
              </div>
            </div>
            <div className="hero-trust" aria-label="Diferenciais">
              <span>✓ Aulas presenciais</span><span>✓ Certificado</span><span>✓ Início imediato</span>
            </div>
          </div>

          <aside className="hero-card" aria-label="Condições de matrícula">
            <p className="hero-card-label">Invista no seu futuro</p>
            <div className="enrollment-price"><span>Matrícula</span><strong>R$ 49,90</strong></div>
            <div className="hero-divider" />
            <div className="hero-price-row"><span>Cursos individuais</span><strong>R$ 150/mês</strong></div>
            <div className="hero-price-row featured-row"><span>Combo com 2 cursos</span><strong>R$ 180/mês</strong></div>
            <div className="hero-price-row featured-row"><span>Combo com 3 cursos</span><strong>R$ 280/mês</strong></div>
            <p className="hero-card-note">Escolha dois ou três cursos participantes e aproveite o valor especial.</p>
          </aside>
        </div>
      </section>

      <section className="benefits" aria-label="Vantagens">
        <div><span>01</span><strong>Aulas presenciais</strong><small>Aprendizado com acompanhamento</small></div>
        <div><span>02</span><strong>Professores qualificados</strong><small>Orientação em cada etapa</small></div>
        <div><span>03</span><strong>Certificado reconhecido</strong><small>Valorize seu currículo</small></div>
        <div><span>04</span><strong>Horários acessíveis</strong><small>Escolha o melhor turno</small></div>
      </section>

      <section className="section courses-section" id="cursos">
        <div className="section-heading">
          <div><p className="eyebrow dark">Cursos Shekinah</p><h2>Escolha o que combina com você</h2></div>
          <p>Formações práticas para todas as idades, com acompanhamento presencial e condições que cabem no seu bolso.</p>
        </div>
        <div className="course-grid">
          {courses.map((course) => (
            <article className={`course-card${course.featured ? " featured-course" : ""}`} key={course.id}>
              <div className="course-image-wrap">
                <img src={course.image} alt={`Imagem representando o curso ${course.name}`} />
              </div>
              {course.badge && (
                <div className="course-topline">
                  <span className="course-badge">{course.badge}</span>
                </div>
              )}
              <h3>{course.name}</h3>
              <p>{course.description}</p>
              <div className="course-meta">
                <span><small>Frequência</small>{course.frequency}</span>
                <span><small>{course.priceLabel ?? "Mensalidade"}</small>{course.price}</span>
              </div>
              {course.contactOnly ? (
                <a className="course-interest-button" href={`https://wa.me/${WHATSAPP_NUMBER}?text=${ejaMessage}`} target="_blank" rel="noreferrer">
                  Quero saber mais sobre o EJA
                </a>
              ) : (
                <button className="course-interest-button" type="button" onClick={() => chooseCourse(course.id)}>Tenho interesse neste curso</button>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="combo-section" id="combo">
        <div className="combo-content">
          <div>
            <p className="eyebrow">Combo Shekinah</p>
            <h2>Mais cursos.<br />Mais oportunidades.</h2>
            <p>Escolha <strong>2 cursos por R$ 180</strong> ou <strong>3 cursos por R$ 280</strong> por mês. É mais aprendizado por um valor especial.</p>
            <button className="button button-gold" type="button" onClick={scrollToForm}>Montar meu combo</button>
          </div>
          <div className="combo-example combo-choice-list" aria-label="Valores dos combos">
            <div className="combo-total"><small>Combo com 2 cursos</small><strong>R$ 180</strong><span>por mês</span></div>
            <b>ou</b>
            <div className="combo-total"><small>Combo com 3 cursos</small><strong>R$ 280</strong><span>por mês</span></div>
          </div>
        </div>
      </section>

      <section className="enrollment-section" id="matricula">
        <div className="enrollment-intro">
          <p className="eyebrow">Pré-matrícula</p>
          <h2>Comece hoje a transformar seus planos em conquistas.</h2>
          <p>Preencha os dados ao lado. Ao finalizar, as informações serão enviadas para a secretaria pelo WhatsApp.</p>
        </div>

        <form className="enrollment-form" onSubmit={handleSubmit}>
          <div className="form-heading"><span>Formulário de interesse</span><p>Campos com * são obrigatórios.</p></div>
          <div className="field-grid">
            <label className="field full"><span>Nome completo *</span><input name="nome" type="text" autoComplete="name" required minLength={3} maxLength={100} placeholder="Digite seu nome completo" /><small className="field-hint">Máximo de 100 caracteres.</small></label>
            <label className="field">
              <span>Data de nascimento *</span>
              <input
                name="nascimento"
                type="text"
                inputMode="numeric"
                autoComplete="bday"
                required
                maxLength={10}
                pattern="[0-9]{2}/[0-9]{2}/[0-9]{4}"
                title="Digite a data no formato DD/MM/AAAA"
                placeholder="DD/MM/AAAA"
                value={birthDate}
                onChange={handleBirthDateChange}
              />
              <small className="field-hint">Digite o dia, o mês e o ano. As barras aparecem automaticamente.</small>
            </label>
            <label className="field"><span>CPF *</span><input name="cpf" type="text" inputMode="numeric" required minLength={14} maxLength={14} pattern="[0-9]{3}[.][0-9]{3}[.][0-9]{3}-[0-9]{2}" title="Digite os 11 números do CPF" placeholder="000.000.000-00" onInput={handleCpfInput} /></label>
            <label className="field">
              <span>RG ou nova Carteira de Identidade Nacional (CIN) *</span>
              <input name="rg" type="text" required minLength={5} maxLength={20} placeholder="RG antigo ou o mesmo número do CPF" />
              <small className="field-hint">Na nova identidade, o número informado pode ser o mesmo do CPF.</small>
            </label>
            <label className="field"><span>Telefone principal *</span><input name="whatsapp" type="tel" inputMode="numeric" autoComplete="tel" required minLength={14} maxLength={15} pattern="[(][0-9]{2}[)] [0-9]{4,5}-[0-9]{4}" title="Digite o telefone com DDD" placeholder="(92) 99999-9999" onInput={handlePhoneInput} /></label>
            <label className="field"><span>Segundo telefone (opcional)</span><input name="telefone2" type="tel" inputMode="numeric" maxLength={15} pattern="[(][0-9]{2}[)] [0-9]{4,5}-[0-9]{4}" title="Digite o telefone com DDD" placeholder="(92) 99999-9999" onInput={handlePhoneInput} /></label>
            <label className="field full"><span>Endereço completo *</span><input name="endereco" type="text" autoComplete="street-address" required minLength={5} maxLength={180} placeholder="Rua, número, bairro ou comunidade" /><small className="field-hint">Máximo de 180 caracteres.</small></label>
          </div>

          {isMinor && (
            <div className="minor-fields" aria-live="polite">
              <div className="minor-heading">
                <strong>Dados para aluno menor de idade</strong>
                <p>Como o aluno tem menos de 18 anos, informe os CPFs dos responsáveis.</p>
              </div>
              <div className="field-grid">
                <label className="field"><span>CPF do pai *</span><input name="cpfPai" type="text" inputMode="numeric" required minLength={14} maxLength={14} pattern="[0-9]{3}[.][0-9]{3}[.][0-9]{3}-[0-9]{2}" title="Digite os 11 números do CPF" placeholder="000.000.000-00" onInput={handleCpfInput} /></label>
                <label className="field"><span>CPF da mãe *</span><input name="cpfMae" type="text" inputMode="numeric" required minLength={14} maxLength={14} pattern="[0-9]{3}[.][0-9]{3}[.][0-9]{3}-[0-9]{2}" title="Digite os 11 números do CPF" placeholder="000.000.000-00" onInput={handleCpfInput} /></label>
              </div>
            </div>
          )}

          <fieldset className="course-options" id="course-options">
            <legend>Qual curso você quer fazer? *</legend>
            <p>Você pode escolher até três cursos participantes. Gestão Empresarial é uma opção individual.</p>
            <div className="checkbox-grid">
              {courses.filter((course) => !course.contactOnly).map((course) => (
                <label className={`course-check${selectedCourses.includes(course.id) ? " selected" : ""}`} key={course.id}>
                  <input type="checkbox" checked={selectedCourses.includes(course.id)} onChange={() => toggleCourse(course.id)} />
                  <span>{course.name}</span><small>{course.frequency}</small>
                </label>
              ))}
            </div>
            {formError && <p className="form-error" role="alert">{formError}</p>}
          </fieldset>

          <div className="selection-summary" aria-live="polite"><span>{selectedNames.length ? selectedNames.join(" + ") : "Nenhum curso selecionado"}</span><strong>{priceSummary}</strong></div>

          <label className="consent"><input type="checkbox" required /><span>Autorizo o envio destes dados à secretaria da Shekinah para atendimento da minha pré-matrícula. *</span></label>
          <button className="submit-button" type="submit">Enviar pré-matrícula pelo WhatsApp</button>
          <p className="privacy-note">Seus dados serão enviados diretamente para o WhatsApp da secretaria e usados somente no atendimento da matrícula.</p>
        </form>
      </section>

      <footer>
        <a className="brand footer-brand" href="#inicio"><span className="brand-mark" aria-hidden="true">S</span><span><strong>Shekinah</strong><small>Centro de Ensino</small></span></a>
        <div className="footer-copy"><p>Educando hoje, transformando o amanhã.</p><p>© 2026 Centro de Ensino Shekinah</p></div>
      </footer>

      <a className="floating-whatsapp" href={`https://wa.me/${WHATSAPP_NUMBER}?text=${doubtMessage}`} target="_blank" rel="noreferrer" aria-label="Tirar dúvidas pelo WhatsApp"><span>WA</span> Tirar dúvidas</a>
    </main>
  );
}
