import './App.css';
import React, { useState } from 'react';
import axios from 'axios';
import { Audio } from 'react-loader-spinner';

const BACKEND_URL = 'http://localhost:9000/v1/log/parsefile';

function App() {

  const [file, setFile] = useState()
  const [isLoading, setisLoading] = useState(false)

  function handleChange(event) {
    setFile(event.target.files[0])
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const url = BACKEND_URL;
    const formData = new FormData();
    formData.append('logFile', file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
      responseType: 'blob',
    };

    setisLoading(true)
    const delay = ms => new Promise(res => setTimeout(res, ms));
    await delay(3000)
    axios.post(url, formData, config)
      .then((response) => {
        console.log(response.data);
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'response.json');
        document.body.appendChild(link);
        link.click();
      })
      .catch(e => {
        console.log(e.code, e.message)
        alert('Error :: ' + e.code + ' :: ' + e.message)
      })
      .finally(() => {
        setisLoading(false)
      });

  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <h1>React File Upload</h1>
        <input type="file" onChange={handleChange} />
        {
          isLoading
            ? <Audio
              className="loader"
              height="20"
              width="2000"
              radius="9"
              color="green"
              ariaLabel="three-dots-loading"
              wrapperStyle
              wrapperClass
            />
            : <button type="submit">Upload</button>
        }
      </form>
    </div>
  );
}

export default App;