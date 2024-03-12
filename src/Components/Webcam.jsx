import React, { useRef, useEffect, useState } from 'react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import Webcam from 'react-webcam';

const ObjectDetection = () => {
  const webcamRef = useRef(null);
  const [model, setModel] = useState(null);
  const [objects, setObjects] = useState([]);
  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await cocoSsd.load();
      setModel(loadedModel);
    };
    loadModel();
  }, []);

const detectObjects = async () => {
  if (model && webcamRef.current) {
    const imageSrc = webcamRef.current.getScreenshot();
    const image = await loadImage(imageSrc);
    const predictions = await model.detect(image);
    setObjects(predictions);
  }
};
    
    const loadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
    };
    
  useEffect(() => {
    const intervalId = setInterval(detectObjects, 1000); // Run object detection every second
    return () => clearInterval(intervalId);
  }, [model]);

  return (
      <div className='m-[15rem] text-2xl font-medium text-center  justify-center'>
          <div>
      <Webcam
        ref={webcamRef}
        mirrored
        screenshotFormat="image/jpeg"
              style={{ width: '100%', height: 'auto' }}
              className=''
              />
              </div>
    
          {objects.map((object, index) => (
          <div key={index} className='m-[2rem]'>
            {object.class} - {object.score.toFixed(2)}
          </div>
        ))}
    </div>
  );
};

export default ObjectDetection;
