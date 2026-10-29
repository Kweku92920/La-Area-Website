export type FallbackEventItem = {
  id: string;
  title: string;
  category: string;
  month: string;
  day: string;
  startDate: string;
  endDate?: string;
  time: string;
  location: string;
  featured?: boolean;
  image: string;
  description: string;
  highlights: string[];
};

export const FALLBACK_EVENTS: FallbackEventItem[] = [];
