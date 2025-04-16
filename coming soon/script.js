const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  
  setTimeout(() => {
    cursorFollower.style.left = e.clientX + 'px';
    cursorFollower.style.top = e.clientY + 'px';
  }, 100);
});

const interactiveElements = document.querySelectorAll('a, button, .dropdown-toggle, .dropdown-item');
interactiveElements.forEach(element => {
  element.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
    cursorFollower.style.width = '60px';
    cursorFollower.style.height = '60px';
    cursorFollower.style.borderColor = 'rgba(77, 77, 77, 0.4)';
  });
  
  element.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    cursorFollower.style.width = '40px';
    cursorFollower.style.height = '40px';
    cursorFollower.style.borderColor = 'rgba(77, 77, 77, 0.2)';
  });
});

document.addEventListener('mouseout', (e) => {
  if (e.relatedTarget === null) {
    cursor.style.opacity = '0';
    cursorFollower.style.opacity = '0';
  }
});

document.addEventListener('mouseover', () => {
  cursor.style.opacity = '1';
  cursorFollower.style.opacity = '1';
});

const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const particleCount = 150;
const connectDistance = 150;
const mouseRadius = 150;

const mouse = {
  x: null,
  y: null,
  radius: mouseRadius
};

function createParticles() {
  particles = [];
  for (let i = 0; i < particleCount; i++) {
    const size = Math.random() * 2 + 0.5;
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const directionX = (Math.random() - 0.5) * 0.8;
    const directionY = (Math.random() - 0.5) * 0.8;
    const color = getRandomColor();
    
    particles.push({
      x, y, directionX, directionY, size, color,
      originalX: x,
      originalY: y,
      density: (Math.random() * 30) + 1
    });
  }
}

function getRandomColor() {
  const colors = [
    'rgba(77, 77, 77, 0.8)',   
    'rgba(60, 60, 60, 0.7)',
    'rgba(30, 30, 30, 0.6)',  
    'rgba(77, 77, 77, 0.4)',   
    'rgba(60, 60, 60, 0.3)',   
    'rgba(30, 30, 30, 0.2)'    
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

function connectParticles() {
  for (let a = 0; a < particles.length; a++) {
    for (let b = a; b < particles.length; b++) {
      const dx = particles[a].x - particles[b].x;
      const dy = particles[a].y - particles[b].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < connectDistance) {
        const opacity = 1 - (distance / connectDistance);
        ctx.beginPath();
        ctx.strokeStyle = `rgba(77, 77, 77, ${opacity * 0.5})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(particles[a].x, particles[a].y);
        ctx.lineTo(particles[b].x, particles[b].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    
    p.x += p.directionX;
    p.y += p.directionY;
    
    if (p.x > canvas.width || p.x < 0) {
      p.directionX = -p.directionX;
    }
    if (p.y > canvas.height || p.y < 0) {
      p.directionY = -p.directionY;
    }
    
    if (mouse.x !== null && mouse.y !== null) {
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < mouse.radius) {
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        const force = (mouse.radius - distance) / mouse.radius;
        const directionX = forceDirectionX * force * p.density * -1;
        const directionY = forceDirectionY * force * p.density * -1;
        
        p.x += directionX;
        p.y += directionY;
      }
    }
    
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
  }
  
  connectParticles();
  
  requestAnimationFrame(animate);
}

document.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

document.addEventListener('mouseout', () => {
  mouse.x = null;
  mouse.y = null;
});

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  createParticles();
});

const translations = {
  en: {
    comingSoon: "Portfolio Website Coming Soon",
    github: "GitHub",
    contactMe: "Contact Me",
    language: "Language",
    copyright: "© 2025 • Akif • All Rights Reserved"
  },
  tr: {
    comingSoon: "Portfolyo Web Sitesi Çok Yakında",
    github: "GitHub",
    contactMe: "Bana Ulaşın",
    language: "Dil",
    copyright: "© 2025 • Akif • Tüm Hakları Saklıdır"
  },
  de: {
    comingSoon: "Portfolio-Website Kommt Bald",
    github: "GitHub",
    contactMe: "Kontaktieren Sie Mich",
    language: "Sprache",
    copyright: "© 2025 • Akif • Alle Rechte Vorbehalten"
  }
};

const subtitleElement = document.querySelector('.subtitle');
const contactBtnElement = document.querySelector('a[href="mailto:info@akif.pw"]');
const currentLanguageText = document.querySelector('.current-language');
const copyrightElement = document.querySelector('.copyright');

function setLanguage(lang) {
    subtitleElement.textContent = translations[lang].comingSoon;
  
  contactBtnElement.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
    ${translations[lang].contactMe}
  `;
  
  currentLanguageText.textContent = translations[lang].language;
  
  copyrightElement.textContent = translations[lang].copyright;
}

const languageDropdown = document.querySelector('.language-dropdown');
const dropdownToggle = document.querySelector('.dropdown-toggle');
const dropdownItems = document.querySelectorAll('.dropdown-item');

dropdownToggle.addEventListener('click', function() {
  languageDropdown.classList.toggle('active');
});

document.addEventListener('click', function(e) {
  if (!languageDropdown.contains(e.target)) {
    languageDropdown.classList.remove('active');
  }
});

dropdownItems.forEach(item => {
  item.addEventListener('click', function() {
    dropdownItems.forEach(el => el.classList.remove('active'));
    
    this.classList.add('active');
    
    const lang = this.getAttribute('data-lang');
    
    setLanguage(lang);
    
    languageDropdown.classList.remove('active');
    
    console.log(`Language changed to: ${lang}`);
  });
});

setLanguage('en');

createParticles();
animate();