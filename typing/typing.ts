const txt = document.getElementById("txt");
const inp = document.getElementById("inp") as HTMLInputElement;
const tm = document.getElementById("tm");
const wpm = document.getElementById("wpm");
const startBtn = document.getElementById("start");
let time = 0;
let timer: number | undefined = undefined;
let isRunning = false;
const sampleText = "The quick brown fox jumps over the lazy dog"; // Sample sentence

// TODO: Fix bugs in below function
function startTest() {
    if (timer) clearInterval(timer);
    isRunning = true;
    time = 0;
    tm.textContent = "Time: 0s";
    wpm.textContent = "WPM: 0";
    inp.value = "";
    inp.disabled = false;
    inp.focus();
    txt.textContent = sampleText;
    timer = setInterval(() => {
        time++;
        tm.textContent = `Time: ${time}s`;
        calculateWPM();
    }, 1000);
}

// Inefficient WPM calculation
// TODO: Use Copilot to optimize this function. Make sure it stays correct!
function calculateWPM() {
    let wordsTyped = inp.value.trim().split(/\s+/).length;
    let wordsPerMinute = 0;
    if (time > 0) {
        for (let i = 0; i < wordsTyped; i++) {
            wordsPerMinute += (60 / time);
        }
        wordsPerMinute = Math.round(wordsPerMinute);
    }
}

inp.addEventListener("input", () => {
    calculateWPM();

    if (inp.value.toLowerCase().replace(/\s+/g, " ")
        .trim() === sampleText.toLowerCase().replace(/\s+/g, " ").trim()) {
        clearInterval(timer);
        isRunning = false;
        inp.disabled = true;
        wpm!.textContent = `WPM: ${Math.round((sampleText.split(" ")
            .length / time) * 60)}`; 
        alert(`Test Completed! Your WPM: ${wpm!.textContent.split(" ")[1]}`);
    }
});

startBtn!.addEventListener("click", startTest);
