export function compareTickerData (compareData){

  if (Object.keys(compareData).length !== 0){

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
  } else{
    return []
  }
}
