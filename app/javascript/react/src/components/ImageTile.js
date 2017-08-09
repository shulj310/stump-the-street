import React from 'react';

const ImageTile = props =>{

  let label;

  if (props.name != undefined){

  if (props.name.startsWith('cramer')){
    label = "Stump Jim Cramer!"
  }
  if (props.name.startsWith('bull')){
    label = "Stump Pro Investors!"
  }

  if (props.name.startsWith("street")){
    label = "Stump the Market!"
  }


}

  return(
    <div className="img-form">
    <img
    src={require(`./../../../../assets/images/${props.name}.png`)}
    alt={props.name}
    name={props.name}
    onClick={props.handlerFunction}
    onMouseOver={props.hoverFunction}
    id={props.id}
    width={200}
    height={200}
    className={props.selected}
    />
    <div className="center-align">
    <label>{label}</label>
    </div>
    </div>

  )
}

export default ImageTile
