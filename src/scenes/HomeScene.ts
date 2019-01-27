import 'phaser'
import wolfIdleLeft from '../assets/img/sprites/__werewolf_idle_left.png'
import homeBg from '../assets/img/bg2.png'
import transform from '../assets/img/sprites/transform.png'
import house from '../assets/img/sprites/tent.png'
import womanIdle from '../assets/img/sprites/__cave_woman_brown_suit_idle_right.png'
import womanWalk from '../assets/img/sprites/__cave_woman_brown_suit_walk.png'
import manIdle from '../assets/img/sprites/__cave_man_one_brown_fur_idle.png'
import manWalk from '../assets/img/sprites/__cave_man_one_brown_fur_walk.png'

export default class HomeScene extends Phaser.Scene {

  man: Phaser.GameObjects.Sprite
  woman: Phaser.GameObjects.Sprite
  homeBg: Phaser.GameObjects.Image
  house: Phaser.GameObjects.Image

  constructor() {
    super({
      key: "HomeScene"
    })
  }

  preload() {
    this.load.spritesheet('wolfIdleLeft', wolfIdleLeft, { frameWidth: 146, frameHeight: 256 })
    this.load.spritesheet('womanIdle', womanIdle, { frameWidth: 113, frameHeight: 256 })
    this.load.spritesheet('manIdle', manIdle, { frameWidth: 144, frameHeight: 256 })
    this.load.spritesheet('womanWalk', womanWalk, { frameWidth: 128, frameHeight: 256 })
    this.load.spritesheet('manWalk', manWalk, { frameWidth: 181, frameHeight: 256 })
    this.load.image('homeBg', homeBg)
    this.load.image('house', house)
    this.load.spritesheet('transform', transform, { frameWidth: 144, frameHeight: 256 })
  }

  create() {
    this.cameras.main.setBounds(0, 0, 1536, 900)
    this.cameras.main.fadeIn(2000, 0, 0, 0)
    const { config } = this.game

    this.physics.world.setBoundsCollision(true, true, true, true)

    this.homeBg = this.add.image(0, -3000, 'homeBg').setOrigin(0)
    this.house = this.add.image(500, 600, 'house').setScale(0.3)

    this.man = this.physics.add.sprite( 1350, 720, 'wolfIdleLeft').setScale(0.5)
    this.anims.create({
      key: 'transform',
      frames: this.anims.generateFrameNumbers('transform', { start: 0, end: 28 }),
      frameRate: 10,
      repeat: 0
    })
    this.anims.create({
      key: 'manStanding',
      frames: this.anims.generateFrameNumbers('manIdle', { start: 0, end: 19 }),
      frameRate: 10,
      repeat: -1
    })
    this.anims.create({
      key: 'manWalking',
      frames: this.anims.generateFrameNumbers('manWalk', { start: 0, end: 11 }),
      frameRate: 10,
      repeat: -1
    })
    setTimeout(() => {this.man.anims.play('transform', true)}, 3000)
    setTimeout(() => {
      // @ts-ignore
      this.man.body.setVelocity(-50, 0)
      this.man.anims.play('manWalking', true)
    }, 6000)
    setTimeout(() => {
      // @ts-ignore
      this.man.body.setVelocity(0, 0)
      this.man.anims.play('manStanding', true)
    }, 15000)
    setTimeout(() => {
      // @ts-ignore
      this.man.body.setVelocity(-40, -15)
      this.man.anims.play('manWalking', true)
    }, 18000)
    setTimeout(() => {
      this.man.destroy()
    }, 24000)

    this.woman = this.physics.add.sprite( 800, 720, 'womanIdle').setScale(0.5)
    this.anims.create({
      key: 'womanWalking',
      frames: this.anims.generateFrameNumbers('womanWalk', { start: 0, end: 14 }),
      frameRate: 10,
      repeat: -1
    })
    setTimeout(() => {
      // @ts-ignore
      this.woman.body.setVelocity(-35, -15)
      this.woman.anims.play('womanWalking', true)
    }, 18000)
    setTimeout(() => {
      this.woman.destroy()
    }, 24000)


    setTimeout(() => {

      this.add.text(
        600, 300,
        'Home is where',
        {
          fontSize: '42px',
          fill: '#ffffff' 
        }
      )

      this.add.text(
        600, 400,
        'your heart is...',
        {
          fontSize: '42px',
          fill: '#ffffff' 
        }
      )

    }, 25000)

    
    


  }

}