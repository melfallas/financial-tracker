import { Injectable } from '@angular/core';
import { EmailPayload } from '@core/interfaces/i-email-provider';

/**
 * EmailService — generates the email HTML body and constructs the
 * pre-filled Calendly booking URL from environment variables.
 *
 * Design spec: docs/Product Design/Organisms-Email-Confirmation.md
 */
@Injectable({
    providedIn: 'root',
})
export class EmailService {

    /**
     * Builds the pre-filled Calendly URL with UTM tracking and lead data.
     * Source: NG_APP_CALENDLY_BASE_URL environment variable.
     */
    buildCalendlyUrl(leadFullName: string, email: string): string {
        const base = import.meta.env.NG_APP_CALENDLY_BASE_URL ?? '';
        const params = new URLSearchParams({
            name: leadFullName,
            email,
            utm_source: 'email_confirmation',
        });
        return `${base}?${params.toString()}`;
    }

    /**
     * Generates the email HTML body as a table-based layout compatible with
     * major email clients (Gmail, Outlook). Inline styles only — no Flexbox/Grid.
     *
     * Design tokens applied:
     *   Deep Blue: #1A3C6E
     *   Emerald Green: #00C853 (primary CTA)
     *   Cloud Gray: #ECEFF1 (footer)
     */
    buildHtmlBody(payload: Omit<EmailPayload, 'pdfFilename' | 'htmlBody'>): string {
        const isEs = payload.lang === 'ES';
        const fileName = "Financial Tracker Plan";

        const subject = isEs
            ? `Descarga tu Plan Financiero 🔒`
            : `Download your Financial Blueprint 🔒`;

        const greeting = isEs
            ? `Hola <strong>${payload.leadFirstName}</strong>,`
            : `Hi <strong>${payload.leadFirstName}</strong>,`;

        const bodyIntro = isEs
            ? `Las matemáticas son claras. Has dado el primer paso para detener la erosión de tu patrimonio.`
            : `The math is clear. You have taken the first step toward stopping inflation from eroding your wealth.`;

        const bodyDetail = isEs
            ? `Como prometimos, nuestro sistema ha finalizado tu proyección personalizada basada en los datos que nos proporcionaste. Tu archivo está asegurado y listo.`
            : `As promised, our system has finalized your custom projection based on the data you provided. Your file is secured and ready.`;

        const pdfBtnLabel = isEs
            ? `📄 Descarga tu Plan Financiero`
            : `📄 Download your Financial Blueprint`;

        const sectionTitle = isEs
            ? `EL SIGUIENTE PASO: UNA ESTRATEGIA OFENSIVA`
            : `THE NEXT STEP: AN OFFENSIVE STRATEGY`;

        const sectionBody = isEs
            ? `Los números solos no arreglarán la brecha. Necesitas definir tu línea de tiempo de ejecución y revisar tu asignación de activos actual. No tienes que resolverlo solo. Dedica 15 minutos a mejorar tu estabilidad financiera.`
            : `Numbers alone won't fix the gap. You need to define your execution timeline and review your current asset allocation. You don't have to figure it out alone. Let's spend 15 minutes mapping you out of the slow-growth cycle.`;

        const calendlyBtnLabel = isEs
            ? `📅 AGENDA TU LLAMADA ESTRATÉGICA AHORA`
            : `📅 BOOK YOUR STRATEGY CALL NOW`;

        const signOff = isEs ? `Hasta pronto.<br>Saludos.` : `Talk soon.<br>Regards.`;

        const footerText = isEs
            ? `© 2026 Financial Tracker. La información proporcionada es solo con fines educativos y no constituye asesoramiento financiero.`
            : `© 2026 Financial Tracker. The information provided is for educational purposes and does not constitute financial advice.`;

        const unsubscribeText = isEs ? `Cancelar suscripción | Política de Privacidad` : `Unsubscribe | Privacy Policy`;

        return `
<!DOCTYPE html>
<html lang="${isEs ? 'es' : 'en'}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, Helvetica, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f4f4; padding: 20px 0;">
    <tr>
      <td align="center">
        <!-- Wrapper -->
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.08);">

          <!-- HEADER: Deep Blue block -->
          <tr>
            <td style="background-color: #1A3C6E; padding: 24px 32px; text-align: left;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="color: #ffffff; font-size: 22px; font-weight: bold; letter-spacing: 1px;">
                    Financial Tracker
                  </td>
                  <td align="right" style="color: rgba(255,255,255,0.6); font-size: 12px;">
                    ${isEs ? 'Tu Brújula Financiera' : 'Your Financial Compass'}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- BODY: White content area -->
          <tr>
            <td style="padding: 40px 40px 24px 40px; color: #37474F; font-size: 16px; line-height: 1.7;">
              <p style="margin: 0 0 16px 0;">${greeting}</p>
              <p style="margin: 0 0 16px 0;">${bodyIntro}</p>
              <p style="margin: 0 0 32px 0;">${bodyDetail}</p>

              <!-- PDF Ghost Button -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding-bottom: 32px;">
                    <a href="#"
                       style="display: inline-block; padding: 14px 32px; border: 2px solid #1A3C6E; color: #1A3C6E; background-color: #ffffff; border-radius: 6px; font-size: 15px; font-weight: bold; text-decoration: none; letter-spacing: 0.5px;">
                      ${pdfBtnLabel}
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="border-top: 1px solid #ECEFF1; padding-bottom: 28px;"></td>
                </tr>
              </table>

              <!-- Section: Next Step -->
              <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: bold; color: #9E9E9E; letter-spacing: 1.5px; text-transform: uppercase;">
                ${sectionTitle}
              </p>
              <p style="margin: 0 0 28px 0;">${sectionBody}</p>

              <!-- PRIMARY CTA: Emerald Green Calendly Button -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding-bottom: 32px;">
                    <a href="${payload.bookingUrl}"
                       target="_blank"
                       style="display: inline-block; padding: 18px 40px; background-color: #00C853; color: #ffffff; border-radius: 6px; font-size: 16px; font-weight: bold; text-decoration: none; letter-spacing: 0.5px; box-shadow: 0 4px 12px rgba(0, 200, 83, 0.35);">
                      ${calendlyBtnLabel}
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Sign-off -->
              <p style="margin: 0; color: #37474F;">${signOff}</p>
            </td>
          </tr>

          <!-- FOOTER: Cloud Gray -->
          <tr>
            <td style="background-color: #ECEFF1; padding: 20px 40px; text-align: center;">
              <p style="margin: 0 0 8px 0; color: #9E9E9E; font-size: 11px; line-height: 1.6;">
                ${footerText}
              </p>
              <p style="margin: 0; color: #BDBDBD; font-size: 11px;">
                <a href="#" style="color: #BDBDBD; text-decoration: underline;">${unsubscribeText}</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
    }
}
