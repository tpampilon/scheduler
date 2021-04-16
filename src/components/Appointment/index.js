import React         from "react";
import Header        from "components/Appointment/Header";
import Empty         from "components/Appointment/Empty";
import Show          from "components/Appointment/Show";
import Form          from "components/Appointment/Form";
import useVisualMode from "../../hooks/useVisualMode";

import "components/Appointment/styles.scss";

const EMPTY  = "EMPTY";
const SHOW   = "SHOW";
const CREATE = "CREATE";

export default function Appointment(props) {

  // imported custom Hook to handle mode transitions
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // sends data using props.bookInteview back to Application
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SHOW);
    props.bookInterview(props.id, interview);
  }

  return(
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
        )}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={back} onSave={save} />}
    </article>
  );
}