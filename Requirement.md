You are a senior backend engineer who ships bulletproof, long-running AI simulations.

Build me a **fully autonomous AI Society Chat Simulator server** — no frontend, just a terminal-based (or log-file) endless group conversation between 8 predefined characters powered by Google Gemini 1.5 Pro (or Flash).

### Exact requirements
- Node.js + TypeScript
- Uses Google Gemini API (gemini-1.5-pro-latest or gemini-1.5-flash-latest — make it configurable via env var)
- 8 fully predefined characters hardcoded in a const array (name, age, personality, secrets, goals — I will list them below)
- On start, the simulation runs forever (or until Ctrl+C)
- Every 6–18 seconds (randomized natural pacing), one character speaks
- Full persistent memory across the entire run (Gemini system prompt + growing message history)
- In-world clock starts at "Day 1, 09:00" and advances realistically
- Every 20–30 messages, print a clear time separator
- Logs everything beautifully to console with colors (use chalk or p-ts)
- Saves full log to logs/society-YYYY-MM-DD.txt
- Graceful shutdown (Ctrl+C saves log and says goodbye)

### Hardcoded characters (use exactly these 8)
```ts
const characters = [
  { name: "Luna",    age: 28, personality: "chaotic artist, sarcastic, addicted to drama, secretly in love with Alex" },
  { name: "Alex",    age: 34, personality: "ex-special forces, emotionally repressed, dry humor, nightmares every night" },
  { name: "Maya",    age: 26, personality: "ruthless crypto influencer, manipulative, wants to control the group" },
  { name: "Elias",   age: 47, personality: "cynical philosophy professor, functioning alcoholic, quotes dead Germans" },
  { name: "Sofia",   age: 19, personality: "genius autistic hacker, terrified of eye contact, worships Elias" },
  { name: "Kai",     age: 31, personality: "perpetually high musician, surprisingly profound, everyone’s therapist" },
  { name: "Valeria", age: 38, personality: "ice-cold corporate lawyer, having secret affair with [redacted]" },
  { name: "Riven",   age: 29, personality: "ex-cult member, speaks in riddles, believes the house is haunted" }
];

### Exact system prompt (hardcode this — never change)

You are simulating a real-time, endless group conversation between exactly these 8 people living together in a large remote mansion. They are all in the same room 24/7 (common areas). Never add new characters. Never narrate internal thoughts — only output what they SAY out loud or DO visibly (e.g., "*Luna rolls her eyes*"). Keep every message short (1–3 sentences max). Memory is 100% persistent: secrets, betrayals, romances, grudges, inside jokes, and addictions carry over forever. Time passes realistically. Relationships and drama must evolve naturally over days and weeks. Be chaotic, funny, dark, human, and unpredictable. Every 20–30 messages, insert: \n\n--- Day X, HH:MM ---\n\n
Current characters and their core traits: [insert the 8 characters above exactly as written]

### Features you MUST implement

- .env with GEMINI_API_KEY and MODEL=gemin-1.5-pro-latest (fallback to flash)
- Smart message history trimming (keep last 12k tokens + full system prompt)
- Randomized speaker selection weighted by personality (Luna speaks 2× more than Sofia, etc.)
- Natural delays with jitter (6–18s)
- Color-coded console output per character
- Auto-saves log every 100 messages + on shutdown
- Zero external dependencies except @google/generative-ai and chalk

### Output
Give me the complete project in one response:

- Exact folder structure
- Every file with full, runnable, perfectly formatted TypeScript code
- README.md with setup instructions (how to get Gemini API key, etc.)

I will run npm install && npm run start and it must instantly begin the eternal society.
Ship it now. Make it beautiful and alive.
