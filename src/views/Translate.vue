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
      <div class="flex flex-wrap mb-2 mt-3 w-96">
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
        <div class="w-full mb-2 mt-1 group">
          <button
            class="
              border border-white
              w-full
              rounded-md
              py-2
              group-active:bg-gray-100
            "
            @click="this.go2heroku()"
          >
            <span
              class="px-2 text-white text-2xl font-sans group-active:text-black"
              >GET ACCESS</span
            >
          </button>
        </div>
        <div class="w-full mb-6 mt-1 group">
          <button
            class="
              border border-white
              w-full
              rounded-md
              py-2
              group-active:bg-gray-100
              disabled:border-gray-500
            "
            @click="this.chaosTranslate()"
            :disabled="this.translating"
          >
            <span
              class="
                px-2
                text-white text-2xl
                font-sans
                group-active:text-black
                disabled:text-gray-500
              "
              :disabled="this.translating"
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
      translating: false,
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
      language_names: null,
    };
  },
  methods: {
    go2heroku() {
      window.open(
        "https://cors-anywhere.herokuapp.com/",
        "_blank" // <- This is what makes it open in a new window.
      );
    },
    async chaosTranslate() {
      if (this.message != "") {
        this.translating = true;
        var rand_lang_codes = [];
        var rand_lang = [];
        const first_lang = this.languages[this.language_selected];
        rand_lang_codes.push(first_lang);
        rand_lang.push(this.language_selected);
        while (rand_lang_codes.length < 10) {
          var rand_index = Math.floor(
            Math.random() * this.language_names.length
          );
          if (
            this.languages[this.language_names[rand_index]] !=
            rand_lang_codes[rand_lang_codes.length - 1]
          ) {
            rand_lang.push(this.language_names[rand_index]);
            rand_lang_codes.push(
              this.languages[this.language_names[rand_index]]
            );
          }
        }
        rand_lang_codes.push(this.languages[this.language_selected]);
        rand_lang.push(this.language_selected);
        for (var i = 1; i < rand_lang_codes.length && this.translating; i++) {
          this.message = await this.translate(
            rand_lang_codes[i - 1],
            rand_lang_codes[i]
          );
          this.language_selected = rand_lang[i];
        }
        this.translating = false;
      }
    },
    async translate(from, to) {
      try {
        var result = await this.translator.translate(this.message, from, to);
        return result;
      } catch (e) {
        console.log(e);
        alert(
          "Either you did not activate, or you have used up your limit.\nTry in another hour!"
        );
        this.translating = false;
      }
    },
  },
  created() {
    this.language_names = Object.keys(this.languages);
    // Use some CORS proxy service address as prefix
    this.translator = new GoogleTranslator({
      corsProxy: "https://frozen-falls-94508.herokuapp.com/",
    });
  },
};
</script>




<style scoped>
</style>
