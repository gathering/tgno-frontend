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
  {
    name: "Real-time Demo",
    slug: "realtime-demo",
    description:
      "Impress us with software that shows graphical effects in real-time.",
    category: "programming",
    judging: "audience",
    contact: "Kim Roar aka Zokum",
    rulesSets: ["base", "common", "realtime", "demo"],
    prizes: [
      { name: "1st Place", price: 1000 },
      { name: "2nd Place", price: 500 },
      { name: "3rd Place", price: 300 },
      { name: "4th Place", price: 200 },
      { name: "5th Place", price: 100 },
    ],
  },
  {
    name: "Useless Utility",
    slug: "useless-utility",
    description:
      "Create a program that is completely and intentionally useless for fun and creativity.",
    category: "programming",
    judging: "jury",
    contact: "Suilion",
    rulesSets: ["base", "common", "uselessUtility"],
    prizes: [
      {
        name: "",
        price: 'Win "fantastic" prizes that will great on your shelf?',
      },
    ],
  },
  {
    name: "Game Jam",
    slug: "game-jam",
    description:
      "Create a computer game in a limited time period according to themes set by the crew.",
    category: "programming",
    judging: "jury",
    contact: "Kim Roar aka Zokum",
    rulesSets: ["base", "common", "gameJam"],
    prizes: [
      { name: "1st Place", price: 1000 },
      { name: "2nd Place", price: 500 },
      { name: "3rd Place", price: 300 },
      { name: "4th Place", price: 200 },
      { name: "5th Place", price: 100 },
    ],
  },
  {
    name: "Best Creative Tooling",
    slug: "best-creative-tooling",
    description:
      "Jury-judged competition where you submit tools or code that enable people to be creative.",
    category: "programming",
    judging: "jury",
    contact: "Kim Roar aka Zokum",
    rulesSets: ["base", "common"],
    prizes: [
      { name: "1st Place", price: 300 },
      { name: "2nd Place", price: 200 },
      { name: "3rd Place", price: 100 },
    ],
  },
  {
    name: "Small HTML",
    slug: "small-html",
    description:
      "Implement a visual effect in the browser using as few bytes as possible.",
    category: "programming",
    judging: "score",
    contact: "Kim Roar aka Zokum",
    rulesSets: ["base", "common", "smallHtml"],
    prizes: [
      { name: "1st Place", price: 800 },
      { name: "2nd Place", price: 400 },
      { name: "3rd Place", price: 200 },
      { name: "4th Place", price: 100 },
      { name: "5th Place", price: 100 },
    ],
  },

  {
    name: "Freestyle Music",
    slug: "freestyle-music",
    description: "Show originality in any genre or style except K-Pop.",
    category: "music",
    judging: "audience",
    contact: "Hans Christian aka Hogzz",
    rulesSets: ["base", "common", "musicBase", "freestyleMusic"],
    prizes: [
      { name: "1st Place", price: 800 },
      { name: "2nd Place", price: 400 },
      { name: "3rd Place", price: 200 },
      { name: "4th Place", price: 100 },
      { name: "5th Place", price: 100 },
    ],
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
    prizes: [
      { name: "1st Place", price: 500 },
      { name: "2nd Place", price: 300 },
      { name: "3rd Place", price: 200 },
    ],
  },
  {
    name: "K-pop",
    slug: "k-pop",
    description: "Show originality and style within the genre K-Pop.",
    category: "music",
    judging: "audience",
    contact: "Hans Christian aka Hogzz",
    rulesSets: ["base", "common", "musicBase", "genreMusic"],
    prizes: [
      { name: "1st Place", price: 500 },
      { name: "2nd Place", price: 300 },
      { name: "3rd Place", price: 200 },
    ],
  },
  {
    name: "10-Minute DJ Mix Video",
    slug: "dj-mix",
    description: "Show your live mixing skills in a single continuous take.",
    category: "music",
    judging: "audience",
    contact: "Mollen",
    rulesSets: ["base", "common", "musicBase", "djSet"],
    prizes: [
      { name: "1st Place", price: 500 },
      { name: "2nd Place", price: 300 },
      { name: "3rd Place", price: 200 },
    ],
  },
  {
    name: "Fast Graphics",
    slug: "fast-graphics",
    description:
      "Create an artwork within a limited time that fits the them given at the party.",
    category: "graphics",
    judging: "audience",
    contact: "Suilion",
    rulesSets: ["base", "common", "graphicsBase", "fastGraphics"],
    prizes: [
      { name: "1st Place", price: 500 },
      { name: "2nd Place", price: 300 },
      { name: "3rd Place", price: 200 },
    ],
  },
  {
    name: "Pixel Art",
    slug: "pixel-art",
    description:
      "Create an image up to 256x256 pixels using max 16 from a fixed 256-color palette.",
    category: "graphics",
    judging: "audience",
    contact: "Kim Roar aka Zokum",
    rulesSets: ["base", "common", "graphicsBase", "pixelArt"],
    prizes: [
      { name: "1st Place", price: 500 },
      { name: "2nd Place", price: 300 },
      { name: "3rd Place", price: 200 },
    ],
  },
  {
    name: "Hand-drawn Graphics",
    slug: "hand-drawn-graphics",
    description:
      "Any technique, 1920 by 1080 pixels recommended. Provide at least six version stages showing the creation process.",
    category: "graphics",
    judging: "audience",
    contact: "Suilion",
    rulesSets: ["base", "common", "graphicsBase", "freestyleGraphics"],
    prizes: [
      { name: "1st Place", price: 800 },
      { name: "2nd Place", price: 400 },
      { name: "3rd Place", price: 200 },
      { name: "4th Place", price: 100 },
      { name: "5th Place", price: 100 },
    ],
  },
  {
    name: "Themed Photo",
    slug: "themed-photo",
    description: "Capture a photograph that reflects the given themes.",
    category: "graphics",
    judging: "audience",
    contact: "Mollen",
    rulesSets: ["base", "common", "graphicsBase", "themedPhoto"],
    prizes: [
      { name: "1st Place", price: 500 },
      { name: "2nd Place", price: 300 },
      { name: "3rd Place", price: 200 },
    ],
  },
  {
    name: "Fast Themed Photo",
    slug: "fast-themed-photo",
    description: "Capture a photograph that reflects the announced themes.",
    category: "graphics",
    judging: "audience",
    contact: "Mollen",
    rulesSets: ["base", "common", "graphicsBase", "fastThemedPhoto"],
    prizes: [
      { name: "1st Place", price: 500 },
      { name: "2nd Place", price: 300 },
      { name: "3rd Place", price: 200 },
    ],
  },
  {
    name: "Themed In-game Screenshot",
    slug: "themed-in-game-screenshot",
    description:
      "Screenshot something in a a game according to this year's themes.",
    category: "graphics",
    judging: "audience",
    contact: "Suilion",
    rulesSets: ["base", "common", "graphicsBase", "inGameScreenshot"],
    prizes: [
      { name: "1st Place", price: 300 },
      { name: "2nd Place", price: 200 },
      { name: "3rd Place", price: 100 },
    ],
  },
  {
    name: "Textmode Graphics",
    slug: "textmode-graphics",
    description: "Produce artwork in textmode, in color if you want to.",
    category: "graphics",
    judging: "audience",
    contact: "Kim Roar aka Zokum",
    rulesSets: ["base", "common", "graphicsBase", "textmodeArt"],
    prizes: [
      { name: "1st Place", price: 500 },
      { name: "2nd Place", price: 300 },
      { name: "3rd Place", price: 200 },
    ],
  },
  {
    name: "Jury Award",
    slug: "jury-award",
    description:
      "Selected by the Kreativia crew for entries they felt didn't get the recognition they deserved.",
    category: "misc",
    judging: "jury",
    contact: "Kim Roar aka Zokum",
    rulesSets: ["base", "common"],
    prizes: [
      { name: "1st Place", price: 500 },
      { name: "2nd Place", price: 500 },
      { name: "3rd Place", price: 500 },
      { name: "4th Place", price: 500 },
      { name: "5th Place", price: 500 },
    ],
  },
  {
    name: "Best Shelf",
    slug: "best-shelf",
    description:
      "Jury-judged selection of the best shelf or display at the party.",
    category: "misc",
    judging: "jury",
    contact: "Helene Harepus",
    rulesSets: ["base", "common", "bestShelf"],
    prizes: [
      { name: "1st Place", price: 500 },
      { name: "2nd Place", price: 300 },
      { name: "3rd Place", price: 200 },
    ],
  },
  {
    name: "Computer Case",
    slug: "computer-case",
    description: "Jury-judged competition for the best custom computer case.",
    category: "misc",
    judging: "jury",
    rulesSets: ["base", "common"],
    prizes: [
      { name: "1st Place", price: 500 },
      { name: "2nd Place", price: 300 },
      { name: "3rd Place", price: 200 },
    ],
  },
  {
    name: "TG:Hack",
    slug: "tg-hack",
    description: "Compete in hacking tasks to earn a higher score.",
    category: "misc",
    judging: "score",
    contact: "Skandix",
    rulesSets: [],
    prizes: [
      { name: "1st Place", price: 1000 },
      { name: "2nd Place", price: 500 },
      { name: "3rd Place", price: 300 },
    ],
  },
  {
    name: "Best Group",
    slug: "best-group",
    description:
      "Points are earned for top ten placements in all creative competitions.",
    category: "misc",
    judging: "score",
    contact: "Kim Roar aka Zokum",
    rulesSets: ["base", "common", "bestGroup"],
  },
  {
    name: "Cosplay",
    slug: "cosplay",
    description:
      "Show off your best cosplay outfit, whether it's a character from a game, movie, or your own original design.",
    category: "physical",
    judging: "jury",
    rulesSets: ["cosplay"],
    prizes: [
      {
        name: "Winner",
        price: "10 000 NOK and Weekend Pass to Magicon Vanguard",
      },
      {
        name: "Runner-up",
        price: "4 000 NOK and Weekend Pass to Magicon Vanguard",
      },
    ],
  },
];

