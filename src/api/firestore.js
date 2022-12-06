import { firebaseConnection } from "./firebase.js";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { response } from "./response.js";
let responseJson = {};

const firestore = getFirestore(firebaseConnection);

// General functions
const addToCollection = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(firestore, collectionName), data);
    const flag = docRef.id ? true : false;

    responseJson = response(flag ? 200 : 500, {
      status: flag,
      message: flag ? "Successful load" : "An error has occurred",
      data: docRef,
    });
  } catch (ex) {
    console.error(ex);
    responseJson = response(500, {
      status: false,
      message: "An error has occurred",
      data: {},
    });
  }

  return responseJson;
};

/**
 * url_photo,
 * lat,
 * lng,
 * check_in_date,
 * check_out_date,
 */

// Specific functions
const getPendingAttendance = async () => {};

export { addToCollection };
