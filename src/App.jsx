import React, { useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import Navbar from './Components/Navbar'
import SideBar from './Components/SideBar';
import Webcam from './Components/Webcam'

function App() {
  const [prediction, setPrediction] = useState('');
  const imageRef = useRef(null);
  console.log("hi this is the prediction ",prediction)

  const loadModel = async () => {
    const model = await mobilenet.load();
    const img = imageRef.current;
    const predictions = await model.classify(img);
    setPrediction(predictions[0].className);
  };
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    console.log(file)
    const reader = new FileReader();
    console.log(reader)
    reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result;
     const result= img.onload = () => {
        imageRef.current.src = img.src;
        loadModel();
      };
console.log(result)
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
  <div className='flex bg-[#e2d7a7]'>
        <SideBar />
              <Webcam/>

          <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">AI Image Classification and Detection with TensorFlow</h1>
        <input type="file" onChange={handleImageUpload} className="border border-gray-300 rounded-md px-4 py-2 mb-4" />
        {prediction && <p className="bg-gray-900 text-white rounded-md px-4 py-2 mb-4">Prediction: {prediction}</p>}
        <img ref={imageRef} alt="Upload" className="w-[36rem] h-auto rounded-md shadow-md" />
        </div>
        </div>
    </div>
  );
}

export default App;