export const ruleSets: Record<string, Array<Rule>> = {
  base: [
    {
      text: "All competition entries must be uploaded to the competition system before the stated deadline. Deadlines are hard unless the competition organizer explicitly grants an extension.",
    },
    {
      text: "Entries must be previously unreleased and primarily original material. You may include small previously released components (logos, short samples etc.) only if you have the rights to use them and they are not the main substance of the entry.",
    },
    {
      text: "Do not use copyrighted material you do not own or have permission to use. Covers, remixes, copyrighted samples and unlicensed logos will lead to disqualification.",
    },
    {
      text: "Entries with primarily AI-generated content are not allowed. AI may be used for assistance, but the majority of the entry must still be the competitors' own work.",
    },
    {
      text: "Organizers reserve the right to disqualify entries that contain explicit sexual content, racist or hate material, or otherwise violate the event rules or the spirit of the party.",
    },
    {
      text: "By submitting, you accept the competition contract and grant the organizers the rights display, judge, distribute and use the entry for purposes related to Kandu and The Gathering, including promotion of these.",
    },
    {
      text: "Attendance. To receive physical prizes you or your representative must attend the prize-giving ceremony.",
    },
  ],

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
      text: "Multiple submissions are allowed in many competitions. See the specific competition page for limits. Each submission should be an independent entry.",
    },
    {
      text: "If you need the organizers to test your entry on compo machines, contact the competition organizer early to arrange testing.",
    },
  ],

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

  musicBase: [
    {
      text: "Music entries must be original and previously unreleased. No covers, remixes, or copyrighted samples without permission. Generative AI may not be used for large parts of the work.",
    },
    {
      text: "Supported audio formats: MP3 (320kbps), OGG (high quality), WAV, FLAC. Normalize audio levels where appropriate.",
    },
  ],

  graphicsBase: [
    {
      text: "Supported image formats: PNG and JPG (RGB). Provide a no-signature final image (filename suffix: _nosig) and include a short readme describing techniques and sources.",
    },
  ],

  demo: [
    {
      text: "A Demo is a runnable program showing real-time graphics, usually in sync with music. A demo is NOT a pre-rendered video.",
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

  voting: [
    {
      text: "The winner is determined by votes from the party participants, including the crew.",
    },
    {
      text: "Valid entries may be cut from the competition by the Kreativia crew for time reasons. These will not be released publically.",
    },
  ],

  fastGraphics: [
    {
      text: "You have a limited time (typically 4 hours) to create a 1920x1080 artwork that follows the announced theme and required element.",
    },
    {
      text: "No AI tools that automate the creative process are allowed for Fast Graphics. Submit a single final unsigned image.",
    },
    {
      text: "Submit the final unsigned image before the deadline. No intermediate stages required.",
    },
    {
      text: "Theme example: 'Spring Mood' your artwork must reflect the theme.",
    },
  ],

  pixelArt: [
    {
      text: "Resolution max: 256 by 256 pixels. Use up to 16 colors chosen from <a href='https://www.tg.no/media/images/pixelart-tg26.original.png' target='_blank'>the event palette</a> of 256 colors.",
    },
    {
      text: "<strong>Download this years color palette here:</strong><br /><a href='https://www.tg.no/media/images/pixelart-tg26.original.png' target='_blank'>https://www.tg.no/media/images/pixelart-tg26.original.png</a>",
    },
    {
      text: "The palette is taken from the Tiki 100, a Norwegian computer specifically designed for school use in the 80s. The odd color palette is due to the computer using 8 bits to encode colors. 3 for red, 3 for green and 2 for blue. This makes it impossible to create completely grey colors.",
    },
    {
      text: "The image will be resized by a 4:3 ratio to emulate what it would have looked like on actual hardware. This means that pixels will be 33% wider than they are tall. You should take this into account to get the aspect ratio correct for elements in your image. Please do not resize your entries, we will do that for you to get it correct.",
    },
    {
      text: "This competition aims to produce the coolest possible graphics for a serious school computer, produced here in Norway.",
    },
    {
      text: "Use the provided color template during creation. You may remove the palette portion in the final submission if desired.",
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
      text: "This year's theme has three keywords: Norwegian, technology and retro.",
    },
    {
      text: "You could photograph vintage Norwegian technology or inventions. You could mix new and old with a Norwegian twist to it. You could photograph someone playing an old Norwegian computer game. As long as the three elements are reflected in the image to some degree, it will be allowed.",
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
  bestGroup: [
    {
      text: "Top 10 placements in every creative competition award points.",
    },
    {
      text: "Points are multiplied with a factor per competition based on complexity prestige and expected participants.",
    },
    {
      text: "Your group needs to have at least entries in two different competitions or two different creators in the same competition.",
    },
    {
      text: "There is no prizes, only diplomas and bragging right to the top 3 groups.",
    },
  ],
  fastThemedPhoto: [
    {
      text: "The theme will be given at the party, all other asepcts are identical to the regular Themed Photo competition.",
    },
    {
      text: "Photo must be a single exposure (no composites). Minor retouching allowed (crop, exposure, color balance). Submit unsigned final image and original if requested.",
    },
    {
      text: "Ensure correct format and resolution. Photos must be previously unreleased and respect the theme.",
    },
    { text: "Submit images in PNG or JPG (RGB) before the deadline." },
    {
      text: "This year's theme has a theme that will be revealed at the party. It will be possible to photograph this theme inside Vikingskipet.",
    },
  ],
  textmodeArt: [
    {
      text: "Make some cool ascii or ansi art.",
    },
    {
      text: "ANSI Colors are allowed.",
    },
    { text: "Up to 160 characters wide and 75 lines." },
    {
      text: "We allow dos/amiga/c64/utf8. For other formats/typefaces you need permission from the crew.",
    },
    {
      text: "XBin is not allowed.",
    },
    {
      text: "We recommend using Moebius or Moebius XBIN edition.",
    },
  ],
  bestShelf: [
    {
      text: "Show us how to make a really cool shelf that enhances the TG seating experience.",
    },
    {
      text: "The shelves are judged on multiple criterias, without any particular weight to them..",
    },
    { text: "Creativity: Is your shelf innovative or unusual in any way?" },
    {
      text: "Practicality: How much better do they make your designated space(s).",
    },
    {
      text: "Width and height do not matter much, don't try to build it as tall as possible, that could be negative.",
    },
    {
      text: "Elements like sound, light, banners, screens and plants are positive factors.",
    },
    {
      text: "Adherence to this year's party theme is not needed, but appreciated, especially on screens and banners.",
    },
    {
      text: "Enviromentally friendly reuse of existing shelves from another year is a plus.",
    },
  ],
  cosplay: [
    {
      text: "Cosplaykonkurransen arrangeres under The Gathering 2026 i Vikingskipet i Hamar. Konkurransen er åpen for solodeltakere og består av sceneopptreden samt vurdering av kostyme og håndverk. Konkurransen finner sted 4. april 2026.",
    },
    {
      text: "<h2>Deltakelse</h2><ul><li>Konkurransen er kun for solodeltakere.</li><li>Det vil være 10 deltakere i konkurransen.</li><li>For å delta må du ha gyldig billett til The Gathering 2026.</li></ul>",
    },
    {
      text: "<h2>Kostyme</h2><ul><li>Kostymer basert på offisielt publisert visuelt materiale er tillatt. Dette inkluderer for eksempel spill, tegneserier, animasjon, filmer og lignende.</li><li>Originale karakterer og fanart er ikke tillatt.</li><li>Både kostyme og opptreden må være PG13.</li><li>Kostymet må være minst 60 % laget av deltakeren selv.</li></ul>",
    },
    {
      text: "Unntak gjelder for:<ul><li>kontaktlinser</li><li>sko</li><li>parykker</li><li>undertøy</li><li>proteser som ører eller neser</li><li>bruk av delt utstyr som for eksempel 3D-printere</li></ul>",
    },
    {
      text: "<h2>Sceneopptreden</h2><ul><li>Maks lengde på opptreden er 2 minutter.</li><li>Det vil ikke være teknisk rehearsal på scenen før konkurransen.</li><li>Dersom du bruker video eller lyd må dette leveres i én .mp4-fil og følge de tekniske kravene fra arrangøren.</li><li>All lyd må være forhåndsinnspilt. Mikrofon kan ikke brukes under opptreden.</li><li>Følgende er ikke tillatt: konfetti, væsker, pyroteknikk eller fyrverkeri. Det er strengt forbudt å kaste gjenstander utenfor scenen.</li><li>Det er tillatt å ha scenehjelper (stage ninja) på scenen under opptredenen.</li><li>Alle mediefiler må leveres i påmeldingskjema.</li></ul>",
    },
    {
      text: "<h2>Skjerm og teknisk informasjon</h2><ul><li>Bak scenen vil det være en LED-skjerm på omtrent 5 × 6 meter.</li><li>Skjermens oppløsning er 1920 × 2304 og er i vertikalt format.</li></ul>",
    },
    {
      text: "<h2>Pre-judging</h2><p>Alle deltakere vil ha en kort dommersamtale (pre-judging) før konkurransen.</p><p>Her presenterer deltakerne kostymet sitt for dommerne og kan forklare hvordan kostymet er laget, hvilke materialer som er brukt og hvilke teknikker som er benyttet.</p><p>Deltakere kan ta med build book eller referansebilder for å vise prosessen bak kostymet.</p>",
    },

    {
      text: "<h2>Premier</h2><p>Det kåres:</p><ul><li>Winner – 10 000 NOK og Weekend Pass til Magicon Vanguard</li><li>Runner-up – 4 000 NOK og Weekend Pass til Magicon Vanguard</li></ul>",
    },
    {
      text: "<h2>Bedømming</h2><table><tr><th>Kategori</th><th>Beskrivelse</th><th>Poeng</th></tr><tr><td>Håndverk</td><td>Kvalitet på utførelse, finish og detaljnivå</td><td>20 poeng</td></tr><tr><td>Likehet med original</td><td>Hvor likt kostymet er referansebildet</td><td>30 poeng</td></tr><tr><td>Opptreden</td><td>Tolkning av karakteren og presentasjon på scenen</td><td>50 poeng</td></tr></table><p>Totalt: 100 poeng</p><p>Merk: Dommerne vurderer kun hvordan kostymet er laget og hvordan cosplayeren bruker det for å oppnå likhet med karakteren det er basert på. Faktorer som kjønn, høyde, vekt, hudfarge eller andre personlige egenskaper vil ikke bli vurdert.</p>",
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
