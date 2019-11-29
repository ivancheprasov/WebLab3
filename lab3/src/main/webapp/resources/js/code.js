function clock() {
    let date = new Date();
    let month_num = date.getMonth();
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let month = ["января", "февраля", "марта", "апреля", "мая", "июня",
        "июля", "августа", "сентября", "октября", "ноября", "декабря"];
    if (day <= 9) day = "0" + day;
    if (hours <= 9) hours = "0" + hours;
    if (minutes <= 9) minutes = "0" + minutes;
    if (seconds <= 9) seconds = "0" + seconds;
    let result = `Сегодня ${day} ${month[month_num]} ${date.getFullYear()} года,<br/>На часах ${hours}:${minutes}:${seconds}.`;
    $('#clock').html(result);
    setTimeout("clock()", 1000);
}

function validate() {
    let errorJquery = $('#error-log');
    errorJquery.html("");
    let success = true;
    let x = $('.x-input').val();
    if (x.match(/^[0-3](((.|,)0+)|)$/) == null
        && x.match(/^-[0-5](((.|,)0+)|)$/) == null &&
        x.match(/^[0-2](.|,)\d+$/) == null &&
        x.match(/^-[0-4](.|,)\d+$/) == null) {
        let li = document.createElement('li');
        li.setAttribute("style", "padding-bottom:1%;padding-top:1%;");
        errorJquery.append(li);
        li.innerHTML = li.innerHTML + "Вы не выбрали значение Х. Сделайте это.";
        success = false;
    }
    let y = $('.y-input').val();
    if (y.match(/^[0-3](((.|,)0+)|)$/) == null && y.match(/^-[0-5](((.|,)0+)|)$/) == null && y.match(/^[0-2](.|,)\d+$/) == null && y.match(/^-[0-4](.|,)\d+$/) == null) {
        let li = document.createElement('li');
        li.setAttribute("style", "padding-bottom:1%;padding-top:1%;");
        errorJquery.append(li);
        li.innerHTML = li.innerHTML + "Введено некорректное значение Y или не входящее в допустимый диапозон. Введите значение от -5 до 3.";
        success = false;
    }
    let r = $('.r-input').val();
    if (r.match(/^[1-3](((.|,)0+)|)$/) == null && r.match(/^[1-2](.|,)\d+$/) == null) {
        let li = document.createElement('li');
        li.setAttribute("style", "padding-bottom:1%;padding-top:1%;");
        errorJquery.append(li);
        li.innerHTML = li.innerHTML + "Вы не выбрали значение R. Сделайте это.";
        success = false;
    }
    return success;
}

function formSubmit(event) {
    event.preventDefault();
    try {
        if (validate()) {
            $('.submitCommandButton').click();
        }
    } catch (error) {
    }
    return false;
}

$(document).on('keypress', function (e) {
    if (e.which == 13) {
        e.preventDefault();
    }
});

