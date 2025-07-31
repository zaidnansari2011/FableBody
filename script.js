// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the page
    initializePage();
    setupAnimations();
    setupInteractions();
});

function initializePage() {
    // Add loading class to profile image
    const profileImg = document.getElementById('profile-img');
    if (profileImg) {
        profileImg.addEventListener('load', function() {
            this.classList.add('loaded');
        });
        
        // Trigger load event if image is already cached
        if (profileImg.complete) {
            profileImg.classList.add('loaded');
        }
    }
}

function setupAnimations() {
    // Add sparkle effect on hover for links
    const linkItems = document.querySelectorAll('.link-item');
    linkItems.forEach(link => {
        link.addEventListener('mouseenter', createSparkles);
        link.addEventListener('mouseleave', removeSparkles);
    });
}

function setupInteractions() {
    // Add click analytics (you can replace this with actual analytics)
    const linkItems = document.querySelectorAll('.link-item');
    linkItems.forEach(link => {
        link.addEventListener('click', function(e) {
            const linkTitle = this.getAttribute('data-title');
            const href = this.getAttribute('href');
            const isComingSoon = this.classList.contains('coming-soon');
            
            // Handle coming soon links
            if (isComingSoon) {
                e.preventDefault();
                showNotification('🌸 Website Coming Soon! Stay tuned for something beautiful ✨');
                return;
            }
            
            // Don't prevent default for actual links
            if (href === '#') {
                e.preventDefault();
            }
            
            console.log(`Link clicked: ${linkTitle}`);
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Show a cute notification only for placeholder links
            if (href === '#' && !isComingSoon) {
                showNotification(`Opening ${linkTitle}... 💕`);
            }
        });
    });
    
    // Social links click handling
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add bounce animation
            this.style.animation = 'bounce 0.6s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 600);
            
            showNotification('Social link clicked! 🌟');
        });
    });
    
    // Profile image click for easter egg
    const profileImg = document.getElementById('profile-img');
    if (profileImg) {
        profileImg.addEventListener('click', function() {
            this.style.animation = 'spin 1s ease-in-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 1000);
            showNotification('✨ Fabulous! ✨');
        });
    }
}

function createSparkles(e) {
    const rect = e.target.getBoundingClientRect();
    
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.cssText = `
                position: fixed;
                width: 6px;
                height: 6px;
                background: #ff69b4;
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                left: ${rect.left + Math.random() * rect.width}px;
                top: ${rect.top + Math.random() * rect.height}px;
                animation: sparkleAnimation 1s ease-out forwards;
            `;
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 1000);
        }, i * 100);
    }
}

function removeSparkles() {
    // Sparkles are automatically removed by their timeout
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255, 255, 255, 0.95);
        padding: 1rem 2rem;
        border-radius: 25px;
        border: 2px solid #ff69b4;
        color: #2d1b34;
        font-weight: 500;
        z-index: 10000;
        backdrop-filter: blur(10px);
        box-shadow: 0 10px 30px rgba(255, 105, 180, 0.3);
        animation: notificationIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 2 seconds
    setTimeout(() => {
        notification.style.animation = 'notificationOut 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 2000);
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.6;
        }
        50% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes sparkleAnimation {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: scale(1) rotate(180deg);
            opacity: 1;
        }
        100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes notificationIn {
        0% {
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 0;
        }
        100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
    }
    
    @keyframes notificationOut {
        0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 0;
        }
    }
    
    @keyframes bounce {
        0%, 20%, 60%, 100% {
            transform: translateY(0);
        }
        40% {
            transform: translateY(-10px);
        }
        80% {
            transform: translateY(-5px);
        }
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg) scale(1); }
        50% { transform: rotate(180deg) scale(1.1); }
        100% { transform: rotate(360deg) scale(1); }
    }
`;
document.head.appendChild(style);

// Add some fun keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Press 'p' for pink explosion effect
    if (e.key.toLowerCase() === 'p') {
        createPinkExplosion();
    }
    
    // Press 's' for sparkle shower
    if (e.key.toLowerCase() === 's') {
        createSparkleShower();
    }
});

function createPinkExplosion() {
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 8px;
                height: 8px;
                background: ${['#ff69b4', '#ff1493', '#ffc0cb', '#ffb6c1'][Math.floor(Math.random() * 4)]};
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                left: 50vw;
                top: 50vh;
                animation: explode 2s ease-out forwards;
            `;
            
            const angle = (i / 20) * 360;
            const distance = 200 + Math.random() * 100;
            
            particle.style.setProperty('--angle', `${angle}deg`);
            particle.style.setProperty('--distance', `${distance}px`);
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 2000);
        }, i * 50);
    }
}

function createSparkleShower() {
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.style.cssText = `
                position: fixed;
                width: 6px;
                height: 6px;
                background: #ff69b4;
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                left: ${Math.random() * 100}vw;
                top: -10px;
                animation: shower 3s linear forwards;
            `;
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 3000);
        }, i * 100);
    }
}

// Add more animation styles
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes explode {
        0% {
            transform: translate(-50%, -50%) rotate(0deg) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) 
                      translate(
                        calc(cos(var(--angle)) * var(--distance)),
                        calc(sin(var(--angle)) * var(--distance))
                      ) 
                      rotate(720deg) scale(0);
            opacity: 0;
        }
    }
    
    @keyframes shower {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(additionalStyles);
