export async function uploadSources(files: File[], meta: Record<string, unknown>) {
  const formData = new FormData();
  files.forEach((file) => formData.append('files', file));
  formData.append('meta', JSON.stringify(meta));

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData
  });
  if (!response.ok) {
    throw new Error('Upload failed');
  }
  return response.json();
}

export async function createGenerationJob(sourceIds: string[], payload: Record<string, unknown>) {
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ sourceIds, payload })
  });
  if (!response.ok) {
    throw new Error('Failed to create job');
  }
  return response.json();
}
