export const errorDictionary = (fieldCategory) => {
  switch(fieldCategory){
    case 'length':
    return {
      conditional: (value) =>{
        return(
          (value.trim() === "")
        )
      },
      message: "You Must Select a Competition Length"
    };
    case 'competitor':
    return {
      conditional: (value)=>{
        return(
          (value === 0)
        )
      },
      message: "You Must Select a Competitor"
    };
    case 'wager_amount':
    return {
      conditional: (value)=>{
        return(
          (value.trim() === "")
        )
      },
      message: "You Must Enter an Appropriate Wager Amount"
    };
    case 'portfolio_name':
    return {
      conditional: (value)=>{
        return(
          (value.trim() === "")
        )
      },
      message: "You Must Enter a Portfolio Name"
    };
  }
}
