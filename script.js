// Typing Animation
const typingText = document.querySelector('.typing-text');
const phrases = [
    'Frontend Developer',
    'Python Developer',
    'Java Developer',
    'Data Analyst', 
    'Graphic Designer',
    'Problem Solver',
    'Tech Explorer'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = isDeleting ? 100 : 150;
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }
    
    setTimeout(typeWriter, typeSpeed);
}

// Start typing animation when page loads
window.addEventListener('load', () => {
    typeWriter();
});

// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    const offsetTop = section.offsetTop - 80;
    
    window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
    });
}

// Update Active Navigation Link
function updateActiveNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY <= sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTop');

function toggleScrollToTop() {
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
}

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Scroll Event Listeners
window.addEventListener('scroll', () => {
    updateActiveNav();
    toggleScrollToTop();
    animateOnScroll();
});

// Animation on Scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.project-card, .skill-category, .about-card, .resume-preview');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('fade-in');
        }
    });
}

// Skill Item Hover Effects
document.querySelectorAll('.skill-item').forEach(skill => {
    skill.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.05)';
    });
    
    skill.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Project Card 3D Effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    });
});

// Resume Download Function
function downloadResume() {
    // Create a sample PDF content (in a real scenario, you would have an actual PDF file)
    const resumeContent = `
        SWEETHA'S RESUME
        
        CONTACT INFORMATION
        Email: sweetha@example.com
        Phone: +1 (555) 123-4567
        GitHub: github.com/sweetha
        LinkedIn: linkedin.com/in/sweetha
        
        EDUCATION
        Bachelor of Computer Science
        XYZ University (2020-2024)
        GPA: 3.8/4.0
        
        TECHNICAL SKILLS
        • Frontend: React, JavaScript, HTML5, CSS3
        • Backend: Node.js, Python, Express
        • Database: MongoDB, MySQL
        • Tools: Git, VS Code, Figma
        
        PROJECTS
        • E-commerce Platform - Full-stack web application
        • Task Management App - React-based productivity tool
        • Weather Forecast App - API integration project
        • Personal Portfolio - Responsive web design
        • Real-time Chat App - Socket.io implementation
        • Data Visualization Dashboard - D3.js charts
        
        EXPERIENCE
        Frontend Developer Intern
        Tech Solutions Inc. (Summer 2023)
        • Developed responsive web applications
        • Collaborated with design team
        • Improved website performance by 30%
        
        ACHIEVEMENTS
        • Dean's List - Fall 2022, Spring 2023
        • Hackathon Winner - University Code Challenge
        • Open Source Contributor - GitHub projects
    `;
    
    // Create and download a text file (in real scenario, use a PDF)
    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Sweetha_Resume.txt';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    // Show download notification
    showNotification('Resume downloaded successfully!', 'success');
}

