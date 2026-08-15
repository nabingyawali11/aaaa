import photo1 from "../assets/me/1.webp";
import photo2 from "../assets/me/2.webp";
import photo3 from "../assets/me/3.webp";

// Memories 4-6 are hosted on Cloudinary
const cloudPhoto4 =
  "https://res.cloudinary.com/dbckheyqm/image/upload/v1786128909/IMG_20260808_003312_591_apw2gt.jpg";
const cloudPhoto5 =
  "https://res.cloudinary.com/dbckheyqm/image/upload/v1783710926/IMG-20260103-WA0058_izhk11.jpg";
const cloudPhoto6 =
  "https://res.cloudinary.com/dbckheyqm/image/upload/v1786128706/Screenshot_20260813-141656_ax7jjv.jpg";

export const BIRTH_DATE_BS = { year: 2063, month: 4, day: 31 };

// Validated conversion: 2063/04/31 BS (Shrawan 31) == August 16, 2006 AD
export const BIRTH_DATE_GREGORIAN = new Date(2006, 7, 16);

export function getNextBirthday() {
  const now = new Date();
  const next = new Date(now.getFullYear(), BIRTH_DATE_GREGORIAN.getMonth(), BIRTH_DATE_GREGORIAN.getDate(), 22, 1, 0);
  if (next.getTime() < now.getTime()) {
    next.setFullYear(next.getFullYear() + 1);
  }
  return next;
}

export function getBirthdayAge() {
  return getNextBirthday().getFullYear() - BIRTH_DATE_GREGORIAN.getFullYear();
}

export const storyChapters = [
  {
    id: "spark",
    number: "01",
    title: "The Spark at CodeFest 2025",
    period: "Radiant College · CodeFest 2025",
    body: "It all began under the stage lights of CodeFest 2025. You were the vibrant host holding the whole crowd together, while I stood quietly behind the scenes helping Arun and Sushant Dai with video edits. Two worlds, one event. Same room, different corners — yet somehow, my eyes kept finding you. And then, in photo after photo from that night, there you were — right beside me every single time. Coincidence? I honestly don't know. Maybe it's destiny, maybe it's something I still can't explain.",
    contrast: {
      introvert: {
        title: "The Quiet Editor",
        points: ["Assisting Arun & Sushant Dai", "Focused on the screens", "Comfortable in the shadows"],
      },
      extrovert: {
        title: "The Vibrant Host — You",
        points: ["Commanding the stage", "Energy that filled the hall", "Making everyone feel included"],
      },
    },
  },
  {
    id: "connection",
    number: "02",
    title: "Unexpected Connections",
    period: "After the event",
    body: "What started as polite some small talks in the event  after the event turned into daily messages, late-night phone calls, and sharing our past stories in very short period of time . As an introvert, I usually overthink talking to anyone — but with you, I never ran out of things to say. You made me feel safe enough to open up.",
  },
  {
    id: "haven",
    number: "03",
    title: "A Safe Haven",
    period: "Today",
    body: "You opened up completely to me in such a short amount of time. Why? What did you see in me? To this day, I still ask myself that and yet, talking to you became so effortless. What I value most is the trust and safety you gave me so generously a bond that makes every conversation feel like coming home. Truth is, before you, I was always the person who kept everything bottled up inside and never expressed my feelings easily. It was my very first time being that open with anyone.",
  },
];

// A short byline honoring who wrote this story and for whom
export const storyByline = {
  author: "Your Caring Person",
  for: "Ankita Miss / Madam Ji",
};

export const memoryPhotos = [
  {
    src: photo1,
    quote: "There's a natural warmth in the way you light up a moment — no pretense, just a genuine, radiant soul.",
  },
  {
    src: photo2,
    quote: "The calm, gentle grace you hold so naturally is something truly rare and beautiful.",
  },
  {
    src: photo3,
    quote: "Carrying culture with such effortless elegance — a soul as beautiful on the inside as the smile you wear.",
  },
  {
    src: cloudPhoto4,
    quote: "Your kindness is visible in your eyes long before you speak a word — pure, gentle, and comforting.",
  },
  {
    src: cloudPhoto5,
    quote: "Even in quiet, simple moments, your presence brings a subtle, unspoken joy.",
  },
  {
    src: cloudPhoto6,
    quote: "Grounded, graceful, and deeply kind — you make every space a little softer and every heart a little lighter.",
  },
];

export const wishLetter = {
  salutation: "Dear Ankita Ji (Madam Ji),",
  paragraphs: [
    "As you step into your twenties, I want to start with a simple truth — the day the world welcomed you, it quietly became a little brighter, and it hasn't dimmed since. Your energy leaves rooms warmer and people happier, and I am endlessly grateful to have a front-row seat to your life.",
    "Thank you for being the most amazing best friend I could ever ask for. Thank you for placing your trust in me, for the late-night talks that never felt long enough, and for making an introvert feel like the easiest person to talk to. That is your magic — you don't just bring people together, you make them feel safe.",
    "As you enter this beautiful new decade, I wish you growth that matches your talent, success that surprises even you, happiness that never runs out, and a journey that grows softer and brighter with every step.",
    "Stay exactly as you are — radiant, fearless, and impossibly kind. Today we celebrate you, and every day after, I feel lucky to know you.",
    "Happy 20th Birthday, Ankita Ji! May your heart stay open to pure happiness, and may sadness never even cross your path. Keep that infectious, चुलबुली smile alive wherever you go, because the world is so much warmer with your laughter in it. May you conquer your dreams faster than ever and get everything your heart desires without ever getting hurt by anyone.",
    "And remember — if there's ever anything on your mind that you can't share with anyone else, just give me a call, no matter the time or condition. I'll always be right here, ready to listen to everything you have to say.",
  ],
  signature: "Always here for you,\n— Your Caring Person (Tech Lead) 🌻",
};

// Soft birthday chime: note name, frequency (Hz), start (sec), duration (sec)
export const CHIME_NOTES = [
  { name: "C5", freq: 523.25, start: 0, duration: 0.9 },
  { name: "E5", freq: 659.25, start: 0.18, duration: 0.9 },
  { name: "G5", freq: 783.99, start: 0.36, duration: 1.1 },
  { name: "C6", freq: 1046.5, start: 0.6, duration: 1.6 },
];
