import bootScene from "./bootScene";
import playScene from "./playScene";
import menuScene from "./menuScene";
import endScene from "./endScene";

export default {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  pixelArt: true,
  title: "Legalize it!",
  url: "https://codesandbox.io/s/2x618jppmr",
  banner: {
    text: "white",
    background: ["#FD7400", "#FFE11A", "#BEDB39", "#1F8A70", "#004358"]
  },
  scene: [bootScene, menuScene, playScene, endScene]
};
