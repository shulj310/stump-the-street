import React from 'react';

const Popup = props => {
  let handleExit = () => {
    confirm("Are you sure you don't want to see Tay Sway?")
  }

  return(
    <div onClick={handleExit}>
    </div>
  );
};

export default Popup;
