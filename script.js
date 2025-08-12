document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if(window.scrollY > 50) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    });

    const menuToggle = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('nav ul');
    menuToggle.addEventListener('click', () => navUl.classList.toggle('active'));

    // Lightbox for gallery
    document.querySelectorAll('.gallery-item img').forEach(img => {
        img.addEventListener('click', () => {
            let lightbox = document.createElement('div');
            lightbox.classList.add('lightbox');
            Object.assign(lightbox.style, {
                position:'fixed',top:0,left:0,width:'100%',height:'100%',
                background:'rgba(0,0,0,0.8)',display:'flex',justifyContent:'center',alignItems:'center',zIndex:2000
            });
            lightbox.innerHTML = `<img src="${img.src}" style="max-width:90%;max-height:90%;border-radius:10px">`;
            document.body.appendChild(lightbox);
            lightbox.addEventListener('click', () => lightbox.remove());
        });
    });

    // Fake order form submit
    const orderForm = document.getElementById('orderForm');
    orderForm.addEventListener('submit', e => {
        e.preventDefault();
        document.getElementById('orderMessage').innerText = "✅ Order placed! We'll contact you soon.";
        orderForm.reset();
    });
});
