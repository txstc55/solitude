<template>
  <div
    class="h-screen grid subpixel-antialiased overscroll-y-none"
    :style="{ padding: paddingTop + 'px 0px 0px 0px' }"
    @mousedown="this.mouseDownFunction"
    @mousemove="this.mouseMoveFunction"
    @mouseup="this.mouseDown = false"
    @mouseleave="this.mouseDown = false"
    @touchstart="this.mouseDownFunction"
    @touchmove="this.mouseMoveFunction"
    @touchend="this.mouseDown = false"
  >
    <textarea
      class="
        mx-auto
        form-control
        block
        w-96
        px-3
        py-1.5
        text-base
        font-normal font-mono
        text-white
        bg-black/50 bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        focus:text-white
        focus:bg-gray-900/50
        focus:border-blue-600
        focus:outline-none
        max-h-32
        h-32
        absolute
        bottom-32
        left-1/2
        -translate-x-1/2
        z-40
        resize-none
      "
      placeholder="Your message"
      v-model="message"
      :maxlength="characterLimit"
    ></textarea>
    <p
      class="
        font-mono
        absolute
        text-right
        bottom-32
        mx-auto
        w-94
        left-1/2
        text-sm
        -translate-x-1/2
        text-slate-400/80
      "
    >
      {{ message.length + "/" + characterLimit }}
    </p>
    <button
      class="
        absolute
        bottom-24
        left-1/2
        w-96
        border border-white
        mx-auto
        -translate-x-1/2
        rounded-md
        py-1
        active:bg-gray-100
        disabled:border-gray-500
        text-white text-xl
        font-mono
        active:text-black
        disabled:text-gray-500
        translate-y-1/2
      "
      @click="this.sendMessage()"
      :disabled="!canSendMessage"
    >
      SEND
    </button>
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
            cube__face__small
            noselect
            border-white
            transform
            duration-500
            break-words
            font-mono
          "
          :id="'cube_' + index"
          :class="smallCubeFaceActive[index] ? 'allowScroll' : 'noScroll'"
          :style="{
            width: boxWidth + 'px',
            height: boxWidth + 'px',
            transform: smallCubeFaceStyles[index],
            'line-height':
              (this.smallCubeFaceActive[index]
                ? this.boxWidth / 9
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
var axios = require("axios");
export default {
  name: "ChatBox",
  data() {
    return {
      messageGapTimeInSeconds: 120,
      canSendMessage: true,
      characterLimit: 500,
      message: "",
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
      cubeTexts: ["", "", "", "", "", ""],
      smallCubeTexts: ["0", "1", "2", "3", "4", "5"],
      smallCubeReceivedTexts: ["", "", "", "", "", ""],
      smallCubeScale: [0.25, 0.25, 0.25, 0.25, 0.25, 0.25],
      smallCubeFaceActive: [false, false, false, false, false, false],
      smallFaces: [null, null, null, null, null, null],
    };
  },
  methods: {
    setCookie(name, value, days) {
      var expires = "";
      if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + (value || "") + expires + "; path=/";
    },
    getCookie(name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
      }
      return 0;
    },
    eraseCookie(name) {
      document.cookie =
        name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    },
    async getText(index) {
      var data = JSON.stringify({
        index: 1,
      });

      var config = {
        method: "get",
        url: "https://loneliness.one/api/post?index=" + index,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      var result = await axios(config);
      if (result.status == 200) {
        return result.data.text;
      } else {
        return "Please make sure your interenet is connected";
      }
    },
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
    scrollAnimate(index, direction) {
      if (this.smallCubeFaceActive[index]) {
        var lastScrollTop = this.smallFaces[index].scrollTop;
        if (lastScrollTop <= 0 && direction == -1) {
          setTimeout(() => {
            window.requestAnimationFrame(() => {
              this.scrollAnimate(index, 1);
            });
          }, 2000);
        } else {
          this.smallFaces[index].scrollTop += direction;
          if (lastScrollTop == this.smallFaces[index].scrollTop) {
            setTimeout(() => {
              window.requestAnimationFrame(() => {
                this.scrollAnimate(index, -1);
              });
            }, 2000);
          } else {
            window.requestAnimationFrame(() => {
              this.scrollAnimate(index, direction);
            });
          }
        }
      }
    },
    async scaleSmallFace(index) {
      if (
        this.smallCubeScale[index] == 0.25 &&
        !this.smallCubeFaceActive[index]
      ) {
        // the small face is at its original position, we can scale it
        // first scale it down
        this.smallCubeScale[index] = 0;
        setTimeout(async () => {
          // we need to receive the text from server
          this.smallCubeReceivedTexts[index] = await this.getText(index);
          this.smallCubeFaceActive[index] = true;
          // now set the scale to 0.9, and let the animation do the work
          this.smallCubeScale[index] = 0.85;
          // at the same time, set the text to the correct one
          this.smallCubeTexts[index] = this.smallCubeReceivedTexts[index];
          setTimeout(() => {
            window.requestAnimationFrame(() => {
              this.scrollAnimate(index, 1);
            });
          }, 2000);
          setTimeout(() => {
            this.smallCubeScale[index] = 0;
            setTimeout(() => {
              this.smallCubeFaceActive[index] = false;
              this.smallCubeTexts[index] = index;
              this.smallCubeScale[index] = 0.25;
            }, 800);
          }, 30000);
        }, 800);
      }
    },
    sendMessage() {
      var data = JSON.stringify({
        text: this.message,
      });

      var config = {
        method: "post",
        url: "https://loneliness.one/api/post",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      // disable send message button
      this.canSendMessage = false;
      let self = this;
      axios(config)
        .then(function (response) {
          self.setCookie("lastSentMessageTime", new Date().getTime(), 1);
          alert(
            response.data.message +
              "\nYou will need to wait " +
              self.messageGapTimeInSeconds +
              " seconds to send another message"
          );
          // reenable send message button after n seconds
          setTimeout(() => {
            self.canSendMessage = true;
          }, self.messageGapTimeInSeconds * 1000);
        })
        .catch(function (error) {
          alert("Something went wrong, please try again later.");
          self.canSendMessage = true;
          console.log(error);
        });
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
          (this.boxWidth / 2 + this.boxWidth / 40) +
          "px) scale(" +
          this.smallCubeScale[0] +
          ")",
        "rotateY(90deg) translateZ(" +
          (this.boxWidth / 2 + this.boxWidth / 40) +
          "px) scale(" +
          this.smallCubeScale[1] +
          ")",
        "rotateY(180deg) translateZ(" +
          (this.boxWidth / 2 + this.boxWidth / 40) +
          "px) scale(" +
          this.smallCubeScale[2] +
          ")",
        "rotateY(-90deg) translateZ(" +
          (this.boxWidth / 2 + this.boxWidth / 40) +
          "px) scale(" +
          this.smallCubeScale[3] +
          ")",
        "rotateX(90deg) translateZ(" +
          (this.boxWidth / 2 + this.boxWidth / 40) +
          "px) scale(" +
          this.smallCubeScale[4] +
          ")",
        "rotateX(-90deg) translateZ(" +
          (this.boxWidth / 2 + this.boxWidth / 40) +
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
  mounted() {
    for (var i = 0; i < 6; i++) {
      this.smallFaces[i] = document.getElementById("cube_" + i);
    }
  },
  created() {
    this.boxWidth = Math.max(
      200,
      Math.floor(Math.min(window.innerWidth, window.innerHeight) / 3)
    );
    this.smallBoxWidth = this.boxWidth / 4;
    this.paddingTop = Math.floor(window.innerHeight / 3);
    window.addEventListener("resize", this.windowResize);

    // check if we can send message
    var lastMessageTime = this.getCookie("lastSentMessageTime");
    const timeDifference = new Date().getTime() - lastMessageTime;
    if (timeDifference >= this.messageGapTimeInSeconds * 1000) {
      this.canSendMessage = true;
    } else {
      this.canSendMessage = false;
      setTimeout(() => {
        this.canSendMessage;
      }, this.messageGapTimeInSeconds * 1000 - timeDifference);
    }
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
  background: rgba(0, 0, 0, 0.8);
}

.cube__face__small {
  position: absolute;
  color: white;
  text-align: center;
  background: rgba(9, 13, 23, 0.6);
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
</style>