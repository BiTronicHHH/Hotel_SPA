import React, { ChangeEvent } from 'react';
type ImageUploadButtonProps = {
    onImageUpload: (files: FileList) => void;
  };

  const ImageUploadBtn: React.FC<ImageUploadButtonProps> = ({ onImageUpload }) => {
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files) {
        onImageUpload(files);
      }
    };
  
    return (
      <div>
        <input type="file" accept="image/*" multiple onChange={handleFileChange} />
      </div>
    );
  };
  
  export default ImageUploadBtn;