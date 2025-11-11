export const detectTechnologiesPrompt = (textChunks: string[]) => `You are an analyst. Review the following content and detect the most relevant technologies. Provide up to five candidates with concise descriptions.\n${textChunks.join('\n')}`;

export const fillSectionsPrompt = (techName: string, researchFindings: string[]) => `Draft sections for a technology one-pager about ${techName}. Use only verifiable facts provided below. Where data is missing, respond with "— / TODO". Include citations inline.\n${researchFindings.join('\n')}`;
