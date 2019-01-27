import 'phaser'
import MainScene from './scenes/MainScene'
import HomeScene from './scenes/HomeScene';
import FirstScene from './scenes/FirstScene';

const config: GameConfig = {
  width: window.innerWidth,
  height: window.innerHeight,
  type: Phaser.AUTO,
  parent: "game",
  scene: [
    FirstScene,
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