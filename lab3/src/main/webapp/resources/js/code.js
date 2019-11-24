function clock() {
    let date = new Date();
    let month_num = date.getMonth();
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let month=["января", "февраля", "марта", "апреля", "мая", "июня",
        "июля", "августа", "сентября", "октября", "ноября", "декабря"];
    if (day <= 9) day = "0" + day;
    if (hours <= 9) hours = "0" + hours;
    if (minutes <= 9) minutes = "0" + minutes;
    if (seconds <= 9) seconds = "0" + seconds;
    let result=`Сегодня ${day} ${month[month_num]} ${date.getFullYear()} года,<br/>На часах ${hours}:${minutes}:${seconds}.`;
    $('#clock').html(result);
    setTimeout("clock()",1000);
}
