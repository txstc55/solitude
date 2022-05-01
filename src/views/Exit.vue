<template>
  <div
    class="h-screen grid"
    @mousemove="getMouseMove"
    @mouseover="getMouseMove"
  >
    <div class="relative m-auto grid">
      <div
        class="
          transform
          duration-200
          relative
          m-auto
          w-160
          h-160
          border-white border-[10px]
          grid
        "
      >
        <div
          class="
            transform
            duration-200
            relative
            m-auto
            w-128
            h-128
            border-white border-8
            grid
          "
          :style="{ transform: transformStyle[0] }"
        >
          <div
            class="
              transform
              duration-200
              relative
              m-auto
              w-96
              h-96
              border-white border-[6px]
              grid
            "
            :style="{ transform: transformStyle[1] }"
          >
            <div
              class="
                transform
                duration-200
                relative
                m-auto
                w-64
                h-64
                border-white border-4
                grid
              "
              :style="{ transform: transformStyle[2] }"
            >
              <div
                class="
                  transform
                  duration-200
                  relative
                  m-auto
                  w-32
                  h-32
                  border-white border-2
                  grid
                  bg-white
                  text-black
                "
                :style="{ transform: transformStyle[3] }"
              >
                <p
                  class="
                    absolute
                    leading-tight
                    font-mono
                    text-8xl
                    font-extrabold
                    w-full
                    text-center
                    uppercase
                    noselect
                    text-black
                    bg-white
                    rounded-full
                    -translate-y-0.5
                    hover:bg-black hover:text-white
                    transform
                    duration-300
                  "
                  :style="{ 'line-height': '128px' }"
                  @click="goHome"
                >
                  H
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "../router";
export default {
  name: "Exit",
  data() {
    return {
      width: 0,
      height: 0,
      relativeX: 0,
      relativeY: 0,
    };
  },
  methods: {
    getSpec() {
      this.width = document.body.clientWidth;
      this.height = document.body.clientHeight;
    },
    getMouseMove(e) {
      this.relativeX = e.clientX - this.width / 2;
      this.relativeY = e.clientY - this.height / 2;
    },
    goHome() {
      this.$emit("returnHome", false);
      var expires = "";
      var date = new Date();
      date.setTime(date.getTime() + 1 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
      document.cookie =
        "exitPressed" + "=" + ("0" || "") + expires + "; path=/";
      router.push("/");
    },
  },
  computed: {
    transformStyle() {
      var absoluteRelativeX = Math.abs(this.relativeX);
      var translateX = absoluteRelativeX;
      if (absoluteRelativeX > 4) {
        translateX = Math.log2(absoluteRelativeX);
      }
      if (this.relativeX < 0) {
        translateX *= -1;
      }

      var absoluteRelativeY = Math.abs(this.relativeY);
      var translateY = absoluteRelativeY;
      if (absoluteRelativeY > 4) {
        translateY = Math.log2(absoluteRelativeY);
      }
      if (this.relativeY < 0) {
        translateY *= -1;
      }
      var result = [];
      for (var i = 0; i < 4; i++) {
        result.push(
          "translateX(" +
            -translateX / Math.pow(2, 4 - i - 1) +
            "px) translateY(" +
            -translateY / Math.pow(2, 4 - i - 1) +
            "px)"
        );
      }
      return result;
    },
  },
  created() {
    this.$emit("returnHome", true);
    this.getSpec();
    window.addEventListener("resize", this.getSpec);
  },
};
</script>

<style scoped>
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