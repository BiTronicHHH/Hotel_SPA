import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./config"; // Import the firebase storage object

export const uploadImage = async(image, folder, uid) => {
    if (!image) {
        return null;
    }
    if (image.url.includes("https://") && !image.url.includes("blob:")) return image.url;
    // const filename = `${Date.now()}-${image.file.name}`;
    const filename = `${Date.now()}-${image.file.name}`;
    const storageRef = ref(storage, `${folder}/${uid}/${filename}`);
    return new Promise((resolve, reject) => {
        const uploadTask = uploadBytesResumable(storageRef, image.file);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
            },
            (err) => console.log(err),
            async() => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    return resolve(url);
                }).catch((e) => reject(e));
            }
        );
    });
}