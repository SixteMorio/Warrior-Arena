class Platform {
  constructor(x, y, name, img) {
    this.x = x;
    this.y = y;

    this.name = name;
    this.img = img;
  }
}

class Scene extends Phaser.Scene {
  inputs;
  player;
  bullet;
  lastArrowTime = 0;

  //-------------------------------------------------------------------------
  preload() {
    //backGround
    this.load.image("scene", "assets/scene.jpg");

    //platform
    this.load.image("platformOne", "assets/platforms.png");
    this.load.image("platformTwo", "assets/platforms.png");
    this.load.image("platformThree", "assets/big-platform.png");

    //----------------------------------

    //player-1
    this.load.spritesheet("playerOne", "assets/skin/ronin-idle.png", {
      frameWidth: 128,
      frameHeight: 128,
    });

    //player-1 animations
    this.load.image("ronin-jump", "assets/skin/ronin-jump.png");
    this.load.image("ronin-death", "assets/skin/ronin-death.png");
    this.load.image("ronin-run", "assets/skin/ronin-run.png");
    this.load.image("ronin-attck", "assets/skin/ronin-attack.png");
    this.load.image("ronin-idle", "assets/skin/ronin-idle.png");
    this.load.image("ronin-shield", "assets/skin/ronin-shield.png");

    //----------------------------------

    //player-2
    this.load.spritesheet("playerTwo", "assets/skin/samourai-idle.png", {
      frameWidth: 128,
      frameHeight: 128,
    });

    //player-2 animations
    this.load.image("samourai-jump", "assets/skin/samourai-jump.png");
    this.load.image("samourai-death", "assets/skin/samourai-death.png");
    this.load.image("samourai-run", "assets/skin/samourai-run.png");
    this.load.image("samourai-attack", "assets/skin/samourai-attack.png");
    this.load.image("samourai-idle", "assets/skin/samourai-idle.png");
    this.load.image("samourai-shot", "assets/skin/samourai-shot.png");
    this.load.image("arrow", "assets/skin/arrow.png");

    //----------------------------------

    //life

    this.load.image("heart", "assets/heart.png");
  }

  //-------------------------------------------------------------------------