function drawCanvas(R) {
    let canvas = $('#canvas').get(0);
    let context = canvas.getContext("2d");
    let size = canvas.width;
    canvas.height = size;
    context.clearRect(0, 0, size, size);
    context.strokeStyle = 'rgb(0,0,0)';
    context.lineWidth = 3;
    context.fillStyle = 'rgb(255,255,255)';
    context.font = "small-caps 20px Times New Roman";
    context.fillRect(0, 0, size, size);
    //область
    context.fillStyle = 'rgb(44,103,191)';
    context.fillRect(0.5 * size, 0.15 * size, 0.175 * size, 0.35 * size);
    context.beginPath();
    context.moveTo(0.5 * size, 0.5 * size);
    context.lineTo(0.15 * size, 0.5 * size);
    context.lineTo(0.5 * size, 0.85 * size);
    context.lineTo(0.5 * size, 0.5 * size);
    context.closePath();
    context.fill();
    context.beginPath();
    context.moveTo(0.15 * size, 0.5 * size);
    context.arcTo(0.15 * size, 0.15 * size, 0.5 * size, 0.15 * size, 0.35 * size);
    context.lineTo(0.5 * size, 0.5 * size);
    context.lineTo(0.15 * size, 0.5 * size);
    context.closePath();
    context.fill();
    //оси и стрелочки
    context.beginPath();
    context.moveTo(0, size / 2);
    context.lineTo(size, size / 2);
    context.lineTo(size - 0.03 * size, size / 2 + 0.03 * size);
    context.lineTo(size, size / 2);
    context.lineTo(size - 0.03 * size, size / 2 - 0.03 * size);
    context.lineTo(size, size / 2);
    context.moveTo(size / 2, size);
    context.lineTo(size / 2, 0);
    context.lineTo(size / 2 - 0.03 * size, 0.03 * size);
    context.lineTo(size / 2, 0);
    context.lineTo(size / 2 + 0.03 * size, 0.03 * size);
    context.lineTo(size / 2, 0);
    context.closePath();
    context.stroke();
    let halfR;
    if (R === "R") {
        halfR = "R/2"
    } else {
        halfR = parseFloat((R / 2).toPrecision(4));
    }
    context.fillStyle = 'rgb(0,0,0)';
    context.fillText("Y", size / 2 + 0.05 * size, 0.06 * size);
    context.fillText("X", 0.94 * size, size / 2 - 0.05 * size);
    //R на Y
    context.fillText(R, size / 2 + 0.05 * size, 0.175 * size);
    context.fillText(halfR, size / 2 + 0.05 * size, 0.35 * size);
    context.fillText("-" + halfR, size / 2 + 0.05 * size, 0.7 * size);
    context.fillText("-" + R, size / 2 + 0.05 * size, 0.875 * size);
    //R на X
    context.fillText("-" + R, 0.175 * size - 0.065 * size, size / 2 - 0.05 * size);
    context.fillText("-" + halfR, 0.35 * size - 0.065 * size, size / 2 - 0.05 * size,);
    context.fillText(halfR, 0.7 * size - 0.045 * size, size / 2 - 0.05 * size);
    context.fillText(R, 0.875 * size - 0.045 * size, size / 2 - 0.05 * size);
    //засечки Y
    context.beginPath();
    context.moveTo(size / 2 - 0.02 * size, 0.15 * size);
    context.lineTo(size / 2 + 0.02 * size, 0.15 * size);
    context.closePath();
    context.stroke();
    context.beginPath();
    context.moveTo(size / 2 - 0.02 * size, 0.325 * size);
    context.lineTo(size / 2 + 0.02 * size, 0.325 * size);
    context.closePath();
    context.stroke();
    context.beginPath();
    context.moveTo(size / 2 - 0.02 * size, 0.675 * size);
    context.lineTo(size / 2 + 0.02 * size, 0.675 * size);
    context.closePath();
    context.stroke();
    context.beginPath();
    context.moveTo(size / 2 - 0.02 * size, 0.85 * size);
    context.lineTo(size / 2 + 0.02 * size, 0.85 * size);
    context.closePath();
    context.stroke();
    //засечки X
    context.beginPath();
    context.moveTo(0.325 * size, size / 2 - 0.02 * size);
    context.lineTo(0.325 * size, size / 2 + 0.02 * size);
    context.closePath();
    context.stroke();
    context.beginPath();
    context.moveTo(0.15 * size, size / 2 - 0.02 * size);
    context.lineTo(0.15 * size, size / 2 + 0.02 * size);
    context.closePath();
    context.stroke();
    context.beginPath();
    context.moveTo(0.675 * size, size / 2 - 0.02 * size);
    context.lineTo(0.675 * size, size / 2 + 0.02 * size);
    context.closePath();
    context.stroke();
    context.beginPath();
    context.moveTo(0.85 * size, size / 2 - 0.02 * size);
    context.lineTo(0.85 * size, size / 2 + 0.02 * size);
    context.closePath();
    context.stroke();
}

