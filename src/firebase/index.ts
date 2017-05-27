import { AngularFireModule, AuthMethods } from 'angularfire2';


const firebaseConfig = {
      	apiKey: 'AIzaSyA3Y24VTGHLp0DDRd92jBBRP4Tg_ay3g0s',
    authDomain: 'uwicloudcast.firebaseapp.com',
    databaseURL: 'https://uwicloudcast.firebaseio.com',
    storageBucket: 'uwicloudcast.appspot.com'
};

const firebaseAuthConfig = {
  method: AuthMethods.Popup,
  remember: 'default'
};


export const FirebaseModule = AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig);
