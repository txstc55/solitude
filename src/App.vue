<template>
  <v-app>
    <div
      id="nav"
      class="
        absolute
        left-1/2
        transform
        -translate-x-1/2 -translate-y-1/2
        text-white text-xl
        bg-gray-600/10
        content-center
        pt-20
      "
    >
      <router-link class="p-5" to="/">Main</router-link>
      <router-link class="p-5" to="/button">Button</router-link>
      <router-link class="p-5" to="/abc">ABC</router-link>
      <router-link class="p-5" to="/github" target="_blank">Me</router-link>
    </div>
    <router-view v-slot="{ Component }">
      <transition name="scale" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </v-app>
</template>

<script>
// import Button from "./views/Button.vue";

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
