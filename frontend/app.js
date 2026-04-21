// ============================================
// FITTRACK - Modern JavaScript
// ============================================

// Global variables
let workouts = [];

// DOM Elements
const toast = document.getElementById('message');
const apiIPInput = document.getElementById('apiIP');
const workoutForm = document.getElementById('workoutForm');
const submitBtn = document.getElementById('submitBtn');
const loadBtn = document.getElementById('loadBtn');
const workoutBody = document.getElementById('workoutBody');
const workoutTable = document.getElementById('workoutTable');
const noData = document.getElementById('noData');

// ============================================
// Toast Notifications
// ============================================
function showToast(message, isSuccess) {
    toast.textContent = message;
    toast.className = 'toast show ' + (isSuccess ? 'success' : 'error');
    
    setTimeout(() => {
        toast.className = toast.className.replace(' show', '');
    }, 5000);
}

// ============================================
// API IP Management
// ============================================
function getApiIP() {
    const ip = apiIPInput.value.trim();
    if (!ip) {
        showToast('Please enter the EC2 Public IP first!', false);
        return null;
    }
    return ip;
}

// ============================================
// Add Workout
// ============================================
async function addWorkout(e) {
    e.preventDefault();
    
    const apiIP = getApiIP();
    if (!apiIP) return;

    // Disable button during submission
    submitBtn.disabled = true;
    submitBtn.querySelector('span').textContent = 'Adding...';

    // Prepare data
    const data = {
        workout_type: document.getElementById('workoutType').value,
        duration: document.getElementById('duration').value,
        calories: document.getElementById('calories').value
    };

    try {
        const response = await fetch(`http://${apiIP}:5000/api/workouts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            showToast('Workout added successfully!', true);
            workoutForm.reset();
            loadWorkouts();
        } else {
            showToast('Failed to add workout', false);
        }
    } catch (error) {
        showToast('Error connecting to backend. Make sure EC2 is running.', false);
    }

    // Re-enable button
    submitBtn.disabled = false;
    submitBtn.querySelector('span').textContent = 'Add Workout';
}

// ============================================
// Load Workouts
// ============================================
async function loadWorkouts() {
    const apiIP = getApiIP();
    if (!apiIP) return;

    // Disable button during loading
    loadBtn.disabled = true;
    loadBtn.textContent = 'Loading...';

    try {
        const response = await fetch(`http://${apiIP}:5000/api/workouts`);
        workouts = await response.json();
        
        // Clear table
        workoutBody.innerHTML = '';
        
        if (workouts.length > 0) {
            workouts.forEach(w => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${w.workout_type || '-'}</td>
                    <td>${w.duration || 0} min</td>
                    <td>${w.calories || 0} kcal</td>
                `;
                workoutBody.appendChild(row);
            });
            workoutTable.style.display = 'table';
            noData.style.display = 'none';
        } else {
            workoutTable.style.display = 'none';
            noData.style.display = 'flex';
        }
    } catch (error) {
        showToast('Error loading workouts. Make sure EC2 is running.', false);
    }

    // Re-enable button
    loadBtn.disabled = false;
    loadBtn.textContent = 'Load';
}

// ============================================
// Navigation
// ============================================
function initNavigation() {
    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Update active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ============================================
// Mobile Navigation Toggle
// ============================================
function initMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (toggle && navLinks) {
        toggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
}

// ============================================
// Initialize App
// ============================================
function initApp() {
    // Form submissions
    workoutForm.addEventListener('submit', addWorkout);
    
    // Initialize navigation
    initNavigation();
    initMobileNav();
    
    console.log('FitTrack App Initialized');
}

// Run on DOM ready
document.addEventListener('DOMContentLoaded', initApp);