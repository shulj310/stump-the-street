export function dateFixer(dateList){

  let newDates = dateList.map((date)=>{
    let newDate = new Date(date)
    return `${newDate.getMonth()+1}/${newDate.getDate()+1}`
  })
  return newDates
}
