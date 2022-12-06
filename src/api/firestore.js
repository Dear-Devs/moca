import { firebaseConnection } from "./firebase.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { response } from "./response.js";
let responseJson = {};

const firestore = getFirestore(firebaseConnection);

// General functions
const addToCollection = async (collectionName, data) => {
  try {
    console.log(collectionName, data);

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

// Specific functions
const getPendingAttendance = async (employeeId) => {
  try {
    let docRef = null;

    const querySnapshot = await getDocs(
      query(
        collection(firestore, "attendance"),
        where("check_out/url_photo", "==", "bad_url.jpg"),
        where("employee_id", "==", employeeId)
      )
    );

    querySnapshot.forEach((doc) => {
      docRef = doc;
    });

    const flag = docRef && docRef.id ? true : false;

    responseJson = response(flag ? 200 : 500, {
      status: flag,
      message: flag ? "Successful load" : "An error has occurred",
      data: flag
        ? {
            id: docRef.id,
            data: docRef.data(),
          }
        : {},
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

export { addToCollection, getPendingAttendance };
