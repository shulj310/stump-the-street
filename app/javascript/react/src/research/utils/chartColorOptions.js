export function chartColorPicker (index){


  let colorDict = {

    0: {
      backgroundColor:  'rgba(55,71,79,0)',
      borderColor: 'rgba(55,71,79,1)',
      hoverBackgroundColor: 'rgba(55,71,79,0.6)',
      hoverBorderColor: 'rgba(55,71,79,0.8)'
    },
    1: {
      backgroundColor:  'rgba(245,0,21,0)',
      borderColor: 'rgba(245,0,21,1)',
      hoverBackgroundColor: 'rgba(245,0,21,0.6)',
      hoverBorderColor: 'rgba(245,0,21,0.8)'
    },
    2: {
      backgroundColor:  'rgba(1,146,225,0)',
      borderColor: 'rgba(1,146,225,1)',
      hoverBackgroundColor: 'rgba(1,146,225,0.6)',
      hoverBorderColor: 'rgba(1,146,225,0.8)'
    },
    3: {
      backgroundColor:  'rgba(10,200,77,0)',
      borderColor: 'rgba(10,200,77,1)',
      hoverBackgroundColor: 'rgba(10,200,77,0.6)',
      hoverBorderColor: 'rgba(10,200,77,0.8)'
    },
    4: {
      backgroundColor:  'rgba(254,121,0,0)',
      borderColor: 'rgba(254,121,0,1)',
      hoverBackgroundColor: 'rgba(254,121,0,0.6)',
      hoverBorderColor: 'rgba(254,121,0,0.8)'
    },
    5: {
      backgroundColor:  'rgba(171,3,170,0)',
      borderColor: 'rgba(171,3,170,1)',
      hoverBackgroundColor: 'rgba(171,3,170,0.6)',
      hoverBorderColor: 'rgba(171,3,170,0.8)'
    }
  }

  if (index <=5){
    return colorDict[index]
  } else {
    return({
        backgroundColor:  'rgba(254,202,0,0)',
        borderColor: 'rgba(254,202,0,1)',
        hoverBackgroundColor: 'rgba(254,202,0,0.6)',
        hoverBorderColor: 'rgba(254,202,0,0.8)'
      })}
}
