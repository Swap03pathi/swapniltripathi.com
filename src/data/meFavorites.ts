// The rotating favorites shelf on /me. To rotate: edit the lists, bump FAVORITES_UPDATED,
// push. All URLs verified live at the time of adding.
export const FAVORITES_UPDATED = 'July 2026';

export type Favorite = {
  name: string;
  url: string;
  note?: string;
};

export const favoriteShelves: { id: string; title: string; items: Favorite[] }[] = [
  {
    id: 'music',
    title: 'On repeat',
    items: [
      { name: 'Eminem', url: 'https://open.spotify.com/artist/7dGJo4pcD2V6oG8kP0tJRR' },
      { name: 'KR$NA', url: 'https://open.spotify.com/artist/5C1S9XwxMuuCciutwMhp5t' },
      { name: 'Seedhe Maut', url: 'https://open.spotify.com/artist/2oBG74gAocPMFv6Ij9ykdo' },
      { name: 'Chaar Diwaari', url: 'https://open.spotify.com/artist/2n4q8jLM4WLwlva1sZ2WRx' },
    ],
  },
  {
    id: 'specials',
    title: 'Comedy specials I rewatch',
    items: [
      { name: 'Ricky Gervais — Humanity', url: 'https://www.netflix.com/title/80189653' },
      { name: 'Azeem Banatwalla — Problems', url: 'https://www.imdb.com/title/tt9569212/' },
      { name: 'Mark Normand — Out To Lunch', url: 'https://www.youtube.com/watch?v=tDolNU89SXI' },
      { name: 'Biswa Kalyan Rath — Biswa Mast Aadmi', url: 'https://www.imdb.com/title/tt6789140/' },
    ],
  },
  {
    id: 'podcast',
    title: 'Podcast',
    items: [
      { name: 'Waveform — The MKBHD Podcast', url: 'https://www.youtube.com/@Waveform' },
    ],
  },
  {
    id: 'films',
    title: 'Films',
    items: [
      { name: 'Deadpool (the whole series)', url: 'https://www.imdb.com/title/tt1431045/' },
    ],
  },
  {
    id: 'sitcoms',
    title: 'Sitcom comfort food',
    items: [
      { name: 'Modern Family', url: 'https://www.imdb.com/title/tt1442437/' },
      { name: 'Ted Lasso', url: 'https://www.imdb.com/title/tt10986410/' },
      { name: 'Shrinking', url: 'https://www.imdb.com/title/tt15677150/' },
      {
        name: 'The Big Bang Theory',
        url: 'https://www.imdb.com/title/tt0898266/',
        note: 'won 2 trivia nights',
      },
    ],
  },
];
