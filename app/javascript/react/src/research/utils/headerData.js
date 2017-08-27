export function headerData (data){

  if (Object.keys(data).length !== 0){

  let d = Object.values(data)[0]

  let newData = d.map((field)=>{
    return (Object.keys(field)[0])
  })

  newData.unshift("Ticker")
  return newData
} else{
    return []
  }
}
