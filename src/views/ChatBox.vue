<template>
  <div
    class="h-screen grid subpixel-antialiased overscroll-y-contain"
    :style="{ padding: paddingTop + 'px 0px 0px 0px' }"
    @mousedown="this.mouseDownFunction"
    @mousemove="this.mouseMoveFunction"
    @mouseup="this.mouseDown = false"
    @mouseleave="this.mouseDown = false"
    @touchstart="this.mouseDownFunction"
    @touchmove="this.mouseMoveFunction"
    @touchend="this.mouseDown = false"
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
          class="
            cube__face
            noselect
            border-2 border-white
            transform
            duration-500
          "
          :style="{
            width: boxWidth + 'px',
            height: boxWidth + 'px',
            'line-height': this.boxWidth + 'px',
            transform: cubeFaceStyles[index],
          }"
        ></div>
        <div
          v-for="(item, index) in cubeTexts"
          :key="index"
          class="
            cube__face
            noselect
            border-white
            transform
            duration-500
            break-all
            font-sans
          "
          :class="smallCubeFaceActive[index] ? 'allowScroll' : 'noScroll'"
          :style="{
            width: boxWidth + 'px',
            height: boxWidth + 'px',
            transform: smallCubeFaceStyles[index],
            'line-height':
              (this.smallCubeFaceActive[index]
                ? this.boxWidth / 12
                : this.boxWidth) + 'px',
            'font-size':
              (this.smallCubeFaceActive[index]
                ? this.boxWidth / 12
                : this.boxWidth * 0.8) + 'px',
            'border-width': (this.smallCubeFaceActive[index] ? 2 : 8) + 'px',
            'font-weight': this.smallCubeFaceActive[index] ? '200' : 'bold',
          }"
          @click="this.scaleSmallFace(index)"
        >
          {{ smallCubeTexts[index] }}
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
      cubeTexts: ["", "", "", "", "", "", ""],
      smallCubeTexts: ["0", "1", "2", "3", "4", "5"],
      smallCubeScale: [0.25, 0.25, 0.25, 0.25, 0.25, 0.25],
      smallCubeFaceActive: [false, false, false, false, false, false],
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
      this.xScreen = e.screenX || e.touches[0].screenX;
      this.yScreen = e.screenY || e.touches[0].screenY;
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
        var newX = e.screenX || e.touches[0].screenX;
        var newY = e.screenY || e.touches[0].screenY;
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
    scaleSmallFace(index) {
      if (this.smallCubeScale[index] == 0.25) {
        this.smallCubeScale[index] = 0;
        setTimeout(() => {
          this.smallCubeFaceActive[index] = true;
          this.smallCubeScale[index] = 0.9;
          this.smallCubeTexts[index] =
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
          setTimeout(() => {
            this.smallCubeScale[index] = 0;
            setTimeout(() => {
              this.smallCubeFaceActive[index] = false;
              this.smallCubeTexts[index] = index;
              this.smallCubeScale[index] = 0.25;
            }, 800);
          }, 10000);
        }, 800);
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
    smallCubeFaceStyles() {
      return [
        "rotateY(0deg) translateZ(" +
          (this.boxWidth / 2 + 0.5) +
          "px) scale(" +
          this.smallCubeScale[0] +
          ")",
        "rotateY(90deg) translateZ(" +
          (this.boxWidth / 2 + 0.5) +
          "px) scale(" +
          this.smallCubeScale[1] +
          ")",
        "rotateY(180deg) translateZ(" +
          (this.boxWidth / 2 + 0.5) +
          "px) scale(" +
          this.smallCubeScale[2] +
          ")",
        "rotateY(-90deg) translateZ(" +
          (this.boxWidth / 2 + 0.5) +
          "px) scale(" +
          this.smallCubeScale[3] +
          ")",
        "rotateX(90deg) translateZ(" +
          (this.boxWidth / 2 + 0.5) +
          "px) scale(" +
          this.smallCubeScale[4] +
          ")",
        "rotateX(-90deg) translateZ(" +
          (this.boxWidth / 2 + 0.5) +
          "px) scale(" +
          this.smallCubeScale[5] +
          ")",
      ];
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
      200,
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
  color: white;
  text-align: center;
  background: rgba(0, 0, 0, 1);
}

label {
  margin-right: 10px;
  color: white;
}

.allowScroll {
  overflow-y: auto;
  padding: 10px;
}
.noScroll {
  overflow: hidden;
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

html,
body {
  overscroll-behavior-y: contain;
  position: fixed;
}
</style>