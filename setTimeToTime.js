function setTimeToTime (setTime){
    //calc sum of setTime 00:00:05
    const czas = setTime.slice(0,8);
    // console.log(`czas ${czas}`)
    const h = parseInt(setTime.slice(0,2));
    const m = parseInt(setTime.slice(3,5));
    const s = parseInt(setTime.slice(6,8));
    // console.log(`h ${h} m ${m} s ${s}`)
    return Number((h*60)+m+(s/60)) // return time in minutes
}
exports.setTimeToTime =setTimeToTime