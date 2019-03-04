import colors from "colors.css";
import { score } from "./playScene.js";

var textStyle = {
  align: "center",
  fill: colors.red,
  fontFamily: "sans-serif",
  fontSize: 48
};

export default {
  key: "end",

  create: function() {
    this.add.image(400, 150, "zehut").setScale(1);
    this.add
      .text(400, 300, `You gained ${score} mandates for legalization`, {
        ...textStyle,
        fontSize: 32
      })
      .setOrigin(0.5, 1);
    if (score >= 120) {
      this.add.text(400, 300, "We won!\n\n🍀", textStyle).setOrigin(0.5, 0);
    } else {
      this.add
        .text(400, 300, "Try again?\n\n(menu)", textStyle)
        .setOrigin(0.5, 0);
      this.input.on(
        "pointerdown",
        function() {
          this.scene.switch("menu");
        },
        this
      );
    }
    this.cameras.main.flash(500, 255, 0, 0);
  }
};
