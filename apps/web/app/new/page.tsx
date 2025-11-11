'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { uploadSources, createGenerationJob } from '@/lib/client';
import { Heading } from '@/components/ui/heading';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function NewOnePagerPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [url, setUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    const incoming = Array.from(event.dataTransfer.files);
    setFiles((prev) => [...prev, ...incoming]);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const incoming = event.target.files ? Array.from(event.target.files) : [];
    setFiles((prev) => [...prev, ...incoming]);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const uploadResult = await uploadSources(files, { url, notes });
      const job = await createGenerationJob(uploadResult.sourceIds, { url, notes });
      router.push(`/jobs/${job.id}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-6 p-6">
      <Heading level={1}>Create a one pager</Heading>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label
          className="flex h-40 flex-col items-center justify-center rounded-lg border-2 border-dashed border-brand-200 bg-white text-slate-600"
          onDragOver={(event) => event.preventDefault()}
          onDrop={handleDrop}
        >
          <input
            type="file"
            className="hidden"
            multiple
            accept=".pdf,.doc,.docx,.html,.txt"
            onChange={handleFileChange}
          />
          Drag & drop files here or click to browse (max 25MB each)
        </label>
        <div>
          <label className="block text-sm font-medium text-slate-700">Reference URL</label>
          <input
            type="url"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
            placeholder="https://example.com/article"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Additional context</label>
          <Textarea value={notes} onChange={(event) => setNotes(event.target.value)} rows={4} />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? 'Submitting…' : 'Generate one pager'}
        </Button>
      </form>
      {files.length > 0 && (
        <div className="rounded-md bg-white p-4 shadow">
          <Heading level={2}>Selected files</Heading>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
            {files.map((file) => (
              <li key={file.name}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
