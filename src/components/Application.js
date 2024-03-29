import React              from "react";
import DayList            from "components/DayList";
import Appointment        from "components/Appointment";
import useApplicationData from "../hooks/useApplicationData"

import "components/Application.scss";
import { 
  getAppointmentsForDay, 
  getInterview, 
  getInterviewersForDay 
} from "../helpers/selectors";


// component
export default function Application(props) {

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview,
    spotsRemaining
  } = useApplicationData();
  
  // uses selectors to select the specific appointments and interviewers for the day
  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);


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
        cancelInterview={cancelInterview}
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
        spotsRemaining={spotsRemaining}
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
