import React, { useState } from 'react';
import '../styles/Support.css';
import { IoIosSend } from 'react-icons/io';
import { sendFeedback } from '../services/api.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SupportUs() {
  const initial = {
    feedback:''
  }
  const [send,setSend] = useState(initial);
  const [apnafeedback, setFeedback] = useState('');

  const handleFeedback = async () => {
    if (apnafeedback) {
      try {
        await sendFeedback(send);
        toast.success("Feedback Send Successfully", {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setFeedback('');
        setSend({...initial,feedback:''});
      }
      catch (err) {
        console.log(err);
      }
    }
    else {
      toast.warn("Enter your Feedback Plz", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  const handleSetFeedback = (e) =>{
    setFeedback(e.target.value);
    setSend({...initial,[e.target.name]:e.target.value});
  }

  return (
    <div className='SupportApp'>
      <h1 style={{ textAlign: 'center', marginTop: 20 }}>Support Us by giving your Feedback here!</h1>
      <textarea name="feedback" id="" cols="30" rows="10" className='support-textarea' placeholder='Give Your Feedback here....' value={apnafeedback} onChange={(e) => { handleSetFeedback(e) }} />
      <IoIosSend size={50} className='support-send' onClick={handleFeedback} />
      <ToastContainer />
    </div>
  )
}

export default SupportUs;