# 🏠 AI Society Chat Simulator

A fully autonomous, endless group conversation between 8 predefined characters living together in a remote mansion. Powered by Google Gemini AI.

## 🎭 The Characters

- **Luna** (28) - Chaotic artist, sarcastic, addicted to drama, secretly in love with Alex
- **Alex** (34) - Ex-special forces, emotionally repressed, dry humor, nightmares every night
- **Maya** (26) - Ruthless crypto influencer, manipulative, wants to control the group
- **Elias** (47) - Cynical philosophy professor, functioning alcoholic, quotes dead Germans
- **Sofia** (19) - Genius autistic hacker, terrified of eye contact, worships Elias
- **Kai** (31) - Perpetually high musician, surprisingly profound, everyone's therapist
- **Valeria** (38) - Ice-cold corporate lawyer, having secret affair with [redacted]
- **Riven** (29) - Ex-cult member, speaks in riddles, believes the house is haunted

## ✨ Features

- **Fully autonomous** - Runs forever until you stop it (Ctrl+C)
- **Persistent memory** - All secrets, betrayals, romances, and grudges carry over
- **Natural pacing** - Random delays between messages (6-18 seconds)
- **In-world clock** - Starts at Day 1, 09:00 and advances realistically
- **Color-coded output** - Each character has their own color in the terminal
- **Auto-saves logs** - Every 100 messages + on graceful shutdown
- **Weighted speakers** - Luna speaks more than Sofia (personality-based)

## 🚀 Setup

### 1. Get a Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and add your API key:

```
GEMINI_API_KEY=your_actual_api_key_here
MODEL=gemini-1.5-pro-latest
```

**Model options:**
- `gemini-1.5-pro-latest` (smarter, slower, more expensive)
- `gemini-1.5-flash-latest` (faster, cheaper, default)

### 4. Run the Simulation

```bash
npm start
```

The simulation will:
- Build the TypeScript code
- Start the eternal society conversation
- Log everything to console with colors
- Save logs to `logs/society-YYYY-MM-DD.txt`

### 5. Stop the Simulation

Press `Ctrl+C` to gracefully shutdown. The log will be saved automatically.

## 📁 Project Structure

```
.
├── src/
│   ├── index.ts          # Entry point
│   ├── simulator.ts      # Main simulation loop
│   ├── gemini.ts         # Gemini API client
│   ├── characters.ts     # Character definitions
│   ├── logger.ts         # Console & file logging
│   ├── time.ts           # In-world time management
│   ├── colors.ts         # Character color mapping
│   ├── config.ts         # Configuration & env vars
│   └── types.ts          # TypeScript interfaces
├── logs/                 # Auto-generated logs
├── .env                  # Your API key (create this)
├── .env.example          # Example env file
├── package.json
├── tsconfig.json
└── README.md
```

## 🎨 Console Output

Each character speaks in their own color:
- 🟣 Luna (magenta)
- 🔵 Alex (blue)
- 🟡 Maya (yellow)
- ⚪ Elias (gray)
- 🔷 Sofia (cyan)
- 🟢 Kai (green)
- 🔴 Valeria (red)
- ⚪ Riven (white)

Time separators appear every 20-30 messages:
```
--- Day 1, 09:00 ---
```

## ⚙️ Configuration

Edit `src/config.ts` to adjust:
- Message delays (default: 6-18 seconds)
- Time separator frequency (default: 20-30 messages)
- Auto-save interval (default: every 100 messages)
- Max token history (default: 12,000 tokens)

## 🐛 Troubleshooting

**"GEMINI_API_KEY not found"**
- Make sure you created `.env` file with your API key

**"API quota exceeded"**
- Switch to `gemini-1.5-flash-latest` in `.env` (cheaper)
- Wait for quota to reset (usually daily)

**Characters repeating themselves**
- This is normal with AI - they have persistent memory but may echo themes
- The simulation learns and evolves over time
