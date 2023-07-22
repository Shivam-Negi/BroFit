function currentDate () {
    const date = new Date().toLocaleDateString("en-IN", {
      timeZone: "Asia/Kolkata", // Set the timezone to IST
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const [day, month, year] = date.split("/");
    return `${day}-${month}-${year}`;
}

function dateAfterAddingDays(days ){
  const currentDate = new Date();
  const dateCopy = new Date();
  dateCopy.setDate(currentDate.getDate() + days);
  const date = dateCopy.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone : "Asia/Kolkata",
  });
  const [day, month, year] = date.split("/");
  return `${day}-${month}-${year}`;
}

function checkInTime() {
    const date = new Date().toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata", // Set the timezone to IST
      hour12: false, // Use 24-hour format
    });
    let [hours, minutes] = date.split(":"); // Extract hours and minutes
    if(hours == 24) {
      hours = '00'
    }
    return `${hours}:${minutes}`;
}

function HrsToMins(time) {
  const hour = time.split(':')[0];
  const min = time.split(':')[1];
  const currTimeInMin = (+hour * 60) + (+min);
  return currTimeInMin;
}

module.exports = {
    currentDate,
    checkInTime,
    HrsToMins,
    dateAfterAddingDays,
}