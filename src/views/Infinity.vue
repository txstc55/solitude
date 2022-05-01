<template>
  <div
    class="
      h-full
      justify-center
      items-center
      absolute
      w-full
      flex
      overflow-y-hidden overflow-x-hidden
    "
    v-show="exitPressed == '0'"
  >
    <div class="w-fit h-fit fractal-container">
      <div class="fractal first-fractal">
        <div class="fractal fractal-transform second-fractal">
          <div class="fractal fractal-transform">
            <div class="fractal fractal-transform">
              <div class="fractal fractal-transform">
                <div class="fractal fractal-transform">
                  <div class="fractal fractal-transform">
                    <div class="fractal fractal-transform">
                      <div class="fractal fractal-transform">
                        <div class="fractal fractal-transform">
                          <div class="fractal fractal-transform">
                            <div class="fractal fractal-transform">
                              <div class="fractal fractal-transform">
                                <div class="fractal fractal-transform">
                                  <div class="fractal fractal-transform">
                                    <div class="fractal fractal-transform">
                                      <div class="fractal fractal-transform">
                                        <div class="fractal fractal-transform">
                                          <div
                                            class="fractal fractal-transform"
                                          >
                                            <div
                                              class="fractal fractal-transform"
                                            >
                                              <div
                                                class="
                                                  fractal fractal-transform
                                                "
                                              >
                                                <div
                                                  class="
                                                    fractal fractal-transform
                                                  "
                                                >
                                                  <div
                                                    class="
                                                      fractal fractal-transform
                                                    "
                                                  ></div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
  name: "Infinity",
  //   data(){
  //       return{

  //       }
  //   }
  computed: {
    exitPressed() {
      var nameEQ = "exitPressed" + "=";
      var ca = document.cookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
      }
      return "0"; // 0 for not pressed, 1 for pressed
    },
  },
  mounted() {
    if (this.exitPressed == "1") {
      router.push("/exit");
    }
  },
};
</script>

<style scoped>
.fractal {
  width: 18px;
  height: 10px;
  background-color: rgba(255, 255, 255, 0);
  border-radius: 9990px;
  border-color: white;
  border-width: 1px;
  display: block;
  position: relative;
  /* animation-name: spiral;
  animation-duration: 5s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  will-change: transform; */
}
.fractal-transform {
  transform: translate3d(10px, 20px, 0) rotateZ(80deg) scale(1.3);
}

.fractal-container {
  animation-name: spiral;
  animation-duration: 5s;
  animation-iteration-count: infinite;
  /* animation-direction: alternate; */
  animation-direction: initial;
  animation-timing-function: linear;
}

.first-fractal {
  animation-name: colorChangeFirst;
  animation-duration: 5s;
  animation-iteration-count: infinite;
  animation-direction: initial;
  animation-timing-function: linear;
}

.second-fractal {
  animation-name: colorChangeSecond;
  animation-duration: 5s;
  animation-iteration-count: infinite;
  animation-direction: initial;
  animation-timing-function: linear;
}

@keyframes colorChangeFirst {
  from {
    border-color: rgba(0, 0, 0, 0);
  }
  to {
    border-color: rgba(255, 255, 255, 0.5);
  }
}
@keyframes colorChangeSecond {
  from {
    border-color: rgba(255, 255, 255, 0.5);
  }
  to {
    border-color: rgba(255, 255, 255, 1);
  }
}

@keyframes spiral {
  from {
    transform: rotateZ(0deg) scale(1);
  }
  to {
    transform: translate3d(11px, 21px, 0px) rotateZ(80deg) scale(1.3);
  }
}
</style>