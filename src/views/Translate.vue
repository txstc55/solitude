<template>
  <div class="h-screen grid">
    <div class="relative my-auto mx-auto font-mono">
      <textarea
        class="
          mx-auto
          form-control
          block
          w-96
          px-3
          py-1.5
          text-base
          font-normal
          text-white
          bg-black bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          focus:text-white
          focus:bg-gray-500/10
          focus:border-blue-600
          focus:outline-none
          max-h-96
          h-60
        "
        placeholder="Your message"
        v-model="message"
      ></textarea>
      <div class="flex flex-wrap mb-2 mt-3">
        <div class="w-full mb-6">
          <label
            class="
              block
              uppercase
              tracking-wide
              text-white text-sm
              font-bold
              mb-1
            "
            for="grid-state"
          >
            input language
          </label>
          <div class="relative">
            <select
              class="
                block
                appearance-none
                w-full
                bg-black
                border border-gray-200
                text-white
                py-3
                px-4
                pr-8
                rounded
                leading-tight
                focus:outline-none focus:bg-gray-200/10 focus:border-gray-500
              "
              v-model="language_selected"
            >
              <option v-for="(_, item) in languages" :value="item">
                {{ item }}
              </option>
            </select>
            <div
              class="
                pointer-events-none
                absolute
                inset-y-0
                right-0
                flex
                items-center
                px-2
                text-gray-700
              "
            >
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div class="w-full mb-6 mt-1 group">
          <button
            class="
              border border-white
              w-full
              rounded-md
              py-2
              group-active:bg-gray-100
            "
            @click="this.chaosTranslate()"
          >
            <span
              class="px-2 text-white text-2xl font-sans group-active:text-black"
              >TRANSLATE</span
            >
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GoogleTranslator } from "@translate-tools/core/translators/GoogleTranslator";
var axios = require("axios");

var config = {
  method: "get",
  url: "https://translate.google.com/translate_a/single?client=t&sl=en&tl=de&tk=494717.88986&dt=t&q=This%20world%20sucks",
  headers: {
    Cookie:
      "NID=511=dn3UmPPiXmzPcnIgIY7_WuncN0pk7_c5gUce3L5aAu0VrpdwMyaAfJAw6G1Ngygw9MLco_9kdYzmlX8JN8N485T5uTflworZrX3hKZPkwLi_VjoIL0U4P6x8eWbrcB-DOhmivGaoWkdC3rXMogToyX2tmbjS_ORQL82o2sq8aKlMwypABF7u5fga00Fiy-VOth8",
  },
};

axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });

