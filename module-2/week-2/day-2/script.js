const myHeading = document.getElementById("headingH1");
myHeading.textContent = "Going Crazy in My JS. Look out!";

function searchFunction() {
    const searchTerm = document.getElementById("searchInput");
    console.log("We are searching for: " + searchTerm.value);
}

const form = document.getElementById("tigerQuestion");
form.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("You submitted the form.")
})