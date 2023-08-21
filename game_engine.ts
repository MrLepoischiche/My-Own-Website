class GameEngine {
  #instance: GameEngine;
  
  private constructor() {}
  
  getInstance(): GameEngine {
    if(this.#instance === null){
      this.#instance = new GameEngine();
    }
    return this.#instance;
  }
  
  init_game(game_index: number) {
    
  }
}