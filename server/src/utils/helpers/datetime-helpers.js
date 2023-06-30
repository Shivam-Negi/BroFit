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

function checkInTime() {
    const date = new Date().toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata", // Set the timezone to IST
      hour12: false, // Use 24-hour format
    });
    const [hours, minutes] = date.split(":"); // Extract hours and minutes
    return `${hours}:${minutes}`;
}

function checkOutTime() {
    const checkInTime = this.checkIn;
    const [hours, minutes] = checkInTime.split(':');
    return `${+hours + 3}:${minutes}`;
}

module.exports = {
    currentDate,
    checkInTime,
    checkOutTime
}