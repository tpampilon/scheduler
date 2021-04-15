import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";

// stores the api URL for less mess.
const daysURL         = axios.get('http://localhost:8001/api/days');
const appointmentsURL = axios.get('http://localhost:8001/api/appointments');
const interviewersURL = axios.get('http://localhost:8001/api/interviewers');

// component
export default function Application(props) {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const dailyAppointments = [];

  //  used alias to separate the function
  const setDay = day => setState(prevState => ({...prevState, day }));

  // uses a axios to make a get request to the api url
  useEffect(() => {
   Promise.all([daysURL, appointmentsURL, interviewersURL])
    .then((all) => {
      setState(prevState => ({...prevState, days: all[0].data, appointments: all[1].data }));
    });

  }, [])

  // uses array.map to map through the appointments list
  dailyAppointments.map(appointment => {
    return (
      <Appointment key={appointment.id} {...appointment} />
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
        {dailyAppointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
