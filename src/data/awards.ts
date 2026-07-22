export interface Award {
  scope: string
  title: string
  detail: string
}

export const awards: Award[] = [
  {
    scope: 'International',
    title: 'Global High School Business Challenge',
    detail: 'Top 10 in the world out of 500 teams.',
  },
  {
    scope: 'National',
    title: 'ACSL Finals',
    detail: 'Top ~700 in the nation.',
  },
  {
    scope: 'National',
    title: 'USACO Silver',
    detail: 'Advanced to the Silver division of the USA Computing Olympiad.',
  },
  {
    scope: 'State',
    title: 'FBLA — Computer Game & Simulation Programming',
    detail: '8th place at the state level.',
  },
  {
    scope: 'State',
    title: 'BPA — Java Programming',
    detail: 'State qualifier and competitor.',
  },
  {
    scope: 'State',
    title: 'DECA — Apparel & Accessories Marketing',
    detail: 'State qualifier and competitor.',
  },
  {
    scope: 'Regional',
    title: 'USA U15 Western Conference Nationals 2024',
    detail: 'Ranked 12th overall on player ratings.',
  },
]
