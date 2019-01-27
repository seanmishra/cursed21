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

    this.mainBg = this.add.image(0, -3000, 'mainBg').setOrigin(0)
    this.house = this.add.image(500, 600, 'house').setScale(0.3)
    this.man = this.physics.add.sprite( 1350, 720, 'wolfIdleLeft').setScale(0.5)
    this.woman = this.physics.add.sprite( 800, 720, 'womanIdle').setScale(0.5)
    this.add.text(
      600, 300,
      'Cursed 21',
      {
        fontSize: '52px',
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