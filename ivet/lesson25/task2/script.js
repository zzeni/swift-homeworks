var submitBtn = document.getElementById("btn");
var dayBtn = document.getElementById("day");
var monthBtn = document.getElementById("month");
var yearBtn = document.getElementById("year");

function howOldAmI(date) {
	var parts = date.split("-");

	var targetDay = Number.parseInt(parts[0]);
	var targetMonth = Number.parseInt(parts[1]) - 1;
	var targetYear = Number.parseInt(parts[2]);

	var today = new Date();
	var currentDay = today.getDate();
	var currentMonth = today.getMonth();
	var currentYear = today.getFullYear();

	if (targetDay === currentDay
			&& targetMonth === currentMonth) {
		return "Happy Birthday!";
	}

	var age = currentYear - targetYear;

	if (targetMonth > currentMonth
			|| (targetMonth === currentMonth && targetDay > currentDay)) {
		age--;
	}
	return "You are " + age + " years old!";
}

function onSubmit() {
	var day = dayBtn.value;
	var month = monthBtn.value;
	var year = yearBtn.value;

	var date = day + "-" + month + "-" + year;
	document.getElementById("age").innerHTML =
			howOldAmI(date);
}

submitBtn.addEventListener("click", onSubmit);