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
    $('#x-input').val("");
    let success = true;
    if ($('input[name^="x-input"]:checked').length === 0) {
        let li = document.createElement('li');
        li.setAttribute("style", "padding-bottom:1%;padding-top:1%;");
        errorJquery.append(li);
        li.innerHTML = li.innerHTML + "Вы не выбрали значение Х. Сделайте это.";
        success = false;
    }
    let y = $('#y-input').val();
    if (y.match(/^[0-3](((.|,)0+)|)$/) == null && y.match(/^-[0-5](((.|,)0+)|)$/) == null && y.match(/^[0-2](.|,)\d+$/) == null && y.match(/^-[0-4](.|,)\d+$/) == null) {
        let li = document.createElement('li');
        li.setAttribute("style", "padding-bottom:1%;padding-top:1%;");
        errorJquery.append(li);
        li.innerHTML = li.innerHTML + "Введено некорректное значение Y или не входящее в допустимый диапозон. Введите значение от -5 до 3.";
        success = false;
    }
    let rJquery = $('input[name^="r-input"]:checked');
    if (rJquery.length === 0) {
        let li = document.createElement('li');
        li.setAttribute("style", "padding-bottom:1%;padding-top:1%;");
        errorJquery.append(li);
        li.innerHTML = li.innerHTML + "Выберите значение радиуса, чтобы указать масштаб.";
        success = false;
    }
    if (rJquery.length > 1) {
        let li = document.createElement('li');
        li.setAttribute("style", "padding-bottom:1%;padding-top:1%;");
        errorJquery.append(li);
        li.innerHTML = li.innerHTML + "Масштаб указан неверно. Выберите ровно одно значение радиуса.";
        success = false;
    }
    return success;
}

function formSubmit(event) {
    event.preventDefault();
    try {
        if (validate()) {
            let y = $('#y-input');
            if (!(y.val().match(/^-0(((.|,)0+)|)$/) === null)) y.val("0.0");
            postSubmit().then(afterPost);

        }
    } catch (error) {
    }
    return false;
}

async function postSubmit() {
    await $.post(
        "controller/submit",
        $('#form').serialize(),
        function (msg) {
            $('#answer').contents().find('body').html(msg);
        }
    );
}

async function postCanvas() {
    await $.post(
        "controller/canvas",
        $('#form').serialize(),
        function (msg) {
            $('#answer').contents().find('body').html(msg);
        }
    );
}

function afterPost() {
    let R = decodeR();
    drawDots(R);
    blockLink();
}

function blockLink() {
    $('#answer').contents().find('#mainLink').click(function () {
        let errorJquery = $('#error-log');
        errorJquery.html("");
        let li = document.createElement('li');
        li.setAttribute("style", "padding-bottom:1%;padding-top:1%;");
        errorJquery.append(li);
        li.innerHTML = li.innerHTML + "Вы уже находитесь на странице с формой.";
        return false;
    });
}

function clearText(tag) {
    document.getElementById(tag).value = "";
}

$(document).on('keypress', function (e) {
    if (e.which == 13) {
        e.preventDefault();
    }
});

function decodeR() {
    document.getElementById('error-log').innerHTML = "";
    let jqueryR = $('input[name^="r-input"]:checked');
    let R;
    if (jqueryR.length > 1) {
        let li = document.createElement('li');
        li.setAttribute("style", "padding-bottom:1%;padding-top:1%;");
        document.getElementById('error-log').appendChild(li);
        li.innerHTML = li.innerHTML + "Масштаб указан неверно. Выберите ровно одно значение радиуса.";
        R = "";
    } else {
        if (jqueryR.length === 0) {
            let li = document.createElement('li');
            li.setAttribute("style", "padding-bottom:1%;padding-top:1%;");
            document.getElementById('error-log').appendChild(li);
            li.innerHTML = li.innerHTML + "Выберите значение радиуса, чтобы указать масштаб.";
            R = "";
        } else {
            R = jqueryR.get(0).value;
        }
    }
    return R;
}

function setR() {
    let jqueryR = $('input[name^="r-input"]:checked');
    if (jqueryR.length > 1 || jqueryR.length === 0) {
        drawCanvas("R");
    } else {
        let R = jqueryR.get(0).value;
        drawCanvas(R);
        setTimeout(drawDots, 100, R);
    }
}

