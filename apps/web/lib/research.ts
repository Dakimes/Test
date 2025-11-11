interface SearchSnippet {
  text: string;
  url: string;
  source: string;
  date?: string;
}

interface ResearchResult {
  snippets: SearchSnippet[];
  aggregated: string;
}

export class ResearchService {
  constructor(private readonly apiKey = process.env.TAVILY_API_KEY) {}

  async searchFacts(query: string, focus?: string): Promise<ResearchResult> {
    if (process.env.USE_MOCKS === 'true' || !this.apiKey) {
      return {
        snippets: [
          {
            text: `${query} findings placeholder`,
            url: 'https://example.com/mock',
            source: 'mock'
          }
        ],
        aggregated: 'Mocked research summary.'
      };
    }

    const response = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': this.apiKey
      },
      body: JSON.stringify({ query, focus })
    });

    if (!response.ok) {
      return this.searchWithSerp(query, focus);
    }

    const data = await response.json();
    return {
      snippets: data.results ?? [],
      aggregated: data.summary ?? ''
    };
  }

  private async searchWithSerp(query: string, focus?: string): Promise<ResearchResult> {
    if (!process.env.SERPAPI_KEY) {
      return {
        snippets: [],
        aggregated: ''
      };
    }

    const response = await fetch(
      `https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(query)}&api_key=${process.env.SERPAPI_KEY}`
    );
    if (!response.ok) {
      return { snippets: [], aggregated: '' };
    }
    const data = await response.json();
    const snippets = (data.organic_results ?? []).map((item: any) => ({
      text: item.snippet,
      url: item.link,
      source: item.source ?? 'serp',
      date: item.date
    }));
    return { snippets, aggregated: focus ? `${focus} findings` : 'SERP fallback summary.' };
  }
}
