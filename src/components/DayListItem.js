import React      from "react";
import classnames from "classnames";


import "components/DayListItem.scss";

export default function DayListItem(props) {

  let numberOfSpots;

  if (typeof (props.spotsRemaining(props.name)) !== 'number') {
    numberOfSpots = props.spots
  } else {
    numberOfSpots = props.spotsRemaining(props.name);
  }

  const listClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": (numberOfSpots === 0)
  });
  
  const formatSpots = () => {
    if (numberOfSpots > 1) {
      return `${numberOfSpots} spots remaining`;
    }
    if (numberOfSpots === 1) {
      return `1 spot remaining`;
    }
    if (numberOfSpots === 0) {
      return `no spots remaining`
    }
  }
  
  return (
    <li data-testid="day" className={listClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}