let isDarkMode = true;

// Function to toggle between light and dark themes
function toggleTheme() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode');
    
    // Save theme preference
    localStorage.setItem('darkMode', isDarkMode);
}

// Function to handle navigation
function navigateTo(path) {
    console.log(`Navigating to ${path}`);
    // Add your navigation logic here
    // Example: window.location.href = path;
}

// Initialize theme toggle
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme === 'true') {
        isDarkMode = true;
        document.body.classList.add('dark-mode');
        themeToggle.checked = true;
    }

    // Add event listener for toggle
    themeToggle.addEventListener('change', toggleTheme);
});