<template>
  <v-app>
    <div
      id="nav"
      class="
        left-1/2
        transform
        -translate-x-1/2
        text-white text-xl
        bg-black/60
        content-center
        z-50
        pt-2
        fixed
      "
    >
      <div class="grid grid-cols-3 md:grid-cols-7 place-items-center">
        <router-link class="p-1 md:p-3 font-mono" to="/">Main</router-link>
        <router-link class="p-1 md:p-3 font-mono" to="/button"
          >Button</router-link
        >
        <router-link class="p-1 md:p-3 font-mono" to="/abc">ABC</router-link>
        <router-link class="p-1 md:p-3 font-mono" to="/translate"
          >Translate</router-link
        >
        <router-link class="p-1 md:p-3 font-mono" to="/philosophy"
          >Philosophy</router-link
        >
        <router-link class="p-1 md:p-3 font-mono" to="/chatbox"
          >Box</router-link
        >
        <router-link class="p-1 md:p-3 font-mono" to="/github" target="_blank"
          >Me</router-link
        >
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
  components: {
    // Button,
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

  a {
    font-weight: bold;
    font-size: 15px;
    color: #55677a;

    &.router-link-exact-active {
      color: #f4feff;
    }
  }
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
