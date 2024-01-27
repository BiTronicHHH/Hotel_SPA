// import React, { ChangeEvent } from 'react';
// type ImageUploadButtonProps = {
//     onImageUpload: (files: FileList) => void;
// };

// const PlusBtn: React.FC<ImageUploadButtonProps> = ({ onImageUpload }) => {
//     const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
//         const file = event.target.files;
//         if (file) {
//           onImageUpload(file);
//         }
//       };
//     return (
//         <div className='p-1 w-full h-full rounded-lg bg-cus-pink'>
//             <div className='w-full min-h-full'>
//                 <input type="file" accept="image/*" onChange={handleFileChange} className='min-h-full min-w-full' />
//             </div>
//         </div>
//     )
// }

// export default PlusBtn;

import React, { ChangeEvent, useRef } from 'react';
import { FaPlusCircle } from 'react-icons/fa';

type ImageUploadButtonProps = {
    onImageUpload: (files: FileList) => void;
};

const PlusBtn: React.FC<ImageUploadButtonProps> = ({ onImageUpload }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleBig = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            onImageUpload(files);
        }
    };

    return (
        <div className='p-1 w-full h-full rounded-lg bg-[#02152757] shadow-card-upload'>
            <div className='w-full min-h-full flex items-center justify-center cursor-pointer' onClick={handleBig}>
                <div className='p-8 hover:bg-[#090e293a] rounded-full text-[#e3ecff70] hover:text-white'>
                    <FaPlusCircle className='text-4xl' />
                </div>
            </div>
            <input type='file' accept='image/*' onChange={handleFileChange} className='opacity-0 min-h-full min-w-full' ref={fileInputRef} style={{ display: 'none' }} />
        </div>
    );
};

export default PlusBtn;