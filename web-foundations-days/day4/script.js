
const noteText = document.getElementById("note-text");
const charCount = document.getElementById("char-count");
const wordCount = document.getElementById("word-count");
const clearBtn = document.getElementById("clear-btn");
const themeToggle = document.getElementById("theme-toggle");

const DRAFT_KEY = "day4-note-draft";
const THEME_KEY = "day4-theme";

// Update character and word counters
function updateCounts() {
    const text = noteText.value;
    const characters = text.length;

    const trimmedText = text.trim();
    const words = trimmedText === ""
        ? 0
        : trimmedText.split(/\s+/).length;

    charCount.textContent = `${characters} / 200 characters`;
    wordCount.textContent = `${words} words`;

    // Reset counter styles before applying the correct class
    charCount.classList.remove("warning", "over");

    if (characters > 200) {
        charCount.classList.add("over");
    } else if (characters > 180) {
        charCount.classList.add("warning");
    }
}

// Save the draft and update counters on every input
noteText.addEventListener("input", () => {
    updateCounts();
    localStorage.setItem(DRAFT_KEY, noteText.value);
});

// Clear the text, counters and saved draft
function clearEverything() {
    noteText.value = "";
    localStorage.removeItem(DRAFT_KEY);
    updateCounts();
}

clearBtn.addEventListener("click", clearEverything);

// Press Escape while inside the textarea to clear everything
noteText.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        clearEverything();
    }
});

// Apply the selected theme and update the button label
function applyTheme(theme) {
    const darkMode = theme === "dark";

    document.body.classList.toggle("dark", darkMode);
    themeToggle.textContent = darkMode ? "Light mode" : "Dark mode";
}

// Toggle dark mode and save the user's choice
themeToggle.addEventListener("click", () => {
    const darkMode = document.body.classList.contains("dark");
    const newTheme = darkMode ? "light" : "dark";

    applyTheme(newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
});

// Restore the saved draft when the page loads
const savedDraft = localStorage.getItem(DRAFT_KEY);

if (savedDraft !== null) {
    noteText.value = savedDraft;
}

// Restore the saved theme
const savedTheme = localStorage.getItem(THEME_KEY);
applyTheme(savedTheme === "dark" ? "dark" : "light");

// Initialize the counters
updateCounts();
