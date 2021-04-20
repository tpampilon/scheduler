import { useState } from "react";

export default function useVisualMode(initial) {
  
  const [history, setHistory] = useState([initial]);
 
  // changes the current mode by pushing a new one
  const transition = function(newMode, replace = false) {
    // if "replace" is true, newMode should replace the previous mode
    setHistory(prev => {
      const newHistory = [...prev]
      if(replace){
        newHistory.pop()
      }
      newHistory.push(newMode);
      return newHistory;
    });
  }

  // pops the last mode in the history
  const back = function() {

    setHistory(prev => {
      const newHistory = [...prev]
      if(newHistory.length === 1) {
        return newHistory;
      }
      newHistory.pop();
      return newHistory;
    });
  }

  // returns the last mode in the array
  const mode = history.slice(-1)[0];
  
  return { mode, transition, back };
}