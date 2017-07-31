import {stockList} from './stockList'

export const errorDictionary = (fieldCategory) => {
  switch(fieldCategory){
    case 'ticker':
    return {
      conditional: (value) =>{
        return(
          ((value === "")||(!stockList.includes(value.toUpperCase())))
        )
      },
      message: "you must select a stock within the Russell 1000"
    };
    case 'share_amount':
    return {
      conditional: (value)=>{
        return(
          (value.trim() === "")
        )
      },
      message: "you must select an appropriate share amount"
    };
  }
}
