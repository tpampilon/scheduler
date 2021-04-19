import axios                   from "axios";
import { useEffect, useState } from "react";


// stores the api URL for less mess.
const daysURL         = axios.get('http://localhost:8001/api/days');
const appointmentsURL = axios.get('http://localhost:8001/api/appointments');
const interviewersURL = axios.get('http://localhost:8001/api/interviewers');

export default function useApplicationData() {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // used alias to separate the function
  const setDay = day => setState(prevState => ({...prevState, day }));

  // uses a axios to make a get request to the api url
  useEffect(() => {
    Promise.all([daysURL, appointmentsURL, interviewersURL])
      .then((all) => {
        const daysInfo         = all[0].data;
        const appointmentsInfo = all[1].data;
        const interviewersInfo = all[2].data;

        setState(prevState => ({
          ...prevState, 
          days: daysInfo,  
          appointments: appointmentsInfo, 
          interviewers: interviewersInfo 
        }));
      });
  },[])

  // adds the appointment
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => setState({...state, appointments}))
  }

  // deletes an appointment
  function cancelInterview(id){
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
      .then(() => setState({...state, appointments}))
    
}

  // calculates the remaining spots for the day
  function spotsRemaining(day) {

    const dayFound = state.days.find(eachDay => eachDay.name === day);
    
    const spotsAvailable = dayFound.appointments.filter( appointmentId => state.appointments[appointmentId].interview === null);
    
    return spotsAvailable.length;
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
    spotsRemaining
  }
}