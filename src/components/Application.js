import React, { useState, useEffect } from "react";

import axios       from "axios";
import DayList     from "components/DayList";
import Appointment from "components/Appointment";

import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";
import "components/Application.scss";

// stores the api URL for less mess.
const daysURL         = axios.get('http://localhost:8001/api/days');
const appointmentsURL = axios.get('http://localhost:8001/api/appointments');
const interviewersURL = axios.get('http://localhost:8001/api/interviewers');

// component
export default function Application(props) {
  
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

  // uses selectors to select the specific appointments and interviewers for the day
  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

  // books the appointment
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    setState({
      ...state,
      appointments
    });
  }

  // uses array.map to map through the appointments list
  const schedule = appointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment 
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
      />
    );
  });
  
  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
      <DayList
        days={state.days}
        day={state.day}
        setDay={setDay}
      />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
