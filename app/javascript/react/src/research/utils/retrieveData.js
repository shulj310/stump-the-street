export function retrieveData(data,ticker){

  if (Object.keys(data).length !== 0){

  let d = Object.values(data)[0]

  let newData = d.map((field,index)=>{
    return(Object.values(field)[0])
    })

  newData.unshift(ticker)
  return newData
  } else {
    return []
  }
}
