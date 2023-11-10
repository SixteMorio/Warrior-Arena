class Player extends Phaser.Physics.Arcade.Sprite {
  isJumping = false;

  constructor(config, x, y, life, name, img, hitPoints, attack, rangeAttack) {
    super(config.scene);

    // config.scene.physics.world.enable(this);
    config.scene.add.existing(this);

    this.x = x;
    this.y = y;

    this.life = life;
    this.hitPoints = hitPoints;

    this.name = name;
    this.img = img;

    this.attack = attack;
    this.rangeAttack = rangeAttack;
    // console.log(config.scene);
  }

  moveRight() {
    this.x += 5;
    this.setScale(1, 1);
    this.img.x = this.x;
    // console.log(this.x);
  }

  moveLeft() {
    this.x -= 5;
    this.setScale(-1, 1);
    this.img.x = this.x;
    // console.log(this.x);
  }

  // moveUp() {
  //   if (!this.isJumping) {
  //     this.isJumping = false;
  //     this.y = 100;
  //     this.img.y = this.y;
  //     // console.log(this.y);
  //   }
  // }

  moveUp() {
    if (!this.isJumping) {
      this.isJumping = true;
      this.img.setVelocityY(-330);
    }
    // console.log(this.img.body.velocity);
    // console.log(this.img.body.velocity.y == 0);
    // this.isJumping = true;
    if (this.img.body.velocity.y == 0) {
      // console.log("Tetrapute");
      this.isJumping = false;
    }
  }
  //-----------------------------------------------------------------

  performAttack(targetPlayer) {
    // Vérifie la distance entre le joueur attaquant et le joueur cible
    const distance = Phaser.Math.Distance.BetweenPoints(this, targetPlayer);

    // N'inflige des dégâts que si les joueurs sont à portée d'attaque
    if (distance <= this.rangeAttack) {
      targetPlayer.takeDamage(this.attack);
    }
  }

  takeDamage(damage) {
    this.hitPoints -= damage;
    if (this.hitPoints <= 0) {
      this.life -= 1;
      this.hitPoints = 100;
      // console.log(this.life);
      if (this.life <= 0) {
        // console.log("Game Over");
      }
    }

    // Update heart visibility based on remaining lives
    if (this.name === "Ronin") {
      switch (this.life) {
        case 2:
          this.scene.lifeSix.setVisible(false);
          break;
        case 1:
          this.scene.lifeFive.setVisible(false);
          break;
        case 0:
          this.scene.lifeFour.setVisible(false);
          break;
      }
    } else if (this.name === "Samouraï") {
      switch (this.life) {
        case 2:
          // console.log(this.scene.playerOneInst.life);
          this.scene.lifeThree.setVisible(false);
          break;
        case 1:
          this.scene.lifeTwo.setVisible(false);
          break;
        case 0:
          this.scene.lifeOne.setVisible(false);
          break;
      }
    }

    // Update hit points text
    if (this.name === "Ronin") {
      this.scene.hpTextPlayer1.setText(`Player 1 HP: ${this.hitPoints}`);
    } else if (this.name === "Samouraï") {
      this.scene.hpTextPlayer2.setText(`Player 2 HP: ${this.hitPoints}`);
    }

    // Mettez à jour le texte des points de vie à l'écran
    if (this.name === "Ronin") {
      this.scene.hpTextPlayer1.setText(`Player 1 HP: ${this.hitPoints}`);
    } else if (this.name === "Samouraï") {
      this.scene.hpTextPlayer2.setText(`Player 2 HP: ${this.hitPoints}`);
    }
  }

  create() {}

  update() {}
}

let hp;
let life;
let speed;
let name;
let img1;
let img2;

function getNames() {
  return new Promise((resolve, reject) => {
    fetch("PHP/main.php")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        globalData = data;
        hp = data[0].hp;
        life = data[0].life;
        speed = data[0].speed;
        name = data[0].name;
        img = data[0].img;
        img2 = data[1].img;
        resolve(data);
        console.log(hp, life);
      })
      .catch((error) => {
        console.log("There has been a problem:", error);
        reject(error);
      });
  });
}

getNames();
