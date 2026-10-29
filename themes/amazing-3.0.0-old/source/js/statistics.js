// author by removef
// https://removeif.github.io/
function createtime() {
    var n = new Date("11/04/2020 00:00:00");
    now.setTime(now.getTime() + 250),
        days = (now - n) / 1e3 / 60 / 60 / 24,
        dnum = Math.floor(days),
        hours = (now - n) / 1e3 / 60 / 60 - 24 * dnum,
        hnum = Math.floor(hours),
    1 == String(hnum).length && (hnum = "0" + hnum),
        minutes = (now - n) / 1e3 / 60 - 1440 * dnum - 60 * hnum,
        mnum = Math.floor(minutes),
    1 == String(mnum).length && (mnum = "0" + mnum),
        seconds = (now - n) / 1e3 - 86400 * dnum - 3600 * hnum - 60 * mnum,
        snum = Math.round(seconds),
    1 == String(snum).length && (snum = "0" + snum),
        document.getElementById("statistic-times").innerHTML = "❤️The blog has bulit for <strong>" + dnum + "</strong> days <strong>" + hnum + "</strong> hr <strong>" + mnum + "</strong> min <strong>" + snum + "</strong> sec since <span><strong> 2020.11.04</strong><span> ❤️";
}

var now = new Date;
setInterval("createtime()", 250);