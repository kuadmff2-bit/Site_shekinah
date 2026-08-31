import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("renders the Shekinah page with EJA and official social links", async () => {
  const pageSource = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  const html = await response.text();
  assert.match(html, /<title>Centro de Ensino Shekinah \| Cursos e Pré-matrícula<\/title>/i);
  assert.match(html, /EJA — Educação de Jovens e Adultos/i);
  assert.match(html, /apostilas para estudar em casa/i);
  assert.match(html, /prova presencial todo fim de semana/i);
  assert.match(pageSource, /RG ou nova Carteira de Identidade Nacional \(CIN\)/i);
  assert.match(pageSource, /mesmo número do CPF/i);
  const birthDateInput = pageSource.match(/<input[^>]*name="nascimento"[^>]*>/is)?.[0];
  assert.ok(birthDateInput, "campo de data de nascimento não encontrado");
  assert.match(birthDateInput, /type="text"/i);
  assert.match(birthDateInput, /placeholder="DD\/MM\/AAAA"/i);
  assert.doesNotMatch(birthDateInput, /type="date"/i);
  assert.doesNotMatch(html, /class="course-icon"/i);
  assert.doesNotMatch(html, /Sua matrícula em três passos/i);
  assert.doesNotMatch(html, /id="como-funciona"/i);
  assert.doesNotMatch(html, /Fale com a secretaria/i);
  assert.match(html, /src="\/shekinah-shield-mobile\.png"/i);
  assert.match(html, /alt="Escudo do Centro de Ensino Shekinah"/i);
  assert.match(html, /class="course-interest-button"[^>]*>Tenho interesse neste curso/i);
  assert.doesNotMatch(html, /id="matricula-modal"/i, "a janela não deve existir antes do clique");
  assert.doesNotMatch(html, /name="nome"/i, "o formulário não deve aparecer no corpo da página");
  assert.match(html, /aria-controls="matricula-modal"/i);
  assert.match(html, /aria-expanded="false"/i);
  assert.doesNotMatch(html, /href="#matricula"/i);
  assert.match(pageSource, /isEnrollmentOpen && \(/i);
  assert.match(pageSource, /className="enrollment-modal-backdrop"/i);
  assert.match(pageSource, /role="dialog"/i);
  assert.match(pageSource, /aria-modal="true"/i);
  assert.match(pageSource, /O curso em que você clicou já está marcado/i);
  assert.match(pageSource, /Curso escolhido e outras opções/i);
  assert.match(pageSource, /Agora preencha seus dados/i);
  assert.ok(
    pageSource.indexOf('id="course-options"') < pageSource.indexOf('name="nome"'),
    "as opções de curso devem aparecer antes dos dados pessoais",
  );
  assert.match(html, /instagram\.com\/centro_de_ensino_shekinah/i);
  assert.match(html, /facebook\.com\/profile\.php\?id=100093706818098/i);

  const coursesPosition = html.indexOf('id="cursos"');
  const instagramPosition = html.indexOf("instagram.com/centro_de_ensino_shekinah");
  assert.ok(instagramPosition >= 0 && instagramPosition < coursesPosition, "Instagram e Facebook devem aparecer no começo da página");

  const hardeningCss = await readFile(new URL("../app/site-hardening.css", import.meta.url), "utf8");
  assert.doesNotMatch(hardeningCss, /background-image:\s*url\(['"]?\/shekinah-shield\.png/i);
  assert.doesNotMatch(hardeningCss, /\.header-brand-logo\s*\{[^}]*opacity:\s*0\b/is);

  const globalsCss = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(globalsCss, /\.enrollment-modal-backdrop\s*\{[^}]*position:\s*fixed/is);
  assert.match(globalsCss, /\.enrollment-modal-panel\s*\{[^}]*max-height:/is);

  const expectedLimits = {
    nome: "100",
    nascimento: "10",
    cpf: "14",
    rg: "20",
    whatsapp: "15",
    telefone2: "15",
    endereco: "180",
  };
  for (const [name, limit] of Object.entries(expectedLimits)) {
    const input = pageSource.match(new RegExp(`<input[^>]*name=["']${name}["'][^>]*>`, "is"))?.[0];
    assert.ok(input, `campo ${name} não encontrado`);
    assert.match(input, new RegExp(`maxLength=\\{${limit}\\}`, "i"), `limite incorreto no campo ${name}`);
  }
});
