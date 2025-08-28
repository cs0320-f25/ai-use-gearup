#!/usr/bin/env node

// countdown.ts - Simple CLI countdown from 10 to 1
// Run this program with `node dist/countdown.js` after running npm run build

function countdown() {
  let current = 10;
  const interval = setInterval(() => {
    if (current > 0) {
      console.log(current);
      current--;
    } else {
      clearInterval(interval);
      console.log('Go!');
    }
  }, 1000);
}

countdown();
