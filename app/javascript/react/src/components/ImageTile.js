import React from 'react';

const ImageTile = props =>{

  return(
    <img
    src={require(`./../../../../assets/images/${props.name}.png`)}
    alt={props.name}
    name={props.name}
    onClick={props.handlerFunction}
    onMouseOver={props.hoverFunction}
    id={props.id}
    width={225}
    height={225}
    className={props.selected}
    />

  )
}

export default ImageTile
