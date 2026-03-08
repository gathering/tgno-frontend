interface Prize {
  name?: string;
  price?: number | string;
}

type PrizeCategory = Array<Prize>;

interface Rule {
  text: string;
}

export type CreativeCategory =
  | "photo"
  | "video"
  | "graphics"
  | "music"
  | "misc"
  | "physical"
  | "programming";

export interface Competition {
  name: string;
  slug: string;
  description?: string;
  category: CreativeCategory;
  judging: "audience" | "jury" | "score";
  contact?: string;
  prizes?: PrizeCategory | Array<PrizeCategory>;
  rulesSets: Array<keyof typeof ruleSets>;
  rules?: string; // Calculated dynamically by us for convenience. Might replace ruleSets entirely when fetched from backend.
}

export const competitions: Competition[] = [
  // Programming / Demo
  {
    name: "Real-time Demo",
    slug: "realtime-demo",
    category: "programming",
    judging: "audience",
    contact: "Kim Roar aka Zokum",
    rulesSets: ["base", "common", "realtime", "demo"],
  },
  {
    name: "Useless Utility",
    slug: "useless-utility",
    description:
      "Create a program that is completely and intentionally useless for fun and creativity.",
    category: "programming",
    judging: "jury",
    contact: "Kim Roar aka Zokum",
    rulesSets: ["base", "common", "uselessUtility"],
  },
  {
    name: "Game Jam",
    slug: "game-jam",
    category: "programming",
    judging: "jury",
    contact: "Kim Roar aka Zokum",
    rulesSets: ["base", "common"],
  },
  {
    name: "Best Creative Tooling",
    slug: "best-creative-tooling",
    description:
      "Jury-judged competition highlighting developer tools or utilities that enable creative work.",
    category: "programming",
    judging: "jury",
    contact: "Kim Roar aka Zokum",
    rulesSets: ["base", "common"],
  },
  {
    name: "Small HTML",
    slug: "small-html",
    description:
      "Implement a visual effect in the browser using as few bytes as possible. Reference effect: https://demoscene.xyz/starfield",
    category: "programming",
    judging: "score",
    contact: "Kim Roar aka Zokum",
    rulesSets: ["base", "common", "smallHtml"],
  },

  // Music
  {
    name: "Freestyle Music",
    slug: "freestyle-music",
    description:
      "Show originality in any genre or style. Anything goes as long as it is original.",
    category: "music",
    judging: "audience",
    contact: "Hans Christian aka Hogzz",
    rulesSets: ["base", "common", "musicBase", "freestyleMusic"],
  },
  {
    name: "Fast Music",
    slug: "fast-music",
    description:
      "A time-limited competition to produce a remix of a given track or sample pack. Creativity and speed are key.",
    category: "music",
    judging: "audience",
    contact: "Hans Christian aka Hogzz",
    rulesSets: ["base", "common", "musicBase", "fastRemix"],
  },
  {
    name: "K-pop",
    slug: "k-pop",
    description:
      "Entries must clearly fit a single genre. Specific genre restrictions will be announced on the competition page.",
    category: "music",
    judging: "audience",
    rulesSets: ["base", "common", "musicBase", "genreMusic"],
  },
  {
    name: "8-Minute DJ MixVideo",
    slug: "dj-mix",
    description: "Show your live mixing skills in a single continuous take.",
    category: "music",
    judging: "audience",
    rulesSets: ["base", "common", "musicBase", "djSet"],
  },

  // Graphics / Visual
  {
    name: "Fast Graphics",
    slug: "fast-graphics",
    description:
      "Create an artwork within a limited time that fits the announced theme.",
    category: "graphics",
    judging: "audience",
    rulesSets: ["base", "common", "graphicsBase", "fastGraphics"],
  },
  {
    name: "Pixel Art",
    slug: "pixel-art",
    description:
      "Create an image up to 384 by 216 pixel using max 32 colors from a fixed 256-color palette.",
    category: "graphics",
    judging: "audience",
    rulesSets: ["base", "common", "graphicsBase", "pixelArt"],
  },
  {
    name: "Hand-drawn Graphics",
    slug: "hand-drawn-graphics",
    description:
      "Any technique, 1920 by 1080 pixels recommended. Provide at least six version stages showing the creation process.",
    category: "graphics",
    judging: "audience",
    rulesSets: ["base", "common", "graphicsBase", "freestyleGraphics"],
  },
  {
    name: "Themed Photo",
    slug: "themed-photo",
    description: "Capture a photograph that reflects the announced theme.",
    category: "graphics",
    judging: "audience",
    rulesSets: ["base", "common", "graphicsBase", "themedPhoto"],
  },
  {
    name: "Fast Themed Photo",
    slug: "fast-themed-photo",
    description: "Capture a photograph that reflects the announced theme.",
    category: "graphics",
    judging: "audience",
    rulesSets: ["base", "common", "graphicsBase", "themedPhoto"],
  },
  {
    name: "Themed In-game Screenshot",
    slug: "themed-in-game-screenshot",
    category: "graphics",
    judging: "audience",
    // NOTE: Missing in original rules; kept as placeholder ruleset.
    rulesSets: ["base", "common", "graphicsBase", "inGameScreenshot"],
  },
  {
    name: "Textmode Graphics",
    slug: "textmode-graphics",
    category: "graphics",
    judging: "audience",
    contact: "Kim Roar aka Zokum",
    // NOTE: Missing in original rules; kept as placeholder ruleset.
    rulesSets: ["base", "common", "graphicsBase", "textmodeGraphics"],
  },

  // Misc / Jury
  {
    name: "Jury Award",
    slug: "jury-award",
    description:
      "Selected by the jury for outstanding contribution, creativity, or technical achievement.",
    category: "misc",
    judging: "jury",
    rulesSets: ["base", "common"],
  },
  {
    name: "Best Shelf",
    slug: "best-shelf",
    description:
      "Jury-judged selection of the best shelf or display at the party.",
    category: "misc",
    judging: "jury",
    rulesSets: ["base", "common"],
  },
  {
    name: "Computer Case",
    slug: "computer-case",
    description: "Jury-judged competition for the best custom computer case.",
    category: "misc",
    judging: "jury",
    rulesSets: ["base", "common"],
  },
  {
    name: "TG:Hack",
    slug: "tg-hack",
    category: "misc",
    judging: "score",
    rulesSets: ["base", "common"],
  },
  {
    name: "Best Group",
    slug: "best-group",
    category: "misc",
    judging: "score",
    contact: "Kim Roar aka Zokum",
    rulesSets: ["base", "common"],
  },
];

