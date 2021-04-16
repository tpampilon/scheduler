import React         from "react";
import Header        from "components/Appointment/Header";
import Empty         from "components/Appointment/Empty";
import Show          from "components/Appointment/Show";
import Form          from "components/Appointment/Form";
import Status        from "components/Appointment/Status";
import useVisualMode from "../../hooks/useVisualMode";

import "components/Appointment/styles.scss";

const EMPTY  = "EMPTY";
const SHOW   = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE"

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
    transition(SAVING)
    
    props.bookInterview(props.id, interview) 
      .then(() => {
        transition(SHOW);
      });
  }

  // deletes data using cancelInterview
  function deleteInterview() {
    transition(DELETE);

    props.cancelInterview(props.id)
      .then (() => transition(EMPTY))
    
  }

  return(
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={deleteInterview}
        />
        )}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={back} onSave={save} />}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETE && <Status message="Deleting" />}
    </article>
  );
}