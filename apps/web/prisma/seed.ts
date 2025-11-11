import { prisma } from '@/lib/db';

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
              economics: { valueProps: ['Saves time'], sampleROI: '— / TODO' },
              navigation: { area: 'Innovation' },
              useCases: ['Demo'],
              market: { TAM: '— / TODO', SAM: '— / TODO', SOM: '— / TODO', growth: { metric: '— / TODO', years: '— / TODO' } },
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