export const ruleSets: Record<string, Array<Rule>> = {
  // Mandatory / always included
  base: [
    {
      text: "<h2>Deadline</h2>All competition entries must be uploaded to the competition system before the stated deadline. Deadlines are hard unless the competition organizer explicitly grants an extension.",
    },
    {
      text: "<h2>Original content</h2>Entries must be previously unreleased and primarily original material. You may include small previously released components (logos, short samples etc.) only if you have the rights to use them and they are not the main substance of the entry.",
    },
    {
      text: "Do not use copyrighted material you do not own or have permission to use. Covers, remixes, copyrighted samples and unlicensed logos will lead to disqualification.",
    },
    {
      text: "<h2>AI</h2>Purely AI-generated entries are not allowed unless a specific competition explicitly permits AI. AI may be used for assistance, but the majority of the entry must be the competitors' own work.",
    },
    {
      text: "<h2>Acceptable Content</h2>Organizers reserve the right to disqualify entries that contain explicit sexual content, racist or hate material, or otherwise violate the event rules or the spirit of the party.",
    },
    {
      text: "<h2>Rights</h2>By submitting, you accept the competition contract and grant the organizers the rights display, judge, distributeb and use the entry for non-profit purposes related to Kandu and The Gathering.",
    },
    {
      text: "<h2>Attendance</h2>To receive physical prizes you or your representative must attend the prize-giving ceremony.",
    },
  ],

  // General / practical
  common: [
    {
      text: "If a rule is unclear, the competition organizers will make the final decision. Organizers may clarify or amend rules if necessary; such changes will be announced if done after the entries can be handed in.",
    },
    {
      text: "When requested, submit a screenshot and any required metadata or readme describing used techniques, formats, and third-party assets (with licenses).",
    },
    {
      text: "Include a short readme.txt in your submission describing used techniques, any third-party assets (with license info), platform and playback instructions.",
    },
    {
      text: "Multiple submissions are allowed in many competitions â€” see the specific competition page for limits. Each submission should be an independent entry.",
    },
    {
      text: "If you need the organizers to test your entry on compo machines, contact the competition organizer early to arrange testing.",
    },
  ],

  // Realtime shared
  realtime: [
    {
      text: "Realtime entries must be executable programs. Pure animation files without an executable runner are not allowed in demo-style realtime compos.",
    },
    {
      text: "Entries must run from read-only media and should not permanently modify system settings. Temporary runtime files in standard temporary directories are permitted.",
    },
    {
      text: "Users must be able to exit at any time by pressing a key (on PC: ESC).",
    },
    {
      text: "Entries may be recorded at 1080p60 (or 1080p50) for judging or streaming. If requested, provide a high-quality capture and instructions for running the entry.",
    },
  ],

  // Music shared
  musicBase: [
    {
      text: "Music entries must be original and previously unreleased. No covers, remixes, or copyrighted samples without permission. Generative AI may not be used for large parts of the work.",
    },
    {
      text: "Supported audio formats: MP3 (320kbps), OGG (high quality), WAV, FLAC. Normalize audio levels where appropriate.",
    },
  ],

  // Graphics shared
  graphicsBase: [
    {
      text: "Supported image formats: PNG and JPG (RGB). Provide a no-signature final image (filename suffix: _nosig) and include a short readme describing techniques and sources.",
    },
  ],

  // Competition-specific
  demo: [
    { text: "Follow the general rules and these Demo-specific rules." },
    {
      text: "A Demo is a runnable program showing real-time graphics in sync with music. A demo is NOT a pre-rendered video.",
    },
    {
      text: "You may create a demo for any supported desktop platform. There is no upper limit on team size, but the submitter must be present at the party.",
    },
    {
      text: "Submit a compressed archive (preferably ZIP or TAR) containing everything needed to run the demo. Multiple submissions are allowed where the competition permits it.",
    },
    {
      text: "Winners are determined by audience voting unless the competition metadata lists a different judging method.",
    },
    {
      text: "The goal is to showcase technical and creative skills. Focus on what the team does best â€” either large visual spectacle or a clever small idea executed well.",
    },
  ],

  smallHtml: [
    {
      text: "Create a compact browser visual effect. The entry must run in a standard modern browser without external servers.",
    },
    {
      text: "Compact, readable, and creative solutions are encouraged. Multiple submissions allowed unless the specific competition page says otherwise.",
    },
    {
      text: "Submit an archive containing all code and assets required to reproduce the effect locally.",
    },
  ],

  freestyleMusic: [
    {
      text: "Entries can be composed, performed, or mixed live. Multiple submissions allowed per competitor unless otherwise stated.",
    },
    {
      text: "Submit final audio file(s) before the deadline in a supported format.",
    },
    {
      text: "Winners are determined by audience voting unless explicitly marked as jury-judged.",
    },
  ],

  fastRemix: [
    {
      text: "Use the official sample pack and follow any BPM/key constraints published for the event.",
    },
    {
      text: "Submit your remix before the deadline. Multiple entries allowed where permitted.",
    },
    {
      text: "Event sample pack details will be published on the competition page.",
    },
  ],

  genreMusic: [
    {
      text: "The genre for each year will be specified; entries must conform to that genre.",
    },
    {
      text: "Focus on what makes your chosen genre distinctive while demonstrating originality.",
    },
    { text: "Submit audio in supported formats before the deadline." },
  ],

  djSet: [
    {
      text: "Submit a video showing you mixing live for exactly 8 minutes. Visual effects are not allowed; the video must clearly show all mixing performed in real time.",
    },
    {
      text: "The set must last 8 minutes. Judges and audience evaluate track selection, transitions and technical mixing skills.",
    },
    {
      text: "Submit a single video file showing the performance. Multiple independent performances are allowed as separate submissions.",
    },
    {
      text: "Winners are determined by audience voting unless otherwise noted. The video must clearly show the performer using their hardware/software live.",
    },
  ],

  freestyleGraphics: [
    {
      text: "Freestyle: create an original piece using any technique. Submit final 1920Ã—1080 image and at least six progress images documenting the creation process.",
    },
    {
      text: "Techniques must be disclosed in the submission form (short description). Stock photos allowed only if you hold the rights and the majority of the work is your own.",
    },
    {
      text: "Submit final image and a subfolder with progress images named in order (stage1, stage2...).",
    },
  ],

  fastGraphics: [
    {
      text: "You have a limited time (typically 1.5 hours) to create a 1920Ã—1080 artwork that follows the announced theme and required element.",
    },
    {
      text: "No AI tools that automate the creative process are allowed for Fast Graphics. Submit a single final unsigned image.",
    },
    {
      text: "Submit the final unsigned image before the deadline. No intermediate stages required.",
    },
    {
      text: "Theme example: 'Spring Mood' â€” your artwork must reflect the theme.",
    },
  ],

  pixelArt: [
    {
      text: "Resolution max: 384 by 216 pixels. Use up to 32 colors chosen from the event palette of 256 colors.",
    },
    {
      text: "Use the provided color template during creation. You may remove palette artifacts in the final submission if desired.",
    },
    {
      text: "Submit the final image before the closing time. Multiple submissions allowed where permitted.",
    },
  ],

  themedPhoto: [
    {
      text: "Photo must be a single exposure (no composites). Minor retouching allowed (crop, exposure, color balance). Submit unsigned final image and original if requested.",
    },
    {
      text: "Ensure correct format and resolution. Photos must be previously unreleased and respect the theme.",
    },
    { text: "Submit images in PNG or JPG (RGB) before the deadline." },
    {
      text: "Theme example: 'Easter Egg' â€” entries must clearly reflect the event's theme.",
    },
  ],

  uselessUtility: [
    {
      text: "No functional usefulness should be the goal. focus on creativity, presentation, or absurdity.",
    },
    {
      text: "Submit the program and any instructions to run it. Include a short description of why it's wonderfully useless.",
    },
  ],
};

