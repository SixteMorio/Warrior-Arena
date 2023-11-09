class Bullet extends Phaser.GameObjects.Sprite {
  player;

  constructor(config, x, y, speed, damage, sprite) {
    super(config.scene);

    // config.scene.physics.world.enable(this);
    config.scene.add.existing(this);

    this.x = x;
    this.y = y;

    this.speed = speed;
    this.damage = damage;
    this.sprite = sprite;
  }
}
