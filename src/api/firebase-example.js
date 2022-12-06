/**
 * This is an example file, follow the next instructions
 *
 * - Copy and paste all content in a new file called firebase.js
 * - Copy and paste all important data to firebaseConfig constant (apiKey, authDomain, etc).
 */

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { response } from "./response.js";

let responseJson = {};
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

// Initialize Firebase
const firebaseConnection = initializeApp(firebaseConfig);
const firebaseStorage = getStorage(firebaseConnection);

/**
 * Save an base64 formatted string
 */
const saveImageBase64 = async (folder, base64Image) => {
  try {
    const storageRef = ref(firebaseStorage, folder);
    const snapshot = await uploadString(storageRef, base64Image, "data_url");

    if (snapshot) {
      const urlDownload = await getDownloadURL(snapshot.ref);
      const flag = urlDownload ? true : false;

      responseJson = response(flag ? 200 : 500, {
        status: flag,
        message: flag ? "Se ha cargado correctamente" : "Ha ocurrido un error",
        data: urlDownload,
      });
    } else {
      responseJson = response(500, {
        status: false,
        message: "Ha ocurrido un error",
        data: {},
      });
    }
  } catch (ex) {
    console.error(ex);
    responseJson = response(500, {
      status: false,
      message: "Ha ocurrido un error",
      data: {},
    });
  }

  return responseJson;
};

export { saveImageBase64 };
