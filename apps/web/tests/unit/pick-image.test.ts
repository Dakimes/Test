import { describe, expect, it } from 'vitest';
import { pickBestImage } from '@/lib/parsing/pick-image';

describe('pickBestImage', () => {
  it('returns null when no images', () => {
    expect(pickBestImage([])).toBeNull();
  });

  it('returns first image when available', () => {
    expect(pickBestImage(['a.jpg', 'b.jpg'])).toBe('a.jpg');
  });
});
