import 'phaser'
import MainScene from './scenes/MainScene'
import HomeScene from './scenes/HomeScene';

const config: GameConfig = {
  width: 1536,
  height: 900,
  type: Phaser.AUTO,
  parent: "game",
  scene: [
    MainScene,
    HomeScene
  ],
  physics: {
    default: "arcade",
    arcade: {
      debug: false
    }
  }
}

class Game extends Phaser.Game {
  constructor(config) {
    super(config)
  }
}

window.onload = () => {
  const game = new Game(config)
}