function drawDots(R) {
    //массив точек
    if (!(R === "R")) {
        let canvas = $('#canvas').get(0);
        let context = canvas.getContext("2d");
        let size = canvas.height;
        let rowString="";
        let x;
        let y;
        let r;
        let hit;
        let rows=$('.resultTable tbody tr');
        let last=-1;
        rows.each(function (row){
        });
        if(last===-1) last=4;
        rows.each(function (row) {
           rowString="";
           $(this).find('td').each(function () {
               rowString+=$(this).html().toString().replace(/\s+/g,'')+" ";
           });
           rowString=rowString.replace('<br>','');
           if(!(rowString.replace(/\s+/g,'')==="")){
               x = rowString.toString().split(' ')[0];
               y = rowString.toString().split(' ')[1];
               r = rowString.toString().split(' ')[2];
               if(isHit(x,y)){
                   if(last===row){
                       context.fillStyle = 'rgb(39, 219, 105)';
                       context.strokeStyle = 'rgb(39, 219, 105)';
                   }else{
                       context.fillStyle = 'rgb(18, 74, 39)';
                       context.strokeStyle = 'rgb(18, 74, 39)';
                   }
               }else{
                   if(last===row){
                       context.fillStyle = 'rgb(138, 89, 179)';
                       context.strokeStyle = 'rgb(138, 89, 179)';
                   }else{
                       context.fillStyle = 'rgb(92, 44, 156)';
                       context.strokeStyle = 'rgb(92, 44, 156)';
                   }
               }
               context.beginPath();
               let canvasX = x * 0.35 * size / r + size / 2;
               if (canvasX >= size / 2) {
                   canvasX = (canvasX - size / 2) * r / R + size / 2;
               } else {
                   canvasX = size / 2 - (size / 2 - canvasX) * r / R;
               }
               let canvasY = size / 2 - y * 0.35 * size / r;
               if (canvasY >= size / 2) {
                   canvasY = (canvasY - size / 2) * r / R + size / 2;
               } else {
                   canvasY = size / 2 - (size / 2 - canvasY) * r / R;
               }
               context.arc(canvasX, canvasY, 3, 0, 2 * Math.PI, true);
               context.closePath();
               context.fill();
               context.lineWidth = 2;
               context.beginPath();
               context.arc(canvasX, canvasY, 7, 0, 2 * Math.PI, true);
               context.closePath();
               context.stroke();
           }
        });
    }
}
function isHit(x,y){
    let R=$('.r-input').val();
    return (x <= 0 && y >= 0 && Math.pow(x, 2) + Math.pow(y, 2) < Math.pow(R, 2))
        || (x >= 0 && y >= 0 && y <= R && x <= R / 2)
        || (x <= 0 && y <= 0 && y >= -x - R);
}
function setResultTable() {
    let table = $('.resultTable tbody');
    let rows = $('.resultTable tbody tr');
    let rowNumber = rows.length;
    while (rowNumber < 5) {
        table.append('<tr>' +
            '<td><br/></td><td></td><td></td><td></td>' +
            '</tr>');
        rowNumber++;
    }
    let rowString;
    rows.each(function () {
        if ($(this).index() > 4) $(this).remove();
        rowString = "";
        $(this).find('td').each(function () {
            rowString += $(this).html();
        });
        if (rowString === "") {
            $(this).find('td').each(function () {
                $(this).html("<br>");
            });
        }
    });
}

function setMainLink() {
    let jquery = $('#mainLink');
    if (window.location.href.includes('views')) {
        jquery.attr('href', 'main.xhtml');
    } else {
        jquery.attr('href', 'views/main.xhtml');
    }
}

function setDefaultCanvas() {
    let R=$('.r-input').val();
    drawCanvas(R);
    drawDots(R);
    $('#canvas').click(function (event) {
        let R=$('.r-input').val();
        let errorJquery = $('#error-log');
        errorJquery.html("");
        let canvas = $('#canvas').get(0);
        let context = canvas.getContext("2d");
        R = parseFloat(parseFloat(R.toString().replace(",", ".")).toPrecision(4));
        if (!(R >= 1.0 && R <= 3.0)) {
            R = "R";
        }
        drawCanvas(R);
        let x = event.clientX - canvas.getBoundingClientRect().left;
        let y = event.clientY - canvas.getBoundingClientRect().top;
        context.fillStyle = 'rgb(227, 93, 214)';
        context.beginPath();
        context.arc(x, y, 3, 0, 2 * Math.PI, true);
        context.closePath();
        context.fill();
        context.strokeStyle = 'rgb(227, 93, 214)';
        context.lineWidth = 2;
        context.beginPath();
        context.arc(x, y, 7, 0, 2 * Math.PI, true);
        context.closePath();
        context.stroke();
        let xVal = "";
        let yVal = "";
        if (R >= 1.0 && R <= 5.0) {
            xVal = (-canvas.height / 2 + x) / (0.35 * canvas.height) * R;
            yVal = (canvas.height / 2 - y) / (0.35 * canvas.height) * R;
            $('.xCanvas').val(xVal.toPrecision(5));
            $('.yCanvas').val(yVal.toPrecision(5));
        } else {
            $('.xCanvas').val("");
            $('.yCanvas').val("");
        }
        $('.rCanvas').val(R);
        $('.canvasButton').click();
    });
}
function setDefaultResultTable(){
    $('body').on("DOMNodeInserted",'#resultTable',function () {
        let R=$('.r-input').val();
        drawCanvas(R);
        drawDots(R);
        setResultTable();
    });
    setResultTable();
}
function changeR(R) {
    drawCanvas(R);
    drawDots(R);
}

