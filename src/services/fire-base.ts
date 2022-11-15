import dotenv from "dotenv";
import firebase from "firebase/app";
import "firebase/auth"; // for authentication
import "firebase/storage"; // for storage
dotenv.config();

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DB_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
}

export const Providers = {
  google: new firebase.auth.GoogleAuthProvider(),
};

export const auth = firebase.auth();

export const uploadProfileImage = async (image: any, name: any) => {
  const uploadTask = firebase
    .storage()
    .ref("images/profile/" + name)
    .put(image);
  await uploadTask.on(
    "state_changed",
    (snapshot) => {},
    (error) => {
      console.error(error);
    }
  );
};

export const uploadImage = async (image: any) => {
  const uploadTask = firebase
    .storage()
    .ref("images/rent/" + image.name)
    .put(image);
  await uploadTask.on(
    "state_changed",
    (snapshot) => {},
    (error) => {
      console.error(error);
    }
  );
};

export const getImageRentSource = async (name: any) => {
  let result: string = "";
  await firebase
    .storage()
    .ref("images/rent/")
    .child(name)
    .getDownloadURL()
    .then((url) => {
      result = url;
    });
  return result;
};

export const getImageSource = async (name: any) => {
  let result: string = "";
  await firebase
    .storage()
    .ref("images/profile/")
    .child(name)
    .getDownloadURL()
    .then((url) => {
      result = url;
    });
  return result;
};
export default firebase;
