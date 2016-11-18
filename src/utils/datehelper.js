function todayUtc() {
  let today = new Date();
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  today.setMilliseconds(0);
  return today;
}

const datehelper = {
  todayUtc: todayUtc
}

export default datehelper;
