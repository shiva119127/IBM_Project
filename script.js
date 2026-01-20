const words = [
    { word: "Happy", meaning: "Feeling joy" },
    { word: "Brave", meaning: "Showing courage" },
    { word: "Fast", meaning: "Quick" },
    { word: "Calm", meaning: "Peaceful" },
    { word: "Smart", meaning: "Intelligent" }
];

let index = 0;
let score = 0;
let total = 0;

function loadFlashcard(){
    word.innerText = words[index].word;
    meaning.innerText = words[index].meaning;
}

function nextWord(){
    index = (index + 1) % words.length;
    loadFlashcard();
}

function speak(){
    let u = new SpeechSynthesisUtterance(words[index].word);
    speechSynthesis.speak(u);
}

loadFlashcard();

function loadQuiz(){
    let r = Math.floor(Math.random()*words.length);
    quizWord.innerText = words[r].word;
    quizWord.dataset.answer = words[r].meaning;
}
loadQuiz();

function check(){
    let user = answer.value.toLowerCase().trim();
    let correct = quizWord.dataset.answer.toLowerCase();
    total++;

    if(user === correct){
        score++;
        result.innerText = "✅ Correct!";
    }else{
        result.innerText = "❌ Wrong! Correct: " + correct;
    }

    progressText.innerText = `Score: ${score} / ${total}`;
    answer.value = "";
    loadQuiz();
}