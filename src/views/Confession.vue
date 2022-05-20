<template>
  <div class="h-screen grid" v-show="exitPressed == '0'">
    <div
      class="relative mx-auto my-auto transform duration-200"
      :style="{ transform: pageTransform }"
    >
      <transition name="fade" mode="out-in">
        <div
          class="
            absolute
            h-full
            mx-auto
            border-2 border-white
            left-1/2
            px-4
            py-5
            -translate-x-1/2
            bg-black/80
            top-0
            z-10
            scroll-y-auto
            break-words
            text-white text-2xl
            rounded-sm
            font-mono
            duration-1000
            animate-in
            fade-in
          "
          :style="{
            height: '600px',
            '--tw-translate-y': '15%',
            width: '105%',
          }"
          v-show="makingConfession"
        >
          <textarea
            class="
              top-0
              bg-black/50
              w-full
              border-white border-2
              py-3
              px-2
              text-2xl text-white
            "
            placeholder="Your confession"
            v-model="confessionText"
            :maxlength="characterLimit"
            :style="{ height: '500px', resize: 'none' }"
            id="confessionTextArea"
          ></textarea>
          <p
            class="
              font-mono
              absolute
              text-right
              bottom-20
              w-94
              right-6
              text-sm text-slate-400/80
              noselect
            "
          >
            {{ confessionText.length + "/" + characterLimit }}
          </p>
          <button
            class="
              absolute
              bottom-5
              right-5
              w-1/3
              border border-white
              mx-auto
              rounded-md
              py-1
              active:bg-gray-100
              disabled:border-gray-500
              text-white text-xl
              font-mono
              active:text-black
              disabled:text-gray-500
              font-bold
            "
            @click="this.sendConfession()"
            :disabled="!canSendConfession"
          >
            SEND
          </button>
          <button
            class="
              absolute
              bottom-5
              left-5
              w-1/3
              border border-white
              mx-auto
              rounded-md
              py-1
              active:bg-gray-100
              disabled:border-gray-500
              text-white text-xl
              font-mono
              active:text-black
              disabled:text-gray-500
              font-bold
            "
            @click="this.exitMakeConfession()"
          >
            BACK
          </button>
        </div>
      </transition>
      <transition name="fade" mode="out-in">
        <div
          class="
            absolute
            h-full
            mx-auto
            border-2 border-white
            left-1/2
            px-4
            py-5
            -translate-x-1/2
            bg-black/80
            top-0
            z-10
            scroll-y-auto
            break-words
            text-white text-2xl
            rounded-sm
            font-mono
            duration-1000
            animate-in
            fade-in
          "
          :style="{
            height: '600px',
            '--tw-translate-y': '15%',
            width: '105%',
          }"
          v-show="hearingConfession"
        >
          <p
            class="
              top-0
              bg-black/50
              w-full
              py-3
              px-2
              text-2xl text-white
              noselect
              overflow-y-auto
            "
            :style="{ height: '500px', 'white-space': 'pre-line' }"
            v-show="!loadingConfession"
          >
            {{ receivedConfession }}
          </p>
          <div
            class="text-center w-full my-auto"
            v-show="loadingConfession"
            :style="{ height: '500px' }"
          >
            <p class="text-white">{{ "Loading a confession" + loadingDots }}</p>
          </div>
          <button
            class="
              absolute
              bottom-5
              right-5
              w-1/3
              border border-white
              mx-auto
              rounded-md
              py-1
              active:bg-gray-100
              disabled:border-gray-500
              text-white text-xl
              font-mono
              active:text-black
              disabled:text-gray-500
              font-bold
            "
            @click="this.nextConfession()"
            :disabled="!this.canSeeNextConfession"
          >
            NEXT
          </button>
          <button
            class="
              absolute
              bottom-5
              left-5
              w-1/3
              border border-white
              mx-auto
              rounded-md
              py-1
              active:bg-gray-100
              disabled:border-gray-500
              text-white text-xl
              font-mono
              active:text-black
              disabled:text-gray-500
              font-bold
            "
            @click="this.exitHearConfession()"
          >
            BACK
          </button>
        </div>
      </transition>
      <h5
        class="
          text-white text-center
          mb-10
          text-4xl
          pt-10
          transform
          duration-300
          noselect
          font-mono
        "
      >
        I want to <span id="choice">{{ displayText }}</span
        >a confession
      </h5>
      <svg
        class="block m-auto"
        viewBox="0 0 321.6375 283.0458"
        xmlns="http://www.w3.org/2000/svg"
        :width="svgWidth"
        :height="svgHeight"
      >
        <g
          stroke="#ffffff"
          id="speaker"
          class="outline transform duration-300"
          @mouseover="this.changeChoiceText('make')"
          @mouseout="this.changeChoiceText('....')"
          @click="this.makeConfession()"
        >
          <polygon
            points="82.4589,152.6855 82.4588,152.6855 82.4586,152.6855  "
          />
          <circle cx="201.4838" cy="135.0277" r="22.5" />
          <path
            d="M309.1375,240.381h-33.7212l3.8811-21.6571c6.6478-4.0812,12.147-10.6422,8.749-23.5717   c-7.3115-21.136-14.3282-32.3309-29.2142-47.5526c-10.8911-11.0063-24.0522-9.8129-30.8195-4.1898   c-6.7663,5.6204-4.9784,17.9814,1.9261,25.7031c0.2772,0.3706,0.5714,0.759,0.8578,1.139l0.8127,0.1653l-0.2559-11.0986   c-0.0625-2.75,0.9492-5.3604,2.8496-7.3506c1.9004-1.9893,4.4609-3.1201,7.2119-3.1836l0.2461-0.0029   c5.5459,0,10.1611,4.5156,10.2881,10.0645l0.5508,24.0001c0.0713,3.1494-1.2725,6.1152-3.6895,8.1367   c-0.6458,0.54-1.3548,0.9897-2.1031,1.3538c3.4529,5.4207,6.5901,11.1228,8.8864,16.9285l-7.4207,41.4109   c-0.6528,3.6436,0.3423,7.3877,2.7173,10.2266s5.8857,4.4785,9.5869,4.4785h48.6602c6.9033,0,12.5-5.5967,12.5-12.5   S316.0408,240.381,309.1375,240.381z"
          />
          <path
            d="M249.6494,158.8988c-0.1006-4.417-3.7949-7.9199-8.1816-7.8145c-4.417,0.1016-7.916,3.7646-7.8145,8.1816l0.3213,13.9796   l-36.6377-7.4503c-4.3281-0.8809-8.5527,1.915-9.4336,6.2462c-0.8799,4.3291,1.916,8.5527,6.2461,9.4336l46.459,9.4473   c0.5293,0.1074,1.0625,0.1602,1.5938,0.1602c1.8594,0,3.6807-0.6494,5.1328-1.8633c1.8662-1.5615,2.9209-3.8877,2.8652-6.3203   L249.6494,158.8988z"
          />
        </g>
        <g
          stroke="#ffffff"
          id="listener"
          class="outline transform duration-300"
          @mouseover="this.changeChoiceText('hear')"
          @mouseout="this.changeChoiceText('....')"
          @click="this.hearConfession()"
        >
          <path
            d="M79.2117,262.8626c-10.1423-0.1385-17.8983-0.9076-23.4279-1.7394c1.3278,5.3979,6.1871,9.4052,11.9922,9.4052   C72.9406,270.5284,77.3617,267.3605,79.2117,262.8626z"
          />
          <path
            d="M85.7055,262.8626c1.85,4.4979,6.2707,7.6658,11.4337,7.6658c5.807,0,10.6665-4.0072,11.9943-9.4054   C103.6038,261.9548,95.8478,262.7241,85.7055,262.8626z"
          />
          <path
            d="M113.283,198.3082c0,0-5.7778-7.5192-30.8253-7.5192c-25.0474,0-30.8252,7.5192-30.8252,7.5192l-5.7928,58.3544   c0,0,11.5182,3.9246,36.618,3.9246c25.0999,0,36.618-3.9246,36.618-3.9246L113.283,198.3082z"
          />
          <path
            d="M48.4958,206.6284l0.9134-9.2012l0.3994-0.5205c0.6621-0.8613,7.2031-8.4175,32.6494-8.4175   c25.4453,0,31.9863,7.5562,32.6484,8.4175l0.4004,0.5205l0.9135,9.2021c2.4464-1.9431,3.9313-5.0278,3.6436-8.4072l-1.5026-17.653   l-17.6259,1.6661c-1.8436,1.7312-4.3211,2.7808-7.046,2.7808c-0.3252,0-0.6523-0.0151-0.9814-0.0464l-10.4493-0.9878   l-10.4493,0.9878c-0.3291,0.0313-0.6563,0.0464-0.9814,0.0464c-2.7249,0-5.2025-1.0496-7.046-2.7808l-17.6259-1.6661   l-1.5026,17.653C44.5659,201.6008,46.0502,204.6852,48.4958,206.6284z"
          />
          <path
            d="M110.6569,160.6249c-0.4992-2.9252-1.0601-5.5943-1.6588-8.0514c-9.1681,1.3425-18.8721,2.4117-26.5394,2.4117   c0.0001,0,0.0002,0,0.0002,0h-0.0005c0.0001,0,0.0002,0,0.0002,0c-7.6672,0-17.3712-1.0693-26.5394-2.4118   c-0.5987,2.4571-1.1596,5.1263-1.6588,8.0515l28.1982,2.6656L110.6569,160.6249z"
          />
          <path
            d="M62.0453,179.7421c-0.6753-1.2157-1.123-2.5835-1.2624-4.0576c-0.5332-5.6543,3.6318-10.689,9.2852-11.2227l0.1716-0.0162   l-18.6412-1.7621c0.5877-3.8554,1.2774-7.3235,2.0308-10.4526c-5.7965-0.8848-11.285-1.8535-15.7903-2.6998   c-1.3176,5.668-2.4166,12.1337-3.1663,19.5338c-0.2148,2.1206,0.4248,4.2388,1.7773,5.8853   c1.3535,1.6465,3.3076,2.6855,5.4287,2.8857L62.0453,179.7421z"
          />
          <path
            d="M111.2882,152.231c0.7534,3.1291,1.4431,6.5971,2.0308,10.4525l-43.0342,4.0679c-4.3984,0.4155-7.627,4.3184-7.2119,8.7173   c0.3916,4.1426,3.877,7.2476,7.9551,7.2476c0.2529,0,0.5068-0.0117,0.7627-0.0361l51.248-4.8442   c2.1211-0.2002,4.0752-1.2393,5.4287-2.8857c1.3525-1.6465,1.9922-3.7646,1.7773-5.8853c-0.7497-7.4-1.8488-13.8658-3.1663-19.5338   C122.5732,150.3775,117.0847,151.3463,111.2882,152.231z"
          />
          <path
            d="M82.4588,152.6855c20.1666,0,55.4488-7.6667,55.4488-7.6667l-14.5-26c-5.2089-4.4276-12.5961-7.0186-19.6665-8.5385   c-1.981,1.1855-4.1389,2.1039-6.4258,2.7019c-2.8733,3.1369-6.7357,7.0267-11.2515,10.764v-3.0166   c2.8091-2.4204,5.3262-4.8563,7.4561-7.0667c-0.8141,0.081-1.6392,0.1239-2.4742,0.1239c-5.8484,0-11.2265-2.0396-15.4713-5.4385   c-2.3729,0.1494-5.2125,0.4076-8.2742,0.8438c2.6177,3.0084,6.6347,7.2996,11.5536,11.538v3.0167   c-6.3379-5.2454-11.3928-10.7959-14.2256-14.1333c-8.0331,1.3813-17.0521,4.0492-23.1183,9.2054l-14.5,26   C27.0099,145.0188,62.2922,152.6855,82.4588,152.6855z M81.1533,120.633h2.611v6.075h6.0054v2.611h-6.0054v15.2833h-2.611V129.319   h-6.0054v-2.611h6.0054V120.633z"
          />
          <circle cx="91.0458" cy="89.1871" r="22.5" />
        </g>
        <g stroke="#ffffffc0">
          <path
            d="M244.0734,263.0092h-15.7431v-3.4128h-5.0642v-51.2332h5.0642v-3.2623h15.7431v-9.9083l-64.2936-13.2109v23.1193h15.7431   v3.2623h5.0642v51.2332h-5.0642v3.4128h-15.7431v6.0164h-10.9083V0h-19.2661v269.0256h-8.9083V204.622h-16.7219   c-0.6524,1.5885-1.5657,3.073-2.7473,4.3594c-0.5253,0.5719-1.104,1.0815-1.7063,1.5581l4.9211,49.5776l-3.7549,1.2793   c-0.2104,0.0717-2.4681,0.8203-6.8984,1.6653c-2.1205,7.1953-8.7767,12.4666-16.6505,12.4666   c-6.1811,0-11.6034-3.2565-14.6808-8.1338c-3.0778,4.8773-8.5007,8.1338-14.6824,8.1338c-7.8729,0-14.5281-5.271-16.6486-12.4663   c-4.4316-0.845-6.6898-1.5939-6.9003-1.6655l-3.7549-1.2793l4.9212-49.5791c-0.6016-0.4761-1.1796-0.9854-1.7044-1.5566   c-1.1815-1.2864-2.0948-2.7709-2.7473-4.3594h-20.795v64.4036H0v14.0203h320.0367v-14.0203h-75.9633V263.0092z M161.2386,65.4679h4   v4h-4V65.4679z M161.2386,73.4679h4v4h-4V73.4679z M161.2386,81.4679h4v4h-4V81.4679z M161.2386,89.4679h4v4h-4V89.4679z    M161.2386,97.4679h4v4h-4V97.4679z M161.2386,105.4679h4v4h-4V105.4679z M161.2386,113.4679h4v4h-4V113.4679z M161.2386,121.4679   h4v4h-4V121.4679z M161.2386,129.4679h4v4h-4V129.4679z M161.2386,137.4679h4v4h-4V137.4679z M161.2386,145.4348h4v4h-4V145.4348z    M161.2386,153.4348h4v4h-4V153.4348z M161.2386,161.4348h4v4h-4V161.4348z M161.2386,169.4348h4v3.9999h-4V169.4348z    M153.2386,65.4679h4v4h-4V65.4679z M153.2386,73.4679h4v4h-4V73.4679z M153.2386,81.4679h4v4h-4V81.4679z M153.2386,89.4679h4v4   h-4V89.4679z M153.2386,97.4679h4v4h-4V97.4679z M153.2386,105.4679h4v4h-4V105.4679z M153.2386,113.4679h4v4h-4V113.4679z    M153.2386,121.4679h4v4h-4V121.4679z M153.2386,129.4679h4v4h-4V129.4679z M153.2386,137.4679h4v4h-4V137.4679z    M153.2386,145.4348h4v4h-4V145.4348z M153.2386,153.4348h4v4h-4V153.4348z M153.2386,161.4348h4v4h-4V161.4348z    M153.2386,169.4348h4v3.9999h-4V169.4348z"
          />
        </g>
      </svg>
      <div class="mt-10 w-full">
        <button
          class="
            absolute
            left-0
            bot-0
            w-1/3
            border border-white
            mx-auto
            rounded-md
            py-1
            active:bg-gray-100
            disabled:border-gray-500
            text-white text-xl
            font-mono
            active:text-black
            disabled:text-gray-500
            font-bold
          "
          @mouseover="this.changeChoiceText('hear')"
          @mouseout="this.changeChoiceText('....')"
          @click="this.hearConfession()"
          :disabled="makingConfession || hearingConfession"
        >
          HEAR
        </button>
        <button
          class="
            absolute
            right-0
            bot-0
            w-1/3
            border border-white
            mx-auto
            rounded-md
            py-1
            active:bg-gray-100
            disabled:border-gray-500
            text-white text-xl
            font-mono
            active:text-black
            disabled:text-gray-500
            font-bold
          "
          @mouseover="this.changeChoiceText('make')"
          @mouseout="this.changeChoiceText('....')"
          @click="this.makeConfession()"
          :disabled="makingConfession || hearingConfession"
        >
          MAKE
        </button>
      </div>
    </div>
  </div>
