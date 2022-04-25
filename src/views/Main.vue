<template>
  <div class="h-screen grid">
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
export default {
  name: "Main",
  data() {
    return {
      text: "Accept Loneliness",
      texts: [
        "Accept Loneliness",
        "接受孤独",
        "孤独を受け入れる",
        "Embrace Darkness",
        "拥抱黑暗",
        "暗を抱きしめて",
      ],
      order: 0,
    };
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
    this.deleteFirst();
  },
};
</script>




<style scoped>
@font-face {
  font-family: Tabulamore;
  src: url("../fonts/TabulamoreScript-Bold.otf") format("opentype");
}
h2 {
  font-family: "Tabulamore", "Zhi Mang Xing", cursive, "Yuji Mai", serif;
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