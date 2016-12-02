function todayUtc() {
  let today = new Date();
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  today.setMilliseconds(0);
  return today;
}

function setToMidnight(date) {
  if (date != null) {
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
  }
}

function toISOStringWithOffset(date) {
    var tzo = -date.getTimezoneOffset(),
      dif = tzo >= 0 ? '+' : '-',
      pad = (num) => {
          var norm = Math.abs(Math.floor(num));
          return (norm < 10 ? '0' : '') + norm;
      };
    let isoString = date.getFullYear() 
        + '-' + pad(date.getMonth()+1)
        + '-' + pad(date.getDate())
        + 'T' + pad(date.getHours())
        + ':' + pad(date.getMinutes()) 
        + ':' + pad(date.getSeconds()) 
        + dif + pad(tzo / 60) 
        + ':' + pad(tzo % 60);
    return isoString;
}

function formatLocalDate(date) {
  setToMidnight(date);
  return toISOStringWithOffset(date);
}

const datehelper = {
  todayUtc: todayUtc,
  formatLocalDate: formatLocalDate
}

export default datehelper;
