class GameEngine {
  let instance: GameEngine = null;
  
  function GameEngine() {
    let game_div = document.createElement("div");
    game_div.setAttribute("id", "gameSection");
  }
  
  function getInstance(): GameEngine {
    if(instance === null){
      instance = new GameEngine();
    }
    return instance;
  }
  
  function init_game(game_index: number) {
    
  }
}