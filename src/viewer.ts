import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { getColorForCharacter } from './colors';

const logsDir = path.join(process.cwd(), 'logs');

function getLatestLogFile(): string | null {
  if (!fs.existsSync(logsDir)) {
    return null;
  }

  const files = fs.readdirSync(logsDir)
    .filter(f => f.startsWith('society-') && f.endsWith('.txt'))
    .sort()
    .reverse();

  return files.length > 0 ? path.join(logsDir, files[0]) : null;
}

function displayLog(filePath: string, follow: boolean = false): void {
  console.clear();
  console.log(chalk.cyan.bold('📖 AI Society Log Viewer\n'));
  console.log(chalk.dim(`Reading: ${path.basename(filePath)}\n`));

  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  for (const line of lines) {
    if (line.startsWith('[SYSTEM]')) {
      console.log(chalk.cyan(line));
    } else if (line.startsWith('---')) {
      console.log(chalk.dim(line));
    } else if (line.includes(':')) {
      const [speaker, ...rest] = line.split(':');
      const message = rest.join(':').trim();
      const color = getColorForCharacter(speaker.trim());
      console.log(`${color.bold(speaker)}:${message}`);
    } else {
      console.log(line);
    }
  }

  if (follow) {
    console.log(chalk.yellow('\n[Watching for updates... Press Ctrl+C to exit]'));
    let lastSize = fs.statSync(filePath).size;

    setInterval(() => {
      const currentSize = fs.statSync(filePath).size;
      if (currentSize > lastSize) {
        const stream = fs.createReadStream(filePath, {
          start: lastSize,
          encoding: 'utf-8'
        });

        stream.on('data', (chunk) => {
          const newLines = chunk.toString().split('\n');
          for (const line of newLines) {
            if (!line.trim()) continue;
            
            if (line.startsWith('[SYSTEM]')) {
              console.log(chalk.cyan(line));
            } else if (line.startsWith('---')) {
              console.log(chalk.dim(line));
            } else if (line.includes(':')) {
              const [speaker, ...rest] = line.split(':');
              const message = rest.join(':').trim();
              const color = getColorForCharacter(speaker.trim());
              console.log(`${color.bold(speaker)}:${message}`);
            } else {
              console.log(line);
            }
          }
        });

        lastSize = currentSize;
      }
    }, 1000);
  }
}

const args = process.argv.slice(2);
const follow = args.includes('-f') || args.includes('--follow');
const specifiedFile = args.find(arg => !arg.startsWith('-'));

let logFile: string | null = null;

if (specifiedFile) {
  logFile = path.join(logsDir, specifiedFile);
  if (!fs.existsSync(logFile)) {
    console.error(chalk.red(`❌ Log file not found: ${specifiedFile}`));
    process.exit(1);
  }
} else {
  logFile = getLatestLogFile();
  if (!logFile) {
    console.error(chalk.red('❌ No log files found. Run the simulation first!'));
    process.exit(1);
  }
}

displayLog(logFile, follow);
