import 'phaser'
import gameBg from '../assets/img/bg.png'
import gameBgIslands from '../assets/img/platforms.png'
import wolfIdleRight from '../assets/img/sprites/__werewolf_idle_right.png'
import wolfIdleLeft from '../assets/img/sprites/__werewolf_idle_left.png'
import wolfJumpRight from '../assets/img/sprites/__werewolf_jump_test.png'
import wolfJumpLeft from '../assets/img/sprites/__werewolf_jump_left.png'
import wolfWalkRight from '../assets/img/sprites/__werewolf_walk_right.png'
import wolfWalkLeft from '../assets/img/sprites/__werewolf_walk_left.png'
import block from '../assets/img/sprites/block.png'
import islandBlock from '../assets/img/sprites/island_block.png'
import bubble from '../assets/img/sprites/bubble-128px.png'
import chest from '../assets/img/sprites/dark-wood-chest-empty.png'
import chestFilled from '../assets/img/sprites/dark-wood-with-treasure.png'
import doubloon from '../assets/img/sprites/doubloons.png'
import { Scene } from 'phaser';

export default class MainScene extends Phaser.Scene {

  platforms: Phaser.Physics.Arcade.StaticGroup
  gameBg: Phaser.GameObjects.Image
  player: Phaser.Physics.Arcade.Sprite
  chest: Phaser.Physics.Arcade.Sprite
  chestFilled: Phaser.Physics.Arcade.Sprite
  cursors: Phaser.Input.Keyboard.CursorKeys
  state: {
    playerDirection: string,
    coinsTotal: number,
    coinsCarrying: number,
    gameOver: boolean
  }
  // godEye: Phaser.Physics.Arcade.Sprite
  bubbles: Phaser.Physics.Arcade.Group
  doubloons: Phaser.Physics.Arcade.Group
  coinCount: Phaser.GameObjects.Text
  coinCarryingCount: Phaser.GameObjects.Text

  constructor() {
    super({
      key: "MainScene"
    })

    this.state = {
      playerDirection: 'right',
      coinsTotal: 21,
      coinsCarrying: 0,
      gameOver: false
    }
  }

  setState(state) {
    this.state = (<any>Object).assign({}, this.state, state)
  }

  preload() {
    this.load.image('gameBg', gameBg)
    this.load.image('islands', gameBgIslands)
    this.load.image('block', block)
    this.load.image('islandBlock', islandBlock)
    this.load.image('bubble', bubble)
    this.load.image('chest', chest)
    this.load.image('chestFilled', chestFilled)
    this.load.spritesheet('doubloon', doubloon, { frameWidth: 256, frameHeight: 256 })
    this.load.spritesheet('wolfIdleRight', wolfIdleRight, { frameWidth: 146, frameHeight: 256 })
    this.load.spritesheet('wolfIdleLeft', wolfIdleLeft, { frameWidth: 146, frameHeight: 256 })
    this.load.spritesheet('wolfWalkRight', wolfWalkRight, { frameWidth: 195, frameHeight: 256 })
    this.load.spritesheet('wolfWalkLeft', wolfWalkLeft, { frameWidth: 195, frameHeight: 256 })
    this.load.spritesheet('wolfJumpRight', wolfJumpRight, { frameWidth: 283, frameHeight: 256 })
    this.load.spritesheet('wolfJumpLeft', wolfJumpLeft, { frameWidth: 206, frameHeight: 256 })
  }

