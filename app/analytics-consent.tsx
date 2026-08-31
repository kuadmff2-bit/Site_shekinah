"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID?.trim();
const CONSENT_KEY = "shekinah-analytics-consent";

type Consent = "accepted" | "rejected" | null;

export default function AnalyticsConsent() {
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(!GA_ID);

  useEffect(() => {
    if (!GA_ID) return;

    const timer = window.setTimeout(() => {
      const saved = window.localStorage.getItem(CONSENT_KEY);
      if (saved === "accepted" || saved === "rejected") {
        setConsent(saved);
      }
      setReady(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  function saveConsent(value: Exclude<Consent, null>) {
    window.localStorage.setItem(CONSENT_KEY, value);
    setConsent(value);
  }

  if (!GA_ID || !ready) return null;

  return (
    <>
      {consent === "accepted" ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="shekinah-google-analytics" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
          </Script>
        </>
      ) : null}

      {consent === null ? (
        <aside className="cookie-consent" role="dialog" aria-label="Preferências de cookies" aria-live="polite">
          <div>
            <strong>Privacidade e cookies</strong>
            <p>
              Usamos cookies de medição somente se você permitir. A pré-matrícula continua funcionando normalmente mesmo sem aceitar.
            </p>
          </div>
          <div className="cookie-consent-actions">
            <button type="button" className="cookie-secondary" onClick={() => saveConsent("rejected")}>Recusar</button>
            <button type="button" className="cookie-primary" onClick={() => saveConsent("accepted")}>Aceitar</button>
          </div>
        </aside>
      ) : null}
    </>
  );
}
