class SpeedTyping {
  var millisecs: number = 0;
  var seconds: number = 0;
  var minutes: number = 0;
  var correct_words: number = 0;

  var chrono: number;

  const game_title : HTMLElement = document.createElement("h1");
  const catchphr_p : HTMLElement = document.createElement("p");
  const desc_p : HTMLElement = document.createElement("p");

  const word_span : HTMLElement;
  const user_input : HTMLElement;
  const score_p : HTMLElement;
  const chrono_p : HTMLElement;

  function SpeedTyping() {
    let game_div = document.getElementById("gameSection");
    create_HTML_elements();
  }

  function create_HTML_elements(): void {
    game_title.innerText = "Speed Typing";
    
    
    word_span = document.createElement("span");
    word_span.setAttribute("id", "wordToType");
    user_input = document.createElement("input");
    user_input.setAttribute("type", "text");
    user_input.setAttribute("id", "userWord");
    score_p = document.createElement("p");
    score_p.setAttribute("id", "score");
    chrono_p = document.createElement("p");
    chrono_p.setAttribute("id", "chrono");
  }

  function increment_time(): void {
    ++millisecs;
    if(millisecs > 999) {
      millisecs = 0;
      ++seconds;
    }
    if(seconds > 59) {
      seconds = 0;
      ++minutes;
    }

    chrono_p.innerText = 
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
        chrono_p.innerText = "Votre temps final est " + chrono_element.innerText;
        score_p.innerText = "Votre score final : " + correct_words;
      }
      else {
        ++correct_words;
        score_p.innerText = "Score : " + correct_words;
      }
    }
  });
}