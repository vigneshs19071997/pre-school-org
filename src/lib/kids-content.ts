/**
 * The shared activity library.
 *
 * This is the source that `npm run db:seed` writes into the `activities` and
 * `activity_items` tables as isGlobal rows, and the fallback the Kids Zone
 * reads from when no database is provisioned yet.
 *
 * Note what is NOT here: no scores, no timers, no leaderboard. Children this
 * age cannot read, so promptText exists for the adult nearby - the child works
 * from the spoken audio and the pictures. Every round ends in a sticker
 * regardless of how many tries it took.
 */

export type ActivityKind = 'pick_one' | 'audio_match' | 'pair_match' | 'sequence' | 'snap_place';
export type AgeBand = 'toddler' | 'nursery' | 'kinder';

export interface ActivityOption {
  id: string;
  label: string;
  emoji?: string;
  imageKey?: string;
}

export interface ActivityItem {
  promptText: string;
  promptAudioKey?: string;
  options: ActivityOption[];
  correctOptionId: string;
  rewardSticker?: string;
}

export interface Activity {
  slug: string;
  title: string;
  kind: ActivityKind;
  ageBand: AgeBand;
  icon: string;
  tone: 'primary' | 'accent' | 'accentAlt';
  items: ActivityItem[];
}

const opt = (id: string, label: string, emoji: string): ActivityOption => ({ id, label, emoji });

