// Safe demo: builds the site and serves it at http://localhost:3000 with DEMO_MODE=1.
// Form submissions are validated but never sent anywhere. Run: npm run demo
import { spawnSync, spawn } from 'node:child_process';

const env = { ...process.env, DEMO_MODE: '1' };
const build = spawnSync('npm', ['run', 'build'], { stdio: 'inherit', env, shell: true });
if (build.status !== 0) process.exit(build.status ?? 1);
console.log('\nDEMO_MODE=1: nothing will be sent to Follow Up Boss. Open http://localhost:3000\n');
spawn('npm', ['run', 'preview'], { stdio: 'inherit', env, shell: true });
