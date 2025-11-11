import { Sections } from '@/lib/generation/schema';

export function renderHtmlTemplate(techName: string, sections: Sections, heroImage?: string | null) {
  const referenceList = sections.references
    .map((ref) => `<li><a href="${ref.url}" target="_blank" rel="noopener noreferrer">${ref.title}</a></li>`)
    .join('');
  const challenges = sections.challenges.map((item) => `<li>${item}</li>`).join('');
  const advantages = sections.advantages.map((item) => `<li>${item}</li>`).join('');
  const useCases = sections.useCases.map((item) => `<li>${item}</li>`).join('');
  const vendors = sections.vendors.map((item) => `<li>${item}</li>`).join('');
  const valueProps = sections.economics.valueProps.map((item) => `<li>${item}</li>`).join('');

  return `
    <section id="description">
      <h1>${techName}</h1>
      <p>${sections.description}</p>
    </section>
    ${heroImage ? `<img src="${heroImage}" alt="${techName}" />` : ''}
    <section id="purpose">
      <h2>Purpose</h2>
      <p>${sections.purpose}</p>
    </section>
    <section id="challenges">
      <h2>Challenges</h2>
      <ul>${challenges}</ul>
    </section>
    <section id="advantages">
      <h2>Advantages</h2>
      <ul>${advantages}</ul>
    </section>
    <section id="economics">
      <h2>Economics</h2>
      <ul>${valueProps}</ul>
      <p>Sample ROI: ${sections.economics.sampleROI ?? '— / TODO'}</p>
    </section>
    <section id="navigation">
      <h2>Navigation</h2>
      <p>${sections.navigation.area}</p>
    </section>
    <section id="usecases">
      <h2>Use Cases</h2>
      <ul>${useCases}</ul>
    </section>
    <section id="market">
      <h2>Market</h2>
      <p>TAM: ${sections.market.TAM}</p>
      <p>SAM: ${sections.market.SAM}</p>
      <p>SOM: ${sections.market.SOM}</p>
      <p>Growth: ${sections.market.growth.metric} (${sections.market.growth.years})</p>
    </section>
    <section id="vendors">
      <h2>Vendors</h2>
      <ul>${vendors}</ul>
    </section>
    <section id="references">
      <h2>References</h2>
      <ul>${referenceList}</ul>
    </section>
  `;
}
