// User Management
let currentUser = null;

// Theme Management
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Initialize Theme
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

// Auth System
function registerUser(email, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if(users.some(u => u.email === email)) return false;
    
    const newUser = {
        email,
        password,
        posts: [],
        theme: 'light'
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    return true;
}

function loginUser(email, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    if(user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        return true;
    }
    return false;
}

// Post Management
function savePost(post) {
    if(!currentUser) return;
    
    currentUser.posts.push({
        ...post,
        id: Date.now(),
        date: new Date().toISOString(),
        likes: 0,
        comments: []
    });
    
    localStorage.setItem('users', JSON.stringify(
        JSON.parse(localStorage.getItem('users')).map(u => 
            u.email === currentUser.email ? currentUser : u
        )
    ));
}

// Initialize App
function initApp() {
    initTheme();
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
}

// Event Listeners
document.addEventListener('DOMContentLoaded', initApp);

// Mobile Menu
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
}
