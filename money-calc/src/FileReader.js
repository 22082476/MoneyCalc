import React, { useState } from 'react';

const FileReaderComponent = (props) => {
  const [jsonData, setJsonData] = useState(null);

  const handleFileRead = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const content = event.target.result;
      try {
        const data = JSON.parse(content);
        setJsonData(data);
      } catch (error) {
        console.error('Error parsing JSON file:', error);
      }
    };

    reader.readAsText(file);
    sessionStorage.setItem("schedule", jsonData)
  };

  return (
    <div>
      <input type="file" accept=".json" onChange={handleFileRead} />
    </div>
  );
};

export default FileReaderComponent;
