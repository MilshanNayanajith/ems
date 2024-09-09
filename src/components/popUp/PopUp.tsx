import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux-store/store';
import { clearAlert } from '../../redux-store/features/custom-alert/customAlert';

type Props = {};

const PopUp = (props:Props) => {
  const alert:any= useSelector(
    (state: RootState) => state?.customAlert?.alert
  );

  useEffect(()=>{
  if(alert){

    setTimeout(()=>{
      dispatch(clearAlert());
      
    },4000)
  }
  },[alert])
  const dispatch = useDispatch();

  const handleClose = () => {
    console.log('close');
    
    dispatch(clearAlert());
  };

 return (
   <>{alert ? <div
    className={`fixed z-50 bottom-5 m-5 md:right-4 ${alert?.type == 'error' ? 'bg-red-500':'bg-green-500'}  text-white px-4 py-2 rounded-lg shadow-lg transition-transform transform ${
      alert ? 'translate-y-0' : 'translate-y-20'
    }`}
  >
    <div className="flex items-center">
      <span>{alert?.message}</span>
      <button className="ml-4 text-lg" onClick={() => handleClose()}>
        &times;
      </button>
    </div>
  </div> : <></>}</>
  );

  
};

export default PopUp;
