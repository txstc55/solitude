<template>
  <div class="h-screen grid" v-show="exitPressed == '0'">
    <h1 class="text-white mt-auto font-mono text-3xl countText text-center">
      You can only click this button every {{ wait }} seconds<br />
      This button has been clicked {{ totalClicks }} times
    </h1>
    <div class="relative group m-auto">
      <div
        class="
          absolute
          rounded-lg
          blur
          opacity-75
          group-hover:opacity-100
          transition
          duration-1000
          group-hover:duration-200
          animate-tilt
        "
      ></div>
      <button
        class="
          relative
          px-5
          py-4
          bg-black
          rounded-lg
          flex
          items-center
          border-slate-200/70 border-2
          transition-colors
          hover:border-slate-300
          duration-200
          shadow-lg
          group-active:bg-white group-active:border-slate-700
          disabled:bg-gray-500
        "
        @click="this.updateClick"
        :disabled="disableButton"
      >
        <span
          class="
            px-2
            text-white
            font-bold
            text-2xl
            font-sans
            group-active:text-black noselect
          "
          >Click Me</span
        >
      </button>
    </div>
    <div class="mb-auto relative">
      <h1 class="text-white font-mono text-3xl timeText">
        This button was last clicked {{ lastClickedTimeSeconds }} seconds ago<br /><br />
      </h1>
      <br />
    </div>
  </div>
</template>

<script>
import {
  doc,
  getDoc,
  updateDoc,
  increment,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import router from "../router";
// import {firebase} from "firebase"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7xScHkbEIx5xazelCYMDL2VT6puJtef0",
  authDomain: "solitude-b93da.firebaseapp.com",
  databaseURL: "https://solitude-b93da-default-rtdb.firebaseio.com",
  projectId: "solitude-b93da",
  storageBucket: "solitude-b93da.appspot.com",
  messagingSenderId: "1073417028194",
  appId: "1:1073417028194:web:cf4fd0c24ff2388d35873b",
  measurementId: "G-FJCLF10MGQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore();
export default {
  name: "Button",
  data() {
    return {
      totalClicks: "???",
      lastClickedTimeSeconds: "???",
      lastClickedTime: 0,
      clickDocSnap: null,
      clickDocRef: null,
      disableButton: false,
      wait: 1,
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
      return '0'; // 0 for not pressed, 1 for pressed
    },
  },
  methods: {
    incrementTime() {
      this.lastClickedTimeSeconds = Math.max(
        0,
        Math.floor((new Date().getTime() - this.lastClickedTime) / 1000)
      );
      setTimeout(this.incrementTime, 100);
    },
    getClickSpecs() {
      this.totalClicks = this.clickDocSnap.data().Count;
      this.wait = 3 * Math.ceil(Math.pow(1.2, Math.log2(this.totalClicks)));
      this.lastClickedTime = new Date(
        this.clickDocSnap.data().LastClickedTime.seconds * 1000
      );
      this.lastClickedTimeSeconds = Math.max(
        0,
        Math.floor((new Date().getTime() - this.lastClickedTime) / 1000)
      );
    },
    updateClick() {
      if (this.clickDocRef != null) {
        updateDoc(this.clickDocRef, {
          Count: increment(1),
          LastClickedTime: serverTimestamp(),
        });
        this.disableButton = true;
        let me = this;
        setTimeout(() => {
          me.disableButton = false;
        }, this.wait * 1000);
      }
    },
  },
  async created() {
    if (this.exitPressed == '1') {
      router.push("/exit");
    }
    this.clickDocRef = doc(db, "Clicks", "0");
    this.clickDocSnap = await getDoc(this.clickDocRef);
    if (this.clickDocSnap.exists()) {
      this.getClickSpecs();
      this.incrementTime();
      onSnapshot(doc(db, "Clicks", "0"), (doc) => {
        if (!doc.metadata.hasPendingWrites) {
          this.clickDocSnap = doc;
          this.getClickSpecs();
        } else {
          this.totalClicks += 1;
          this.wait = 3 * Math.ceil(Math.pow(1.2, Math.log2(this.totalClicks)));
          this.lastClickedTime = new Date();
          this.lastClickedTimeSeconds = 0;
        }
      });
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  },
};
</script>

<style scoped>
.timeText {
  text-align: center;
}
</style>