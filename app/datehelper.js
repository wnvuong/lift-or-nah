function formatLocalDate(date) {
    var tzo = -date.getTimezoneOffset(),
        dif = tzo >= 0 ? '+' : '-',
        pad = function(num) {
            var norm = Math.abs(Math.floor(num));
            return (norm < 10 ? '0' : '') + norm;
        };
    return date.getFullYear() 
        + '-' + pad(date.getMonth()+1)
        + '-' + pad(date.getDate())
        + 'T' + pad(date.getHours())
        + ':' + pad(date.getMinutes()) 
        + ':' + pad(date.getSeconds()) 
        + dif + pad(tzo / 60) 
        + ':' + pad(tzo % 60);
}

module.exports = {
  formatLocalDate: formatLocalDate
}
