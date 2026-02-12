import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

const FROM = process.env.EMAIL_FROM!;
const REPLY_TO = process.env.EMAIL_REPLY_TO!;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;

/* =========================================
   BASE EMAIL WRAPPER
========================================= */

function emailWrapper(content: string) {
  return `
    <div style="background:#f6f7f9; padding:40px 20px;">
      <div style="max-width:620px; margin:0 auto; background:#ffffff; border-radius:16px; overflow:hidden; font-family:Inter, Arial, sans-serif;">
        
        <div style="padding:28px 32px;">
          ${content}
        </div>

        <div style="background:#111111; color:#ffffff; padding:20px 32px; font-size:13px;">
          Revtogo · www.revtogo.pt
        </div>

      </div>
    </div>
  `;
}

/* =========================================
   DESIGN REQUEST — CLIENT EMAIL
========================================= */

export async function sendDesignRequestEmail({
  to,
  name,
  businessName,
  designStyle,
  deliveryMethod,
  phone,
  notes,
}: {
  to: string;
  name: string;
  businessName: string;
  designStyle: "solid" | "art";
  deliveryMethod: "email" | "whatsapp";
  phone?: string;
  notes?: string;
}) {
  try {
    const summaryBlock = `
      <div style="margin-top:24px; padding:18px; background:#f3f4f6; border-radius:12px;">
        <p style="margin:0 0 8px 0; font-weight:600;">Resumo do pedido</p>

        <p style="margin:4px 0; font-size:14px;">
          <strong>Negócio:</strong> ${businessName}
        </p>

        <p style="margin:4px 0; font-size:14px;">
          <strong>Design:</strong> ${
            designStyle === "solid" ? "Fundo sólido" : "Arte personalizada"
          }
        </p>

        <p style="margin:4px 0; font-size:14px;">
          <strong>Entrega:</strong> ${
            deliveryMethod === "email" ? "Email" : "WhatsApp"
          }
        </p>

        ${
          phone
            ? `<p style="margin:4px 0; font-size:14px;">
                 <strong>Telemóvel:</strong> ${phone}
               </p>`
            : ""
        }

        ${
          notes
            ? `<p style="margin:8px 0 0 0; font-size:14px;">
                 <strong>Notas:</strong> ${notes}
               </p>`
            : ""
        }
      </div>
    `;

    const html = emailWrapper(`
      <h1 style="font-size:20px; margin-bottom:16px;">
        Olá ${name},
      </h1>

      <p style="font-size:16px; line-height:1.6; margin-bottom:14px;">
        Recebemos o seu pedido de design para <strong>${businessName}</strong>.
      </p>

      <p style="font-size:16px; line-height:1.6;">
        Estamos a preparar a proposta personalizada da sua placa Revtogo.
      </p>

      <p style="font-size:16px; line-height:1.6; margin-top:12px;">
        Enviamos o design antes de qualquer pagamento.
      </p>

      ${summaryBlock}

      <p style="font-size:14px; color:#666; margin-top:26px;">
        Pode responder diretamente a este email
        ou contactar-nos em ${REPLY_TO}.
      </p>
    `);

    await resend.emails.send({
      from: FROM,
      replyTo: REPLY_TO,
      to,
      subject: "Recebemos o seu pedido de design | Revtogo",
      html,
      text: `Recebemos o seu pedido de design para ${businessName}. Estamos a preparar a proposta personalizada.`,
    });

  } catch (err) {
    console.error("[EMAIL_DESIGN_REQUEST_ERROR]", err);
  }
}

/* =========================================
   DESIGN REQUEST — ADMIN NOTIFICATION
========================================= */

export async function sendAdminDesignRequestNotification({
  name,
  email,
  businessName,
  designStyle,
  deliveryMethod,
  phone,
  notes,
}: {
  name: string;
  email: string;
  businessName: string;
  designStyle: "solid" | "art";
  deliveryMethod: "email" | "whatsapp";
  phone?: string;
  notes?: string;
}) {
  try {
    await resend.emails.send({
      from: FROM,
      to: ADMIN_EMAIL,
      subject: `Novo pedido de design — ${businessName}`,
      text: `
Novo pedido de design recebido.

Negócio: ${businessName}
Cliente: ${name}
Email: ${email}
Design: ${designStyle}
Entrega: ${deliveryMethod}
Telemóvel: ${phone ?? "-"}
Notas: ${notes ?? "-"}

Ver no admin:
https://revtogo.pt/revtogo-admin/design-requests
      `,
    });
  } catch (err) {
    console.error("[EMAIL_ADMIN_NOTIFICATION_ERROR]", err);
  }
}

/* =========================================
   CONTACT EMAIL
========================================= */

export async function sendContactEmail({
  to,
  name,
}: {
  to: string;
  name: string;
}) {
  try {
    const html = emailWrapper(`
      <h1 style="font-size:20px; margin-bottom:16px;">
        Olá ${name},
      </h1>

      <p style="font-size:16px; line-height:1.6;">
        Recebemos a sua mensagem e iremos responder brevemente.
      </p>

      <p style="font-size:16px; line-height:1.6; margin-top:12px;">
        Obrigado por entrar em contacto com a Revtogo.
      </p>

      <p style="font-size:14px; color:#666; margin-top:26px;">
        Pode responder diretamente a este email
        ou contactar-nos em ${REPLY_TO}.
      </p>
    `);

    await resend.emails.send({
      from: FROM,
      replyTo: REPLY_TO,
      to,
      subject: "Recebemos a sua mensagem | Revtogo",
      html,
      text: `Recebemos a sua mensagem. Iremos responder brevemente.`,
    });

  } catch (err) {
    console.error("[EMAIL_CONTACT_ERROR]", err);
  }
}
