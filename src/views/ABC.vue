<template>
  <div class="h-screen grid" v-show="exitPressed == '0'">
    <div class="relative m-auto">
      <h2 class="font-mono text-8xl max-w-full mx-24 noselect" id="textbox">
        Hello
      </h2>
      <audio
        data-key="65"
        id="pc"
        src="http://carolinegabriel.com/demo/js-keyboard/sounds/040.wav"
      ></audio>
      <audio
        data-key="71"
        id="pg"
        src="http://carolinegabriel.com/demo/js-keyboard/sounds/047.wav"
      ></audio>
      <audio
        data-key="72"
        id="pa"
        src="http://carolinegabriel.com/demo/js-keyboard/sounds/049.wav"
      ></audio>
      <audio
        data-key="68"
        id="pe"
        src="http://carolinegabriel.com/demo/js-keyboard/sounds/044.wav"
      ></audio>
      <audio
        data-key="70"
        id="pf"
        src="http://carolinegabriel.com/demo/js-keyboard/sounds/045.wav"
      ></audio>
      <audio
        data-key="83"
        id="pd"
        src="http://carolinegabriel.com/demo/js-keyboard/sounds/042.wav"
      ></audio>
    </div>
  </div>
</template>

<script>
import router from "../router";
export default {
  name: "ABC",
  data() {
    return {
      textbox: null,
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
    removeFirst() {
      var firstPos = this.textbox.innerHTML.indexOf("</font>");
      if (firstPos != -1) {
        this.textbox.innerHTML = this.textbox.innerHTML.slice(firstPos + 7);
      }
    },
    charToColor(char) {
      char = char.toLowerCase();
      if ("abn".includes(char)) {
        return "#2ef3cf";
      } else if ("cdgopuv".includes(char)) {
        return "#23ceff";
      } else if ("ef".includes(char)) {
        return "#fcbe33";
      } else if ("hiqw".includes(char)) {
        return "#fcbee3";
      } else if ("jkrsxy".includes(char)) {
        return "#fabf72";
      } else if ("lmtz".includes(char)) {
        return "#fa9f92";
      } else {
        return "#ffffff";
      }
    },
    playNote(char) {
      char = char.toLowerCase();
      if ("abn".includes(char)) {
        var audio = document.getElementById("pc");
        audio.currentTime = 0;
        audio.play();
      } else if ("cdgopuv".includes(char)) {
        var audio = document.getElementById("pg");
        audio.currentTime = 0;
        audio.play();
      } else if ("ef".includes(char)) {
        var audio = document.getElementById("pa");
        audio.currentTime = 0;
        audio.play();
      } else if ("hiqw".includes(char)) {
        var audio = document.getElementById("pf");
        audio.currentTime = 0;
        audio.play();
      } else if ("jkrsxy".includes(char)) {
        var audio = document.getElementById("pe");
        audio.currentTime = 0;
        audio.play();
      } else if ("lmtz".includes(char)) {
        var audio = document.getElementById("pd");
        audio.currentTime = 0;
        audio.play();
      }
    },
    pressFunction(e) {
      const self = this;
      var keynum;
      if (window.event) {
        // IE
        keynum = e.keyCode;
      } else if (e.which) {
        // Netscape/Firefox/Opera
        keynum = e.which;
      }
      var char = String.fromCharCode(keynum);
      self.textbox.innerHTML += char.fontcolor(self.charToColor(char));
      self.playNote(char);
      setTimeout(() => {
        self.removeFirst();
      }, 3000);
    },
  },
  mounted() {
    if (this.exitPressed == "1") {
      router.push("/exit");
    }
    this.textbox = document.getElementById("textbox");
    var txt = "Hello";
    var newText = "";
    for (var i = 0, l = txt.length; i < l; i++) {
      var char = txt.charAt(i);
      newText += char.fontcolor(this.charToColor(char));
    }
    this.textbox.innerHTML = newText;
    // this.textbox.innerHTML = newtext;
    setTimeout(() => {
      this.removeFirst();
      setTimeout(() => {
        this.removeFirst();
        setTimeout(() => {
          this.removeFirst();
          setTimeout(() => {
            this.removeFirst();
            setTimeout(() => {
              this.removeFirst();
            }, 200);
          }, 200);
        }, 200);
      }, 200);
    }, 3000);
    const self = this;
    window.addEventListener("keypress", self.pressFunction, true);
  },
  beforeRouteEnter() {
    // set the color
  },
  beforeRouteLeave() {
    window.removeEventListener("keypress", this.pressFunction, true);
  },
};
</script>

<style scoped>
#textbox {
  word-break: break-all;
}

#textbox::after {
  content: "";
  width: 2rem;
  height: 4.5rem;
  background: #2ef3cf;
  display: inline-block;
  margin-left: 10px;
  text-align: center;
  line-height: 1;
}
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
#textbox::after {
  /*code commented for brevity*/
  animation: cursor-blink 1.2s steps(2) infinite;
}
</style>