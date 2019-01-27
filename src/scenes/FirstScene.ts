import 'phaser'
import wolfIdleLeft from '../assets/img/sprites/__werewolf_idle_left.png'
import mainBg from '../assets/img/bg2.png'
import house from '../assets/img/sprites/tent.png'
import womanIdle from '../assets/img/sprites/__cave_woman_brown_suit_idle_right.png'

export default class FirstScene extends Phaser.Scene {

  man: Phaser.GameObjects.Sprite
  woman: Phaser.GameObjects.Sprite
  mainBg: Phaser.GameObjects.Image
  house: Phaser.GameObjects.Image

  constructor() {
    super({
      key: "FirstScene"
    })
  }

  preload() {
    this.load.spritesheet('wolfIdleLeft', wolfIdleLeft, { frameWidth: 146, frameHeight: 256 })
    this.load.spritesheet('womanIdle', womanIdle, { frameWidth: 113, frameHeight: 256 })
    this.load.image('mainBg', mainBg)
    this.load.image('house', house)
  }

  create() {
    const { config } = this.game

    this.physics.world.setBoundsCollision(true, true, true, true)

    this.mainBg = this.add.image(0, -2200, 'mainBg').setScale(0.75).setOrigin(0)
    this.house = this.add.image(425, 480, 'house').setScale(0.3)
    this.man = this.physics.add.sprite( 1000, 570, 'wolfIdleLeft').setScale(0.5)
    this.woman = this.physics.add.sprite( 600, 570, 'womanIdle').setScale(0.5)
    this.add.text(
      425, 200,
      'Cursed 21',
      {
        fontSize: '60px',
        fill: '#ffffff'
      }
    )

    setTimeout(() => {
      this.cameras.main.fadeOut(2000, 0, 0, 0)
      setTimeout(() => {
        this.scene.start('MainScene')
      }, 2000)
    }, 3000) 
  }

}