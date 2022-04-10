import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import './index.css'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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
    measurementId: "G-FJCLF10MGQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
createApp(App).use(store).mount("#app");
