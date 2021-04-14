import React from "react";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import "components/Appointment/styles.scss";


export default function Appointment(props) {

  return(
    <article className="appointment">
     <Header time={props.time} />
     { props.interview ? <Show interviewer={props.interview.interviewer} student={props.interview.student} /> : <Empty /> }
    </article>
  );
}