<template>
  <div
    class="h-screen grid subpixel-antialiased"
    :style="{ padding: paddingTop + 'px 0px 0px 0px' }"
    @mousedown="this.mouseDownFunction"
    @mousemove="this.mouseMoveFunction"
    @mouseup="this.mouseDown = false"
    @mouseleave="this.mouseDown = false"
  >
    <div
      class="relative mx-auto"
      :style="{ height: boxWidth + 'px', perspective: boxWidth * 2 + 'px' }"
    >
      <div
        class="cube relative mx-auto"
        :style="{
          width: boxWidth + 'px',
          height: boxWidth + 'px',
          'font-size': this.boxWidth / 12 + 'px',
          transform: cubeStyle,
        }"
      >
        <div
          v-for="(item, index) in cubeTexts"
          :key="index"
          class="cube__face noselect"
          :style="{
            width: boxWidth + 'px',
            height: boxWidth + 'px',
            'line-height': this.boxWidth + 'px',
            transform: cubeFaceStyles[index],
          }"
        >
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChatBox",
  data() {
    return {
      boxWidth: 700,
      smallBoxWidth: 350,
      paddingTop: 200,
      mouseDown: false,
      yaw: 0,
      pitch: 0,
      roll: 0,
      xScreen: 0,
      yScreen: 0,
      rotationMatrix: [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
      ],
      front: null,
      back: null,
      right: null,
      left: null,
      top: null,
      bottom: null,
      cubeTexts: ["1", "2", "3", "4", "5", "6"],
    };
  },
  methods: {
    windowResize() {
      this.boxWidth = Math.max(
        200,
        Math.floor(Math.min(window.innerWidth, window.innerHeight) / 3)
      );
      this.paddingTop = Math.floor(window.innerHeight / 3);
    },
    mouseDownFunction(e) {
      this.xScreen = e.screenX;
      this.yScreen = e.screenY;
      this.mouseDown = true;
    },
    computeRotationMatrix(yaw, pitch) {
      // console.log(yaw, pitch);
      const sinY = Math.sin(yaw);
      const cosY = Math.cos(yaw);
      const sinP = Math.sin(pitch);
      const cosP = Math.cos(pitch);
      const e = [
        [cosP * cosY, -sinP, cosP * sinY],
        [sinP * cosY, cosP, sinP * sinY],
        [-sinY, 0, cosY],
      ];
      var newRot = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ];
      for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
          for (var k = 0; k < 3; k++) {
            newRot[i][j] += e[i][k] * this.rotationMatrix[k][j];
          }
        }
      }
      this.rotationMatrix = newRot;
      this.yaw = Math.atan2(newRot[1][0], newRot[0][0]);
      this.pitch = Math.atan2(
        -newRot[2][0],
        Math.sqrt(Math.pow(newRot[2][1], 2) + Math.pow(newRot[2][2], 2))
      );
      this.roll = Math.atan2(newRot[2][1], newRot[2][2]);
    },
    mouseMoveFunction(e) {
      if (this.mouseDown) {
        var newX = e.screenX;
        var newY = e.screenY;
        var diffX = newX - this.xScreen;
        var diffY = newY - this.yScreen;
        this.computeRotationMatrix(
          diffX / this.boxWidth,
          diffY / this.boxWidth
        );
        this.xScreen = newX;
        this.yScreen = newY;
      }
    },
  },
  computed: {
    translateNegativeZStyle() {
      return "transform: translateZ(-" + this.boxWidth / 2 + "px)";
    },
    cubeFaceStyles() {
      return [
        "rotateY(0deg) translateZ(" + this.boxWidth / 2 + "px)",
        "rotateY(90deg) translateZ(" + this.boxWidth / 2 + "px)",
        "rotateY(180deg) translateZ(" + this.boxWidth / 2 + "px)",
        "rotateY(-90deg) translateZ(" + this.boxWidth / 2 + "px)",
        "rotateX(90deg) translateZ(" + this.boxWidth / 2 + "px)",
        "rotateX(-90deg) translateZ(" + this.boxWidth / 2 + "px)",
      ];
    },
    frontStyle() {
      return "rotateY(0deg) translateZ(" + this.boxWidth / 2 + "px)";
    },
    rightStyle() {
      return "rotateY(90deg) translateZ(" + this.boxWidth / 2 + "px)";
    },
    backStyle() {
      return "rotateY(180deg) translateZ(" + this.boxWidth / 2 + "px)";
    },
    leftStyle() {
      return "rotateY(-90deg) translateZ(" + this.boxWidth / 2 + "px)";
    },
    topStyle() {
      return "rotateX(90deg) translateZ(" + this.boxWidth / 2 + "px)";
    },
    bottomStyle() {
      return "rotateX(-90deg) translateZ(" + this.boxWidth / 2 + "px)";
    },
    cubeStyle() {
      return (
        "rotateX(" +
        -this.yaw +
        "rad) rotateY(" +
        this.pitch +
        "rad) rotateZ(" +
        this.roll +
        "rad)"
      );
    },
  },
  mounted() {},
  created() {
    this.boxWidth = Math.max(
      300,
      Math.floor(Math.min(window.innerWidth, window.innerHeight) / 3)
    );
    this.smallBoxWidth = this.boxWidth / 4;
    this.paddingTop = Math.floor(window.innerHeight / 3);
    window.addEventListener("resize", this.windowResize);
  },
  destroyed() {
    window.removeEventListener("resize", this.windowResize);
  },
  beforeRouteEnter() {},
  beforeRouteLeave() {},
};
</script>

<style scoped>
.cube {
  transform-style: preserve-3d;
  /* transition: transform 1s; */
}

.cube__face {
  position: absolute;
  border: 1px solid white;
  font-weight: bold;
  color: white;
  text-align: center;
  background: rgba(0, 0, 0, 1);
}

label {
  margin-right: 10px;
  color: white;
}
.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}
</style>