// User Authentication
const users = JSON.parse(localStorage.getItem('users')) || [];

// Registration
document.getElementById('registerForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;

    if(users.some(user => user.email === email)) {
        alert('User already exists!');
        return;
    }

    users.push({ email, password, posts: [] });
    localStorage.setItem('users', JSON.stringify(users));
    window.location.href = 'login.html';
});

// Post Management
let currentPost = {
    title: '',
    content: '',
    tags: [],
    likes: 0,
    comments: []
};

function saveDraft() {
    currentPost.title = document.getElementById('postTitle').value;
    currentPost.content = document.querySelector('.editor-content').innerHTML;
    currentPost.tags = document.getElementById('postTags').value.split(',');
    
    localStorage.setItem('draft', JSON.stringify(currentPost));
    alert('Draft saved!');
}

function publishPost() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    user.posts.push(currentPost);
    localStorage.setItem('currentUser', JSON.stringify(user));
    window.location.href = 'dashboard.html';
}

// Dark Mode Toggle
function toggleDarkMode() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
}

// Load Dashboard Data
window.addEventListener('DOMContentLoaded', () => {
    if(window.location.pathname.endsWith('dashboard.html')) {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        document.getElementById('postCount').textContent = user.posts.length;
        document.getElementById('likeCount').textContent = 
            user.posts.reduce((sum, post) => sum + post.likes, 0);
        
        // Render posts
        const postsContainer = document.getElementById('postsContainer');
        postsContainer.innerHTML = user.posts.map(post => `
            <div class="post-card">
                <h4>${post.title}</h4>
                <div>${post.content.slice(0, 100)}...</div>
                <div class="post-meta">
                    <span>${post.likes} Likes</span>
                    <button onclick="editPost('${post.id}')">Edit</button>
                </div>
            </div>
        `).join('');
    }
});
