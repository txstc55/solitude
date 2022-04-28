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
        h-56
        animate-in
        fade-in
        zoom-in
        duration-300
      "
      v-for="(item, index) in wikiTitles"
      :key="index"
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
      >
        <div class="h-36 overflow-y-scroll">
          <h5
            class="text-white leading-tight mb-1 font-mono font-bold text-2xl"
          >
            {{ wikiTitles[index] }}
          </h5>
          <p class="text-white text-base mb-2 font-mono">
            Link position in last page: {{ wikiLinkPositions[index] }} <br />
            Categories: {{ wikiCategories[index].join(", ") }}
          </p>
        </div>
        <a :href="wikiLinks[index]" target="_blank">
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
        </a>
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
          @click="
            this.searchInput = this.wikiLinks[index];
            this.findPath();
          "
          :disabled="this.findingPath"
        >
          build
        </button>
      </div>
    </div>
    <div
      class="
        absolute
        bottom-4
        mx-auto
        left-1/2
        transform
        -translate-x-1/2 -translate-y-1/2
      "
    >
      <div class="relative w-96 float-left">
        <div
          class="
            flex
            absolute
            inset-y-0
            left-0
            items-center
            pl-3
            pointer-events-none
          "
        >
          <svg
            class="w-5 h-5 text-gray-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
        <input
          type="text"
          class="
            block
            p-2
            pl-10
            w-full
            text-gray-900
            bg-gray-50
            rounded-lg
            border border-gray-300
            focus:ring-slate-500 focus:border-slate-500
            dark:bg-gray-900/50
            dark:border-gray-600
            dark:placeholder-gray-400
            dark:text-white
            dark:focus:ring-slate-500
            dark:focus:border-slate-500
            font-mono
          "
          placeholder="Wikipedia page link"
          v-model="searchInput"
        />
      </div>
      <div class="w-full lg:ml-96 pl-0 lg:pl-2 mt-2 lg:mt-0.5">
        <button
          class="
            bg-gray-700/50
            w-full
            lg:w-32
            rounded-md
            py-1.5
            active:bg-gray-100
            h-10
            font-mono
            text-white
            active:text-black
            disabled:bg-gray-700 disabled:text-gray-300
          "
          @click="this.findPath()"
          :disabled="this.findingPath"
        >
          Search
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import wtf from "wtf_wikipedia";
export default {
  name: "Philisophy",
  data() {
    return {
      findingPath: false,
      searchInput: "",
      wikiTitles: [],
      wikiCategories: [],
      wikiLinks: [],
      wikiLinkPositions: [],
      links: [],
      seenPages: new Set([]),
    };
  },
  methods: {
    async findPath() {
      if (
        !this.searchInput.includes("wikipedia.org") ||
        !this.searchInput.includes("http")
      ) {
        alert("Please enter a valid wiki link");
        return;
      } else {
        // clear out everything
        this.wikiTitles = [];
        this.wikiCategories = [];
        this.wikiLinks = [];
        this.wikiLinkPositions = [];
        this.links = [];
        this.seenPages = new Set([]);
        try {
          this.findingPath = true;
          const firstDoc = await wtf.fetch(this.searchInput);
          // for card info
          this.wikiTitles.push(firstDoc.title());
          this.wikiCategories.push(firstDoc.categories());
          this.wikiLinks.push(this.searchInput);
          // get all the links, start a queue
          this.seenPages.add(firstDoc.title().toLowerCase());
          this.wikiLinkPositions.push(0);
          if (firstDoc.title().toLowerCase() == "philosophy") {
            this.findingPath = false;
            return;
          }
          var firstPageQueue = [];
          const sections = firstDoc.sections();
          for (var i = 0; i < sections.length; i++) {
            const paragraphs = sections[i].paragraphs();
            for (var j = 0; j < paragraphs.length; j++) {
              const sentences = paragraphs[j].sentences();
              for (var k = 0; k < sentences.length; k++) {
                const links = sentences[k].links();
                for (var l = 0; l < links.length; l++) {
                  const link = links[l];
                  firstPageQueue.push(link.page());
                }
              }
            }
          }
          var pageQueue = [
            { candidates: firstPageQueue, count: firstPageQueue.length },
          ];
          while (pageQueue.length != 0) {
            // we still have queues
            if (pageQueue[0].candidates.length == 0) {
              // the first queue list is empty
              // which means there is no more link for this page to visit
              // remove this card
              this.wikiTitles.pop();
              this.wikiCategories.pop();
              this.wikiLinks.pop();
              this.wikiLinkPositions.pop();
              pageQueue = pageQueue.slice(1);
            } else {
              const pageCandidate = pageQueue[0].candidates.shift();
              // now we need to check if we have visited this page before
              if (this.seenPages.has(pageCandidate.toLowerCase())) {
                // this page has been visited
                // we want to use the second link from the last page
                // pageQueue = pageQueue.slice(1);
              } else {
                this.seenPages.add(pageCandidate.toLowerCase());
                // we have never seen this page before
                this.wikiLinkPositions.push(
                  pageQueue[0].count - pageQueue[0].candidates.length
                );
                var newPages = await this.findNext(pageCandidate);
                if (pageCandidate.toLowerCase() == "philosophy") {
                  this.findingPath = false;
                  // we have reached the destiny
                  break;
                } else {
                  pageQueue.unshift({
                    candidates: newPages,
                    count: newPages.length,
                  });
                }
              }
            }
          }
        } catch (e) {
          console.log(e);
          this.findingPath = false;
          alert(
            "Please make sure you entered a valid wiki link and internet is connected"
          );
        }
      }
      // console.log(categories);
    },
    async findNext(page) {
      const doc = await wtf.fetch(page);
      this.wikiTitles.push(doc.title());
      this.wikiCategories.push(doc.categories());
      this.wikiLinks.push(doc.url());
      if (page.toLowerCase() == "philosophy") {
        return [];
      }
      const allPages = [];
      const sections = doc.sections();
      for (var i = 0; i < sections.length; i++) {
        const paragraphs = sections[i].paragraphs();
        for (var j = 0; j < paragraphs.length; j++) {
          const sentences = paragraphs[j].sentences();
          for (var k = 0; k < sentences.length; k++) {
            const links = sentences[k].links();
            for (var l = 0; l < links.length; l++) {
              const link = links[l];
              allPages.push(link.page());
            }
          }
        }
      }
      return allPages;
    },
  },
  mounted() {},
};
</script>

<style scoped>
</style>