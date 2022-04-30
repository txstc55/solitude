<template>
  <v-app>
    <div
      id="nav"
      class="
        left-1/2
        transform
        -translate-x-1/2
        text-white text-xl
        bg-black/50
        content-center
        z-50
        pt-2
        pb-3
        fixed
      "
      v-show="exitPressed == '0' && !exitPressedNow"
    >
      <div class="grid grid-cols-2 place-items-center">
        <router-link
          class="
            p-1
            font-mono
            mt-2
            transform
            duration-300
            hover:text-green-400
            text-gray-500 text-xl
            font-semibold
            border-2 border-gray-500
            rounded-md
            hover:border-green-400
            px-2
          "
          to="/"
          >HOME</router-link
        >
      </div>
      <div class="grid grid-cols-1 md:grid-cols-1 place-items-center">
        <router-link
          class="
            p-1
            font-mono
            mt-2
            transform
            duration-300
            hover:text-red-500
            text-gray-500 text-xl
            font-semibold
            border-2 border-gray-500
            rounded-md
            hover:border-red-500
            px-2
          "
          to="/exit"
          @click="exit"
        >
          EXIT
        </router-link>
      </div>
    </div>
    <router-view v-slot="{ Component }">
      <transition name="scale" mode="out-in">
        <component :is="Component" @returnHome="this.exitPressedNow = false" />
      </transition>
    </router-view>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      exitPressedNow: false,
    };
  },
  computed: {
    exitPressed() {
      var nameEQ = "exitPressed" + "=";
      var ca = document.cookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
      }
      return 0; // 0 for not pressed, 1 for pressed
    },
  },
  methods: {
    exit() {
      this.exitPressedNow = true;
      var expires = "";
      var date = new Date();
      date.setTime(date.getTime() + 1 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
      document.cookie =
        "exitPressed" + "=" + ("1" || "") + expires + "; path=/";
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: #7c97b1;
  height: 100vh;
}

html {
  background: black;
  height: 100vh;
}
#nav {
  // padding: 30px;
  width: 100%;
  align-items: center;
  display: flex;
  justify-content: center;
}

html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

.scale-enter-active,
.scale-leave-active {
  transition: all 0.5s ease;
}

.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
