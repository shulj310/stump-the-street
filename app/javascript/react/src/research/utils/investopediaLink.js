export function linkBuilder(field){

  let l = field[0]

  if (l==5){
    l=1
  }

  return(
    `http://www.investopedia.com/terms/${l}/${field}.asp`
  )
}
