import React         from "react";
import Header        from "components/Appointment/Header";
import Empty         from "components/Appointment/Empty";
import Show          from "components/Appointment/Show";
import Form          from "components/Appointment/Form";
import Status        from "components/Appointment/Status";
import Confirm       from "components/Appointment/Confirm";
import Error         from "components/Appointment/Error";
import useVisualMode from "../../hooks/useVisualMode";

import "components/Appointment/styles.scss";

const EMPTY        = "EMPTY";
const SHOW         = "SHOW";
const CREATE       = "CREATE";
const SAVING       = "SAVING";
const DELETE       = "DELETE";
const CONFIRM      = "CONFIRM";
const EDIT         = "EDIT";
const ERROR_SAVE   = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE"

export default function Appointment(props) {
  // imported custom Hook to handle mode transitions
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  // sends data using props.bookInteview back to Application.js
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    
    props.bookInterview(props.id, interview) 
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  }

  // transitions confirmation screen
  function deleteInterview() {
    transition(CONFIRM);
    
  }

  // deletes data upon confirmation
  function confirmDelete(){
    transition(DELETE, true);
    
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  }

  // transitions to edit form
  function edit(){
    transition(EDIT);
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
          onEdit={edit}
        />
        )}
      {mode === EDIT && (
        <Form 
        student={props.interview.student} 
        interviewer={props.interview.interviewer} 
        interviewers={props.interviewers} 
        onCancel={back} 
        onSave={save}
        />
        )}
      {mode === CREATE        && <Form interviewers={props.interviewers} onCancel={back} onSave={save} />}
      {mode === SAVING        && <Status message="Saving" />}
      {mode === DELETE        && <Status message="Deleting" />}
      {mode === CONFIRM       && <Confirm message="Are you sure you would like to delete?" onConfirm={confirmDelete} onCancel={back} />}
      {mode === ERROR_SAVE    && <Error message="Could not save appointment." onClose={back} />}
      {mode === ERROR_DELETE  && <Error message="Could not cancel appointment." onClose={back} />}
    </article>
  );
}