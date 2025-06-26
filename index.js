// Your code here
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
  return {
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents: [],
    timeOutEvents: []
  };
}

function createEmployeeRecords(employeeData) {
  return employeeData.map(createEmployeeRecord);
}

function createTimeInEvent(employee, dateStamp) {
  const [date, hour] = dateStamp.split(' ');
  employee.timeInEvents.push({ type: "TimeIn", hour: parseInt(hour, 10), date });
  return employee;
}

function createTimeOutEvent(employee, dateStamp) {
  const [date, hour] = dateStamp.split(' ');
  employee.timeOutEvents.push({ type: "TimeOut", hour: parseInt(hour, 10), date });
  return employee;
}

function hoursWorkedOnDate(employee, date) {
  const timeIn = employee.timeInEvents.find(e => e.date === date);
  const timeOut = employee.timeOutEvents.find(e => e.date === date);
  return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(employee, date) {
  const hours = hoursWorkedOnDate(employee, date);
  return hours * employee.payPerHour;
}

function allWagesFor(employee) {
  const dates = employee.timeInEvents.map(e => e.date);
  return dates.reduce((total, date) => total + wagesEarnedOnDate(employee, date), 0);
}

function calculatePayroll(employees) {
  return employees.reduce((total, emp) => total + allWagesFor(emp), 0);
}
