const words = [
    { word: "Happy", meaning: "Feeling joy" },
    { word: "Brave", meaning: "Showing courage" },
    { word: "Fast", meaning: "Quick" },
    { word: "Calm", meaning: "Peaceful" },
    { word: "Smart", meaning: "Intelligent" }
];

const wordEl = document.getElementById("word");
const meaningEl = document.getElementById("meaning");
const quizWordEl = document.getElementById("quizWord");
const answerEl = document.getElementById("answer");
const resultEl = document.getElementById("result");
const progressEl = document.getElementById("progressText");

let index = 0;
let score = 0;
let total = 0;
let voices = [];

function loadVoices() {
    voices = speechSynthesis.getVoices();
    console.log(`Loaded ${voices.length} voices`); // Debug: Check in console
}

speechSynthesis.onvoiceschanged = loadVoices; // Trigger when voices ready
loadVoices(); // Initial check

// Shuffle words for variety
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
shuffle(words);

function loadFlashcard() {
    wordEl.innerText = words[index].word;
    meaningEl.innerText = words[index].meaning;
}

function nextWord() {
    index = (index + 1) % words.length;
    loadFlashcard();
}

function speak() {
    if (voices.length === 0) {
        console.error("No voices available. Try refreshing or check browser support.");
        return;
    }
    
    const utterance = new SpeechSynthesisUtterance(words[index].word);
    utterance.lang = "en-US"; // Or change for other languages
    utterance.rate = 0.9; // Slower for clarity
    utterance.pitch = 1.0;
    
    // Pick a good voice (optional: prefer natural ones)
    const preferredVoice = voices.find(v => v.lang.includes("en") && v.name.includes("Google") || v.name.includes("Microsoft"));
    if (preferredVoice) utterance.voice = preferredVoice;
    
    speechSynthesis.speak(utterance);
}

function loadQuiz() {
    const r = Math.floor(Math.random() * words.length);
    quizWordEl.innerText = words[r].word;
    quizWordEl.dataset.answer = words[r].meaning;
}

function check() {
    const user = answerEl.value.toLowerCase().trim();
    const correct = quizWordEl.dataset.answer.toLowerCase();
    total++;
    if (user === correct) {
        score++;
        resultEl.innerText = "✅ Correct!";
    } else {
        resultEl.innerText = "❌ Wrong! Correct: " + quizWordEl.dataset.answer;
    }
    progressEl.innerText = `Score: ${score} / ${total}`;
    answerEl.value = "";
    loadQuiz();
}


loadFlashcard();
loadQuiz();
