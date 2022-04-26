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
      ></textarea>
      <div class="flex flex-wrap mb-2 mt-3">
        <div class="w-full mb-6 md:mb-0">
          <label
            class="
              block
              uppercase
              tracking-wide
              text-white text-sm
              font-bold
              mb-2
            "
            for="grid-state"
          >
            language
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
              <option v-for="item in languages" :value="item">
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
        <div class="w-full mb-6 mt-3 group">
          <button
            class="
              border border-white
              w-full
              rounded-md
              py-2
              group-active:bg-gray-100
            "
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
// import { GoogleTranslator } from "@translate-tools/core/translators/GoogleTranslator";

// // Use some CORS proxy service address as prefix
// const translator = new GoogleTranslator({
//   corsProxy: "https://cors-anywhere.herokuapp.com/",
// });

// translator
//   .translate("Hello world", "en", "de")
//   .then((translate) => console.log("Translate result", translate));
export default {
  name: "Translate",
  data() {
    return {
      language_selected: "English",
      languages: {
        af: "Afrikaans",
        sq: "Albanian",
        am: "Amharic",
        ar: "Arabic",
        hy: "Armenian",
        az: "Azerbaijani",
        eu: "Basque",
        be: "Belarusian",
        bn: "Bengali",
        bs: "Bosnian",
        bg: "Bulgarian",
        ca: "Catalan",
        ceb: "Cebuano",
        ny: "Chichewa",
        "zh-cn": "Chinese Simplified",
        "zh-tw": "Chinese Traditional",
        co: "Corsican",
        hr: "Croatian",
        cs: "Czech",
        da: "Danish",
        nl: "Dutch",
        en: "English",
        eo: "Esperanto",
        et: "Estonian",
        tl: "Filipino",
        fi: "Finnish",
        fr: "French",
        fy: "Frisian",
        gl: "Galician",
        ka: "Georgian",
        de: "German",
        el: "Greek",
        gu: "Gujarati",
        ht: "Haitian Creole",
        ha: "Hausa",
        haw: "Hawaiian",
        iw: "Hebrew",
        hi: "Hindi",
        hmn: "Hmong",
        hu: "Hungarian",
        is: "Icelandic",
        ig: "Igbo",
        id: "Indonesian",
        ga: "Irish",
        it: "Italian",
        ja: "Japanese",
        jw: "Javanese",
        kn: "Kannada",
        kk: "Kazakh",
        km: "Khmer",
        ko: "Korean",
        ku: "Kurdish (Kurmanji)",
        ky: "Kyrgyz",
        lo: "Lao",
        la: "Latin",
        lv: "Latvian",
        lt: "Lithuanian",
        lb: "Luxembourgish",
        mk: "Macedonian",
        mg: "Malagasy",
        ms: "Malay",
        ml: "Malayalam",
        mt: "Maltese",
        mi: "Maori",
        mr: "Marathi",
        mn: "Mongolian",
        my: "Myanmar (Burmese)",
        ne: "Nepali",
        no: "Norwegian",
        ps: "Pashto",
        fa: "Persian",
        pl: "Polish",
        pt: "Portuguese",
        ma: "Punjabi",
        ro: "Romanian",
        ru: "Russian",
        sm: "Samoan",
        gd: "Scots Gaelic",
        sr: "Serbian",
        st: "Sesotho",
        sn: "Shona",
        sd: "Sindhi",
        si: "Sinhala",
        sk: "Slovak",
        sl: "Slovenian",
        so: "Somali",
        es: "Spanish",
        su: "Sundanese",
        sw: "Swahili",
        sv: "Swedish",
        tg: "Tajik",
        ta: "Tamil",
        te: "Telugu",
        th: "Thai",
        tr: "Turkish",
        uk: "Ukrainian",
        ur: "Urdu",
        uz: "Uzbek",
        vi: "Vietnamese",
        cy: "Welsh",
        xh: "Xhosa",
        yi: "Yiddish",
        yo: "Yoruba",
        zu: "Zulu",
      },
    };
  },
  methods: {},
  created() {},
};
</script>




<style scoped>
</style>