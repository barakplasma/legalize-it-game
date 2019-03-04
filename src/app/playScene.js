import Phaser from "phaser";
import colors from "colors.css";

var bombs;
var cursors;
var gameOver;
var platforms;
var player;
export var score;
var scoreText;
var leaves;

export default {
  key: "play",

  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },

  init: function() {
    gameOver = false;
    score = 0;
  },

  create: function() {
    //  A simple background for our game
    this.add.image(400, 300, "sky");

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = this.physics.add.staticGroup();

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    platforms
      .create(400, 568, "ground")
      .setScale(2)
      .refreshBody();

    //  Now let's create some ledges
    platforms.create(600, 400, "ground");
    platforms.create(50, 250, "ground");
    platforms.create(750, 220, "ground");

    // The player and its settings
    player = this.physics.add.sprite(100, 450, "dude").setSize(16, 48);

    //  Player physics properties. Give the little guy a slight bounce.
    player.setBounce(0.25);
    player.setCollideWorldBounds(true);

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();

    this.input.keyboard.on(
      "keydown_R",
      function() {
        this.scene.restart();
      },
      this
    );

    leaves = this.physics.add.group({
      key: "leaf",
      repeat: 7,
      setXY: { x: 150, y: 0, stepX: Phaser.Math.FloatBetween(60, 100) }
    });

    leaves.children.iterate(function(child) {
      //  Give each leaf a slightly different bounce
      child.setBounceY(Phaser.Math.FloatBetween(0.25, 0.75));
    });

    bombs = this.physics.add.group();

    //  The score
    scoreText = this.add.text(10, 540, "Mandates: 0", {
      fontSize: 32,
      fontFamily: "sans-serif",
      fill: colors.yellow
    });

    //  Collide the player and the leaves with the platforms
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(leaves, platforms);
    this.physics.add.collider(bombs, platforms);

    //  Checks to see if the player overlaps with any of the leaves, if he does call the collectLeaf function
    this.physics.add.overlap(player, leaves, this.collectLeaf, null, this);

    this.physics.add.collider(player, bombs, this.hitBomb, null, this);
  },

  update: function() {
    if (gameOver) {
      this.scene.stop().run("end");

      return;
    }

    var blocked = player.body.blocked;

    if (cursors.left.isDown && !blocked.left) {
      player.setVelocityX(-160);
      player.play("left", true);
    } else if (cursors.right.isDown && !blocked.right) {
      player.setVelocityX(160);
      player.play("right", true);
    } else {
      player.setVelocityX(0);
      player.play("turn");
    }

    if (cursors.up.isDown && blocked.down && !blocked.up) {
      player.setVelocityY(-330);
    }
  },

  extend: {
    collectLeaf: function(player, leaf) {
      leaf.disableBody(true, true);

      //  Add and update the score
      score += 1;
      scoreText.setText("Mandates: " + score);

      if (leaves.countActive(true) === 0) {
        this.nextRound();
      }
    },

    hitBomb: function(player, bomb) {
      this.physics.pause();
      bomb.setTintFill(0xff0000);
      player.setTintFill(0xff0000);
      player.anims.play("turn");
      gameOver = true;
    },

    nextRound: function() {
      //  A new batch of leaves to collect
      leaves.children.iterate(function(child) {
        child.enableBody(true, child.x, 0, true, true);
      });

      var x =
        player.x < 400
          ? Phaser.Math.Between(400, 800)
          : Phaser.Math.Between(0, 400);

      var bomb = bombs.create(x, 16, "bomb");
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
      bomb.setAngularVelocity(360);
      bomb.allowGravity = false;
    }
  }
};
