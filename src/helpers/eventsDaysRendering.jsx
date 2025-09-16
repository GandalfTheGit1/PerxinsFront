import weekDay from "./weekDay"
import months from './monthsArray';

export function parseDays(days){
  return new Date(days.replace(/-/g, '\/').replace(/T.+/, ''));
}

export function eventsDaysFormate(eventsDays){
  const actualDate = parseDays(eventsDays);
  return (
  <>
    <span className="font-size-20">{`${actualDate.getDate()}`}</span>
    <span style={{fontSize: "15px"}}>{months[actualDate.getMonth()]}</span>
  </>
  )
}
export function getDayFromDateFormat(eventsDays){
  const actualDate = parseDays(eventsDays);
  return actualDate.getDate();

}

export function getMonthFromDateFormat(eventsDays){
  const actualDate = parseDays(eventsDays);
  return actualDate.getMonth();

}

const eventsDaysRendering = (props) =>{
  const {
    startDays,
    endDays,
    eventsDays,
    weekDays,
    continuesEventsStartDay,
    continuesEventsEndDay 
  } = props;

  if( continuesEventsEndDay && continuesEventsStartDay) {
    const startDate = new Date(continuesEventsStartDay);
    const endDate = new Date(continuesEventsEndDay);
    return (
      <>
        <div style={{width: "55px"}}>
          <span>{startDate.getDate()} </span>
          /
          <span> {endDate.getDate()}</span>
        </div>
        <p>{months[endDate.getMonth()]}</p>
      </>
    )
  }
    if(eventsDays){
      return eventsDaysFormate(eventsDays)
    }
    if(startDays && endDays){
      const startDate = new Date(startDays);
      const endDate = new Date(endDays);
      return (
        <>
          <span>{startDate.getDate()}</span>
          <span>-</span>
          <span>{endDate.getDate()}</span>
          <p>{months[endDate.getMonth()]}</p>
        </>
      )
    }
    if(weekDays && weekDays.length > 0){
      return (
        <div className="d-f f-d-c">
          <span style={{fontSize: "10px"}}>CADA</span> 
          {weekDays.map((day, index) => (
            <span key={index}>{weekDay[+day]}</span>
          ))}
        </div>
      )
    }
  }
export default eventsDaysRendering;