let musicPlaying = true;
let currentAudio = null;
let firstInteraction = false;

function initAudio() {
  document.body.addEventListener('click', handleFirstInteraction, { once: true });
  document.body.addEventListener('touchstart', handleFirstInteraction, { once: true });
}

function handleFirstInteraction() {
  if (!firstInteraction) {
    firstInteraction = true;
    if (document.getElementById("countdown").style.display === "flex") {
      const countdownMusic = document.getElementById('countdown-music');
      playMusic(countdownMusic);
      currentAudio = countdownMusic;
    }
  }
}

function handleImageError(img) {
  const container = img.parentElement;
  container.style.background = '#ffccd5';
  container.style.display = 'flex';
  container.style.alignItems = 'center';
  container.style.justifyContent = 'center';
  container.innerHTML = `<img src="placeholder.jpg" alt="Failed to load" style="width: 100%; height: 100%; object-fit: cover;">`;
}

function showPage(n) {
  document.querySelectorAll('.page').forEach(page => {
    page.style.display = "none";
    page.style.opacity = "0";
  });
  
  if (currentAudio) {
    fadeOutMusic(currentAudio);
    currentAudio = null;
  }
  
  const nextPage = document.getElementById(`page${n > 1 ? n : 1}`);
  nextPage.style.display = "flex";
  
  setTimeout(() => {
    nextPage.style.opacity = "1";
  }, 50);
  
  if (n === 1) {
    createFloatingPetals();
    currentAudio = document.getElementById('birthday-music');
    playMusic(currentAudio);
  } else if (n === 2) {
    createConfetti();
    createGlowingHearts();
    currentAudio = document.getElementById('bg-music');
    playMusic(currentAudio);
  } else if (n === 3) {
    createFloatingHearts();
    animatePhotos();
    currentAudio = document.getElementById('photo-music');
    playMusic(currentAudio);
  }
}

function playMusic(audio) {
  if (!audio) return;
  
  try {
    audio.volume = 0;
    audio.play().then(() => {
      musicPlaying = true;
      let vol = 0;
      const fadeIn = setInterval(() => {
        if (vol < 0.4) {
          vol += 0.005;
          audio.volume = vol;
        } else {
          clearInterval(fadeIn);
        }
      }, 100);
    }).catch(e => {
      console.log("Audio playback prevented:", e);
    });
  } catch (e) {
    console.error("Audio error:", e);
  }
}

function fadeOutMusic(audio) {
  if (!audio) return;
  
  let vol = audio.volume;
  const fadeOut = setInterval(() => {
    if (vol > 0) {
      vol -= 0.005;
      audio.volume = vol;
    } else {
      audio.pause();
      audio.currentTime = 0;
      musicPlaying = false;
      clearInterval(fadeOut);
    }
  }, 100);
}

function createFloatingPetals() {
  const container = document.querySelector('.page1 .floating-elements');
  container.innerHTML = '';
  
  const elements = ['🌸', '🌺', '🌷', '❀', '✿', '💮', '🏵️'];
  
  for (let i = 0; i < 50; i++) {
    const element = document.createElement('div');
    element.classList.add('floating-element');
    element.innerHTML = elements[Math.floor(Math.random() * elements.length)];
    element.style.left = Math.random() * 100 + 'vw';
    element.style.fontSize = (Math.random() * 25 + 15) + 'px';
    element.style.color = `hsl(${Math.random() * 40 + 320}, 90%, 70%)`;
    element.style.animationDuration = (Math.random() * 15 + 10) + 's';
    element.style.animationDelay = (Math.random() * 5) + 's';
    element.style.opacity = Math.random() * 0.7 + 0.3;
    element.style.setProperty('--drift', Math.random() * 2 - 1);
    container.appendChild(element);
  }
}

function createConfetti() {
  const container = document.querySelector('.confetti-container');
  container.innerHTML = '';
  
  const shapes = ['❤️', '✨', '🌟', '🎉', '🥳'];
  
  for (let i = 0; i < 300; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.innerHTML = shapes[Math.floor(Math.random() * shapes.length)];
    confetti.style.color = `hsl(${Math.random() * 360}, 100%, 60%)`;
    confetti.style.animationDuration = (Math.random() * 6 + 3) + 's';
    confetti.style.animationDelay = (Math.random() * 2) + 's';
    confetti.style.fontSize = (Math.random() * 20 + 10) + 'px';
    container.appendChild(confetti);
  }
}