// View Resume Function
function viewResume() {
    // Open resume in a new tab (in real scenario, this would open the actual PDF)
    const resumeWindow = window.open('', '_blank');
    resumeWindow.document.write(`
        <html>
            <head>
                <title>Sweetha's Resume</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        max-width: 800px;
                        margin: 0 auto;
                        padding: 20px;
                        line-height: 1.6;
                        background: #f5f5f5;
                    }
                    .resume-container {
                        background: white;
                        padding: 40px;
                        border-radius: 10px;
                        box-shadow: 0 0 20px rgba(0,0,0,0.1);
                    }
                    h1 { color: #c770f0; text-align: center; }
                    h2 { color: #333; border-bottom: 2px solid #c770f0; padding-bottom: 5px; }
                    .contact-info { text-align: center; margin-bottom: 30px; }
                    .section { margin-bottom: 30px; }
                    ul { padding-left: 20px; }
                    li { margin-bottom: 8px; }
                </style>
            </head>
            <body>
                <div class="resume-container">
                    <h1>SWEETHA</h1>
                    <div class="contact-info">
                        <p>Email: sweetha@example.com | Phone: +1 (555) 123-4567</p>
                        <p>GitHub: github.com/sweetha | LinkedIn: linkedin.com/in/sweetha</p>
                    </div>
                    
                    <div class="section">
                        <h2>EDUCATION</h2>
                        <p><strong>Bachelor of Computer Science</strong><br>
                        XYZ University (2020-2024)<br>
                        GPA: 3.8/4.0</p>
                    </div>
                    
                    <div class="section">
                        <h2>TECHNICAL SKILLS</h2>
                        <ul>
                            <li><strong>Frontend:</strong> React, JavaScript, HTML5, CSS3</li>
                            <li><strong>Backend:</strong> Node.js, Python, Express</li>
                            <li><strong>Database:</strong> MongoDB, MySQL</li>
                            <li><strong>Tools:</strong> Git, VS Code, Figma</li>
                        </ul>
                    </div>
                    
                    <div class="section">
                        <h2>PROJECTS</h2>
                        <ul>
                            <li><strong>E-commerce Platform</strong> - Full-stack web application with user authentication and payment integration</li>
                            <li><strong>Task Management App</strong> - React-based productivity tool with real-time updates</li>
                            <li><strong>Weather Forecast App</strong> - API integration project with location-based forecasts</li>
                            <li><strong>Personal Portfolio</strong> - Responsive web design showcasing projects and skills</li>
                            <li><strong>Real-time Chat App</strong> - Socket.io implementation with group chat features</li>
                            <li><strong>Data Visualization Dashboard</strong> - D3.js charts with interactive data representation</li>
                        </ul>
                    </div>
                    
                    <div class="section">
                        <h2>EXPERIENCE</h2>
                        <p><strong>Frontend Developer Intern</strong><br>
                        Tech Solutions Inc. (Summer 2023)</p>
                        <ul>
                            <li>Developed responsive web applications using React and JavaScript</li>
                            <li>Collaborated with design team to implement user interfaces</li>
                            <li>Improved website performance by 30% through optimization</li>
                        </ul>
                    </div>
                    
                    <div class="section">
                        <h2>ACHIEVEMENTS</h2>
                        <ul>
                            <li>Dean's List - Fall 2022, Spring 2023</li>
                            <li>Hackathon Winner - University Code Challenge</li>
                            <li>Open Source Contributor - Multiple GitHub projects</li>
                        </ul>
                    </div>
                </div>
            </body>
        </html>
    `);
    
    showNotification('Resume opened in new tab!', 'info');
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 9999;
        animation: slideInRight 0.3s ease-out;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add notification styles to document
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 14px;
        margin-left: auto;
    }
    
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(notificationStyles);

// Navigation Click Handlers
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        scrollToSection(targetId);
    });
});

// Initialize animations on load
window.addEventListener('load', () => {
    // Add loading animation to skill items
    document.querySelectorAll('.skill-item').forEach((skill, index) => {
        setTimeout(() => {
            skill.style.opacity = '0';
            skill.style.transform = 'translateY(20px)';
            skill.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                skill.style.opacity = '1';
                skill.style.transform = 'translateY(0)';
            }, 100);
        }, index * 100);
    });
    
    // Trigger initial scroll animations
    animateOnScroll();
});

// Intersection Observer for better performance
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.project-card, .skill-category, .about-card').forEach(el => {
    observer.observe(el);
});

// Preloader (optional)
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => preloader.remove(), 500);
    }
});

// Add smooth reveal animation for sections
function revealOnScroll() {
    const reveals = document.querySelectorAll('.section-header, .home-content, .about-content, .projects-grid, .resume-content');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('fade-in');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Enhanced mobile experience
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
    
    // Improve touch interactions for project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        });
        
        card.addEventListener('touchend', function() {
            setTimeout(() => {
                this.classList.remove('touch-active');
            }, 300);
        });
    });
}

// Add loading state for resume actions
function addLoadingState(button) {
    const originalContent = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    button.disabled = true;
    
    setTimeout(() => {
        button.innerHTML = originalContent;
        button.disabled = false;
    }, 2000);
}

// Update download and view functions to include loading states
const originalDownload = downloadResume;
const originalView = viewResume;

downloadResume = function() {
    const downloadBtn = document.querySelector('.download-btn');
    addLoadingState(downloadBtn);
    setTimeout(originalDownload, 2000);
};

viewResume = function() {
    const viewBtn = document.querySelector('.view-btn');
    addLoadingState(viewBtn);
    setTimeout(originalView, 2000);
};

document.addEventListener('DOMContentLoaded', () => {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});