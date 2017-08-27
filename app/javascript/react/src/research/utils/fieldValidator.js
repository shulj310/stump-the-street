import {nameToTag} from './nameToTag'

export function fieldValidator (field){
  let valid = Object.keys(nameToTag).includes(field)
  return(
    valid
  )
}
