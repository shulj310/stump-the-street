import React from 'react';

const ImageTile = props =>{

  let label;

  if (props.name != undefined && props.label != false){

  if (props.name.includes('ramer')){
    label = "Stump Jim Cramer!"
  }
  if (props.name.includes('ull')){
    label = "Stump Pro Investors!"
  }

  if (props.name.includes("treet")){
    label = "Stump the Market!"
  }


}

  return(
    <div className="img-form">
    <img
    src={require(`./../../../../assets/images/${props.name}.${props.end}`)}
    alt={props.name}
    name={props.name}
    onClick={props.handlerFunction}
    onMouseOver={props.hoverFunction}
    id={props.id}
    width={props.width}
    height={props.height}
    className={props.selected}
    />
    <div className="center-align">
    <label>{label}</label>
    </div>
    </div>

  )
}

export default ImageTile
