
const getAppointmentsForDay = function(state, day) {
  
  let result = [];
  let appointments;
  const daysArr = state.days;
  const appsArr = state.appointments;
  
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
          result.push(appsArr[arr]);
        }
      }
    }
  }
  
  return result;

}

const getInterview = function(state, interview) {
  
  // checks if interview is null
  if (interview === null){
    return null;
  }

  let result = {};
  const interviewers = state.interviewers;
  const interviewApp = interview.interviewer;
  
  for (let key in interviewers) {
    if (Number(key) === interviewApp) {
      result = {interviewer: interviewers[key], student: interview.student};
    }
  }

  return result;
}

const getInterviewersForDay = function(state, day) {
  
  let result = [];
  let interviewers;
  const daysArr = state.days;
  const intersArr = state.interviewers;
  
  // loops through daysArr to find a matching day
  for (let arr of daysArr){
    if (arr.name === day){
      interviewers = arr.interviewers
    }
  }
  
  // checks to see if interviewers is undefined
  if (!interviewers) {
    interviewers = [];
  } else {
    for (let arr in intersArr){
      for (let app of interviewers){
        if (Number(arr) === app) {
          result.push(intersArr[arr]);
        }
      }
    }
  }
  
  return result;

}

export { getAppointmentsForDay, getInterview, getInterviewersForDay }