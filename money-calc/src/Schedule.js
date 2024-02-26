import { useState } from "react";

export function Schedule ()
{
    const [time, setTime] = useState(null)
    const doe = () => {}

    return (
        <>
        <from onSubmit={doe()}>
            <label htmlFor="MonBeginTime">Begin tijd Maandag</label>
            <input id="MonBeginTime" type="time" onChange={(x) => setTime({...time, "MonBegin" : x.target.value})}></input>
            <label htmlFor="MonEndTime">Eind tijd Maandag</label>
            <input id="MonEndTime" type="time" onChange={(x) => setTime({...time, "MonEnd" : x.target.value})}></input>
            
            <label htmlFor="TueBeginTime">Begin tijd Dinsdag</label>
            <input id="TueBeginTime" type="time" onChange={(x) => setTime({...time, "TueBegin" : x.target.value})}></input>
            <label htmlFor="TueEndime">Eind tijd Dinsdag</label>
            <input id="TueEndime" type="time" onChange={(x) => setTime({...time, "TueEnd" : x.target.value})}></input>
            
            <label htmlFor="WenBeginTime">Begin tijd Woensdag</label>
            <input id="WenBeginTime" type="time" onChange={(x) => setTime({...time, "WenBegin" : x.target.value})}></input>
            <label htmlFor="WenEndTime">Eind tijd Woensdag</label>
            <input id="WenEndTime" type="time" onChange={(x) => setTime({...time, "WenEnd" : x.target.value})}></input>

            <label htmlFor="ThurBeginTime">Begin tijd Donderdag</label>
            <input id="ThurBeginTime" type="time" onChange={(x) => setTime({...time, "ThurBegin" : x.target.value})}></input>
            <label htmlFor="ThurEndTime">Eind tijd Donderdag</label>
            <input id="ThurEndTime" type="time" onChange={(x) => setTime({...time, "ThurEnd" : x.target.value})}></input>

            <label htmlFor="FriBeginTime">Begin tijd Vrijdag</label>
            <input id="FriBeginTime" type="time" onChange={(x) => setTime({...time, "FriBegin" : x.target.value})}></input>
            <label htmlFor="FriEndTime">Eind tijd Vrijdag</label>
            <input id="FriEndTime" type="time" onChange={(x) => setTime({...time, "FriEnd" : x.target.value})}></input>

            <label htmlFor="SatBeginTime">Begin tijd Zaterdag</label>
            <input id="SatBeginTime" type="time" onChange={(x) => setTime({...time, "SatBegin" : x.target.value})}></input>
            <label htmlFor="SatEndTime">Eind tijd Zaterdag</label>
            <input id="SatEndTime" type="time" onChange={(x) => setTime({...time, "SatEnd" : x.target.value})}></input>

            <input type="submit" value="Berekenen"></input>
        </from>

        {sessionStorage.getItem("schedule") && (<>{JSON.parse(sessionStorage.getItem("schedule")).schedule.mon[0]}</>)}
        </>
    );
}