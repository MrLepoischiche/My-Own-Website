class GameEngine {
  let instance: GameEngine = null;
  
  function getInstance(): GameEngine {
    if(instance === null){
      instance = new GameEngine();
    }
    return instance;
  }
  
  function init_game(game_index: number) {
    
  }
}