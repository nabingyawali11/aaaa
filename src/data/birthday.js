import photo1 from "../assets/me/1.webp";
import photo2 from "../assets/me/2.webp";
import photo3 from "../assets/me/3.webp";
import photo6 from "../assets/me/6.jpg";
import photo7 from "../assets/me/7.jpg";

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

const COUNTDOWN_TARGET_KEY = "aayusa_countdown_target";

// Last-known shared countdown target (from the Neon-backed API). undefined =
// not loaded yet; a Date once loaded; null means "use the default birthday".
let sharedCountdownCache;

function readCachedTarget() {
  try {
    const saved = window.localStorage.getItem(COUNTDOWN_TARGET_KEY);
    if (!saved) return null;
    const date = new Date(saved);
    return Number.isNaN(date.getTime()) ? null : date;
  } catch {
    return null;
  }
}

function cacheTarget(target) {
  try {
    if (target) {
      window.localStorage.setItem(COUNTDOWN_TARGET_KEY, target.toISOString());
    } else {
      window.localStorage.removeItem(COUNTDOWN_TARGET_KEY);
    }
  } catch {}
}

// Synchronous resolver: shared target (if loaded) > last-known cached target > default birthday.
export function getCountdownTarget() {
  if (sharedCountdownCache !== undefined) {
    return sharedCountdownCache || getNextBirthday();
  }
  return readCachedTarget() || getNextBirthday();
}

// Fetch the shared target from the server so every device sees the same countdown.
export async function loadSharedCountdown() {
  try {
    const res = await fetch("/api/get-countdown");
    if (!res.ok) throw new Error("Failed to load shared countdown");
    const data = await res.json();
    const target = data && data.target ? new Date(data.target) : null;
    sharedCountdownCache = target;
    cacheTarget(target);
  } catch {
    // keep whatever we already have
  }
  return getCountdownTarget();
}

// Persist the target to the shared Neon backend (affects all devices).
export async function saveSharedCountdown(date) {
  const res = await fetch("/api/set-countdown", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ target: date ? date.toISOString() : null }),
  });
  if (!res.ok) {
    throw new Error("Failed to save shared countdown");
  }
  const data = await res.json();
  sharedCountdownCache = data && data.target ? new Date(data.target) : null;
  cacheTarget(sharedCountdownCache);
  return sharedCountdownCache;
}

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
    quote: "Are you powered by sunshine? Because you're literally glowing through my screen! ☀️🫣🌻",
  },
  {
    src: photo2,
    quote: "Just a radiant soul making the world brighter without even trying. 🌸☀️",
  },
  {
    src: photo3,
    quote: "सधैं यसरी नै मुस्कुराइरहनु, तिम्रो हाँसोमा त छुट्टै जादू छ",
  },
  {
    src: cloudPhoto4,
    quote: "Kind eyes, sweet smile, warmest heart and 100% pure cute. ☺️🌸",
  },
  {
    src: cloudPhoto5,
    quote: "One gaze from you, and suddenly the whole world feels a little softer.",
  },
  {
    src: cloudPhoto6,
    quote: "Warning: looking into those eyes for more than 3 seconds causes instant heart flutter. 💓👀",
  },
  {
    src: photo6,
    quote: "Already looking like a little boss before you grew up to rule my thoughts! 👑🤭",
  },
  {
    src: photo7,
    quote: "Proof that kindness and magic were there right from the start. 💫",
  },
];

export const wishLetter = {
  title: "A Letter 📜🌻",
  subtitle: "Written, just for you",
  tagline: "Every word below is true, and none of it is said lightly. 🌻",
  salutation: "Dear Ankita Miss (Madam Ji), 🌻✨",
  paragraphs: [
    "As you step into your twenties, I want to start with a simple truth: the day the world welcomed you, it quietly became a little brighter, and it has not dimmed since. 🌻✨ Your energy leaves rooms warmer and people happier, and I am endlessly grateful to have a front row seat to your life. 🌟 You are already so special, and being born on 31 Shrawan at 10:01 PM makes you even more uniquely wonderful and surprising! 🎂✨",

    "Thank you for being the most amazing person I could ever ask for. 💖🌻 Thank you for placing your trust in me, for the long talks and chats that never felt long enough ☕💬, and for making an introvert feel like the easiest person to talk to. 🌾 That is your magic ✨. You do not just bring people together, you make them feel safe. 🤗🌻",

    "I do not write anything or tell anything like this much. 📝🌻 But you are the person who made me different from what I am today, compared to 1 year ago and before that. 🌱☀️",

    "What you saw inside me when you came to talk to me is something I still think about and cannot fully figure out till now. 🤔💭 I am so glad you came into my life and helped me open up like this. 🌻 I do not know what will happen after this, but I want to thank you for everything. 🙏✨",

    "If I have ever hurt you or spoken loudly during my heavy workload times, it was never my intention to hurt you in those situations. 🥺🌻 I am truly sorry for that. If you are ever hurt by anything from my side, or by anyone else, please tell me right in that moment. 🗣️ I am a dumb person who only realizes after some time and feels guilty later on. 😔❤️",

    "You do not try to be anything extra, you are just you, and that is what makes you so special, lovely, and bright like a sunflower. 🌻✨💖",

    "Stay exactly as you are, radiant like a sunflower, fearless, and impossibly kind. 🌻☀️ Today we celebrate you, and every day after, I feel lucky to know you.",

    "Happy 20th Birthday, Ankita Ji! 🎂🎉🌻 May your heart stay open to pure happiness, and may sadness never even cross your path. Keep that infectious, चुलबुली smile alive wherever you go ☺️🌻✨, because the world is so much warmer with your laughter in it. 💖 May you conquer your dreams faster than ever and get everything your heart desires without ever getting hurt by anyone. 🚀👑🌻",

    "In the outside world, you always smile, talk to everybody, and hide your sadness inside you... 🥺🌻🌾",

    "And remember, if there is ever anything on your mind that you cannot share with anyone else, just give me a call 📞🌻, no matter the time or condition. ⏰ I will always be right here, ready to listen to everything you have to say. 🫂🌻✨",
  ],
  signOff: "Always here for you,\n— Your's  Caring BestFriend Tech Lead- Shubham 🌸",
};

// Soft birthday chime: note name, frequency (Hz), start (sec), duration (sec)
export const CHIME_NOTES = [
  { name: "C5", freq: 523.25, start: 0, duration: 0.9 },
  { name: "E5", freq: 659.25, start: 0.18, duration: 0.9 },
  { name: "G5", freq: 783.99, start: 0.36, duration: 1.1 },
  { name: "C6", freq: 1046.5, start: 0.6, duration: 1.6 },
];
