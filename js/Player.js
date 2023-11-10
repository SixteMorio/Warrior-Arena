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
    this.img.setScale(1, 1.3);
    this.img.x = this.x;
    // console.log(this.x);
  }

  moveLeft() {
    this.x -= 5;
    this.img.setScale(-1, 1.3);
    this.img.x = this.x;
    // console.log(this.x);
  }

  moveUp() {
    if (!this.isJumping) {
      this.isJumping = true;
      this.img.setVelocityY(-330);
    }
    if (this.img.body.velocity.y == 0) {
      this.isJumping = false;
    }
  }
  //-----------------------------------------------------------------

  performAttack(targetPlayer) {
    const distance = Phaser.Math.Distance.BetweenPoints(this, targetPlayer);

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

let damageScrum;

function getScrumAttacks() {
  return new Promise((resolve, reject) => {
    fetch("PHP/get-scrum-attacks.php")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        globalData = data;
        damageScrum = data[0].damage;

        resolve(data);
        console.log(damageScrum);
      })
      .catch((error) => {
        console.log("There has been a problem:", error);
        reject(error);
      });
  });
}

getScrumAttacks();