// translator
//   .translate("Hello world", "en", "de")
//   .then((translate) => console.log("Translate result", translate));
export default {
  name: "Translate",
  data() {
    return {
      translator: null,
      message: "",
      language_selected: "English",
      languages: {
        Afrikaans: "af",
        Albanian: "sq",
        Amharic: "am",
        Arabic: "ar",
        Armenian: "hy",
        Azerbaijani: "az",
        Basque: "eu",
        Belarusian: "be",
        Bengali: "bn",
        Bosnian: "bs",
        Bulgarian: "bg",
        Catalan: "ca",
        Cebuano: "ceb",
        Chichewa: "ny",
        "Chinese Simplified": "zh-cn",
        "Chinese Traditional": "zh-tw",
        Corsican: "co",
        Croatian: "hr",
        Czech: "cs",
        Danish: "da",
        Dutch: "nl",
        English: "en",
        Esperanto: "eo",
        Estonian: "et",
        Filipino: "tl",
        Finnish: "fi",
        French: "fr",
        Frisian: "fy",
        Galician: "gl",
        Georgian: "ka",
        German: "de",
        Greek: "el",
        Gujarati: "gu",
        "Haitian Creole": "ht",
        Hausa: "ha",
        Hawaiian: "haw",
        Hebrew: "iw",
        Hindi: "hi",
        Hmong: "hmn",
        Hungarian: "hu",
        Icelandic: "is",
        Igbo: "ig",
        Indonesian: "id",
        Irish: "ga",
        Italian: "it",
        Japanese: "ja",
        Javanese: "jw",
        Kannada: "kn",
        Kazakh: "kk",
        Khmer: "km",
        Korean: "ko",
        "Kurdish (Kurmanji)": "ku",
        Kyrgyz: "ky",
        Lao: "lo",
        Latin: "la",
        Latvian: "lv",
        Lithuanian: "lt",
        Luxembourgish: "lb",
        Macedonian: "mk",
        Malagasy: "mg",
        Malay: "ms",
        Malayalam: "ml",
        Maltese: "mt",
        Maori: "mi",
        Marathi: "mr",
        Mongolian: "mn",
        "Myanmar (Burmese)": "my",
        Nepali: "ne",
        Norwegian: "no",
        Pashto: "ps",
        Persian: "fa",
        Polish: "pl",
        Portuguese: "pt",
        Punjabi: "ma",
        Romanian: "ro",
        Russian: "ru",
        Samoan: "sm",
        "Scots Gaelic": "gd",
        Serbian: "sr",
        Sesotho: "st",
        Shona: "sn",
        Sindhi: "sd",
        Sinhala: "si",
        Slovak: "sk",
        Slovenian: "sl",
        Somali: "so",
        Spanish: "es",
        Sundanese: "su",
        Swahili: "sw",
        Swedish: "sv",
        Tajik: "tg",
        Tamil: "ta",
        Telugu: "te",
        Thai: "th",
        Turkish: "tr",
        Ukrainian: "uk",
        Urdu: "ur",
        Uzbek: "uz",
        Vietnamese: "vi",
        Welsh: "cy",
        Xhosa: "xh",
        Yiddish: "yi",
        Yoruba: "yo",
        Zulu: "zu",
      },
    };
  },
  methods: {
    shiftLeftOrRightThenSumOrXor(num, opArray) {
      return opArray.reduce((acc, opString) => {
        var op1 = opString[1]; //	'+' | '-' ~ SUM | XOR
        var op2 = opString[0]; //	'+' | '^' ~ SLL | SRL
        var xd = opString[2]; //	[0-9a-f]

        this.assert(op1 === "+" || op1 === "-", "Invalid OP: " + op1);
        this.assert(op2 === "+" || op2 === "^", "Invalid OP: " + op2);
        this.assert(
          ("0" <= xd && xd <= "9") || ("a" <= xd && xd <= "f"),
          "Not an 0x? value: " + xd
        );

        var shiftAmount = this.hexCharAsNumber(xd);
        var mask = op1 == "+" ? acc >>> shiftAmount : acc << shiftAmount;
        return op2 == "+" ? (acc + mask) & 0xffffffff : acc ^ mask;
      }, num);
    },

    assert(cond, err) {
      if (!cond) {
        throw Error(err);
      }
    },

    hexCharAsNumber(xd) {
      return xd >= "a" ? xd.charCodeAt(0) - 87 : Number(xd);
    },

    transformQuery(query) {
      for (var e = [], f = 0, g = 0; g < query.length; g++) {
        var l = query.charCodeAt(g);
        if (l < 128) {
          e[f++] = l; //	0{l[6-0]}
        } else if (l < 2048) {
          e[f++] = (l >> 6) | 0xc0; //	110{l[10-6]}
          e[f++] = (l & 0x3f) | 0x80; //	10{l[5-0]}
        } else if (
          0xd800 == (l & 0xfc00) &&
          g + 1 < query.length &&
          0xdc00 == (query.charCodeAt(g + 1) & 0xfc00)
        ) {
          //	that's pretty rare... (avoid ovf?)
          l =
            (1 << 16) + ((l & 0x03ff) << 10) + (query.charCodeAt(++g) & 0x03ff);
          e[f++] = (l >> 18) | 0xf0; //	111100{l[9-8*]}
          e[f++] = ((l >> 12) & 0x3f) | 0x80; //	10{l[7*-2]}
          e[f++] = (l & 0x3f) | 0x80; //	10{(l+1)[5-0]}
        } else {
          e[f++] = (l >> 12) | 0xe0; //	1110{l[15-12]}
          e[f++] = ((l >> 6) & 0x3f) | 0x80; //	10{l[11-6]}
          e[f++] = (l & 0x3f) | 0x80; //	10{l[5-0]}
        }
      }
      return e;
    },

    normalizeHash(encondindRound2) {
      if (encondindRound2 < 0) {
        encondindRound2 = (encondindRound2 & 0x7fffffff) + 0x80000000;
      }
      return encondindRound2 % 1e6;
    },

    /*
/	EXAMPLE:
/
/	INPUT: query: 'hola', windowTkk: '409837.2120040981'
/	OUTPUT: '70528.480109'
/
*/
    calcHash(query, windowTkk) {
      //	STEP 1: spread the the query char codes on a byte-array, 1-3 bytes per char
      var bytesArray = this.transformQuery(query);

      //	STEP 2: starting with TKK index, add the array from last step one-by-one, and do 2 rounds of shift+add/xor
      var d = windowTkk.split(".");
      var tkkIndex = Number(d[0]) || 0;
      var tkkKey = Number(d[1]) || 0;

      var encondingRound1 = bytesArray.reduce((acc, current) => {
        acc += current;
        return this.shiftLeftOrRightThenSumOrXor(acc, ["+-a", "^+6"]);
      }, tkkIndex);

      //	STEP 3: apply 3 rounds of shift+add/xor and XOR with they TKK key
      var encondingRound2 =
        this.shiftLeftOrRightThenSumOrXor(encondingRound1, [
          "+-3",
          "^+b",
          "+-f",
        ]) ^ tkkKey;

      //	STEP 4: Normalize to 2s complement & format
      var normalizedResult = this.normalizeHash(encondingRound2);

      return normalizedResult.toString() + "." + (normalizedResult ^ tkkIndex);
    },
    async chaosTranslate() {
      console.log(this.calcHash("日你妈", "448487.932609646"));
      // if (this.message != "") {
      //   console.log(this.message, this.languages[this.language_selected]);
      //   this.translator
      //     .translate("Hello world", "en", "de")
      //     .then((translate) => console.log("Translate result", translate));
      // }
    },
    async translate(from, to) {
      var result = await this.translator.translate(this.message, from, to);
      console.log(result);
    },
  },
  created() {
    // Use some CORS proxy service address as prefix
    // this.translator = new GoogleTranslator({
    //   corsProxy: "ttps://api.allorigins.win/raw?url=",
    // });
  },
};
</script>




<style scoped>
</style>