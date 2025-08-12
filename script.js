document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('nav ul');
  if(menuToggle){
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Lightbox
  document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', () => {
      let lightbox = document.createElement('div');
      lightbox.style.cssText = `
        position:fixed;top:0;left:0;width:100%;height:100%;
        background:rgba(0,0,0,0.9);display:flex;justify-content:center;
        align-items:center;z-index:9999
      `;
      lightbox.innerHTML = `<img src="${img.src}" style="max-width:90%;max-height:90%;border-radius:10px"/>`;
      document.body.appendChild(lightbox);
      lightbox.addEventListener('click', () => lightbox.remove());
    });
  });
});
