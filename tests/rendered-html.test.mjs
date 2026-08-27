import assert from "node:assert/strict";
import test from "node:test";

test("renders the Shekinah page with EJA and official social links", async () => {
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
  assert.match(html, /RG ou nova Carteira de Identidade Nacional \(CIN\)/i);
  assert.match(html, /mesmo número do CPF/i);
  assert.doesNotMatch(html, /class="course-icon"/i);
  assert.match(html, /instagram\.com\/centro_de_ensino_shekinah/i);
  assert.match(html, /facebook\.com\/profile\.php\?id=100093706818098/i);
});