function drawCanvas(R) {
    let canvas = $('#canvas').get(0);
    let context = canvas.getContext("2d");
    let size = canvas.width;
    canvas.height = size;
    alert(size);
    context.clearRect(0, 0, size, size);
    context.strokeStyle = 'rgb(0,0,0)';
    context.lineWidth = 3;
    context.fillStyle = 'rgb(255,255,255)';
    context.font = "small-caps 20px Times New Roman";
    context.fillRect(0, 0, size, size);
    //область
    context.fillStyle = 'rgb(44,103,191)';
    context.fillRect(0.5 * size, 0.15 * size, 0.35 * size, 0.35 * size);
    context.beginPath();
    context.moveTo(0.5 * size, 0.5 * size);
    context.lineTo(0.5 * size, 0.675 * size);
    context.lineTo(0.675 * size, 0.5 * size);
    context.lineTo(0.5 * size, 0.5 * size);
    context.closePath();
    context.fill();
    context.beginPath();
    context.moveTo(0.325 * size, 0.5 * size);
    context.arcTo(0.325 * size, 0.675 * size, 0.5 * size, 0.675 * size, 0.175 * size);
    context.lineTo(0.5 * size, 0.5 * size);
    context.lineTo(0.325 * size, 0.5 * size);
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
        let jquery = $('#answer');
        let htmlArray = Array(jquery.contents().find('#second-line').html().toString(),
            jquery.contents().find('#third-line').html().toString(),
            jquery.contents().find('#fourth-line').html().toString(),
            jquery.contents().find('#fifth-line').html().toString(),
            jquery.contents().find('#sixth-line').html().toString());
        let xString = "";
        let yString = "";
        let rString = "";
        let supportString = "";
        for (let i = 0; i < 5; i++) {
            let html = htmlArray[i].replace(/\s/g, "");
            xString += html.substring(0, html.indexOf('</td><td>')).replace("<td>", "") + " ";
            supportString = html.substring(html.indexOf('</td><td>') + 9, html.length);
            yString += supportString.substring(0, supportString.indexOf('</td><td>')) + " ";
            supportString = html.substring(html.indexOf('</td><td>') + 9, html.lastIndexOf('</td><td>'));
            rString += supportString.substring(supportString.indexOf('</td><td>') + 9, supportString.length) + " ";
        }
        xString = xString.split("<br>").join("").trim();
        yString = yString.trim();
        rString = rString.trim();
        for (let i = 0; i < 5; i++) {
            let r = rString.toString().split(" ");
            let x = xString.toString().split(" ");
            let y = yString.toString().split(" ");
            context.fillStyle = 'rgb(48, 18, 90)';
            context.beginPath();
            let canvasX = x[i] * 0.35 * size / r[i] + size / 2;
            if (canvasX >= size / 2) {
                canvasX = (canvasX - size / 2) * r[i] / R + size / 2;
            } else {
                canvasX = size / 2 - (size / 2 - canvasX) * r[i] / R;
            }
            let canvasY = size / 2 - y[i] * 0.35 * size / r[i];
            if (canvasY >= size / 2) {
                canvasY = (canvasY - size / 2) * r[i] / R + size / 2;
            } else {
                canvasY = size / 2 - (size / 2 - canvasY) * r[i] / R;
            }
            context.arc(canvasX, canvasY, 3, 0, 2 * Math.PI, true);
            context.closePath();
            context.fill();
            context.strokeStyle = 'rgb(48, 18, 90)';
            context.lineWidth = 2;
            context.beginPath();
            context.arc(canvasX, canvasY, 7, 0, 2 * Math.PI, true);
            context.closePath();
            context.stroke();
        }
    }
}

function setMainLink() {
    let jquery = $('#mainLink');
    if (window.location.href.includes('views')) {
        jquery.attr('href','main.xhtml');
    } else {
        jquery.attr('href','views/main.xhtml');
    }
}

function setDefaultCanvas() {
    drawCanvas("R");
    $('#canvas').click(function (event) {
        let canvas = $('#canvas').get(0);
        let context = canvas.getContext("2d");
        let R = decodeR();
        R = parseFloat(parseFloat(R.replace(",", ".")).toPrecision(4));
        if (!(R >= 1.0 && R <= 5.0)) {
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
            $('#x-input').val(xVal.toPrecision(5));
            $('#y-input').val(yVal.toPrecision(5));
            $('input[name^="x-input"]:checked').prop("checked", false);
        } else {
            $('#x-input').val("");
            $('#y-input').val("");
        }
        if (!(R === "R")) {
            postCanvas().then(afterPost);
        }
    });
}

