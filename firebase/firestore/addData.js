import { firebase_app } from "../config";
import { getFirestore, doc, setDoc, collection, addDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);
export default async function addData(colllection, id, data) {
    let result = null;
    let error = null;

    try {
        const result = await addDoc(collection(db, "id"), {
            first: "",
            last: "",
            email: ""
        });
        // result = await setDoc(doc(db, colllection, id), data, {
        //     merge: true,
        // });
    } catch (e) {
        error = e;
    }

    return { result, error };
}