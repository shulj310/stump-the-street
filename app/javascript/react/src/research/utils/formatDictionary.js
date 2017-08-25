import numeral from 'numeral'

export function formatDictionary (value,field) {

  let newValue

  if ((value == "nm") || (value == 'na')){
    newValue = "N/A"
  } else {

    if (field == 'dollar'){
      newValue = numeral(value).format('$0,0')
    }

    if (field == 'price'){
      newValue = numeral(value).format('$0,0.00')
    }

    if (field == 'integer'){
      newValue = numeral(value).format('0,0')
    }

    if (field == 'percent'){
      newValue = numeral(value).format('0,0.00%')
    }

    if (field == "ratio"){
      newValue = numeral(value).format('0,0.000')
    }
    if (field == "info"){
      newValue = value.trim()
    }
  }
  return newValue
}
