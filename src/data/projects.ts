export interface Project {
  id: string
  title: string
  role: string
  description: string
  stack: string[]
  stat?: string
  links: { live?: string; github?: string; slides?: string; paper?: string }
  media: { type: 'image' | 'none'; src?: string; alt?: string; ratio?: string }
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
    id: 'beat-the-countdown',
    title: 'Beat the Countdown',
    role: 'Programmer',
    description:
      'GMTK Game Jam 2026 action platformer built in four days: the world ends in 30 seconds, enemies steal your time, and time is money — steal it back from enemies and spend it on shop upgrades. Programmed the game\'s core gameplay systems.',
    stack: ['Godot', '2D', 'Pixel Art'],
    stat: 'Top 10% enjoyment · 10.5k+ GMTK entries',
    links: { live: 'https://leandergamedev.itch.io/beat-the-countdown' },
    media: { type: 'image', src: '/assets/beat-the-countdown.png', alt: 'Beat the Countdown cover art', ratio: '315 / 250' },
    accent: 'yellow',
  },
  {
    id: 'one-last-jump',
    title: 'One Last Jump',
    role: 'Contributor',
    description:
      'GMTK Game Jam 2026 puzzle-platformer: walking is free, but every jump, dash, crate push, and grapple ticks your move counter toward zero — reach the real door before your options run out. All assets hand-drawn.',
    stack: ['HTML5', '2D', 'Hand-Drawn'],
    stat: 'Top 15% · 10.5k+ GMTK entries',
    links: { live: 'https://hot-comet.itch.io/one-last-jump' },
    media: { type: 'image', src: '/assets/one-last-jump.png', alt: 'One Last Jump cover art', ratio: '315 / 250' },
    accent: 'cyan',
  },
  {
    id: 'marlrefine',
    title: 'MARLRefine',
    role: 'Sole Author',
    description:
      'Independent research on conformance testing for multi-agent RL environment adapters: aligns a separately loaded native execution with adapter-call blocks and checks phase-scoped semantic obligations across reward channels, decision clocks, and agent scheduling. The case study ran 8 fixed policies over 105 OpenSpiel game types (840 traces) and adjudicated 2,737 findings into three implementation-level roots.',
    stack: ['Python', 'OpenSpiel', 'Mutation Testing'],
    stat: '105 game types · 840 traces',
    links: {
      paper: '/assets/marlrefine-paper.pdf',
      github: 'https://github.com/bagel786/marlrefine-artifact',
    },
    media: { type: 'none' },
    accent: 'yellow',
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
]
