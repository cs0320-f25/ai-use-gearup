// TODO: This function is supposed to check if a string is a palindrome (ignoring case and non-alphanumeric characters),
// but it contains a subtle bug. Determine what is wrong with the function using Copilot righ-click Explain and Fix!

export function brokenIsPalindrome(str: string): boolean {
  const cleaned = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  for (let i = 0; i < Math.floor(cleaned.length / 2); i++) {
    if (cleaned[i] !== cleaned[cleaned.length - i - 1]) { 
      return false;
    }
  }
  return true;
}

//Example usage (should print true, true, false):
console.log(brokenIsPalindrome("A man, a plan, a canal: Panama"));
console.log(brokenIsPalindrome("racecar"));
console.log(brokenIsPalindrome("hello"));

//run using npx ts-node src/bug.ts