export const fetchCompetitionBySlug = async ({
  slug,
}: {
  slug: string;
  api_url: string; // For when we switch to fetching from an API instead of temporary local data
}): Promise<Competition | undefined> => {
  const competition = competitions.find((comp) => comp.slug === slug);

  if (!competition) {
    return undefined;
  }

  const reversedRulesSets = [...competition.rulesSets].reverse();
  return {
    ...competition,
    // Various magical formatting tricks, should come from backend/static config
    rules: reversedRulesSets
      .flatMap((rulesSetKey) => ruleSets[rulesSetKey] || [])
      .map((rule) => {
        if (rule.text.startsWith("<h2>")) {
          return rule.text.replace(
            /<h2>(.*?)<\/h2>(.*)/,
            (_match, p1, p2) => `<h2>${p1}</h2><p>${p2}</p>`,
          );
        }
        return `<p>${rule.text}</p>`;
      })
      .join(""),
  };
};

export const fetchCompetitions = async ({
  api_url,
}: {
  api_url: string; // For when we switch to fetching from an API instead of temporary local data
}): Promise<Competition[]> => {
  return competitions || [];
};

export const getTailwindColorByCategory = (category: CreativeCategory) => {
  const colors: Record<CreativeCategory, string> = {
    photo: "bg-red-500",
    video: "bg-green-500",
    graphics: "bg-sky-500",
    music: "bg-yellow-500",
    misc: "bg-purple-500",
    physical: "bg-indigo-500",
    programming: "bg-pink-500",
  };

  return colors[category] || colors.misc;
};
