import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function run() {

  // remove existing templates
  await prisma.emailTemplate.deleteMany();

  const templates = [

    /* ============================= */
    /* GENERAL EMAILS */
    /* ============================= */

    {
      subject: "Pergunta rápida",
      body: `Olá,

Encontrei o vosso negócio no Google enquanto procurava empresas na zona.

Reparei que já têm algumas boas avaliações, mas muitas vezes clientes satisfeitos acabam por não deixar avaliação simplesmente porque têm de procurar o negócio manualmente no Google.

Criámos uma forma muito simples de resolver isso.

Posso enviar um exemplo feito para o vosso negócio?

Cumprimentos,`
    },

    {
      subject: "Sobre as avaliações no Google",
      body: `Olá,

Hoje em dia muitas pessoas escolhem onde comprar ou que serviço usar apenas pelas avaliações no Google.

O problema é que muitos clientes satisfeitos acabam por não deixar avaliação no momento.

Criámos uma pequena solução que facilita bastante esse processo.

Se quiser, posso enviar um exemplo feito para o vosso negócio.

Cumprimentos,`
    },

    {
      subject: "Uma ideia rápida",
      body: `Olá,

Encontrei o vosso negócio no Google.

Temos ajudado várias empresas locais a receber mais avaliações simplesmente facilitando o momento em que o cliente decide deixar feedback.

É algo bastante simples.

Quer que lhe envie um exemplo para o vosso espaço?

Cumprimentos,`
    },

    {
      subject: "Pergunta rápida sobre avaliações",
      body: `Olá,

Hoje em dia muitas pessoas confiam nas avaliações do Google antes de escolher um negócio.

O problema é que mesmo clientes satisfeitos raramente deixam avaliação no momento.

Criámos uma forma simples de facilitar esse processo.

Posso enviar um exemplo feito para o vosso negócio?

Cumprimentos,`
    },

    {
      subject: "Uma pequena ideia",
      body: `Olá,

Estava a analisar alguns negócios locais no Google e encontrei o vosso.

Temos ajudado várias empresas a aumentar o número de avaliações simplesmente facilitando o processo para o cliente.

Se quiser, posso enviar um exemplo rápido para ver se faria sentido para o vosso negócio.

Cumprimentos,`
    },

    {
      subject: "Ideia simples para avaliações",
      body: `Olá,

Cada vez mais clientes escolhem empresas com base nas avaliações no Google.

Temos ajudado alguns negócios a facilitar o momento em que o cliente deixa feedback.

É algo bastante simples mas tem funcionado muito bem.

Quer que lhe envie um exemplo para o vosso negócio?

Cumprimentos,`
    },

    /* ============================= */
    /* FOLLOW UPS */
    /* ============================= */

    {
      subject: "Re: Pergunta rápida",
      body: `Olá,

Só para confirmar se viu o meu email anterior.

Se fizer sentido, posso enviar um exemplo rápido para o vosso negócio.

Cumprimentos,`
    },

    {
      subject: "Re: Pergunta rápida",
      body: `Olá,

Prometo que é a última mensagem.

Se quiser, posso enviar um exemplo rápido para o vosso negócio para ver se faria sentido para vocês.

Caso contrário, sem problema.

Cumprimentos,`
    }

  ];

  for (const template of templates) {

    await prisma.emailTemplate.create({
      data: template
    });

  }

  console.log(`✅ ${templates.length} email templates inserted`);

  await prisma.$disconnect();

}

run().catch(async (err) => {

  console.error(err);

  await prisma.$disconnect();

  process.exit(1);

});