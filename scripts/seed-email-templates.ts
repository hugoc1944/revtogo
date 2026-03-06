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

Encontrei o vosso negócio no Google enquanto analisava empresas na zona.

Reparei que já têm algumas boas avaliações, mas muitas vezes clientes satisfeitos acabam por não deixar feedback simplesmente porque têm de procurar o negócio manualmente no Google.

Somos a Revtogo, um projeto em Portugal que cria placas de reviews personalizadas que permitem ao cliente deixar uma avaliação Google em cerca de 5 segundos.

O cliente aproxima o telemóvel da placa e abre diretamente a página de avaliação.

Posso enviar uma imagem exemplo feita para o vosso negócio, sem compromisso?`
    },

    {
      subject: "Sobre as avaliações no Google",
      body: `Olá,

Hoje em dia muitas pessoas escolhem onde ir apenas pelas avaliações no Google.

O problema é que muitos clientes satisfeitos até querem deixar avaliação, mas acabam por não o fazer porque teriam de procurar o negócio manualmente mais tarde.

Criámos uma placa simples que abre diretamente a página de avaliação do Google quando o cliente aproxima o telemóvel.

Assim a avaliação pode ser feita no momento, em poucos segundos.

Posso enviar uma imagem exemplo personalizada para o vosso negócio, sem compromisso?`
    },

    {
      subject: "Uma ideia rápida",
      body: `Olá,

Enquanto analisava alguns negócios no Google reparei no vosso perfil.

Muitos clientes ficam satisfeitos com o serviço mas acabam por não deixar avaliação porque o processo exige procurar o negócio manualmente no Google.

Na Revtogo criámos uma pequena solução para isso: uma placa física que abre automaticamente a página de avaliação do negócio quando o cliente aproxima o telemóvel.

Assim o processo passa de vários minutos para cerca de 5 segundos.

Posso enviar uma imagem exemplo feita para o vosso espaço, sem compromisso?`
    },

    {
      subject: "Pergunta rápida sobre avaliações",
      body: `Olá,

Uma das maiores dificuldades dos negócios locais hoje em dia é conseguir avaliações no Google, mesmo quando os clientes estão satisfeitos.

Muitas vezes a intenção existe, mas o cliente acaba por não voltar ao Google para deixar feedback.

Criámos uma placa personalizada que abre diretamente a página de avaliação do negócio quando o cliente aproxima o telemóvel.

É uma forma muito simples de transformar esse momento numa avaliação real.

Posso enviar uma imagem exemplo personalizada para o vosso espaço, sem compromisso?`
    },

    {
      subject: "Uma pequena ideia",
      body: `Olá,

Encontrei o vosso negócio no Google e reparei no perfil de avaliações.

Muitos negócios têm clientes satisfeitos mas poucas avaliações porque o cliente teria de procurar o negócio manualmente mais tarde.

Na Revtogo criámos uma placa personalizada que permite ao cliente abrir a página de avaliação do Google em segundos.

Basta aproximar o telemóvel da placa.

Posso enviar uma imagem exemplo feita para o vosso negócio, sem compromisso?`
    },

    {
      subject: "Ideia simples para avaliações",
      body: `Olá,

Estava a analisar alguns negócios locais no Google e encontrei o vosso.

Muitos clientes até querem deixar avaliação, mas acabam por não o fazer porque teriam de procurar o negócio manualmente no Google.

Criámos uma pequena placa personalizada que abre diretamente a página de avaliação quando o cliente aproxima o telemóvel.

Assim a avaliação pode ser feita em poucos segundos, no próprio espaço.

Posso enviar uma imagem exemplo feita para o vosso espaço, sem compromisso?`
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