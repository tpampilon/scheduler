import React       from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props){

  const daysArray = props.days;

  const days = daysArray.map(day => {
    
    return (
      <DayListItem 
        key={day.id}
        name={day.name} 
        spots={day.spots} 
        selected={day.name === props.day}
        spotsRemaining={props.spotsRemaining}
        setDay={props.setDay}  
      />
    )
    
  }); 

  return(
    <ul>
      {days}
    </ul>
  )
}