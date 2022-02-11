/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { boot } from 'quasar/wrappers';

import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyAodh_v_BV8rxh4M6hvW0CS00V2I840jsU',
  authDomain: 'stabilus-app.firebaseapp.com',
  projectId: 'stabilus-app',
  storageBucket: 'stabilus-app.appspot.com',
  messagingSenderId: '903066835699',
  appId: '1:903066835699:web:8c87aa4e3e707e57337586',
};

const app = initializeApp(firebaseConfig);

export { app };

export default boot(async (/* { app, router, ... } */) => {
  // something to do
});
