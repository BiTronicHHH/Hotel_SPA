import React from 'react'
import { FaBurn, FaChevronDown, FaTimes } from 'react-icons/fa'
import ImageUploadBtn from './ImageUploadBtn'
import SingleUploadBtn from './SingleUploadBtn'
import { Snackbar } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { AlertState } from '@/components/utils/misc';
import Image from 'next/image'
import PlusBtn from './PlusBtn'
import { TagsInput } from "react-tag-input-component";
import { AuthContext } from "@/context/AuthContext";
import { doc, addDoc, collection, getDoc } from "firebase/firestore";
import { db } from '../../firebase/config'
import { uploadImage } from '../../firebase/helpers';
import loadingContext from '@/context/LoadingContext'
import LoadingModal from '../global/LoadingModal'
import imageCompression from 'browser-image-compression';

export default function Sell() {
    const { user } = React.useContext(AuthContext);
    const { isLoading, setIsLoading } = React.useContext(loadingContext);
    const genres = ['Midjourney', 'GPT'];
    const gptTypes = ['GPT-3.5', 'GPT-4'];
    const categories = ['3D', 'Animals', 'Anime', 'Art', 'Avatars', 'Buildings'];
    const sub = ['Cartoons', 'Clothes', 'Fantasy', 'Nature', 'Patterns']
    const fourFeatures = ['Default', 'Advanced Data Analysis', 'Plugins']
    const [alertState, setAlertState] = React.useState<AlertState>({
        open: false,
        message: '',
        severity: undefined,
    })
    const [imageState, setImageState] = React.useState(false);
    const [isNeedAdd, setIsNeedAdd] = React.useState(false);
    const [isPrompt, setIsPrompt] = React.useState(true);
    const [isFour, setIsFour] = React.useState(false);
    const [pluginContent, setPluginContent] = React.useState("");
    const [isPlugin, setPlugin] = React.useState(false);
    const [images, setImages] = React.useState<string[]>(['']);
    const [selected, setSelected] = React.useState(["Prompt", "Awesome"]);
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [promptFormula, setPromptFormula] = React.useState("");
    const [examplePrompt, setExamplePrompt] = React.useState("");
    const [howUse, setHowUse] = React.useState("");
    const [gptFeature, setGptFeature] = React.useState("Default");
    const [category, setCategory] = React.useState("3D");
    const [subCategory, setSubCategory] = React.useState("Cartoons");
    const [input, setInput] = React.useState("");   
    const [output, setOutput] = React.useState("");
    const [shareLink, setShareLink] = React.useState("");

    const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }
    const handleImageUpload = (files: FileList) => {
        if (files.length <= 5) {
            setImageState(true);
            const imageUrls = Object.values(files).map((file) => URL.createObjectURL(file));
            setImages(imageUrls);
            if (files.length < 5) {
                setIsNeedAdd(true);
            } else {
                setIsNeedAdd(false);
            }       
        } else {
            setAlertState({
                open: true,
                message: 'Please Upload Images Up To 5.',
                severity: 'error',
            })
        }
    };
    const handleAdd = (files: FileList) => {
        const imageUrls = Object.values(files).map((file) => URL.createObjectURL(file));
        const updatedUrls = [...images, imageUrls[0]]
        setImages(updatedUrls);
    };
    const handleDelete = (key: number) => {
        const updatedImages = [...images]; // Create a new array with the same elements
        updatedImages.splice(key, 1); // Remove one element at index key
        setImages(updatedImages); // Set the state with the new array
    };
    const handleGenre = (event: { target: { value: any; }; }) => {
        const selectedOption = event.target.value;
        if (selectedOption == "GPT") {
            setIsPrompt(false);
        } else {
            setIsPrompt(true);
        }
    };
    const handleGPTType = (event: { target: { value: any; }; }) => {
        const selectedOption = event.target.value;
        if (selectedOption == "GPT-3.5") {
            setIsFour(false);
        } else {
            setIsFour(true);
        }
    };
    const handlePlugin = (event: { target: { value: any; }; }) => {
        const selectedOption = event.target.value;
        setGptFeature(selectedOption);
        if (selectedOption == "Plugins") {
            setPlugin(true);
        } else {
            setPlugin(false);
        }
    };
    //Image Opt Options
    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 800,
        useWebWorker: true,
        maxIteration: 5
    }

    React.useEffect(() => {
        setImages([]);
    }, [isPrompt])
    React.useEffect(() => {
        if (images.length == 0) {
            setImageState(false);
        }
        if (images.length == 5) {
            setIsNeedAdd(false);
        } else if (images.length < 5) {
            setIsNeedAdd(true);
        }
    }, [images])

    const handleSubmit = async () => {
        if (user) {
            if (title && description && images.length && promptFormula && examplePrompt && howUse && selected.length) {

                if (isPrompt) {
                    setIsLoading(true);
                    let files = [];
                    for (let i = 0; i < images.length; i++) {
                        const response = await fetch(images[i]);
                        const blob = await response.blob();
                        const fileObj = new File([blob], `img${i}`, { type: blob.type });
                        const compressedImage = await imageCompression(fileObj, options);
                        const backImg = {
                            file: compressedImage,
                            url: images[i]
                        }
                        const faImage = await uploadImage(backImg, "background", user?.uid)
                        const picture = { url: faImage, show: true };
                        files.push(picture);
                    }
                    const docSnap = await getDoc(doc(db, 'userAccount', user.uid));
                    if (docSnap.exists()) {
                        const myData = docSnap.data();
                        await addDoc(collection(db, "prompt"), {
                            uid: user?.uid,
                            state: 'pending',
                            firstName: myData.firstName,
                            lastName: myData.lastName,
                            avatar: myData.avatar.url ? myData.avatar.url : '',
                            modelType: "midjourney",
                            title: title,
                            desc: description,
                            pic: files,
                            promptFormula: promptFormula,
                            examplePrompt: examplePrompt,
                            howUse: howUse,
                            category: category,
                            subCategory: subCategory,
                            tags: selected,
                            review: 0,
                            like: 0
                        });
                    }
                    setIsLoading(false);
                    setAlertState({
                        open: true,
                        message: 'Prompts Uploaded Successfully! Please Wait for Approval!',
                        severity: 'success',
                    })
                } else {
                    if (shareLink && input && output) {
                        if (isFour) {
                            if (isPlugin) {
                                if (pluginContent) {
                                    setIsLoading(true);
                                    let files = [];
                                    for (let i = 0; i < images.length; i++) {
                                        const response = await fetch(images[i]);
                                        const blob = await response.blob();
                                        const fileObj = new File([blob], `img${i}`, { type: blob.type });
                                        const compressedImage = await imageCompression(fileObj, options);
                                        const backImg = {
                                            file: compressedImage,
                                            url: images[i]
                                        }
                                        const faImage = await uploadImage(backImg, "background", user?.uid)
                                        const picture = { url: faImage, show: true };
                                        files.push(picture);
                                    }
                                    const docSnap = await getDoc(doc(db, 'userAccount', user.uid));
                                    if (docSnap.exists()) {
                                        const myData = docSnap.data();
                                        await addDoc(collection(db, "prompt"), {
                                            uid: user?.uid,
                                            state: 'pending',
                                            firstName: myData.firstName,
                                            lastName: myData.lastName,
                                            avatar: myData.avatar.url ? myData.avatar.url : '',
                                            modelType: "gpt",
                                            gptEngine: 4,
                                            gptFeature: gptFeature,
                                            plugin: pluginContent,
                                            title: title,
                                            desc: description,
                                            input: input,
                                            output: output,
                                            pic: files,
                                            promptFormula: promptFormula,
                                            examplePrompt: examplePrompt,
                                            howUse: howUse,
                                            category: category,
                                            subCategory: subCategory,
                                            shareLink: shareLink,
                                            tags: selected,
                                            review: 0,
                                            like: 0
                                        });
                                    }
                                    setIsLoading(false);
                                    setAlertState({
                                        open: true,
                                        message: 'Prompts Uploaded Successfully! Please Wait for Approval!',
                                        severity: 'success',
                                    })
                                } else {
                                    setAlertState({
                                        open: true,
                                        message: 'Please Fill Plugins Content!',
                                        severity: 'error',
                                    })
                                }
                            } else {
                                setIsLoading(true);
                                let files = [];
                                for (let i = 0; i < images.length; i++) {
                                    const response = await fetch(images[i]);
                                    const blob = await response.blob();
                                    const fileObj = new File([blob], `img${i}`, { type: blob.type });
                                    const compressedImage = await imageCompression(fileObj, options);
                                    const backImg = {
                                        file: compressedImage,
                                        url: images[i]
                                    }
                                    const faImage = await uploadImage(backImg, "background", user?.uid)
                                    const picture = { url: faImage, show: true };
                                    files.push(picture);
                                }
                                const docSnap = await getDoc(doc(db, 'userAccount', user.uid));
                                if (docSnap.exists()) {
                                    const myData = docSnap.data();
                                    await addDoc(collection(db, "prompt"), {
                                        uid: user?.uid,
                                        state: 'pending',
                                        firstName: myData.firstName,
                                        lastName: myData.lastName,
                                        avatar: myData.avatar.url ? myData.avatar.url : '',
                                        modelType: "gpt",
                                        gptEngine: 4,
                                        gptFeature: gptFeature,
                                        title: title,
                                        desc: description,
                                        input: input,
                                        output: output,
                                        pic: files,
                                        promptFormula: promptFormula,
                                        examplePrompt: examplePrompt,
                                        howUse: howUse,
                                        category: category,
                                        subCategory: subCategory,
                                        shareLink: shareLink,
                                        tags: selected,
                                        review: 0,
                                        like: 0
                                    });
                                }
                                setIsLoading(false);
                                setAlertState({
                                    open: true,
                                    message: 'Prompts Uploaded Successfully! Please Wait for Approval!',
                                    severity: 'success',
                                })
                            }
                        } else {
                            setIsLoading(true);
                            let files = [];
                            for (let i = 0; i < images.length; i++) {
                                const response = await fetch(images[i]);
                                const blob = await response.blob();
                                const fileObj = new File([blob], `img${i}`, { type: blob.type });
                                const compressedImage = await imageCompression(fileObj, options);
                                const backImg = {
                                    file: compressedImage,
                                    url: images[i]
                                }
                                const faImage = await uploadImage(backImg, "background", user?.uid)
                                const picture = { url: faImage, show: true };
                                files.push(picture);
                            }
                            const docSnap = await getDoc(doc(db, 'userAccount', user.uid));
                            if (docSnap.exists()) {
                                const myData = docSnap.data();
                                await addDoc(collection(db, "prompt"), {
                                    uid: user?.uid,
                                    state: 'pending',
                                    modelType: "gpt",
                                    firstName: myData.firstName,
                                    lastName: myData.lastName,
                                    avatar: myData.avatar.url ? myData.avatar.url : '',
                                    gptEngine: 3.5,
                                    title: title,
                                    desc: description,
                                    input: input,
                                    output: output,
                                    pic: files,
                                    promptFormula: promptFormula,
                                    examplePrompt: examplePrompt,
                                    howUse: howUse,
                                    category: category,
                                    subCategory: subCategory,
                                    shareLink: shareLink,
                                    tags: selected,
                                    review: 0,
                                    like: 0
                                });
                            }
                            setIsLoading(false);
                            setAlertState({
                                open: true,
                                message: 'Prompts Uploaded Successfully! Please Wait for Approval!',
                                severity: 'success',
                            })
                        }
                    } else {
                        setAlertState({
                            open: true,
                            message: 'Please Fill All Fields!',
                            severity: 'error',
                        })
                    }
                }
            } else {
                setAlertState({
                    open: true,
                    message: 'Please Fill All Fields',
                    severity: 'error',
                })
            }
        }
    };

    return (
        <div className="lg:pt-[144px] flex w-full px-16 md:px-24 lg:px-52 py-20 flex-col items-center shadow-card-upload-black relative text-white">
            <div className='font-header text-glow lg:text-6xl md:text-4xl text-center text-3xl px-2 lg:mb-8 md:mb-4 font-bold z-10 tracking-wider '>Sell Your Prompts</div>
            <div className='z-10 mb-10 w-full mt-16'>
                <div className=''>
                    <div className='text-3xl font-semibold flex items-center mb-2'><FaBurn className='mr-2 text-cus-pink text-2xl' />Cover Section</div>
                    <div className='italic font-semibold px-4'>(The information provided here will be visible to the public. Please avoid including the prompts within this section )</div>
                </div>
                <div className='my-8 px-4'>
                    <div className='text-xl font-semibold mb-3'><span className='text-red-500'>* </span>Choose your AI model</div>
                    <div className='relative mr-2 px-5'>
                        <select className="pl-2 pr-8 py-1 text-white font-semibold bg-[transparent] border border-white rounded-md shadow-sm outline-none appearance-none  mr-2 outline focus:border-white focus:ring-0 focus:outline focus:outline-white outline-white  cursor-pointer" onChange={handleGenre}>
                            {genres.map((genre, i) => (
                                <option key={i} selected={genre.includes("Mid")} className='bg-[transparent] text-black'>{genre}</option>
                            ))}
                        </select>
                    </div>
                </div>
                {
                    (!isPrompt) && (
                        <div className='my-8 px-4'>
                            <div className='text-xl font-semibold mb-2'><span className='text-red-500'>* </span>Choose your Chat GPT Engine</div>
                            <div className='relative mr-2 px-5'>
                                <select className="pl-2 pr-8 py-1 text-white font-semibold bg-[transparent] border border-white rounded-md shadow-sm outline-none appearance-none  mr-2 outline focus:border-white focus:ring-0 focus:outline focus:outline-white outline-white  cursor-pointer" onChange={handleGPTType}>
                                    {gptTypes.map((gpt, i) => (
                                        <option key={i} selected={gpt.includes("3.5")} className='bg-[transparent] text-black'>{gpt}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )
                }
                {
                    (!isPrompt) && (isFour) && (
                        <div className='my-8 px-4'>
                            <div className='text-xl font-semibold mb-2'><span className='text-red-500'>* </span>GPT -  4 Features</div>
                            <div className='relative mr-2 px-5'>
                                <select className="pl-2 pr-8 py-1 text-white font-semibold bg-[transparent] border border-white rounded-md shadow-sm outline-none appearance-none  mr-2 outline focus:border-white focus:ring-0 focus:outline focus:outline-white outline-white  cursor-pointer" onChange={handlePlugin}>
                                    {fourFeatures.map((feature, i) => (
                                        <option key={i} selected={feature.includes("Default")} className='bg-[transparent] text-black'>{feature}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )
                }
                {
                    (!isPrompt) && (isFour) && (isPlugin) && (
                        <div className='my-8 px-4 flex items-center'>
                            <div className='text-xl font-semibold mr-1 px-5'>Plugins:</div>
                            <input className="bg-transparent border border-white py-1 pl-4 pr-8 focus:outline-none focus:rounded-md focus:ring-1 ring-white focus:border-none font-light text-white w-[150px]" value={pluginContent} onChange={(e) => { setPluginContent(e.target.value) }} />
                        </div>
                    )
                }
                <div className='my-8 px-4'>
                    <div className='text-xl font-semibold mb-2'><span className='text-red-500'>* </span>Title (As short as possible)</div>
                    <div className='px-5'>
                        <input className="bg-transparent border border-white py-2 pl-4 pr-8 focus:outline-none focus:rounded-md focus:ring-1 ring-white focus:border-none font-light text-white w-[60%]" onChange={handleTitle} />
                    </div>
                </div>
                <div className='my-8 px-4 flex flex-col'>
                    <div className='text-xl font-semibold mb-2'><span className='text-red-500'>* </span>Description</div>
                    <textarea
                        name="message"
                        className=" resize-y bg-transparent border-b border-white py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 focus:ring-white focus:border-none font-light text-white mx-5"
                        value={description} onChange={(e) => { setDescription(e.target.value) }}
                    ></textarea>
                </div>
                {
                    (!isPrompt) && (
                        <>
                            <div className='my-8 px-4 flex flex-col'>
                                <div className='text-xl font-semibold mb-2'><span className='text-red-500'>* </span>Input</div>
                                <textarea
                                    className=" resize-y bg-transparent border-b border-white py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 focus:ring-white focus:border-none font-light text-white mx-5" onChange={(e) => { setInput(e.target.value) }}
                                ></textarea>
                            </div>
                            <div className='my-8 px-4 flex flex-col'>
                                <div className='text-xl font-semibold mb-2'><span className='text-red-500'>* </span>Output</div>
                                <textarea
                                    className=" resize-y bg-transparent border-b border-white py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 focus:ring-white focus:border-none font-light text-white mx-5" onChange={(e) => { setOutput(e.target.value) }}
                                ></textarea>
                            </div>
                        </>
                    )
                }
                {
                    (isPrompt) ? (
                        <div className='my-8 px-4 flex flex-col'>
                            <div className='text-xl font-semibold mb-2 cursor-pointer' onClick={() => setImageState(false)}><span className='text-red-500 mb-3'>* </span>Upload the Output photos of the prompt (Up to 5)</div>
                            {(!imageState) && (<div className='mx-5'><ImageUploadBtn onImageUpload={handleImageUpload} /></div>)}
                            {imageState && (
                                <div className='grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-3 py-6 px-4 rounded-2xl shadow-card-upload-black mx-5'>
                                    {images.map((img, index) => (
                                        <div className='w-full aspect-square outline-2 p-1 rounded-lg shadow-card-upload relative' key={index}>
                                            <Image src={img} className='p-1 w-full h-full rounded-lg object-cover object-center' alt='ddd' fill={true} />
                                            <div className='p-2 absolute top-2 right-2 bg-[#090e293a] rounded-full text-[#d3dcff70] hover:text-white cursor-pointer' onClick={() => handleDelete(index)}>
                                                <FaTimes className='text-xl' />
                                            </div>
                                        </div>
                                    ))}
                                    {isNeedAdd && (<PlusBtn onImageUpload={handleAdd} />)}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className='my-8 px-4 flex flex-col'>
                            <div className='text-xl font-semibold mb-2 cursor-pointer' onClick={() => setImageState(false)}><span className='text-red-500 mb-3'>* </span>Upload One Cover Photo of the Prompt</div>
                            {(!imageState) && (<div className='mx-5'><SingleUploadBtn onImageUpload={handleImageUpload} /></div>)}
                            {imageState && (
                                <div className='p-2 w-[250px] flex flex-col md:items-start items-center  rounded-2xl shadow-card-upload-black mx-5'>
                                    {images.map((img, index) => (
                                        <div className='w-full aspect-square outline-2 p-1 rounded-lg shadow-card-upload relative cursor-pointer' key={index}>
                                            <Image src={img} className='w-full p-1 h-full rounded-lg object-cover object-center' alt='ddd' fill={true} />
                                            <div className='p-2 absolute top-2 right-2 bg-[#090e293a] rounded-full text-[#d3dcff70] hover:text-white cursor-pointer' onClick={() => handleDelete(index)}>
                                                <FaTimes className='text-xl' />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )
                }
            </div>
            <div className='z-10 w-full'>
                <div className=''>
                    <div className='text-3xl font-semibold mb-1 flex items-center'><FaBurn className='mr-2 text-cus-pink text-2xl' />Prompt Section</div>
                    <div className='italic font-semibold px-4 mb-2'>(The information shared here will become visible only after users successfully purchase / review prompts.)</div>
                </div>
                <div className='my-8 px-4'>
                    <div className='text-xl font-semibold mb-2'><span className='text-red-500'>* </span>Prompt Formula</div>
                    {isPrompt ? (
                        <ol className='mb-3 mx-5'>
                            <li>1. Ensure that all the Midjourney settings and parameters are added at the end of the prompt such as Version, Niji mode, Stylize in such --v 5.2 --niji 5 --s 500</li>
                            <li>2. Put any variables in [square brackets] such as [Animal] for (dog, cat, dolphin, elephant, etc.)</li>
                        </ol>
                    ) : (
                        <div className='mb-3 mx-5'>Put any variables in [square brackets] such as [Animal] for (dog, cat, dolphin, elephant, etc.)</div>
                    )
                    }
                    <textarea
                        className=" w-full resize-y bg-transparent border-b border-white py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 focus:ring-white focus:border-none font-light text-white mx-5"
                        value={promptFormula} onChange={(e) => { setPromptFormula(e.target.value) }}
                    ></textarea>
                </div>
                <div className='my-8 px-4'>
                    <div className='text-xl font-semibold mb-2'><span className='text-red-500'>* </span>Example of Prompt</div>
                    {(!isPrompt) && (<div className='px-5 mb-3'>Provide a complete example of the prompt with [variable] filled in.</div>)}
                    <textarea
                        className=" w-full resize-y bg-transparent border-b border-white py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 focus:ring-white focus:border-none font-light text-white mx-5"
                        value={examplePrompt} onChange={(e) => { setExamplePrompt(e.target.value) }}
                    ></textarea>
                </div>
                <div className='my-8 px-4'>
                    <div className='text-xl font-semibold mb-2'><span className='text-red-500'>* </span>How to Use</div>
                    <textarea
                        className=" w-full resize-y bg-transparent border-b border-white py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 focus:ring-white focus:border-none font-light text-white mx-5"
                        value={howUse} onChange={(e) => { setHowUse(e.target.value) }}
                    ></textarea>
                </div>
                {(!isPrompt) && (
                    <div className='my-8 px-4'>
                        <div className='text-xl font-semibold mb-1'><span className='text-red-500'>* </span>Chat GPT share chat link</div>
                        <div className='italic font-semibold px-4 mb-2'>Please refrain from deleting the &quot;Chat&quot; in your Chat GPT model before verification.</div>
                        <div className='mx-5'>
                            <input className="bg-transparent border border-white py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-white focus:border-none font-light text-white w-full " placeholder='https://chat.openai.com/share/00000000-0000-0000-0000-0000000000' value={shareLink} onChange={(e) => { setShareLink(e.target.value) }} />
                        </div>
                    </div>
                )}
            </div>
            <div className='z-10 mb-10 w-full'>
                <div className=''>
                    <div className='text-3xl font-semibold flex items-center mb-2'><FaBurn className='mr-2 text-cus-pink text-2xl' />Label</div>
                </div>
                <div className='flex items-center'>
                    <div className='my-8 px-4'>
                        <div className='text-xl font-semibold mb-3'><span className='text-red-500'>* </span>Choose your Category</div>
                        <div className='relative mr-2 px-5'>
                            <select className="pl-2 pr-8 py-1 text-white font-semibold bg-[transparent] border border-white rounded-md shadow-sm outline-none appearance-none  mr-2 outline focus:border-white focus:ring-0 focus:outline focus:outline-white outline-white  cursor-pointer" onChange={(e) => { setCategory(e.target.value) }}>
                                {categories.map((cat, i) => (
                                    <option key={i} selected={cat.includes("Mid")} className='bg-[transparent] text-black'>{cat}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className='my-8 px-4'>
                        <div className='text-xl font-semibold mb-3'><span className='text-red-500'>* </span>Choose your Subcategory</div>
                        <div className='relative mr-2 px-5'>
                            <select className="pl-2 pr-8 py-1 text-white font-semibold bg-[transparent] border border-white rounded-md shadow-sm outline-none appearance-none  mr-2 outline focus:border-white focus:ring-0 focus:outline focus:outline-white outline-white  cursor-pointer" onChange={(e) => (setSubCategory(e.target.value))}>
                                {sub.map((item, i) => (
                                    <option key={i} selected={item.includes("Mid")} className='bg-[transparent] text-black'>{item}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className='my-8 px-4 w-full'>
                    <div className='text-xl font-semibold mb-2'><span className='text-red-500'>* </span>Input Tags</div>
                    <TagsInput
                        value={selected}
                        onChange={setSelected}
                        name="tags"
                        placeHolder="tags.."
                        classNames={{ tag: "text-white border", input: "placeholder:text-white outline border-white" }}
                    />
                </div>
                <div className='my-12 px-4 flex w-full justify-center items-center mt-16'>
                    <div className='py-3 px-8 rounded-xl  text-3xl shadow-card-upload-black cursor-pointer  hover:bg-blue-600' onClick={handleSubmit}>Submit for Approval</div>
                </div>
            </div>
            {
                isLoading &&
                <LoadingModal />
            }
            <Snackbar
                open={alertState.open}
                autoHideDuration={6000}
                onClose={() => setAlertState({ ...alertState, open: false })}
            >
                <Alert
                    onClose={() => setAlertState({ ...alertState, open: false })}
                    severity={alertState.severity}
                    className='text-[red]'
                >
                    {alertState.message}
                </Alert>
            </Snackbar>
        </div>
    )
}
