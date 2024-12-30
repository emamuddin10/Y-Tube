

function getTimeString(time){
    // get hour and rest second 
    const hour = parseInt(time/3600)
    let remainingSecond = time % 3600
    let minite = parseInt(remainingSecond/60)
    remainingSecond = remainingSecond % 60
    return `${hour} hour ${minite} minite ${remainingSecond} second ago`
}
console.log(getTimeString(4805))