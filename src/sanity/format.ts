export const MINISTER_TBA = 'Minister to be announced';

export const districtLabel = (name: string) => (/WC$/.test(name) ? name : `${name} District`);

export const youtubeId = (url: string) =>
  url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/)?.[1] ?? '';

export const youtubeThumb = (url: string) => `https://img.youtube.com/vi/${youtubeId(url)}/hqdefault.jpg`;

export const formatDate = (d: string) =>
  new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
