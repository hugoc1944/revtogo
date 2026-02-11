import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendDesignRequestEmail({
  to,
  name,
  businessName,
}: {
  to: string;
  name: string;
  businessName: string;
}) {
  await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to,
    subject: "Recebemos o seu pedido de design — Revtogo",
    html: `
      <div style="font-family: Inter, Arial, sans-serif; max-width:600px; margin:0 auto; padding:40px 20px;">
        <h1 style="font-size:20px; margin-bottom:16px;">Olá ${name},</h1>

        <p style="font-size:16px; line-height:1.6;">
          Recebemos o pedido de design para <strong>${businessName}</strong>.
        </p>

        <p style="font-size:16px; line-height:1.6;">
          Estamos a preparar a proposta personalizada da sua placa Revtogo.
        </p>

        <p style="font-size:16px; line-height:1.6;">
          Enviamos o design antes de qualquer pagamento.
        </p>

        <hr style="margin:30px 0; border:none; border-top:1px solid #eee;" />

        <p style="font-size:14px; color:#666;">
          Se precisar de alguma informação adicional, pode responder diretamente a este email.
        </p>

        <p style="font-size:14px; color:#666; margin-top:30px;">
          Revtogo<br/>
          www.revtogo.pt
        </p>
      </div>
    `,
  });
}
