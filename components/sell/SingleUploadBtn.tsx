import React, { ChangeEvent } from 'react';
type ImageUploadButtonProps = {
    onImageUpload: (files: FileList) => void;
  };

  const SingleUploadBtn: React.FC<ImageUploadButtonProps> = ({ onImageUpload }) => {
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files;
      if (file) {
        onImageUpload(file);
      }
    };
  
    return (
      <div>
        <input type="file" accept="image/*"  onChange={handleFileChange} />
      </div>
    );
  };
  
  export default SingleUploadBtn;