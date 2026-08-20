export interface Project {
  id: string
  title: string
  role: string
  description: string
  stack: string[]
  stat?: string
  links: { live?: string; github?: string; slides?: string }
  media: { type: 'image' | 'none'; src?: string; alt?: string }
  accent: 'yellow' | 'cyan'
}

// ponytail: media.src points at public/assets — swap a file or a string here, never touch components
export const projects: Project[] = [
  {
    id: 'death-over',
    title: 'The Death Over',
    role: 'Lead Developer',
    description:
      'Cricket simulation game with a probability engine, AI batsman archetypes, field-reading logic, a bluff mechanic, seeded-RNG daily challenges, and a Wordle-style share feature.',
    stack: ['Next.js', 'TypeScript', 'Supabase', 'Railway'],
    stat: '30,000+ plays · 10,000+ players',
    links: { live: 'https://www.deathover.xyz/', github: 'https://github.com/bagel786/DeathOver' },
    media: { type: 'image', src: '/assets/deathover.png', alt: 'The Death Over tactical gameplay UI' },
    accent: 'yellow',
  },
  {
    id: 'astrotour',
    title: 'AstroTour',
    role: 'Solo Developer',
    description:
      'Educational career-exploration game built solo in Unity for TSA competition — explore careers through interactive space-station gameplay.',
    stack: ['Unity', 'C#'],
    stat: '3,500+ plays',
    links: { live: 'https://play.unity.com/en/games/4840d816-e430-4887-87ae-8159a44fba21/astrotour', github: 'https://github.com/bagel786/AstroTour' },
    media: { type: 'image', src: '/assets/astrotour.jpeg', alt: 'AstroTour title screen' },
    accent: 'cyan',
  },
  {
    id: 'neurova',
    title: 'Neurova Labs',
    role: 'Founding Engineer',
    description:
      'ML/CV models trained on 12,000+ brain recordings, improving classification accuracy 38%. Engineered 4 cloud data pipelines for the research stack.',
    stack: ['Python', 'ML/CV', 'Cloud'],
    stat: '12,000+ recordings · +38% accuracy',
    links: { live: 'https://www.neurovalabs.xyz/' },
    media: { type: 'image', src: '/assets/neurova.jpg', alt: 'Neurova Labs platform' },
    accent: 'cyan',
  },
  {
    id: 'mit-bwsi',
    title: 'The Lost Souls of Jiangshi Island',
    role: 'Core Unity Engineer',
    description:
      'A serious game about trust and time built at MIT\'s Beaver Works Summer Institute (1 of 37 selected nationally). Does time pressure make people rely on AI even when it\'s wrong? On a 5-person agile team mentored by MIT Lincoln Laboratory researchers, we built a tower-defense game in Unity/C# where a Python-driven "Oracle" AI delivers deliberately unreliable intel. I coded the core Unity systems and the real-time pipeline connecting the Oracle to the game. Across 10 waves of escalating time pressure, reliance on the AI climbed steadily — even right after players watched it get it wrong. Presented at BWSI\'s closing symposium.',
    stack: ['Unity', 'C#', 'Python'],
    stat: '1 of 37 selected',
    links: {
      live: 'https://safm1rza.itch.io/lost-souls-of-jiangshi-island',
      slides: 'https://docs.google.com/presentation/d/1ccV_-1hlxPX0dNLlgJruykgX_AaMNjmiQW_gWFeG-3M/edit?slide=id.g3f5de2169ed_0_184#slide=id.g3f5de2169ed_0_184',
    },
    media: { type: 'none' },
    accent: 'yellow',
  },
  {
    id: 'launchpad',
    title: 'LaunchPad Consulting',
    role: 'CTO',
    description:
      'Architected dashboards, landing pages, and lead-gen tools for 10+ clients while leading a 10-person dev team.',
    stack: ['Next.js', 'TypeScript'],
    stat: '$15K+ revenue · 10-person team',
    links: { live: 'https://launchpadconsulting.xyz/' },
    media: { type: 'image', src: '/assets/launchpad.png', alt: 'Launchpad Consulting logo' },
    accent: 'yellow',
  },
  {
    id: 'meridian',
    title: 'Meridian Finance Solutions',
    role: 'Tech Director',
    description:
      'Engineered an iOS app, full-stack platform, and 20+ Python tools for financial literacy — scaled to 5 national chapters reaching 800+ students.',
    stack: ['iOS', 'Python', 'Full-Stack'],
    stat: '5 national chapters · 800+ students',
    links: { live: 'https://meridianfinance.org/' },
    media: { type: 'image', src: '/assets/meridian.jpg', alt: 'Meridian Finance Solutions platform' },
    accent: 'cyan',
  },
]