  create() {
    this.inputs = this.input.keyboard.createCursorKeys();
    this.add.image(640, 360, "scene");

    //platform-1

    let platformInstOne = new Platform(200, 300, "Poil", "");
    platformInstOne.img = this.physics.add.staticImage(
      platformInstOne.x,
      platformInstOne.y,
      "platformOne"
    );
    // console.log(platformInstOne);

    //platform-2

    let platformInstTwo = new Platform(1050, 300, "Poule", "");
    platformInstTwo.img = this.physics.add.staticImage(
      platformInstTwo.x,
      platformInstTwo.y,
      "platformTwo"
    );
    // console.log(platformInstTwo);

    //platform-3

    let platformInstThree = new Platform(650, 550, "Oui", "");
    platformInstThree.img = this.physics.add.staticImage(
      platformInstThree.x,
      platformInstThree.y,
      "platformThree"
    );
    // console.log(platformInstThree);

    //-------------------------------------------------

    //player-1

    this.playerOneInst = new Player(
      { scene: this },
      200,
      200,
      3,
      "Ronin",
      100,
      100,
      5,
      80
    );

    this.playerOneInst.img = this.physics.add.image(
      platformInstOne.x,
      this.playerOneInst.y,
      "playerOne"
    );

    // this.playerOneInst.img.setCollideWorldBounds(true);
    this.playerOneInst.img.setScale(1.3);

    //life
    let xLife1 = 1075;
    let yLife1 = 660;

    this.lifeOne = this.physics.add.staticImage(xLife1, yLife1, "heart");
    this.lifeTwo = this.physics.add.staticImage(xLife1 + 50, yLife1, "heart");
    this.lifeThree = this.physics.add.staticImage(
      xLife1 + 100,
      yLife1,
      "heart"
    );

    //collides player-1
    this.physics.add.collider(platformInstOne.img, this.playerOneInst.img);
    this.physics.add.collider(platformInstTwo.img, this.playerOneInst.img);
    this.physics.add.collider(platformInstThree.img, this.playerOneInst.img);

    //-------------------------------------------------

    //player-2

    this.playerTwoInst = new Player(
      { scene: this },
      1050,
      200,
      3,
      "Samouraï",
      100,
      100,
      15,
      80
    );

    this.playerTwoInst.img = this.physics.add.image(
      platformInstTwo.x,
      this.playerTwoInst.y,
      "playerTwo"
    );

    this.playerTwoInst.img.setScale(1.3);

    //life
    let xLife2 = 35;
    let yLife2 = 660;

    this.lifeFour = this.physics.add.staticImage(xLife2, yLife2, "heart");
    this.lifeFive = this.physics.add.staticImage(xLife2 + 50, yLife2, "heart");
    this.lifeSix = this.physics.add.staticImage(xLife2 + 100, yLife2, "heart");

    //collides player-2

    this.physics.add.collider(platformInstOne.img, this.playerTwoInst.img);
    this.physics.add.collider(platformInstTwo.img, this.playerTwoInst.img);
    this.physics.add.collider(platformInstThree.img, this.playerTwoInst.img);

    //  Input Events
    this.cursors = this.input.keyboard.createCursorKeys();

    // console.log(this.playerOneInst);

    //collides player-1 & player-2
    // this.physics.add.collider(
    //   this.playerOneInst.img,
    //   this.playerTwoInst.img,
    //   this.playerCollision,
    //   null,
    //   this
    // );

    this.hpTextPlayer1 = this.add.text(
      20,
      600,
      `Player 1 HP: ${this.playerOneInst.hitPoints}`,
      {
        fontSize: "20px",
        fill: "#fff",
      }
    );
    this.hpTextPlayer2 = this.add.text(
      1000,
      600,
      `Player 2 HP: ${this.playerTwoInst.hitPoints}`,
      {
        fontSize: "20px",
        fill: "#fff",
      }
    );
    const SPACEBAR = Phaser.Input.Keyboard.KeyCodes.SPACEBAR;
  }

  //-------------------------------------------------------------------------

  update() {
    this.player?.update();

    //Controls player-1

    if (this.cursors.right.isDown) {
      this.playerOneInst.moveRight();
    }

    if (this.cursors.left.isDown) {
      this.playerOneInst.moveLeft();
    }

    if (this.cursors.up.isDown) {
      this.playerOneInst.moveUp();
    }

    if (this.cursors.down.isDown) {
      this.playerOneInst.performAttack(this.playerTwoInst);
      // console.log(this.playerOneInst.hitPoints);
      // console.log(this.playerTwoInst.hitPoints);
    }

    //Controls player-2
    if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q).isDown) {
      this.playerTwoInst.moveLeft();
    }

    if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D).isDown) {
      this.playerTwoInst.moveRight();
    }

    if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z).isDown) {
      this.playerTwoInst.moveUp();
      // console.log(this.playerTwoInst.img.y);
    }
    if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S).isDown) {
      this.playerTwoInst.performAttack(this.playerOneInst);
      // console.log(this.playerOneInst.hitPoints);
      // console.log(this.playerTwoInst.hitPoints);
    }

    const currentTime = this.time.now;

    if (
      this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S).isDown &&
      currentTime > this.lastArrowTime + 2000
    ) {
      // Create a new arrow (bullet) for playerTwo
      this.spriteBullet = this.add.sprite(
        this.playerTwoInst.x + 10,
        this.playerTwoInst.img.y,
        "arrow"
      );
      this.bullet = new Bullet(
        { scene: this },
        this.playerTwoInst.x + 10,
        this.playerTwoInst.img.y,
        6,
        15,
        this.spriteBullet
      );

      // Update the last arrow creation time
      this.lastArrowTime = currentTime;
    }

    // this.playerOneInst.img = this.physics.add.image(this.playerOneInst.x, this.playerOneInst.y, "playerOne")
    if (this.bullet) {
      this.bullet.update();
    }
  }
}

// ----------------------- PHP -------------------------
