function getTimeString(time){
    const hour = parseInt(time / 3600);
    let remainingSecound = time % 3600;
    const minute = parseInt(remainingSecound / 60);
    remainingSecound = remainingSecound % 60;

    return `${hour} Hour ${minute} Minute ${remainingSecound} Secound`

}
console.log(getTimeString(2000))