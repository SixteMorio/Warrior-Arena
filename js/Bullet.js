class Bullet extends Phaser.GameObjects.Sprite {
  player;

  constructor(config, x, y, speed, damage, sprite) {
    super(config.scene);
    config.scene.physics.add.existing(this);

    // config.scene.physics.world.enable(this);
    // config.scene.add.existing(this);

    this.x = x;
    this.y = y;

    this.speed = speed;
    this.damage = damage;
    this.sprite = sprite;
  }
  update() {
    console.log("Bullet update");

    this.x += this.speed;

    if (this.x > this.scene.game.config.width) {
      this.destroy();
    }

    this.scene.physics.overlap(
      this,
      this.scene.playerOneInst.img,
      this.handleCollision,
      null,
      this
    );
  }

  handleCollision(bullet, player) {
    // Réduisez les points de vie du joueur
    this.scene.playerOneInst.takeDamage(this.damage);

    // Détruisez la flèche
    this.destroy();
  }
}

//------------------------ PHP ------------------------------

let damage;
let speedBullet;

function getRangeAttack() {
  return new Promise((resolve, reject) => {
    fetch("PHP/get-range-attack.php")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        globalData = data;
        damage = data[0].damage;
        speedBullet = data[0].speed;
        resolve(data);
        console.log(damage, speedBullet);
      })
      .catch((error) => {
        console.log("There has been a problem:", error);
        reject(error);
      });
  });
}

getRangeAttack();
