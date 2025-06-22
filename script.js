// JavaScript для перемикання табів та анімації частинок
window.addEventListener("load", () => {
  // Динамічне структурування табів
  const tabs = document.querySelector(".tabs");
  const tabList = tabs.querySelector("ul");
  const contents = tabs.querySelectorAll("div");

  // Створюємо навігацію
  const nav = document.createElement("ul");
  nav.className = "tab-nav";
  Array.from(tabList.children).forEach((item, index) => {
    const li = document.createElement("li");
    li.innerText = item.innerText.split(":")[0];
    li.dataset.tab = index;
    if (index === 0) li.classList.add("active");
    nav.appendChild(li);
  });
  tabList.replaceWith(nav);

  // Призначаємо вміст
  contents.forEach((content, index) => {
    content.className = "tab-content";
    if (index === 0) content.classList.add("active");
  });

  // Логіка перемикання
  nav.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li) return;

    const index = li.dataset.tab;
    nav
      .querySelectorAll("li")
      .forEach((item) => item.classList.remove("active"));
    li.classList.add("active");

    contents.forEach((content) => content.classList.remove("active"));
    contents[index].classList.add("active");
  });

  // Анімація частинок
  const canvas = document.createElement("canvas");
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const particleCount = 60;

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 4 + 1;
      this.speedX = Math.random() * 1.5 - 0.75;
      this.speedY = Math.random() * 1.5 - 0.75;
      this.opacity = Math.random() * 0.5 + 0.3;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.opacity -= 0.005;
      this.size = Math.sin(this.opacity * Math.PI) * 4 + 1;

      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      if (this.opacity <= 0) {
        this.opacity = Math.random() * 0.5 + 0.3;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
      }
    }

    draw() {
      ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function initParticles() {
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle) => {
      particle.update();
      particle.draw();
    });
    requestAnimationFrame(animateParticles);
  }

  initParticles();
  animateParticles();

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
});
