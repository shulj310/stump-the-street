import Autosuggest from 'react-autosuggest';
import React, {Component} from 'react'
import { nameToTag } from '../utils/nameToTag'

class AutosuggestInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      suggestions: []
    };

    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this)
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this)
    this.getSuggestions = this.getSuggestions.bind(this)
    this.getSuggestionValue = this.getSuggestionValue.bind(this)
    this.renderSuggestion = this.renderSuggestion.bind(this)
  }

// Teach Autosuggest how to calculate suggestions for any given input value.
getSuggestions(value) {
  let inputValue = value.trim().toLowerCase();
  let inputLength = inputValue.length;

  return inputLength === 0 ? [] : Object.keys(nameToTag).filter(lang =>
    lang.toLowerCase().slice(0, inputLength) === inputValue
  );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
 getSuggestionValue(suggestion){
   return suggestion
 }

// Use your imagination to render suggestions.
renderSuggestion(suggestion){
  return(
    <div>
      <button style={{height:"20px",borderRadius:"5px",background:"transparent",
        border:"transparent"}}
        onClick={this.props.fillData}
        id={suggestion}>
        {suggestion}
      </button>
    </div>
  );
}

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({value}) => {
      this.setState({
        suggestions: this.getSuggestions(value)
      });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {

    const value = this.props.value
    const suggestions = this.state.suggestion
    //
    // const { value, suggestions } = this.state;
    // Autosuggest will pass through all these props to the input.
    let inputProps = {
      placeholder: this.props.placeholder,
      value:this.props.value,
      onChange: this.props.onChange,
      name: this.props.name
    };

    // Finally, render it!
    return (
      <div>
        <Autosuggest
          suggestions={this.state.suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}
        />
      </div>
    );
  }
}

export default AutosuggestInput