  create() {
    const { config } = this.game
    const gameWidth = Number(config.width)
    const viewPortHeight = Number(config.height)
    const gameHeight = 2960

    // World Init
    this.physics.world.setBoundsCollision(true, true, false, false)
    this.cursors = this.input.keyboard.createCursorKeys()

    // Background
    this.gameBg = this.add.image(0, 0, 'gameBg').setScale(0.75).setOrigin(0)
    this.gameBg = this.add.image(0, 0, 'islands').setScale(0.75).setOrigin(0)

    // Platforms
    this.platforms = this.physics.add.staticGroup()
    for (let i = 0; i <= gameWidth; i += 64) {
      this.platforms.create(i, 32, 'block')
      .setScale(0.25)
      .refreshBody()
      this.platforms.create(i, gameHeight - 32, 'block')
      .setScale(0.25)
      .refreshBody()
    }
    for (let i = 0; i <= gameHeight - 128; i += 64) {
      this.platforms.create(32, i, 'block')
      .setScale(0.25)
      .refreshBody()
      this.platforms.create(gameWidth - 32, i, 'block')
      .setScale(0.25)
      .refreshBody()
    }

    // Islands Platforms
    this.platforms.create(810, 2435, 'islandBlock').setScale(0.25).refreshBody()
    this.platforms.create(874, 2435, 'islandBlock').setScale(0.25).refreshBody()
    this.platforms.create(930, 2435, 'islandBlock').setScale(0.25).refreshBody()
    this.platforms.create(330, 2335, 'islandBlock').setScale(0.25).refreshBody()
    this.platforms.create(390, 2335, 'islandBlock').setScale(0.25).refreshBody()
    this.platforms.create(420, 2335, 'islandBlock').setScale(0.25).refreshBody()
    this.platforms.create(710, 2040, 'islandBlock').setScale(0.25).refreshBody()
    this.platforms.create(770, 2040, 'islandBlock').setScale(0.25).refreshBody()
    this.platforms.create(830, 2040, 'islandBlock').setScale(0.25).refreshBody()
    this.platforms.create(230, 1760, 'islandBlock').setScale(0.25).refreshBody()
    this.platforms.create(290, 1760, 'islandBlock').setScale(0.25).refreshBody()
    this.platforms.create(330, 1760, 'islandBlock').setScale(0.25).refreshBody()
    this.platforms.create(815, 1575, 'islandBlock').setScale(0.25).refreshBody()
    this.platforms.create(885, 1575, 'islandBlock').setScale(0.25).refreshBody()
    this.platforms.create(320, 1365, 'islandBlock').setScale(0.25).refreshBody()
    this.platforms.create(385, 1365, 'islandBlock').setScale(0.25).refreshBody()
    this.platforms.create(450, 1365, 'islandBlock').setScale(0.25).refreshBody()
    this.platforms.create(810, 1090, 'islandBlock').setScale(0.25).refreshBody()
    this.platforms.create(874, 1090, 'islandBlock').setScale(0.25).refreshBody()
    this.platforms.create(920, 1090, 'islandBlock').setScale(0.25).refreshBody()
    this.platforms.create(515, 895, 'islandBlock').setScale(0.25).refreshBody()
    this.platforms.create(575, 895, 'islandBlock').setScale(0.25).refreshBody()
    this.platforms.create(620, 895, 'islandBlock').setScale(0.25).refreshBody()
    this.platforms.create(430, 610, 'islandBlock').setScale(0.25).refreshBody()
    this.platforms.create(490, 610, 'islandBlock').setScale(0.25).refreshBody()
    this.platforms.create(520, 610, 'islandBlock').setScale(0.25).refreshBody()
    this.platforms.create(810, 515, 'islandBlock').setScale(0.25).refreshBody()
    this.platforms.create(870, 515, 'islandBlock').setScale(0.25).refreshBody()
    this.platforms.create(925, 515, 'islandBlock').setScale(0.25).refreshBody()
    this.platforms.create(525, 325, 'islandBlock').setScale(0.25).refreshBody()
    this.platforms.create(585, 325, 'islandBlock').setScale(0.25).refreshBody()
    this.platforms.create(630, 325, 'islandBlock').setScale(0.25).refreshBody()

    this.platforms.toggleVisible()

    // chest
    // doubloons
    this.chest = this.physics.add.sprite(585, 282, 'chest').setScale(0.2)
    this.chestFilled = this.physics.add.sprite(585, 282, 'chestFilled').setScale(0.2)
    this.chestFilled.visible = false
    this.doubloons = this.physics.add.group()
    for (let i = 256; i <= gameWidth - 180; i += 64) {
      this.doubloons.create(i, 400, 'doubloon').setScale(0.1).setGravity(0, 300)
    }
    for (let i = 800; i <= 950; i += 64) {
      this.doubloons.create(i, 1000, 'doubloon').setScale(0.1).setGravity(0, 300)
    }
    for (let i = 750; i <= 964; i += 64) {
      this.doubloons.create(i, 1800, 'doubloon').setScale(0.1).setGravity(0, 300)
    }
    for (let i = 300; i <= 400; i += 64) {
      this.doubloons.create(i, 1500, 'doubloon').setScale(0.1).setGravity(0, 300)
    }
    this.anims.create({
      key: 'spin',
      frames: this.anims.generateFrameNumbers('doubloon', { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1
    })
    this.doubloons.playAnimation('spin')

    // Player
    this.player = this.physics.add.sprite(gameWidth * 0.5, gameHeight - 150, 'wolfIdleRight')
      .setScale(0.4)
      .setGravity(0, 500)
    this.anims.create({
      key: 'idleRight',
      frames: this.anims.generateFrameNumbers('wolfIdleRight', { start: 0, end: 19 }),
      frameRate: 10,
      repeat: -1
    })
    this.anims.create({
      key: 'idleLeft',
      frames: this.anims.generateFrameNumbers('wolfIdleLeft', { start: 0, end: 19 }),
      frameRate: 10,
      repeat: -1
    })
    this.anims.create({
      key: 'walkRight',
      frames: this.anims.generateFrameNumbers('wolfWalkRight', { start: 0, end: 14 }),
      frameRate: 30,
      repeat: -1
    })
    this.anims.create({
      key: 'walkLeft',
      frames: this.anims.generateFrameNumbers('wolfWalkLeft', { start: 0, end: 14 }),
      frameRate: 30,
      repeat: -1
    })
    this.anims.create({
      key: 'jumpRight',
      frames: this.anims.generateFrameNumbers('wolfWalkRight', { start: 0, end: 14 }),
      frameRate: 1,
      repeat: 0
    })
    this.anims.create({
      key: 'jumpLeft',
      frames: this.anims.generateFrameNumbers('wolfWalkLeft', { start: 0, end: 14 }),
      frameRate: 1,
      repeat: 0
    })

    // Bubbles
    let bubbleVelocity = 125
    this.bubbles = this.physics.add.group()
    for (let i = 1; i <= 6; i++) {
      let rand = Phaser.Math.Between(1,2)
      setTimeout(() => {
        this.bubbles.create(Phaser.Math.Between(200, gameWidth - 200), gameHeight - 200, 'bubble')
        .setScale(0.75)
        .setBounce(1)
        .setVelocity(rand === 1 ? bubbleVelocity : -bubbleVelocity, -bubbleVelocity)
      }, i * 1500 + Phaser.Math.Between(0, 9000))
    }
    for (let i = 1; i <= 6; i++) {
      setTimeout(() => {
        this.bubbles.create(Phaser.Math.Between(200, gameWidth - 200), 200, 'bubble')
        .setScale(0.75)
        .setBounce(1)
        .setVelocity(bubbleVelocity, -bubbleVelocity)
      }, i * 1000 + Phaser.Math.Between(0, 9000))
    }


    // Debug
    // this.godEye = this.physics.add.sprite(300, 1500, 'bubble')
    // .setScale(0.1)
    // .setGravity(0, 0)

    // Physics / Collision
    this.physics.add.collider(this.player, this.platforms)
    this.physics.add.collider(this.bubbles, this.platforms)
    this.physics.add.collider(this.bubbles, this.bubbles)
    this.physics.add.collider(this.doubloons, this.platforms)
    this.physics.add.overlap(this.player, this.bubbles, (player, bubble) => {
      if(!this.state.gameOver) {
        // @ts-ignore
        player.body.setVelocity(bubble.body.velocity.x, bubble.body.velocity.y)
      }
    }, null, this)
    this.physics.add.overlap(this.player, this.doubloons, (player, doubloon) => {
      if (this.state.coinsCarrying < 7) {
        doubloon.destroy()
        this.setState({
          coinsCarrying: this.state.coinsCarrying + 1
        })
        this.coinCarryingCount.setText(`Carrying: ${this.state.coinsCarrying}/7`)
        if (this.state.coinsCarrying === 7) {
          this.coinCarryingCount.setFill('#ff0000')
        }
      }
    }, null, this)
    this.physics.add.overlap(this.player, this.chest, (player, doubloon) => {
      if (this.state.coinsCarrying >= 0) {
        this.setState({
          coinsTotal: this.state.coinsTotal - this.state.coinsCarrying,
          coinsCarrying: 0
        })
        this.coinCount.setText(`Coins Left: ${this.state.coinsTotal}`)
        this.coinCarryingCount.setText(`Carrying: ${this.state.coinsCarrying}/7`).setFill('#ffffff')
        if (this.state.coinsTotal === 0 && !this.state.gameOver) {
          this.setState({
            gameOver: true
          })
          this.chest.destroy()
          this.chestFilled.visible = true
          setTimeout(() => {
            this.cameras.main.fadeOut(2000, 0, 0, 0)
            setTimeout(() => {
              this.scene.start('HomeScene')
            }, 2000)
          }, 3000)
        }
      }
    }, null, this)

    // Game Text
    this.coinCount = this.add.text(
      gameWidth - 250, 30,
      `Coins Left: ${this.state.coinsTotal}`,
      {
        fontSize: '24px', fill: '#ffffff' 
      }
    ).setScrollFactor(0)
    this.coinCarryingCount = this.add.text(
      gameWidth - 250, 75,
      `Carrying: ${this.state.coinsCarrying}/7`,
      {
        fontSize: '24px', fill: '#ffffff' 
      }
    ).setScrollFactor(0)

    // Camera
    this.cameras.main.setBounds(0, 0, gameWidth, gameHeight)
    this.cameras.main.fadeIn(2000, 0, 0, 0)
    // this.cameras.main.startFollow(this.godEye, true, 0.05, 0.05)
    this.cameras.main.startFollow(this.player, true, 0.05, 0.05)
  }

  update(time, delta) {

    if (this.cursors.left.isDown && !this.state.gameOver) {
        this.player.setVelocityX(-200)
        if (this.player.body.touching.down) {
          this.player.anims.play('walkLeft', true)
        } else {
          this.player.anims.play('jumpLeft', true)
        }
        this.setState({ playerDirection: 'left' })
    }
    else if (this.cursors.right.isDown && !this.state.gameOver) {
        this.player.setVelocityX(200);
        if (this.player.body.touching.down) {
          this.player.anims.play('walkRight', true)
        } else {
          this.player.anims.play('jumpRight', true)
        }
        this.setState({ playerDirection: 'right' })
    }
    else {
        this.player.setVelocityX(0);
        this.state.playerDirection === 'right' ?
        this.player.anims.play('idleRight', true) :
        this.player.anims.play('idleLeft', true)
    }

    if (this.cursors.up.isDown && this.player.body.touching.down && !this.state.gameOver) {
      this.player.setVelocityY(-400)
    }

    // if (this.cursors.space.isDown) {
    //   this.godEye.y -= 10
    // }
    // if (this.cursors.down.isDown) {
    //   this.godEye.y += 10
    // }
  }
}