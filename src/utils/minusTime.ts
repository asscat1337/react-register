import dayjs from "dayjs";

const minusTime=(start:string,end:string)=>{
    function formatInterval(minutes:any) {
        let interval = [Math.floor(minutes / 60).toString(), (minutes % 60).toString()];
        return interval[0].padStart(2, '0') + ':' + interval[1].padStart(2, '0')
    }

    function getInterval(from:any, to:any) {
        let [hoursA, minutesA] = from.split(':');
        let [hoursB, minutesB] = to.split(':');
        let timeA = dayjs().hour(hoursA).minute(minutesA);
        let timeB = dayjs().hour(hoursB).minute(minutesB);
        let interval = timeB.diff(timeA, 'minutes');
        if(interval < 0) {
            return formatInterval(24 * 60 + timeB.diff(timeA, 'minutes'));
        }
        return formatInterval(interval);
    }


    return getInterval(start,end)
}

export {
    minusTime
}