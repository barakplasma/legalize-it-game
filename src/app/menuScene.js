import colors from "colors.css";

export default {
  key: "menu",

  create: function() {
    this.add.image(400, 150, "leaf").setScale(5);
    this.add
      .text(400, 300, "Legalize it!\n\n(click to play)", {
        align: "center",
        fill: colors.lime,
        fontFamily: "sans-serif",
        fontSize: 48
      })
      .setOrigin(0.5, 0);
    this.input.on(
      "pointerdown",
      function() {
        this.scene.switch("play");
      },
      this
    );
  }
};
