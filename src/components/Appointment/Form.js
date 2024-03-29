import React, { useState } from 'react'
import InterviewerList     from "components/InterviewerList";
import Button              from "components/Button";

export default function Form(props) {
  
  const [name, setName] = useState( "" || props.student );
  const [interviewer, setInterviewer] = useState(props.interviewer ? props.interviewer.id : null);
  const [error, setError] = useState("");

  const reset = () => {
    setName("")
    setInterviewer(null)
  }

  const cancel = () => {
    props.onCancel()
  }

  function validate() {
    if (!name) {
      setError("Student name cannot be blank");
      return;
    }

    if (!interviewer) {
      setError("Interviewer must be chosen");
      return;
    }
  
    setError("");
    props.onSave(name, interviewer);
  }

  return(
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={(event) => {setName(event.target.value)}}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList interviewers={props.interviewers} interviewer={interviewer} setInterviewer={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={() => {reset(); cancel();}} danger>Cancel</Button>
          <Button onClick={validate} confirm>Save</Button>
        </section>
      </section>
    </main>
  )
}