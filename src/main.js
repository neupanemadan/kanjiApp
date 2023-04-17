import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { initializeApp } from 'firebase/app'; // import initializeApp
import 'firebase/database';
import firebaseConfig from './firebaseConfig';

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig); // initialize the app

const app = createApp(App);
app.use(router);
app.mount('#app');
