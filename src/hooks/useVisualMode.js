import React, { useState } from "react";

export default function useVisualMode(initial) {
  
  const [history, setHistory] = useState([initial]);
 
  // creates a copy of history to not mutate history
  const newHistory = [...history];

  // changes the current mode by pushing a new one
  const transition = function(newMode, replace = false) {
    // if "replace" is true, newMode should replace the previous mode
    if(replace === true){
      newHistory.pop();
    }

    newHistory.push(newMode);

    setHistory(newHistory);
  }

  // pops the last mode in the history
  const back = function() {
    if (newHistory.length > 1) {
      newHistory.pop();
    }

    setHistory(newHistory);
  }

  // returns the last mode in the array
  const mode = history.slice(-1)[0];

  return { mode, transition, back }
}