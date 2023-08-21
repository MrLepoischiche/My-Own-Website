class SpeedTyping {
  #millisecs!: number = 0;
  #seconds!: number = 0;
  #minutes!: number = 0;
  #correct_words!: number = 0;

  #chrono: number;

  const #game_title! : HTMLElement = document.createElement("h1");
  const #catchphr_p! : HTMLElement = document.createElement("p");
  const #desc_p! : HTMLElement = document.createElement("p");
  const #word_p! : HTMLElement = document.createElement("p");

  #word_span : HTMLElement;
  #user_input : HTMLElement;
  #score_p : HTMLElement;
  #chrono_p : HTMLElement;

  init_speedtype() {
    let game_div = document.getElementById("gameSection");
    this.create_HTML_elements();
  }

  create_HTML_elements(): void {
    this.#game_title.innerText = "Speed Typing";
    
    
    this.#word_span = document.createElement("span");
    this.#word_span.setAttribute("id", "wordToType");
    
    this.#user_input = document.createElement("input");
    this.#user_input.setAttribute("type", "text");
    this.#user_input.setAttribute("id", "userWord");

    this.#user_input.addEventListener('input', () => {
      if(this.#minutes === 0 && this.#seconds === 0 && this.#millisecs === 0) {
        this.#chrono = setInterval(() => this.increment_time, 1);
      }
    });
  
    this.#user_input.addEventListener('keypress', (event) => {
      let user_word = this.#user_input.innerText;
      this.#user_input.innerText = "";
      if(event.key === "Enter") {
        if(user_word !== ) {
          clearInterval(this.#chrono);
          this.#user_input.setAttribute("disabled", "true");
          this.#chrono_p.innerText = "Votre temps final est " + this.#chrono_p.innerText;
          this.#score_p.innerText = "Votre score final : " + this.#correct_words;
        }
        else {
          ++this.#correct_words;
          this.#score_p.innerText = "Score : " + this.#correct_words;
        }
      }
    });
    
    this.#score_p = document.createElement("p");
    this.#score_p.setAttribute("id", "score");
    this.#score_p.innerText = "Score : " + this.#correct_words;
    
    this.#chrono_p = document.createElement("p");
    this.#chrono_p.setAttribute("id", "chrono");
    this.#chrono_p.innerText = "00:00:0";
  }

  increment_time(): void {
    ++this.#millisecs;
    if(this.#millisecs > 999) {
      this.#millisecs = 0;
      ++this.#seconds;
    }
    if(this.#seconds > 59) {
      this.#seconds = 0;
      ++this.#minutes;
    }

    this.#chrono_p.innerText = 
        (this.#minutes < 10 ? "0" + this.#minutes : this.#minutes) + ":"
        + (this.#seconds < 10 ? "0" + this.#seconds : this.#seconds) + ":"
        + this.#millisecs;
  }
}