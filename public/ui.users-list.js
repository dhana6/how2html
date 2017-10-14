var usersList = getElement(".users-list");

var usersContainer = getElement(".users-container");

usersList.onclick = function() {
	if (usersList.className.indexOf("selected") != -1) {
		usersList.className = usersList.className.replace(/ selected/g, "");
		usersContainer.style.display = "none";
	} else {
		usersList.className += " selected";
		usersContainer.style.display = "block";
	}
};
