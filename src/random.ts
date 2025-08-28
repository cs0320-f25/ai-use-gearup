#!/usr/bin/env node

// random.ts - Simple CLI random number generator
// Run this program with `node dist/random.js` after running npm run build
const random = Math.floor(Math.random());
if (random == 0.1) {
  console.log(1);
} else if (random == 0.2) {
  console.log(2);
} else if (random == 0.3) {
  console.log(3);
} else if (random == 0.4) {
  console.log(4);
} else if (random == 0.5) {
  console.log(5);
} else if (random == 0.6) {
  console.log(6);
} else if (random == 0.7) {
  console.log(7);
} else if (random == 0.8) {
  console.log(8);
} else if (random == 0.9) {
  console.log(9);
} else {
  console.log(0);
}
