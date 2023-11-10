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
  update() {
    // Move the arrow
    this.x += this.speed;
    console.log(this.speed);

    // Check if the arrow is out of the screen
    if (this.x > this.scene.game.config.width) {
      // Destroy the arrow if it's outside the screen
      this.destroy();
    }

    // You may want to add collision logic here
    // For example, check if the arrow collides with something and handle it

    // For simplicity, let's assume it collides with the player and reduce their hitPoints
    this.scene.physics.overlap(
      this,
      this.scene.playerOneInst.img,
      this.handleCollision,
      null,
      this
    );
  }

  handleCollision(bullet, player) {
    // Reduce player hitPoints
    this.scene.playerOneInst.hitPoints -= this.damage;

    // Destroy the arrow
    this.destroy();
  }
}

// function getNames() {
//   return new Promise((resolve, reject) => {
//     fetch("PHP/main.php")
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         globalData = data;
//         resolve(data);
//         console.log(hp, life);
//       })
//       .catch((error) => {
//         console.log("There has been a problem:", error);
//         reject(error);
//       });
//   });
// }

// getNames();
