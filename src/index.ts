import { Simulator } from './simulator';

const simulator = new Simulator();

process.on('SIGINT', () => {
  console.log('\n\nReceived Ctrl+C, shutting down gracefully...');
  simulator.stop();
  process.exit(0);
});

process.on('SIGTERM', () => {
  simulator.stop();
  process.exit(0);
});

simulator.start().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
