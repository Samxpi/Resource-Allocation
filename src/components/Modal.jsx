import React, { useState } from "react";
import { DatePicker } from "antd";
import { AiOutlineCloseCircle } from "react-icons/ai";
import dayjs from "dayjs";
import axios from "axios";



const { RangePicker } = DatePicker;

const Modal = ({ visible, onClose }) => {
  const [dates, setDate] = useState([]);
  const [eventName, setEventName] = useState(false);
  const [eventDetails, setEventDetails] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(false);
  const [Technician,setTechnician] = useState(false);
  const [Cleaning,setCleaning] = useState(false);
  const [Sound,setSound] = useState(false);



  const disablePastDates = (current) => {
    return current && current < dayjs().endOf("day");
  };


  function changeSound(){
    setSound(val=>!val)
  }
  
  function changeTechnician(){
    setTechnician(val=>!val)
  }
  function changeCleaning(){
    setCleaning(val=>!val)
  }
  // function filterByDates(values) {
  //   const startDate = values[0].startOf('day');
  //   const endDate = values[1].endOf('day');
  //   setDate([startDate, endDate]);
  // }
  // function filterByDates(values) {
  //   const startDate = values[0]?.startOf('day') || null;
  //   const endDate = values[1]?.endOf('day') || null;
  //   setDate([startDate, endDate]);
  // }
  // function filterByDates(values) {
  //   const startDate = values[0] ? values[0].startOf('day') : null;
  //   const endDate = values[1] ? values[1].endOf('day') : null;
  //   setDate([startDate, endDate]);
  // }  
  function filterByDates(values) {
    const startDate = dayjs(values[0]).add(1, 'day').startOf('day');
    const endDate = dayjs(values[1]).endOf('day');
    setDate([startDate, endDate]);
  }

  // function filterByDates(values) {
  //   setDate(
  //     values.map((item) => {
  //       return dayjs(item).format("DD-MM-YYYY");
  //     })
  //   );
  // }

  async function submit(e){
    e.preventDefault();
    var formData = {
      eventName: eventName,
      eventDetails: eventDetails,
      phoneNumber: phoneNumber,
      startDate: dates[0],
      endDate: dates[1],
      Technician: Technician,
      Cleaning: Cleaning,
      Sound: Sound
    }
    try{
      axios.post("http://localhost:8000/home",formData);
      onClose();
    } catch(e){
      console.log(e)
    }
  }

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
                onChange={(e) => setEventName(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <p className="py-2 text-l font-bold">Phone Number</p>
              <input
                type="text"
                className="border-2 border-gray-700 p-2 rounded w-[200px]"
                onChange={(e) => setPhoneNumber(e.target.value)}
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
              onChange={(e) => setEventDetails(e.target.value)}
            ></textarea>
          </div>
          <div className="flex flex-row p-2">
            <div className="flex flex-col">
              <p className="py-2 text-l font-bold">Date & time</p>
              <RangePicker
                className="border-black hover:border-gray-500"
                format={"DD-MM-YYYY"}
                onChange={filterByDates}
                disabledDate={disablePastDates}
              />
            </div>
          </div>
          <div className="flex flex-col p-2">
            <p className="text-l font-bold">Necessary Facilites</p>
          </div>
          <div className="flex flex-row px-2">
            <p>Sound Equipment</p>
            <input type="checkbox" name="" id="" className=" mx-2 my-2" checked={Sound}  onChange={changeSound}/>
            <p className="ml-7">Cleaning</p>
            <input type="checkbox" name="" id="" className="mx-2 my-2" checked={Cleaning}  onChange={changeCleaning}/>
            <p className="ml-7">Technician</p>
            <input type="checkbox" name="" id="" className="mx-2 my-2" checked={Technician}  onChange={changeTechnician}/>
          </div>
          <div className="flex p-2">
            <button
              className="w-[100px] py-2 mt-8 border-2 bg-[#27374D] hover:bg-[#526D82] text-white rounded-md"
              type="submit"
              onClick={submit}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
