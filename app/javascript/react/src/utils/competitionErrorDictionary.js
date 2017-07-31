export const errorDictionary = (fieldCategory) => {
  switch(fieldCategory){
    case 'length':
    return {
      conditional: (value) =>{
        return(
          (value.trim() === "")
        )
      },
      message: "you must select a competition length"
    };
    case 'competitor':
    return {
      conditional: (value)=>{
        return(
          (value === 0)
        )
      },
      message: "you must select an competitor"
    };
    case 'wager_amount':
    return {
      conditional: (value)=>{
        return(
          (value.trim() === "")
        )
      },
      message: "you must enter an appropriate wager_amount"
    };
    case 'portfolio_name':
    return {
      conditional: (value)=>{
        return(
          (value.trim() === "")
        )
      },
      message: "you must enter a portfolio name"
    };
  }
}
