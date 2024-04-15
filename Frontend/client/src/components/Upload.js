import React from 'react';

const Upload = ({ onUpload }) => {
  const handleUpload = (event) => {
    const file = event.target.files[0];
    // Here you would parse the file and extract domain/DNS record data
    // Then call the onUpload function with the parsed data
  };

  return (
    <div>
      <input type="file" onChange={handleUpload} />
    </div>
  );
};

export default Upload;
