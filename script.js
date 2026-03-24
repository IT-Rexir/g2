let nextButton = document.getElementById('next');
let prevButton = document.getElementById('prev');
let carousel = document.querySelector('.carousel');
  let listHTML = document.querySelector('.carousel .list');
let seeMoreButtons = document.querySelectorAll('.seeMore');
let backButton = document.getElementById('back');
const logo = document.querySelector('header .logo');
if (logo) {
  const text = logo.textContent;
  logo.setAttribute('data-text', text);
}

document.querySelectorAll('header nav a').forEach(link => {
  link.addEventListener('mousemove', (e) => {
    const rect = link.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    
    const dx = (x - xc) / 8;
    const dy = (y - yc) / 4;
    
    link.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(1.05)`;
  });
  
  link.addEventListener('mouseleave', () => {
    link.style.transform = '';
  });
});

// Function to split text into spans for letter animation
function splitText(element) {
  if (!element) return;
  const text = element.textContent;
  const chars = text.split('');
  element.textContent = '';
  chars.forEach((char, i) => {
    const span = document.createElement('span');
    span.textContent = char;
    span.style.animationDelay = `${i * 0.03}s`;
    span.style.display = 'inline-block';
    element.appendChild(span);
  });
}

// Initialize text effects
function initTextEffects() {
  const titles = document.querySelectorAll('.carousel .list .item .introduce .title');
  const topics = document.querySelectorAll('.carousel .list .item .introduce .topic');
  
  titles.forEach(title => {
    title.dataset.text = title.textContent;
    splitText(title);
  });
  
  topics.forEach(topic => {
    topic.dataset.text = topic.textContent;
    if (topic.textContent.includes(' ')) {
      const words = topic.textContent.split(' ');
      topic.textContent = '';
      words.forEach((word, i) => {
        const span = document.createElement('span');
        span.textContent = word;
        span.style.animationDelay = `${i * 0.1}s`;
        span.style.display = 'inline-block';
        span.style.marginRight = '0.2em';
        topic.appendChild(span);
      });
    }
  });
}

nextButton.onclick = function() {
  showSlider('next');
}
prevButton.onclick = function() {
  showSlider('prev');
}
let unAcceppClick;
const showSlider = (type) => {
  nextButton.style.pointerEvents = 'none';
  prevButton.style.pointerEvents = 'none';
  
  carousel.classList.remove('next', 'prev');
  let items = document.querySelectorAll('.carousel .list .item');
  if (type === 'next') {
    listHTML.appendChild(items[0]);
    carousel.classList.add('next');
  } else {
    listHTML.prepend(items[items.length - 1]);
    carousel.classList.add('prev');
  }
  clearTimeout(unAcceppClick);
  unAcceppClick = setTimeout(() => {
    nextButton.style.pointerEvents = 'auto';
    prevButton.style.pointerEvents = 'auto';
  }, 2000);
  
  // Reinitialize text effects after slider transition
  reinitTextEffects();
}
seeMoreButtons.forEach((button) => {
  button.onclick = function() {
    carousel.classList.remove('next', 'prev');
    carousel.classList.add('showDetail');
  }
});
backButton.onclick = function() {
  carousel.classList.remove('showDetail');
}

// Initialize text effects on load
document.addEventListener('DOMContentLoaded', initTextEffects);

// Reinitialize text effects after slider changes
const reinitTextEffects = () => {
  setTimeout(() => {
    const activeTitle = document.querySelector('.carousel .list .item:nth-child(2) .introduce .title');
    const activeTopic = document.querySelector('.carousel .list .item:nth-child(2) .introduce .topic');
    
    if (activeTitle) {
      activeTitle.textContent = activeTitle.dataset.text;
      splitText(activeTitle);
    }
    if (activeTopic) {
      activeTopic.textContent = activeTopic.dataset.text;
      splitText(activeTopic);
    }
  }, 500);
};