</template>

<script>
var axios = require("axios");
import router from "../router";
export default {
  name: "Confession",
  data() {
    return {
      choiceText: "....",
      textChanged: false,
      displayText: "....",
      cycleDone: true, // one cycle of change text
      confessionText: "",
      canSendConfession: true,
      characterLimit: 3000,
      makingConfession: false,
      hearingConfession: false,
      receivedConfession: "test1 test2 test3",
      confessionOpeners: [
        "Forgive me, father, for I have sinned.",
        "Bless me, father, for I have sinned.",
        "To whoever is reading this, I want to share a secret.",
        "Oh random strangers, I come here to make a confession.",
        "Oh random strangers, I come here to tell you a secret",
        "I have a secret to share.",
        "I want to tell you a secret.",
      ],
      confessionOpenerChoice: 0,
      loadingConfession: true,
      confessionGapTimeInSeconds: 600,
      loadingDots: "...",
      windowScale: 1,
      canSeeNextConfession: true,
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
    svgWidth() {
      return Math.min(512, 512 * this.windowScale) + "pt";
    },
    svgHeight() {
      return Math.min(449, 449 * this.windowScale) + "pt";
    },
    pageTransform() {
      return "scale(" + this.windowScale + ", " + this.windowScale + ")";
    },
  },
  watch: {
    choiceText() {
      this.changeText();
    },
  },
  methods: {
    changeScaling() {
      this.windowScale = Math.max(
        0.1,
        Math.min((window.innerWidth - 100) / 512, 1.0)
      );
    },
    setCookie(name, value, days) {
      var expires = "";
      if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + (value || "") + expires + "; path=/";
    },
    getCookie(name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
      }
      return "0";
    },

    nextConfession() {
      this.loadingConfession = true;
      this.canSeeNextConfession = false;
      var config = {
        method: "get",
        url: "https://loneliness.one/api/confessions",
        headers: {},
      };
      let self = this;
      axios(config)
        .then(function (response) {
          self.receivedConfession = response.data.text;
          self.loadingConfession = false;
          setTimeout(() => {
            self.canSeeNextConfession = true;
          }, 1100);
        })
        .catch(function (error) {
          if (error.response.status == 403) {
            alert("There is no new confession available at this time");
            self.exitHearConfession();
            return;
          } else {
            alert("Something went wrong");
            console.log(error);
            self.exitHearConfession();
          }
        });
    },

    sendConfession() {
      if (this.confessionText.trim() == "") {
        alert("You cannot send an empty confession.");
        return;
      }
      if (
        this.confessionText.trim() ==
        this.confessionOpeners[this.confessionOpenerChoice].trim()
      ) {
        alert("Please, say something, don't send the default text.");
        return;
      }
      var data = JSON.stringify({
        text: this.confessionText.trim(),
      });
      var config = {
        method: "post",
        url: "https://loneliness.one/api/confessions",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      let self = this;
      axios(config)
        .then(function (response) {
          self.canSendConfession = false;
          self.setCookie("lastConfessionTime", new Date().getTime(), 1);
          alert(
            "Confession sent" +
              "\nYou will need to wait " +
              self.confessionGapTimeInSeconds +
              " seconds to make another confession"
          );
          self.exitMakeConfession();
          // reenable send message button after n seconds
          setTimeout(() => {
            self.canSendConfession = true;
          }, self.confessionGapTimeInSeconds * 1000);
        })
        .catch(function (error) {
          alert("Something went wrong, please try again later.");
          self.canSendConfession = true;
          console.log(error);
        });
    },
    makeConfession() {
      this.makingConfession = true;
      // we need to wait a bit for the textarea to show up
      if (this.confessionText.trim() == "") {
        this.confessionOpenerChoice = Math.floor(
          Math.random() * this.confessionOpeners.length
        );
        this.confessionText =
          this.confessionOpeners[this.confessionOpenerChoice] + "\n\n";
      }
      setTimeout(() => {
        document.getElementById("confessionTextArea").focus();
      }, 100);
    },
    hearConfession() {
      this.hearingConfession = true;
      this.nextConfession();
    },

    exitMakeConfession() {
      this.makingConfession = false;
      this.changeChoiceText("....");
    },
    exitHearConfession() {
      this.hearingConfession = false;
      this.canSeeNextConfession = true;
      this.changeChoiceText("....");
    },

    changeChoiceText(target) {
      if (!this.makingConfession && !this.hearingConfession) {
        // we have to make sure we are not current making a confession
        this.choiceText = target;
      }
    },
    changeText() {
      let self = this;
      setTimeout(() => {
        if (!self.cycleDone) {
          self.changeText();
        } else {
          // either the delete is complete
          // or adding text is complete
          if (self.displayText == self.choiceText) {
            return;
          }
          if (self.displayText.length == 0) {
            self.addText(self.choiceText);
          } else {
            self.removeText();
            self.changeText(self.choiceText);
          }
        }
      }, 50);
    },
    removeText() {
      this.cycleDone = false;
      if (this.displayText.length != 0) {
        this.displayText = this.displayText.slice(0, -1);
        setTimeout(this.removeText, 120);
      } else {
        this.cycleDone = true;
      }
    },
    addText(targetText) {
      this.cycleDone = false;
      if (this.displayText.length < targetText.length) {
        this.displayText += targetText[this.displayText.length];
        setTimeout(() => {
          this.addText(targetText);
        }, 120);
      } else {
        this.cycleDone = true;
      }
    },
    changeLoadingDots() {
      // this is just for athetic
      this.loadingDots = ".".repeat((this.loadingDots.length + 1) % 5);
      setTimeout(this.changeLoadingDots, 500);
    },
  },
  mounted() {
    if (this.exitPressed == "1") {
      router.push("/exit");
    }
    var lastConfessionTime = this.getCookie("lastConfessionTime");
    const timeDifference = new Date().getTime() - lastConfessionTime;
    if (timeDifference >= this.confessionGapTimeInSeconds * 1000) {
      this.canSendConfession = true;
    } else {
      this.canSendConfession = false;
      setTimeout(() => {
        this.canSendConfession = true;
      }, this.confessionGapTimeInSeconds * 1000 - timeDifference);
    }
    this.changeLoadingDots();
    this.changeScaling();
    window.addEventListener("resize", this.changeScaling);
  },
  crreated() {
    this.changeScaling();
  },
  destroyed() {
    window.removeEventListener("resize", this.changeScaling);
  },
};
</script>

<style lang="scss" scoped>
.outline {
  stroke: "#ffffff";
  fill: "#ffffff";
  stroke-width: 1;
}
.outline:hover {
  stroke-width: 2.5px;
}

#choice::after {
  content: "";
  width: 0.5rem;
  height: 1.9rem;
  background: #ffffff;
  display: inline-block;
  margin-left: 4px;
  margin-right: 1rem;
  margin-bottom: -2px;
  text-align: left;
  line-height: 5rem;
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
#choice::after {
  /*code commented for brevity*/
  animation: cursor-blink 1.2s steps(2) infinite;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}

.fade-enter,
.fade-leave-to
/* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>