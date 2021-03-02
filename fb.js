import firebase from 'firebase/app';
import 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyD_lioOKPdKAkuQBT__MTcvPmbuW-J-YLU',
  authDomain: 'neleryasak.firebaseapp.com',
  projectId: 'neleryasak',
  storageBucket: 'neleryasak.appspot.com',
  messagingSenderId: '661383306527',
  appId: '1:661383306527:web:0e47a96be4b77088fc642a',
  measurementId: 'G-1BXKDFJL5P',
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const analytics = firebase.analytics;

export { firebase, analytics };
