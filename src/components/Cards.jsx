import React from 'react'

const Cards = (props) => {
  return (
    <div className=" py-10">
      <div className="max-w-sm shadow-lg shadow-gray-600 rounded overflow-hidden">
        <img src={props.loc} alt=""  className='w-full h-[150px]'/>
        <div className='px-10 py-4'>
          <h2 className="text-2xl font-bold font-serif">{props.name}</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam,
          </p>
        </div>
      </div>
    </div>
  );
}

export default Cards