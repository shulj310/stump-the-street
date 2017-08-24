export function compareTickerData (compareData){
  let data = compareData.map((ticker)=>{

      let compareDataList = []

      Object.values(ticker)[0].forEach((field,index)=>{
        compareDataList.push(Object.values(field)[0][0])
      });

      compareDataList.unshift(Object.keys(ticker)[0])
      return (
        compareDataList
      )
  })
  return (
    data
  )
}
