<template>
  <div
    class="
      grid grid-cols-1
      md:grid-cols-2
      lg:grid-cols-3
      xl:grid-cols-4
      pt-32
      px-5
      content-start
      overflow-auto
      max-h-screen
      h-screen
    "
  >
    <div
      class="
        flex
        justify-center
        mb-10
        w-full
        animate-in
        fade-in
        zoom-in
        duration-300
      "
      v-for="item in pages"
      :key="item"
    >
      <div
        class="
          block
          p-4
          rounded-lg
          shadow-lg
          bg-gray-600/10
          max-w-sm
          w-full
          border-2 border-white
          hover:-translate-y-1
          transform
          duration-300
          mx-2
        "
        @mouseover="this.switchDescription(item, 1)"
        @mouseleave="this.switchDescription(item, 0)"
      >
        <div class="h-128 hide-scroll">
          <h5
            class="
              text-white
              leading-tight
              mb-4
              font-mono
              text-8xl
              font-extrabold
              w-full
              border-2 border-white
              text-center
              h-60
              uppercase
              noselect
            "
            :style="{ 'line-height': '240px' }"
          >
            {{ item.title[0] }}
          </h5>
          <div class="text-white mb-3 font-mono overflow-y-auto h-48">
            <h1
              class="
                text-4xl
                w-full
                text-center
                mb-4
                border-y-2
                py-1
                border-white
              "
            >
              {{ item.title }}
            </h1>
            <p class="px-1 py-2 text-xl">
              {{ item.currentText }}
            </p>
          </div>
        </div>
        <router-link :to="item.link">
          <button
            type="button"
            class="
              inline-block
              px-6
              py-2.5
              font-medium
              text-xs
              leading-tight
              uppercase
              rounded
              font-mono
              text-white
              active:text-black
              disabled:bg-gray-700 disabled:text-gray-300
              bg-black/0
              active:bg-gray-100
              border-2 border-white
              transition
              duration-150
              ease-in-out
              absolute
              bottom-3
            "
          >
            Link
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Nav",
  data() {
    return {
      pages: [
        {
          title: "ABC",
          currentText:
            "Recall childhood, use your keyboard and play the alphabet song.",
          description:
            "Recall childhood, use your keyboard and play the alphabet song.",
          altDescription:
            "Embrace the simplicity. Don't you just want to go back?",
          link: "/abc",
        },
        {
          title: "Button",
          currentText:
            "Click the button. If someone else clicked it, you will know.",
          description:
            "Click the button. If someone else clicked it, you will know.",
          altDescription: "Is somebody waiting? Waiting for it to happen.",
          link: "/button",
        },
        {
          title: "Chat Box",
          currentText: "A chat box. Who knows what messages others will leave.",
          description: "A chat box. Who knows what messages others will leave.",
          altDescription:
            "Nobody knows who left the message. All they can see is the chat box.",
          addingText: 0,
          link: "/chatbox",
        },
        {
          title: "Loneliness",
          currentText: "Embrace loneliness",
          description: "Embrace loneliness",
          altDescription: "Find solitude",
          link: "/loneliness",
        },
        {
          title: "Me",
          currentText: "Click the link, you've found me",
          description: "Click the link, you've found me",
          altDescription: "But who cares?",
          link: "/github",
        },
        {
          title: "Philosophy",
          currentText:
            "Find the path to philosophy, a known secret of Wikipedia.",
          description:
            "Find the path to philosophy, a known secret of Wikipedia.",
          altDescription: "Maybe it's all connected",
          link: "/philosophy",
        },
        {
          title: "Translate",
          currentText:
            "Randomly translate a sentence 10 times. Let the machine do the work.",
          description:
            "Randomly translate a sentence 10 times. Let the machine do the work.",
          altDescription:
            "Some find it poetic, some find it dark. But it's just a machine.",
          link: "/translate",
        },
      ],
    };
  },
  methods: {
    switchDescription(item, order) {
      if (order == 1) {
        item.currentText = item.altDescription;
      } else {
        item.currentText = item.description;
      }
    },
  },
};
</script>

<style scoped>
.hide-scroll::-webkit-scrollbar {
  display: none;
}
.hide-scroll {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
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