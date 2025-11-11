import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['warn', 'error']
});

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'Test User'
    }
  });

  await prisma.onePager.upsert({
    where: { slug: 'sample-tech' },
    update: {},
    create: {
      slug: 'sample-tech',
      title: 'Sample Tech',
      techName: 'Sample Tech',
      status: 'DONE',
      html: '<section><h1>Sample Tech</h1><p>Example one pager.</p></section>',
      ownerId: user.id,
      sections: {
        create: [
          {
            key: 'DESCRIPTION',
            content: {
              description: 'Sample description',
              purpose: 'Demonstrate seed',
              challenges: ['Adoption'],
              advantages: ['Efficiency'],
              economics: { valueProps: ['Saves time'], sampleROI: '\u2014 / TODO' },
              navigation: { area: 'Innovation' },
              useCases: ['Demo'],
              market: {
                TAM: '\u2014 / TODO',
                SAM: '\u2014 / TODO',
                SOM: '\u2014 / TODO',
                growth: { metric: '\u2014 / TODO', years: '\u2014 / TODO' }
              },
              vendors: ['Vendor A'],
              references: []
            },
            order: 0
          }
        ]
      }
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
