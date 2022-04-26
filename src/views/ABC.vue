<template>
  <div class="h-screen grid">
    <div class="relative m-auto">
      <h2 class="font-mono text-8xl max-w-full mx-24" id="textbox">Hello</h2>
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
import { GoogleTranslator } from "@translate-tools/core/translators/GoogleTranslator";

// Use some CORS proxy service address as prefix
const translator = new GoogleTranslator({
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36",
  },
  //   corsProxy: "https://cors-anywhere.herokuapp.com/https://loneliness.one/",
});

translator
  .translate("Hello world", "en", "de")
  .then((translate) => console.log("Translate result", translate));
export default {
  name: "ABC",
  data() {
    return {
      textbox: null,
    };
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
  },
  mounted() {
    // set the color
    this.textbox = document.getElementById("textbox");
    var txt = this.textbox.textContent;
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
    window.addEventListener("keypress", function (e) {
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
    });
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