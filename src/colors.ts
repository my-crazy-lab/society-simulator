import chalk, { Chalk } from 'chalk';

export const characterColors: Record<string, Chalk> = {
  Luna: chalk.magenta,
  Alex: chalk.blue,
  Maya: chalk.yellow,
  Elias: chalk.gray,
  Sofia: chalk.cyan,
  Kai: chalk.green,
  Valeria: chalk.red,
  Riven: chalk.white
};

export const getColorForCharacter = (name: string): Chalk => {
  return characterColors[name] || chalk.white;
};
