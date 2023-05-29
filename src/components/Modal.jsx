import React from "react";
import { DatePicker } from 'antd';
import { AiOutlineCloseCircle } from "react-icons/ai";

const { RangePicker } = DatePicker;

const Modal = ({ visible, onClose }) => {
  if (!visible) return null;
  return (
    <div
      id="container"
      onClick={onclose}
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="bg-white p-2 rounded w-[600px] h-[600px]"
      >
        <div className="flex justify-end p-1 float-right">
          <AiOutlineCloseCircle
            className="text-2xl cursor-pointer"
            onClick={onClose}
          />
        </div>
        <form action="" method="post">
          <h1 className="text-3xl pt-2 px-4">Resource Form</h1>
          <div className="flex flex-row p-2 justify-between">
            <div className="flex flex-col">
              <p className="py-2 text-l font-bold">Event Name</p>
              <input
                type="text"
                className="border-2 border-gray-700 p-2 rounded w-[200px]"
              />
            </div>
            <div className="flex flex-col">
              <p className="py-2 text-l font-bold">Phone Number</p>
              <input
                type="text"
                className="border-2 border-gray-700 p-2 rounded w-[200px]"
              />
            </div>
          </div>
          <div className="flex flex-col px-2">
            <p className="py-2 text-l font-bold">Event Details</p>
            <textarea
              name=""
              id=""
              cols="25"
              rows="5"
              className="border-2 border-black rounded-md"
              placeholder="Enter text here.."
            ></textarea>
          </div>
          <div className="flex flex-row p-2">
            <div className="flex flex-col">
              <p className="py-2 text-l font-bold">Date & time</p>
              <RangePicker className="border-black hover:border-gray-500" />
            </div>
          </div>
          <div className="flex flex-col p-2">
            <p className="text-l font-bold">Necessary Facilites</p>
          </div>
          <div className="flex flex-row px-2">
            <p>Sound Equipment</p><input type="checkbox" name="" id="" className=" mx-2 my-2" />
            <p className="ml-7">Cleaning</p><input type="checkbox" name="" id="" className="mx-2 my-2" />
            <p className="ml-7">Technician</p><input type="checkbox" name="" id="" className="mx-2 my-2" />
          </div>
          <div className="flex p-2">
            <button className="w-[100px] py-2 mt-8 border-2 bg-[#27374D] hover:bg-[#526D82] text-white rounded-md">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
