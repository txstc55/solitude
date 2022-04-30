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
        <button
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
          to="/"
          @click="close"
        >
          EXIT
        </button>
      </div>
    </div>
    <router-view v-slot="{ Component }">
      <transition name="scale" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </v-app>
</template>

<script>
export default {
  name: "App",
  methods: {
    close() {
      window.open("", "_self").close();
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
