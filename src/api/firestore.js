import { firebaseConnection } from "./firebase.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import { response } from "./response.js";
let responseJson = {};

const firestore = getFirestore(firebaseConnection);

// General functions
const addToCollection = async (collectionName, data, id) => {
  try {
    let docRef, flag;

    if (id != null) {
      const specificDocRef = doc(firestore, collectionName, id);
      docRef = await updateDoc(specificDocRef, data);
      flag = true;
    } else {
      docRef = await addDoc(collection(firestore, collectionName), data);
      flag = docRef ? true : false;
    }

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
    const collectionRef = collection(firestore, "attendance");

    // Create a query against the collection.
    const q = query(
      collectionRef,
      where(
        "check_out.url_photo",
        "==",
        "https://www.some-page.com/bad_url.jpg"
      ),
      where("employee_id", "==", employeeId)
    );

    const querySnapshot = await getDocs(q);
    const docRef = querySnapshot.docs[0];
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

const getMyAttendances = async (employeeId) => {
  try {
    const collectionRef = collection(firestore, "attendance");

    // Create a query against the collection.
    const q = query(collectionRef, where("employee_id", "==", employeeId));

    const querySnapshot = await getDocs(q);
    const docs = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    const flag = docs.length > 0 ? true : false;

    responseJson = response(flag ? 200 : 500, {
      status: flag,
      message: flag ? "Successful load" : "An error has occurred",
      data: docs,
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

const getAllAttendances = async (companyId) => {
  try {
    const collectionRef = collection(firestore, "attendance");

    // Create a query against the collection.
    const q = query(collectionRef, where("company.id", "==", companyId));

    const querySnapshot = await getDocs(q);
    const docs = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    const flag = docs.length > 0 ? true : false;

    responseJson = response(flag ? 200 : 500, {
      status: flag,
      message: flag ? "Successful load" : "An error has occurred",
      data: docs,
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

export {
  addToCollection,
  getPendingAttendance,
  getAllAttendances,
  getMyAttendances,
};