function createFloatingHearts() {
  const container = document.querySelector('.page3 .floating-elements');
  container.innerHTML = '';
  
  const heartStyles = ['❤️', '🧡', '💛', '💚', '💙', '💜'];
  
  for (let i = 0; i < 50; i++) {
    const heart = document.createElement('div');
    heart.classList.add('floating-element');
    heart.innerHTML = heartStyles[Math.floor(Math.random() * heartStyles.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
    heart.style.color = `hsl(${Math.random() * 60 + 340}, 90%, 60%)`;
    heart.style.animationDuration = (Math.random() * 15 + 10) + 's';
    heart.style.animationDelay = (Math.random() * 5) + 's';
    heart.style.opacity = Math.random() * 0.7 + 0.3;
    heart.style.setProperty('--drift', Math.random() * 2 - 1);
    container.appendChild(heart);
  }
}

function createGlowingHearts() {
  const container = document.querySelector('.page2 .floating-elements');
  container.innerHTML = '';
  
  for (let i = 0; i < 30; i++) {
    const heart = document.createElement('div');
    heart.classList.add('glowing-heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.top = Math.random() * 100 + 'vh';
    heart.style.fontSize = (Math.random() * 40 + 25) + 'px';
    heart.style.animationDuration = (Math.random() * 4 + 2) + 's';
    heart.style.animationDelay = (Math.random() * 2) + 's';
    heart.style.opacity = Math.random() * 0.5 + 0.3;
    container.appendChild(heart);
  }
}

function createSparkles() {
  const container = document.querySelector('.sparkle-container');
  container.innerHTML = '';
  
  for (let i = 0; i < 80; i++) {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    sparkle.style.left = Math.random() * 100 + 'vw';
    sparkle.style.top = Math.random() * 100 + 'vh';
    sparkle.style.animationDuration = (Math.random() * 3 + 1) + 's';
    sparkle.style.animationDelay = (Math.random() * 2) + 's';
    sparkle.style.width = (Math.random() * 15 + 5) + 'px';
    sparkle.style.height = (Math.random() * 15 + 5) + 'px';
    container.appendChild(sparkle);
  }
}

function animatePhotos() {
  const photos = document.querySelectorAll('.photo-frame');
  photos.forEach((photo, index) => {
    photo.style.opacity = '0';
    photo.style.transform = 'translateY(30px)';
    setTimeout(() => {
      photo.style.transition = 'opacity 0.8s, transform 0.8s';
      photo.style.opacity = '1';
      photo.style.transform = 'translateY(0)';
    }, index * 200);
  });
}

function createHeartExplosion() {
  const container = document.querySelector('.countdown-page .floating-elements');
  container.innerHTML = '';
  
  for (let i = 0; i < 100; i++) {
    const heart = document.createElement('div');
    heart.classList.add('exploding-heart');
    heart.innerHTML = '❤️';
    heart.style.left = '50%';
    heart.style.top = '50%';
    heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
    heart.style.color = `hsl(${Math.random() * 60 + 320}, 90%, 60%)`;
    heart.style.animation = `explode ${Math.random() * 2 + 1}s forwards`;
    heart.style.opacity = '0';
    
    setTimeout(() => {
      heart.style.opacity = '1';
      heart.style.transform = `translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px)`;
    }, 10);
    
    container.appendChild(heart);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.style.opacity = '0';
    setTimeout(() => preloader.style.display = 'none', 500);
    
    initAudio();
    
    const countdownPage = document.getElementById("countdown");
    countdownPage.style.display = "flex";
    countdownPage.style.opacity = "1";
    
    let count = 10;
    const countdownElement = document.querySelector('.countdown-number');
    createSparkles();
    
    countdownElement.style.opacity = "1";
    
    const countdownInterval = setInterval(() => {
      if (count > 0) {
        countdownElement.textContent = count;
        countdownElement.style.transform = `scale(${1 + (12-count)*0.15})`;
        countdownElement.style.color = `hsl(${count * 36}, 90%, 70%)`;
        countdownElement.style.opacity = "1";
        countdownElement.style.textShadow = `0 0 ${count*3}px rgba(255, 255, 255, 0.8)`;
        count--;
      } else {
        countdownElement.innerHTML = "Happy Birthday<br>Nidhi ❤️";
        countdownElement.style.fontSize = "3.5rem";
        countdownElement.style.lineHeight = "1.2";
        countdownElement.style.color = "#e84393";
        countdownElement.style.textShadow = "0 0 25px rgba(239, 112, 142, 0.9)";
        countdownElement.style.transform = "scale(1.1)";
        
        createHeartExplosion();
        
        setTimeout(() => {
          countdownPage.style.transition = "opacity 0.8s";
          countdownPage.style.opacity = "0";
          setTimeout(() => {
            countdownPage.style.display = "none";
            document.getElementById("page1").style.display = "flex";
            setTimeout(() => {
              document.getElementById("page1").style.opacity = "1";
              createFloatingPetals();
              if (currentAudio) {
                fadeOutMusic(currentAudio);
              }
              currentAudio = document.getElementById('birthday-music');
              playMusic(currentAudio);
            }, 50);
          }, 800);
        }, 2500);
        clearInterval(countdownInterval);
      }
    }, 1000);
    
    // Preload images
    for (let i = 1; i <= 5; i++) {
      const img = new Image();
      img.src = `Pic${i}.jpg`;
    }

    // Attach image error handlers
    document.querySelectorAll('.photo-frame img').forEach(img => {
      img.addEventListener('error', () => handleImageError(img));
    });
  }, 1000);
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const activePage = document.querySelector('.page[style*="display: flex"]');
      const nextButton = activePage.querySelector('.next-button');
      if (nextButton) nextButton.click();
    }
  });
});
