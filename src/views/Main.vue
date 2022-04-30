<template>
  <div class="h-screen grid" v-show="exitPressed == '0'">
    <div class="relative m-auto">
      <h2
        class="
          text-white
          after:bg-white after:inline-block
          text-2xl
          after:w-1 after:h-5 after:ml-1
          sm:text-3xl sm:after:w-2 sm:after:h-8 sm:after:ml-2
          md:text-6xl md:after:w-4 md:after:h-16 md:after:ml-2
          lg:text-6xl lg:after:w-4 lg:after:h-16 lg:after:ml-2
          xl:text-9xl xl:after:w-6 xl:after:h-24 xl:after:ml-4
        "
      >
        {{ text }}
      </h2>
    </div>
  </div>
</template>

<script>
import router from "../router";
export default {
  name: "Main",
  data() {
    return {
      text: "",
      texts: [
        "Accept Loneliness",
        "接受孤独",
        "You are not alone",
        "你并不孤独",
        "Embrace Darkness",
        "拥抱黑暗",
        "Step into light",
        "步入光明",
      ],
      order: 0,
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
      return "0"; // 0 for not pressed, 1 for pressed
    },
  },
  methods: {
    deleteFirst() {
      if (this.text.length > 0) {
        setTimeout(() => {
          this.text = this.text.substr(0, this.text.length - 1);
          this.deleteFirst();
        }, 100);
      } else {
        this.order = this.order + 1;
        this.order = this.order % this.texts.length;
        setTimeout(() => {
          this.addLetter();
        }, 1200);
      }
    },
    addLetter() {
      if (this.text.length != this.texts[this.order].length) {
        setTimeout(() => {
          this.text = this.texts[this.order].substr(0, this.text.length + 1);
          this.addLetter();
        }, 150);
      } else {
        setTimeout(() => {
          this.deleteFirst();
        }, 2500);
      }
    },
  },
  created() {
    if (this.exitPressed == "1") {
      router.push("/exit");
    }
    this.addLetter();
  },
};
</script>




<style scoped>
@font-face {
  font-family: Tabulamore;
  src: url("../fonts/TabulamoreScript-Bold.otf") format("opentype");
}
h2 {
  font-family: "Tabulamore", "Zhi Mang Xing", cursive, serif;
  word-break: break-all;
}

/* h2::after {
  content: "";
  width: 1.5rem;
  height: 5.5rem;
  background: white;
  display: inline-block;
  margin-left: 15px;
} */
@keyframes cursor-blink {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0;
  }
  51% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
h2::after {
  /*code commented for brevity*/
  animation: cursor-blink 1.2s steps(2) infinite;
}
</style>