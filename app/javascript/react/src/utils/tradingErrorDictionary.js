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
      message: "You must select a stock within the Russell 1000 index! \n These are typically larger, liquid securities like AAPL, DIS, & GE"
    };
    case 'share_amount':
    return {
      conditional: (value)=>{
        return(
          (value.trim() === "")
        )
      },
      message: "You must select a real, whole number of shares. If not, the shares will be rounded down."
    };
  }
}
