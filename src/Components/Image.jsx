import React, { useRef } from 'react'
import { useState } from 'react'
import imageAI from "../assets/image.png"



const Image = () => {
  const [image_url, setImage_url] = useState(null)
  let inputRef = useRef(null)
  
  const imageGenerator =async() =>
  {
    if (inputRef.current.value === "") {
      return 0
    }
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer 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",
        "User-Agent": "Chrome",
      },
      body: JSON.stringify({
        prompt: `${inputRef.current.value}`,
        n: 1,
        size: "512x512",
      }),
    });
    let data = await response.json()
    console.log(data)
}


  return (
  
<div class="flex justify-center m-6">
  <div className="flex flex-col h-full max-w-lg mx-auto bg-gray-800 rounded-lg">
          <img
            className="rounded-lg rounded-b-none"
            src={image_url==="/"?imageAI:image_url}
            alt="thumbnail"
            loading="lazy"
          />
          <div className="flex justify-between -mt-4 px-4">
            <span
              className="inline-block ring-4 bg-red-500 ring-gray-800 rounded-full text-sm font-medium tracking-wide text-gray-100 px-3 pt-0.5"
              >Generate</span
            >
            <span
              className="inline-block ring-4 bg-red-500 ring-gray-800 rounded-full text-sm font-medium tracking-wide text-gray-100 px-3 pt-0.5"
              >Image</span
            >
          </div>
        <div className='flex bg-gray-900 gap-x-4 mt-[2rem] h-20'>
          <input className=' w-[25rem] text-center h-[3rem] ml-[3rem] rounded-full ' ref={inputRef} type="text" />
          
            <button className="middle none center mr-3 rounded-lg border border-pink-500 h-[3rem] py-3 px-6 font-sans text-xs font-bold uppercase text-pink-500 transition-all hover:opacity-75 focus:ring focus:ring-pink-200 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
    data-ripple-dark="true" onClick={imageGenerator}>
    Button
  </button>
</div>
        </div>
</div>
  
  )
}

export default Image