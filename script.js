const calendarDays = document.getElementById("calendar-days");

const monthYear = document.getElementById("month-year");

const previousMonth = document.getElementById("previous-month");

const nextMonth = document.getElementById("next-month");

const selectedDateInput = document.getElementById("selected-date");

const timeSlots = document.querySelectorAll(".time-slot");

const selectedTimeInput = document.getElementById("selected-time");

let currentDate = new Date();

const unavailableDays = [
  "2026-07-25",
  "2026-07-26",
  "2026-08-01",
  "2026-08-02"
];

function createCalendar() {

  calendarDays.innerHTML = "";

  const year = currentDate.getFullYear();

  const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleString("default", {
    month: "long"
  });

  monthYear.textContent = `${monthName} ${year}`;

  const firstDay = new Date(year, month, 1).getDay();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {

    const emptyDay = document.createElement("div");

    calendarDays.appendChild(emptyDay);

  }

  for (let day = 1; day <= daysInMonth; day++) {

    const button = document.createElement("button");

    button.type = "button";

    button.textContent = day;

    const date =
      `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    if (unavailableDays.includes(date)) {

      button.classList.add("unavailable");

      button.disabled = true;

    }

    button.addEventListener("click", function () {

      document
        .querySelectorAll(".calendar-days button")
        .forEach(button => {
          button.classList.remove("selected");
        });

      button.classList.add("selected");

      selectedDateInput.value = date;

    });

    calendarDays.appendChild(button);

  }

}

previousMonth.addEventListener("click", function () {

  currentDate.setMonth(currentDate.getMonth() - 1);

  createCalendar();

});

nextMonth.addEventListener("click", function () {

  currentDate.setMonth(currentDate.getMonth() + 1);

  createCalendar();

});

timeSlots.forEach(function (slot) {

  slot.addEventListener("click", function () {

    timeSlots.forEach(function (slot) {

      slot.classList.remove("selected");

    });

    slot.classList.add("selected");

    selectedTimeInput.value = slot.textContent.trim();

  });

});

createCalendar();