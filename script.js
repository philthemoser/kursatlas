document.addEventListener("DOMContentLoaded", function () {
  const coursesContainer = document.getElementById("courses");
  const filterButtons = document.querySelectorAll(".filter-button");
  const clearButton = document.getElementById("clear-button");
  const dateSlider = document.getElementById("date-slider");
  const dateOutput = document.getElementById("date-output");
const clearButton = document.getElementById('clear-button'); // New clear button
}
  
  let coursesData = []; // Will hold the parsed CSV data

  // Fetch and parse the CSV file
  fetch("courses.csv")
    .then((response) => response.text())
    .then((data) => {
      coursesData = parseCSV(data);
      updateCourses();
    });

  function parseCSV(csv) {
    const lines = csv.trim().split("\n");
    const headers = lines.shift().split(",");
    const courses = [];

    for (const line of lines) {
      const values = line.split(",");
      const course = {};
      for (let i = 0; i < headers.length; i++) {
        course[headers[i]] = values[i];
      }
      courses.push(course);
    }

    return courses;
  }

// Display all courses at the start
displayCourses(coursesData);

// Handle button clicks
const updateCoursesDisplay = () => {
    const selectedCategories = Array.from(categoryButtons)
        .filter(button => button.classList.contains('selected'))
        .map(button => button.value);

    const selectedLanguages = Array.from(languageButtons)
        .filter(button => button.classList.contains('selected'))
        .map(button => button.value);

    const selectedTypes = Array.from(typeButtons)
        .filter(button => button.classList.contains('selected'))
        .map(button => button.value);

    const filteredCourses = coursesData.filter(course =>
        (selectedCategories.length === 0 || selectedCategories.includes(course.category)) &&
        (selectedLanguages.length === 0 || selectedLanguages.includes(course.language)) &&
        (selectedTypes.length === 0 || selectedTypes.includes(course.type))
    );

    displayCourses(filteredCourses);
};

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.classList.toggle('selected');
        updateCoursesDisplay();
    });
});

languageButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.classList.toggle('selected');
        updateCoursesDisplay();
    });
});

typeButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.classList.toggle('selected');
        updateCoursesDisplay();
    });
});

// Clear all filters
clearButton.addEventListener('click', () => {
    categoryButtons.forEach(button => button.classList.remove('selected'));
    languageButtons.forEach(button => button.classList.remove('selected'));
    typeButtons.forEach(button => button.classList.remove('selected'));
    updateCoursesDisplay();
});

// Display courses in the UI
function displayCourses(courses) {
    coursesContainer.innerHTML = '';
    courses.forEach(course => {
        const courseDiv = document.createElement('div');
        courseDiv.className = 'course';
        courseDiv.textContent = course.name;
        coursesContainer.appendChild(courseDiv);
    });


}


