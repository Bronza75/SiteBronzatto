// ===================================
// Mobile Menu Toggle
// ===================================
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fechar menu ao clicar em um link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Fechar menu ao clicar fora
document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ===================================
// Smooth Scroll
// ===================================
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');

        if (targetId.startsWith('#')) {
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ===================================
// Header Scroll Effect
// ===================================
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 20px rgba(45, 45, 45, 0.15)';
    } else {
        header.style.boxShadow = '0 4px 20px rgba(45, 45, 45, 0.08)';
    }

    lastScroll = currentScroll;
});

// ===================================
// Formulário de Contato
// ===================================
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validação básica
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const assunto = document.getElementById('assunto').value;
    const mensagem = document.getElementById('mensagem').value.trim();

    // Verificar campos vazios
    if (!nome || !email || !telefone || !assunto || !mensagem) {
        showMessage('Por favor, preencha todos os campos.', 'error');
        return;
    }

    // Validar email
    if (!validateEmail(email)) {
        showMessage('Por favor, insira um e-mail válido.', 'error');
        return;
    }

    // Validar telefone (formato básico)
    if (!validatePhone(telefone)) {
        showMessage('Por favor, insira um telefone válido.', 'error');
        return;
    }

    // Simular envio (aqui você conectaria com um backend)
    showMessage('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');

    // Limpar formulário
    contactForm.reset();

    // Esconder mensagem após 5 segundos
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
});

// ===================================
// Funções de Validação
// ===================================
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\d\s\-\(\)]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = 'form-message ' + type;
    formMessage.style.display = 'block';
}

// ===================================
// Máscara de Telefone
// ===================================
const telefoneInput = document.getElementById('telefone');

telefoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');

    if (value.length <= 11) {
        if (value.length <= 10) {
            // Formato: (11) 1234-5678
            value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
        } else {
            // Formato: (11) 91234-5678
            value = value.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, '($1) $2-$3');
        }
    }

    e.target.value = value;
});

// ===================================
// Animação de Scroll (Intersection Observer)
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar cards e seções
const areaCards = document.querySelectorAll('.area-card');
areaCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ===================================
// Active Link Highlight
// ===================================
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (correspondingLink) {
                correspondingLink.classList.add('active');
            }
        }
    });
});

// ===================================
// Prevenção de FOUC (Flash of Unstyled Content)
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.visibility = 'visible';
});

// ===================================
// Scroll to Top (suave)
// ===================================
window.addEventListener('load', () => {
    window.scrollTo({
        top: 0,
        behavior: 'instant'
    });
});

// ===================================
// Console Welcome Message
// ===================================
console.log('%cBronzatto Advocacia', 'font-size: 24px; font-weight: bold; color: #6B8E6B;');
console.log('%cSite desenvolvido com atenção aos detalhes e foco na experiência do usuário.', 'font-size: 12px; color: #2D2D2D;');
