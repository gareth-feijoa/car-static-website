// Import car data and Router
import { carData } from './carData.js';
import { Router } from './router.js';

// Initialize router
const router = new Router([
    {
        path: '/',
        handler: () => showCarDetails('bmw-225xe')
    },
    {
        path: '/bmw-225xe',
        handler: () => showCarDetails('bmw-225xe')
    },
    {
        path: '/hyundai-ioniq',
        handler: () => showCarDetails('hyundai-ioniq')
    },
    {
        path: '/hyundai-ioniq-facelift',
        handler: () => showCarDetails('hyundai-ioniq-facelift')
    },
    {
        path: '/kia-niro',
        handler: () => showCarDetails('kia-niro')
    },
    {
        path: '/mitsubishi-outlander',
        handler: () => showCarDetails('mitsubishi-outlander')
    },
    {
        path: '/vw-passat-gte',
        handler: () => showCarDetails('vw-passat-gte')
    },
    {
        path: '/bmw-active-tourer-216d',
        handler: () => showCarDetails('bmw-active-tourer-216d')
    },
    {
        path: '/citroen-c5-aircross',
        handler: () => showCarDetails('citroen-c5-aircross')
    },
    {
        path: '/skoda-octavia-2017',
        handler: () => showCarDetails('skoda-octavia-2017')
    },
    {
        path: '/skoda-octavia-2020',
        handler: () => showCarDetails('skoda-octavia-2020')
    },
    {
        path: '/skoda-octavia-mhev',
        handler: () => showCarDetails('skoda-octavia-mhev')
    }
]);

// Initialize car selector
function initializeCarSelector() {
    const select = document.getElementById('car-selector');
    if (!select) return;

    // Populate car options
    Object.entries(carData).forEach(([id, car]) => {
        const option = document.createElement('option');
        option.value = id;
        
        // Add more descriptive text for specific models
        if (id === 'skoda-octavia-2017') {
            option.textContent = 'Skoda Octavia Estate (2017-2020)';
        } else if (id === 'skoda-octavia-2020') {
            option.textContent = 'Skoda Octavia Estate (2020-Present)';
        } else if (id === 'skoda-octavia-mhev') {
            option.textContent = 'Skoda Octavia Estate MHEV (2020-Present)';
        } else if (id === 'hyundai-ioniq') {
            option.textContent = 'Hyundai Ioniq Hybrid (2016-2020)';
        } else if (id === 'hyundai-ioniq-facelift') {
            option.textContent = 'Hyundai Ioniq Hybrid (2020-2022)';
        } else {
            option.textContent = car.title;
        }
        
        select.appendChild(option);
    });

    // Handle car selection
    select.addEventListener('change', (e) => {
        const carId = e.target.value;
        router.navigate(`/${carId}`);
    });
}

// Show car details
function showCarDetails(carId) {
    const car = carData[carId];
    if (!car) return;

    // Update page title
    document.title = `${car.title} - Car Details`;

    // Update car hero image
    const heroImg = document.querySelector('.car-hero img');
    if (heroImg) {
        heroImg.src = car.image;
        heroImg.alt = car.title;
    }

    // Update car title
    const titleEl = document.querySelector('.car-title h1');
    if (titleEl) titleEl.textContent = car.title;

    const subtitleEl = document.querySelector('.car-title p');
    if (subtitleEl) subtitleEl.textContent = car.subtitle;

    const yearRangeEl = document.querySelector('.year-range');
    if (yearRangeEl) yearRangeEl.textContent = car.yearRange;

    // Update price range
    const priceEl = document.querySelector('.price-range');
    if (priceEl) priceEl.textContent = car.priceRange;

    // Update NCAP rating
    const starsEl = document.querySelector('.stars');
    if (starsEl) {
        starsEl.innerHTML = '★'.repeat(car.ncapRating) + '☆'.repeat(5 - car.ncapRating);
    }

    const ncapRatingNumberEl = document.querySelector('.ncap-rating .rating-number');
    if (ncapRatingNumberEl) {
        ncapRatingNumberEl.textContent = `${car.ncapRating}/5`;
    }

    // Update trim levels
    const trimLevelsEl = document.querySelector('.trim-levels');
    if (trimLevelsEl) {
        trimLevelsEl.innerHTML = car.trimLevels.map(trim => `
            <div class="trim-level">
                <h3>${trim.name}</h3>
                <ul class="trim-features">
                    ${trim.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
        `).join('');
    }

    // Update positive points
    const positivePointsEl = document.querySelector('.points-list');
    if (positivePointsEl) {
        positivePointsEl.innerHTML = car.positivePoints.map(point => `
            <li class="plus-point">${point}</li>
        `).join('');
    }

    // Update negative points
    const negativePointsEl = document.querySelectorAll('.points-list')[1];
    if (negativePointsEl) {
        negativePointsEl.innerHTML = car.negativePoints.map(point => `
            <li class="negative-point">${point}</li>
        `).join('');
    }

    // Update reliability rating
    const ratingFillEl = document.querySelector('.rating-fill');
    if (ratingFillEl) {
        ratingFillEl.style.width = `${car.reliabilityRating * 10}%`;
    }

    const reliabilityNumberEl = document.querySelector('.reliability-rating .rating-number');
    if (reliabilityNumberEl) {
        reliabilityNumberEl.textContent = `${car.reliabilityRating}/10`;
    }

    // Update Gareth's comments
    const garethCommentsEl = document.querySelector('.gareth-comments');
    if (garethCommentsEl) {
        garethCommentsEl.innerHTML = car.garethComments.map(comment => `
            <p>${comment}</p>
        `).join('');
    }

    // Update Gareth's rating
    const garethRatingEl = document.querySelector('.rating-text');
    if (garethRatingEl) {
        garethRatingEl.textContent = `${car.garethRating}/5`;
    }

    const garethStarsEl = document.querySelector('.rating-stars');
    if (garethStarsEl) {
        garethStarsEl.innerHTML = '★'.repeat(Math.floor(car.garethRating)) + 
            (car.garethRating % 1 ? '★' : '☆') + 
            '☆'.repeat(4 - Math.floor(car.garethRating));
    }

    // Update practicality grid
    const practicalityGridEl = document.querySelector('.practicality-grid');
    if (practicalityGridEl) {
        practicalityGridEl.innerHTML = Object.entries(car.practicality).map(([key, value]) => `
            <div class="practicality-item">
                <h3>${key.replace(/([A-Z])/g, ' $1').trim()}</h3>
                <p>${value}</p>
            </div>
        `).join('');
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    initializeCarSelector();
}); 