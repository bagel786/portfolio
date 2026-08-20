export interface LeadershipItem {
  org: string
  role: string
  detail: string
  href?: string
}

export const leadership: LeadershipItem[] = [
  {
    org: 'Game Dev Club',
    role: 'Co-President',
    detail:
      'Grew membership 25 → 135+; taught weekly Unity/game design workshops and mentored 30+ beginners to ship games at Gamedev.js & GMTK jams.',
  },
  {
    org: 'USAHSC',
    role: 'President & Coordinating Officer',
    href: 'https://usahsc-production.up.railway.app/about',
    detail:
      'Built the league website for the TSCB-affiliated HS cricket league; expanded 6 → 10 teams, coordinating 200+ athletes through a full state championship.',
  },
  {
    org: 'Accenture Learning to Lead',
    role: 'Intern — 1 of ~24 selected',
    detail:
      'Led a 4-person team building an AI route-optimization model for supply-chain disruption; presented to senior leadership.',
  },
  {
    org: 'FBLA',
    role: 'Vice President',
    detail:
      'Mentored 15+ students on CS competition prep in Computer Game & Simulation Programming; 95% advanced to state.',
  },
]
