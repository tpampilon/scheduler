
export default function getAppointmentsForDay(state, day) {
  
  let result = [];
  let appointments;
  const daysArr = state.days
  const appsArr = state.appointments
  
  // loops through daysArr to find a matching day
  for (let arr of daysArr){
    if (arr.name === day){
      appointments = arr.appointments
    }
  }
  
  // checks to see if appointments is undefined
  if (!appointments) {
    appointments = [];
  } else {
    for (let arr in appsArr){
      for (let app of appointments){
        if (Number(arr) === app) {
          result.push(appsArr[arr])
        }
      }
    }
  }
  
  return result;

}