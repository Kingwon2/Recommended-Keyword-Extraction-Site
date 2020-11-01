exports.Today = function () {

    var d = new Date();
    var s =
        leadingZeros(d.getFullYear(), 4) + '-' +
        leadingZeros(d.getMonth() + 1, 2) + '-' +
        leadingZeros(d.getDate(), 2);

    return s;
}

function leadingZeros(n, digits) {

    var zero = '';
    n = n.toString();

    if (n.length < digits) {
        for (var i = 0; i < digits - n.length; i++)
            zero += '0';
    }
    return zero + n;
}


exports.oneYearago = function () {
    var d = new Date();
    var s =
        leadingZeros(d.getFullYear() - 1, 4) + 
        leadingZeros(d.getMonth() + 1, 2) + 
        leadingZeros(d.getDate(), 2);

    return s;
}

exports.Yearago = function (n) {
    var d = new Date();
    var s =
        leadingZeros(d.getFullYear() - n, 4) + '-' + 
        leadingZeros(d.getMonth() + 1, 2) + '-' + 
        leadingZeros(d.getDate(), 2);

    return s;
}
exports.Monthago = function (n) {
    var d = new Date();
    var s =
        leadingZeros(d.getFullYear(), 4) + '-' +
        leadingZeros(d.getMonth() + 1 - n, 2) + '-' +
        leadingZeros(d.getDate(), 2);

    return s;
}

exports.Yesterday = function (n) { //20001144
    var d = new Date();
    var s =
        leadingZeros(d.getFullYear(), 4) +
        leadingZeros(d.getMonth() + 1, 2) +
        leadingZeros(d.getDate() - 1, 2);

    return s;

}