export const activityLibrary: Activity[] = [
  {
    slug: 'colour-hunt',
    title: 'Find the colour',
    kind: 'pick_one',
    ageBand: 'toddler',
    icon: '🎨',
    tone: 'accent',
    items: [
      {
        promptText: 'Tap the red one',
        options: [opt('a', 'Red apple', '🍎'), opt('b', 'Yellow banana', '🍌'), opt('c', 'Green tree', '🌳')],
        correctOptionId: 'a',
      },
      {
        promptText: 'Tap the yellow one',
        options: [opt('a', 'Blue fish', '🐟'), opt('b', 'Yellow sun', '☀️'), opt('c', 'Purple grapes', '🍇')],
        correctOptionId: 'b',
      },
      {
        promptText: 'Tap the green one',
        options: [opt('a', 'Orange carrot', '🥕'), opt('b', 'Red heart', '❤️'), opt('c', 'Green leaf', '🍃')],
        correctOptionId: 'c',
      },
      {
        promptText: 'Tap the blue one',
        options: [opt('a', 'Blue whale', '🐳'), opt('b', 'Brown bear', '🐻'), opt('c', 'Pink flower', '🌸')],
        correctOptionId: 'a',
      },
      {
        promptText: 'Tap the orange one',
        options: [opt('a', 'White cloud', '☁️'), opt('b', 'Orange pumpkin', '🎃'), opt('c', 'Black cat', '🐈‍⬛')],
        correctOptionId: 'b',
      },
    ],
  },
  {
    slug: 'animal-sounds',
    title: 'Who made that sound?',
    kind: 'audio_match',
    ageBand: 'toddler',
    icon: '🐄',
    tone: 'primary',
    items: [
      {
        promptText: 'Who says moo?',
        options: [opt('a', 'Cow', '🐄'), opt('b', 'Duck', '🦆'), opt('c', 'Cat', '🐱')],
        correctOptionId: 'a',
      },
      {
        promptText: 'Who says quack?',
        options: [opt('a', 'Dog', '🐶'), opt('b', 'Duck', '🦆'), opt('c', 'Sheep', '🐑')],
        correctOptionId: 'b',
      },
      {
        promptText: 'Who says meow?',
        options: [opt('a', 'Horse', '🐴'), opt('b', 'Frog', '🐸'), opt('c', 'Cat', '🐱')],
        correctOptionId: 'c',
      },
      {
        promptText: 'Who says woof?',
        options: [opt('a', 'Dog', '🐶'), opt('b', 'Bird', '🐦'), opt('c', 'Fish', '🐟')],
        correctOptionId: 'a',
      },
      {
        promptText: 'Who says baa?',
        options: [opt('a', 'Pig', '🐷'), opt('b', 'Sheep', '🐑'), opt('c', 'Bee', '🐝')],
        correctOptionId: 'b',
      },
    ],
  },
  {
    slug: 'count-with-me',
    title: 'How many?',
    kind: 'pick_one',
    ageBand: 'nursery',
    icon: '🔢',
    tone: 'accentAlt',
    items: [
      {
        promptText: 'How many apples? 🍎🍎',
        options: [opt('a', 'One', '1️⃣'), opt('b', 'Two', '2️⃣'), opt('c', 'Three', '3️⃣')],
        correctOptionId: 'b',
      },
      {
        promptText: 'How many stars? ⭐⭐⭐⭐',
        options: [opt('a', 'Four', '4️⃣'), opt('b', 'Two', '2️⃣'), opt('c', 'Five', '5️⃣')],
        correctOptionId: 'a',
      },
      {
        promptText: 'How many balloons? 🎈🎈🎈',
        options: [opt('a', 'Five', '5️⃣'), opt('b', 'Three', '3️⃣'), opt('c', 'One', '1️⃣')],
        correctOptionId: 'b',
      },
      {
        promptText: 'How many fish? 🐟',
        options: [opt('a', 'One', '1️⃣'), opt('b', 'Three', '3️⃣'), opt('c', 'Four', '4️⃣')],
        correctOptionId: 'a',
      },
      {
        promptText: 'How many flowers? 🌸🌸🌸🌸🌸',
        options: [opt('a', 'Two', '2️⃣'), opt('b', 'Four', '4️⃣'), opt('c', 'Five', '5️⃣')],
        correctOptionId: 'c',
      },
    ],
  },
  {
    slug: 'first-sound',
    title: 'What does it start with?',
    kind: 'pick_one',
    ageBand: 'kinder',
    icon: '🔤',
    tone: 'primary',
    items: [
      {
        promptText: 'Which one starts with the sound "b"?',
        options: [opt('a', 'Ball', '⚽'), opt('b', 'Sun', '☀️'), opt('c', 'Tree', '🌳')],
        correctOptionId: 'a',
      },
      {
        promptText: 'Which one starts with the sound "c"?',
        options: [opt('a', 'Moon', '🌙'), opt('b', 'Cat', '🐱'), opt('c', 'Egg', '🥚')],
        correctOptionId: 'b',
      },
      {
        promptText: 'Which one starts with the sound "f"?',
        options: [opt('a', 'Drum', '🥁'), opt('b', 'Hat', '🎩'), opt('c', 'Fish', '🐟')],
        correctOptionId: 'c',
      },
      {
        promptText: 'Which one starts with the sound "a"?',
        options: [opt('a', 'Apple', '🍎'), opt('b', 'Kite', '🪁'), opt('c', 'Star', '⭐')],
        correctOptionId: 'a',
      },
      {
        promptText: 'Which one starts with the sound "d"?',
        options: [opt('a', 'Bird', '🐦'), opt('b', 'Dog', '🐶'), opt('c', 'Leaf', '🍃')],
        correctOptionId: 'b',
      },
    ],
  },
  {
    slug: 'feelings',
    title: 'How are they feeling?',
    kind: 'pick_one',
    ageBand: 'nursery',
    icon: '😊',
    tone: 'accent',
    items: [
      {
        promptText: 'Which face is happy?',
        options: [opt('a', 'Sad', '😢'), opt('b', 'Happy', '😊'), opt('c', 'Angry', '😠')],
        correctOptionId: 'b',
      },
      {
        promptText: 'Which face is sad?',
        options: [opt('a', 'Sad', '😢'), opt('b', 'Surprised', '😮'), opt('c', 'Sleepy', '😴')],
        correctOptionId: 'a',
      },
      {
        promptText: 'Which face is sleepy?',
        options: [opt('a', 'Happy', '😊'), opt('b', 'Scared', '😨'), opt('c', 'Sleepy', '😴')],
        correctOptionId: 'c',
      },
      {
        promptText: 'Which face is surprised?',
        options: [opt('a', 'Surprised', '😮'), opt('b', 'Angry', '😠'), opt('c', 'Happy', '😊')],
        correctOptionId: 'a',
      },
      {
        promptText: 'Which face is laughing?',
        options: [opt('a', 'Sad', '😢'), opt('b', 'Laughing', '😄'), opt('c', 'Sleepy', '😴')],
        correctOptionId: 'b',
      },
    ],
  },
  {
    slug: 'shapes',
    title: 'Find the shape',
    kind: 'pick_one',
    ageBand: 'toddler',
    icon: '🔷',
    tone: 'accentAlt',
    items: [
      {
        promptText: 'Tap the circle',
        options: [opt('a', 'Circle', '🔵'), opt('b', 'Square', '🟥'), opt('c', 'Triangle', '🔺')],
        correctOptionId: 'a',
      },
      {
        promptText: 'Tap the square',
        options: [opt('a', 'Star', '⭐'), opt('b', 'Square', '🟩'), opt('c', 'Circle', '🟠')],
        correctOptionId: 'b',
      },
      {
        promptText: 'Tap the triangle',
        options: [opt('a', 'Heart', '💛'), opt('b', 'Circle', '🔵'), opt('c', 'Triangle', '🔺')],
        correctOptionId: 'c',
      },
      {
        promptText: 'Tap the star',
        options: [opt('a', 'Star', '⭐'), opt('b', 'Square', '🟪'), opt('c', 'Diamond', '🔷')],
        correctOptionId: 'a',
      },
      {
        promptText: 'Tap the heart',
        options: [opt('a', 'Triangle', '🔺'), opt('b', 'Heart', '💚'), opt('c', 'Circle', '⚪')],
        correctOptionId: 'b',
      },
    ],
  },
];

export const ageBands: { key: AgeBand; label: string; hint: string; icon: string }[] = [
  { key: 'toddler', label: '2 to 3', hint: 'Colours, shapes, animal sounds', icon: '🧸' },
  { key: 'nursery', label: '3 to 4', hint: 'Counting, feelings, matching', icon: '🚂' },
  { key: 'kinder', label: '4 to 6', hint: 'Letter sounds, patterns', icon: '🚀' },
];

export function activityBySlug(slug: string) {
  return activityLibrary.find((a) => a.slug === slug);
}
