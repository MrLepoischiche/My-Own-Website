var millisecs: number = 0;
var seconds: number = 0;
var minutes: number = 0;
var correct_words: number = 0;

var chrono: number;

const word_requested = document.getElementById("wordToType")!;
const user_input = document.getElementById("userWord")!;
const chrono_element = document.getElementById("chrono")!;
const score_element = document.getElementById("score")!;

function initialize_game(){
  
}

function increment_time() {
  ++millisecs;
  if(millisecs > 999) {
    millisecs = 0;
    ++seconds;
  }
  if(seconds > 59) {
    seconds = 0;
    ++minutes;
  }

  chrono_element.innerText = 
      (minutes < 10 ? "0" + minutes : minutes) + ":"
      + (seconds < 10 ? "0" + seconds : seconds) + ":"
      + millisecs;
}

user_input.addEventListener('input', () => {
  if(minutes === 0 && seconds === 0 && millisecs === 0) {
    chrono = setInterval(increment_time, 1);
  }
});

user_input.addEventListener('keypress', (event) => {
  let user_word = user_input.innerText;
  user_input.innerText = "";
  if(event.key === "Enter") {
    if(user_word !== ) {
      clearInterval(chrono);
      user_input.setAttribute("disabled", "true");
      chrono_element.innerText = "Votre temps final est " + chrono_element.innerText;
      score_element.innerText = "Votre score final : " + correct_words;
    }
    else {
      ++correct_words;
      score_element.innerText = "Score : " + correct_words;
    }
  }
});
