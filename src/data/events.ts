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

export const FALLBACK_EVENTS: FallbackEventItem[] = [
  {
    id: 'officers-retreat',
    title: "La Area Annual Apostles' & Officers' Retreat",
    category: 'Area-Wide Convention',
    month: 'APR',
    day: '18',
    startDate: '2025-04-18',
    endDate: '2025-04-20',
    time: '8:00 AM – 5:00 PM Daily',
    location: 'La Central Assembly Auditorium, Accra',
    featured: true,
    image: '/theme.jpg',
    description:
      'A dedicated convocation bringing together ministers, presiding elders, elders, deacons, deaconesses, and ministry leaders across all 24 districts of the La Area for intensive prayer, apostolic teaching, leadership equipping, and vision alignment.',
    highlights: [
      'Keynote apostolic teachings and doctrinal expositions led by the Area Head and guest ministers',
      'District leadership breakout sessions and strategic ministry planning',
      'Corporate intercession and spiritual renewal services for all church officers',
    ],
  },
  {
    id: 'youth-prayer-revival',
    title: 'Area Youth Prayer & Revival Night',
    category: 'YOUTH WING',
    month: 'APR',
    day: '12',
    startDate: '2025-04-12',
    time: '6:00 PM – 10:00 PM',
    location: 'La Central Assembly · 6:00 PM',
    featured: false,
    image: '/youth-pic.jpg',
    description:
      'An evening of fervent worship, prevailing prayer, and the Word tailored for young people, students, and young professionals across the La Area.',
    highlights: [
      'Spirit-led praise and worship ministration by the Area Youth Choir',
      'Focused intercession for campuses, careers, and spiritual awakening',
      'Word ministration and altar call for fresh empowerment',
    ],
  },
  {
    id: 'soul-winning-crusade',
    title: 'District-Wide Soul Winning & Open Air Crusade',
    category: 'EVANGELISM MINISTRY',
    month: 'APR',
    day: '27',
    startDate: '2025-04-27',
    time: '4:30 PM – 8:30 PM',
    location: 'All 24 Districts · 4:30 PM',
    featured: false,
    image: '/theme.jpg',
    description:
      'Joining hands across all 24 districts in the La Area to proclaim the Gospel of Jesus Christ through house-to-house evangelism and evening open-air crusades.',
    highlights: [
      'Coordinated afternoon community outreach and tract distribution',
      'Evening gospel rallies with testimonies and prayer for the sick',
      'Follow-up and discipleship orientation for new converts',
    ],
  },
  {
    id: 'virtuous-women-service',
    title: 'Virtuous Women Intercessory & Leadership Service',
    category: "WOMEN'S MINISTRY",
    month: 'MAY',
    day: '04',
    startDate: '2025-05-04',
    time: '9:00 AM – 1:00 PM',
    location: 'La Area Forecourt · 9:00 AM',
    featured: false,
    image: '/women-pic.jpg',
    description:
      'A special gathering of the Women’s Ministry focused on family intercession, godly home-building, and equipping women leaders for community impact.',
    highlights: [
      'Intercessory prayers for families, children, and the nation',
      'Practical workshops on Christian womanhood, health, and stewardship',
      'Fellowship and networking across local assemblies',
    ],
  },
];
