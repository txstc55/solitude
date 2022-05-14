<template>
  <div
    class="h-screen grid subpixel-antialiased overscroll-y-none overflow-hidden"
    v-show="exitPressed == '0'"
  >
    <div
      class="relative m-auto w-80"
      :style="{
        height: '384px',
        perspective: perspective + 'px',
      }"
    >
      <div
        class="absolute qawrapper w-80 h-full m-auto transform duration-1000"
        :style="{
          transform: containerTransform,
        }"
      >
        <div
          class="
            flex
            justify-center
            mb-10
            h-96
            w-full
            animate-in
            fade-in
            zoom-in
            duration-300
            absolute
          "
          v-for="(item, index) in qas"
          :key="index"
          :style="{
            transform: cardTransform(index),
            'transform-style': 'preserve-3d',
          }"
        >
          <div
            class="
              block
              p-4
              rounded-lg
              shadow-lg
              bg-black/90
              max-w-sm
              w-full
              border-2 border-white
              hover:scale-110
              transform
              duration-300
              mx-2
            "
          >
            <div class="h-76 overflow-y-auto hide-scroll">
              <p class="text-white mb-4 font-mono text-xl text-center">
                {{ item.question }}
              </p>
              <p class="text-white text-base mb-2 font-mono">
                {{ item.answer }}
              </p>
            </div>

            <button
              type="button"
              class="
                inline-block
                px-4
                py-2
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
              @click="containerRotate(1)"
            >
              prev
            </button>
            <button
              type="button"
              class="
                inline-block
                px-4
                py-2
                font-medium
                text-xs
                leading-tight
                uppercase
                rounded
                font-mono
                text-white
                active:text-black
                disabled:bg-gray-400/50 disabled:text-gray-300
                bg-black/0
                active:bg-gray-100
                border-2 border-white
                transition
                duration-150
                ease-in-out
                absolute
                bottom-3
                right-4
              "
              @click="containerRotate(-1)"
            >
              next
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "../router";
export default {
  name: "Qanda",
  data() {
    return {
      qas: [
        {
          question: "Why did you make this website?",
          answer: "I felt lonely, I want to express it in some way.",
        },
        {
          question: "What is the purpose of this website?",
          answer:
            "There are many purpose of this website. But the two essential idea is: to know there are people out there, but not knowhing who they are, and to only play with yourself.",
        },
        {
          question: "Do you still feel lonely?",
          answer: "Yes, constantly.",
        },
        {
          question: "What if I want to ask you a question?",
          answer:
            "You can find my email easily. There has been a couple of people telling me they liked the website through email. I will be happy if you reached out and ask me some questions.",
        },
        {
          question: "Do you collect any data?",
          answer:
            "LMAO NO. Every user input you see will be removed, either after a limit is reached (6 messages in chatbox), or doesn't get stored on server at all.",
        },
        {
          question: "Among all of them, which one is your favourite?",
          answer:
            "I would say it's the chatbox. It not only reflects the idea of this website, but is also hard to implement. The box is not rendered on a canvas or svg or webgl. It is just html elements.",
        },
        {
          question: "What is the purpose of ABC?",
          answer:
            "I think the ultimate loneliness is about remorse. You can only play alphabet song on ABC, which reminds you of the time that you can no longer go back to. It's the nostalgia that kills you.",
        },
        {
          question: "What is the purpose of the Button?",
          answer:
            "The button is actually real-time iteractive. You can see if someone clicked the button in real time. But that's it. You know they exist, but you are still alone.",
        },
        {
          question: "What is the purpose of Chatbox?",
          answer:
            "Basically the same thing as the button, except that you can leave a message now.",
        },
        {
          question: "What is the purpose of Infinity?",
          answer:
            "I wanted to create something I can simply stare at for a long time. Simple as that.",
        },
        {
          question: "What are those texts in Loneliness?",
          answer:
            "IDK. Those are just some random texts that popped out of my mind.",
        },
        {
          question: "What is the purpose of Philosophy?",
          answer:
            "Have you ever heard the story of wikipedia the wise? I thought not. It's not a story the school would tell you. It's a wiki legend. Wikipedia has a hidden secret, that if you keep clicking on the first link, it will lead you to Philosophy. The philosophy of wikipedia is a pathway to many pages some consider to be unnatural.",
        },
        {
          question: "What is the purpose of Translate?",
          answer:
            "It was fun. I posted on reddit and got many good translations. Feel free to go on to reddit and simply search this website, and you will find the thread.",
        },
        {
          question: "But after all, why?",
          answer: "I want others to have some ideas of what I felt constantly.",
        },
      ],
      perspective: 1000000,
      card_distance: 3 * 320,
      turn: 0,
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
    containerTransform() {
      return (
        "rotateY(" +
        (((this.turn * 360) / this.qas.length) * Math.PI) / 180 +
        "rad)"
      );
    },
  },
  methods: {
    windowResize() {
      this.perspective = Math.ceil(
        (2000 * 2.5 * this.card_distance) /
          Math.max(
            200,
            Math.floor(Math.min(window.innerWidth, window.innerHeight))
          )
      );
    },
    cardTransform(ind) {
      const gap = Math.floor(360 / this.qas.length);
      const d = Math.ceil(this.card_distance / Math.sin(gap * (180 / Math.PI)));
      return (
        "rotateY(" +
        (ind * 360 * Math.PI) / 180 / this.qas.length +
        "rad) translateZ(" +
        d +
        "px)"
      );
    },
    containerRotate(ind) {
      this.turn = this.turn + ind;
    },
  },
  mounted() {
    if (this.exitPressed == "1") {
      router.push("/exit");
    }
  },
  created() {
    this.perspective = Math.ceil(
      (2000 * 2.5 * this.card_distance) /
        Math.max(
          200,
          Math.floor(Math.min(window.innerWidth, window.innerHeight))
        )
    );
    window.addEventListener("resize", this.windowResize);
  },
  destroyed() {
    window.removeEventListener("resize", this.windowResize);
  },
  beforeRouteEnter() {},
  beforeRouteLeave() {},
};
</script>

<style scoped>
.qawrapper {
  transform-style: preserve-3d;
}
</style>