import React from 'react';

const TextField = props => {
  return (

    <div className="input-field col s4">
        <input type="text" id="autocomplete-input" className="autocomplete"
          name={props.name} onChange={props.handlerFunction} value={props.content} />
        <label for="autocomplete-input">{props.label}</label>
      </div>

  );
}

export default TextField;
