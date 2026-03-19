// Before/After Slider Logic
const slider = document.getElementById('slider');
const afterImg = document.getElementById('after-img');
const handle = document.getElementById('handle');

slider.addEventListener('input', (e) => {
    const value = e.target.value;
    afterImg.style.width = `${value}%`;
    handle.style.left = `${value}%`;
});

// Animated Counters
const stats = document.querySelectorAll('[data-target]');
const observerOptions = { threshold: 1 };

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            let count = 0;
            const duration = 2000;
            const increment = target / (duration / 16);

            const updateCount = () => {
                if (count < target) {
                    count += increment;
                    entry.target.innerText = Math.ceil(count) + '+';
                    requestAnimationFrame(updateCount);
                } else {
                    entry.target.innerText = target + '+';
                }
            };
            updateCount();
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

stats.forEach(stat => statsObserver.observe(stat));

// Cost Calculator
function calculateCost() {
    const type = document.getElementById('projType').value;
    const sqft = document.getElementById('sqft').value;
    const resultDisplay = document.getElementById('estimateResult');

    if (sqft && sqft > 0) {
        const total = type * sqft;
        resultDisplay.innerText = '$' + total.toLocaleString();
    } else {
        alert("Please enter a valid area");
    }
}

// Project Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const projects = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');

        // Update buttons UI
        filterBtns.forEach(b => {
            b.classList.remove('text-primary', 'font-bold', 'border-b-2', 'border-primary');
            b.classList.add('text-gray-500');
        });
        btn.classList.add('text-primary', 'font-bold', 'border-b-2', 'border-primary');
        btn.classList.remove('text-gray-500');

        // Filter projects
        projects.forEach(proj => {
            if (filter === 'all' || proj.getAttribute('data-cat') === filter) {
                proj.style.display = 'block';
            } else {
                proj.style.display = 'none';
            }
        });
    });
});

// Mobile Menu Toggle
const menuBtn = document.getElementById('menuBtn');
// Logic for mobile menu would go here... (simplified for this demo)
