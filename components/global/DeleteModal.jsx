import React, { useState, useEffect } from "react";
import Logo from './Logo'
import { doc, deleteDoc, getDoc } from "firebase/firestore";
import { AuthContext } from '@/context/AuthContext';
import { getStorage, ref, deleteObject } from "firebase/storage";
import { storage, db } from "@/firebase/config";
import { useRouter } from "next/router";
import LoadingModal from "./LoadingModal";
import loadingContext from '@/context/LoadingContext'


export default function AccountDeleteModal({ closeModal, firstName, lastName }) {
    const { isLoading, setIsLoading } = React.useContext(loadingContext);
    const [isActive, setIsActive] = React.useState(false);
    const [confirm, setConfirm] = React.useState("");
    const Router = useRouter();
    const { user, logOut, delUser } = React.useContext(AuthContext);
    const deleteAccount = async () => {
        closeModal();
        const docSnap = await getDoc(doc(db, 'userAccount', user.uid));
        if (docSnap.exists()) {
            const myData = docSnap.data();
            setIsLoading(true);
            await deleteDoc(doc(db, "userAccount", user.uid));
            const avatarRef = ref(storage, `users/${user.uid}/avatar`);
            const backRef = ref(storage, `background/${user.uid}/avatar`);
            if (myData.avatar) { await deleteObject(avatarRef); }
            if (myData.bg) { await deleteObject(backRef); }
            delUser(user);
            setIsLoading(false);
            logOut();
        }
        Router.push('/');
    }
    const handleConfirm = (e) => {
        setConfirm(e.target.value);
    }
    React.useEffect(() => {
        if(confirm == `${firstName} ${lastName}`) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [confirm])
    return (
        <>
            <div className="w-full flex justify-center ">
                <Logo rotateClassName="scale-125"/>
            </div>
            <span className="text-[#666] font-semibold text-xl xl:text-2xl 2xl:text-3xl my-3 lg:leading-relaxed mt-8 flex justify-center text-center">
                You are about to permanently delete your account. <br />Are you sure you want to do this?
            </span>
            <div className="mt-4 mb-12 mx-1">
                <div className='font-semibold mb-2 text-xl'>Confirm you want to delete this account by typing your full name: <span className="font-bold text-red-500">{firstName}&nbsp;{lastName}</span></div>
                <input type='text' className="pr-12 input-box w-full bg-black rounded-lg px-4 py-2 border outline-[#777] mr-0 text-xs md:text-lg lg:text-xl placeholder:text-gray-400 text-gray-800 placeholder:font-base border-gray-200 focus:border-none focus:outline-none border-none outline-none" placeholder={`${firstName} ${lastName}`} value={confirm} onChange={handleConfirm} />
            </div>
            <div className="w-full lg:flex gap-2">
                <button onClick={() => deleteAccount()} className={`w-5/6 xl:w-2/3 px-6 py-3  border-2 border-[#777]  rounded-xl  mx-auto flex justify-center items-center my-3 gap-1 ${isActive ? 'text-white bg-red-500 hover:bg-red-600 hover:text-white' : 'text-gray-500'}`} disabled={!isActive}>
                    <div className="text-sm xl:text-lg font-bold" >Delete</div>
                </button>
                <button onClick={() => closeModal()} className="w-5/6 xl:w-2/3 px-6 py-3 text-blue-500 border-2 border-[#777] hover:bg-blue-500 rounded-xl  mx-auto flex justify-center items-center my-3 hover:text-white gap-1">
                    <div className="text-sm xl:text-lg font-bold">Cancel</div>
                </button>
            </div>

        </>
    )
}