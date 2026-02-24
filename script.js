// =====================================================
// SYSNE — script.js MEJORADO
// + Preloader cinematográfico
// + Cursor mira 3D con detección de fondo
// + Animaciones de entrada con GSAP ScrollTrigger
// + Menú responsive hamburger
// + Imágenes reales en bomberos/forenses/drogas
// =====================================================

// =====================================================
// GSAP PLUGINS (Lenis eliminado - causa lag)
// =====================================================
try {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }
} catch(e) { console.warn('GSAP no disponible:', e); }

// =====================================================
// 2. PRELOADER CINEMATOGRÁFICO
// =====================================================
(function initPreloader() {
    const preloader = document.getElementById('sysne-preloader');
    if (!preloader) return;

    let pageLoaded = false;
    let minTimeDone = false;
    let hidden = false;

    function hidePreloader() {
        if (hidden) return;
        hidden = true;
        preloader.classList.add('hidden');
        setTimeout(() => {
            preloader.style.display = 'none';
            try { initPageAnimations(); } catch(e) {}
        }, 650);
    }

    function tryHide() {
        if (pageLoaded && minTimeDone) hidePreloader();
    }

    // Tiempo mínimo 3.2s
    setTimeout(() => { minTimeDone = true; tryHide(); }, 3200);

    // Fallback absoluto — si en 6s no cargó, ocultar de todas formas
    setTimeout(() => hidePreloader(), 6000);

    // Esperar carga de página
    if (document.readyState === 'complete') {
        pageLoaded = true; tryHide();
    } else {
        window.addEventListener('load', () => { pageLoaded = true; tryHide(); });
    }
})();

// =====================================================
// 3. CURSOR MIRA 3D — DIRECTO (sin lerp, sin rAF loop)
//    Posición via CSS custom properties → el navegador
//    lo pinta en el compositor sin bloquear el hilo JS
// =====================================================
(function initCursor() {
    const wrap    = document.getElementById('cursor-wrap');
    const svg     = document.getElementById('custom-cursor');
    const label   = document.getElementById('cursor-label');
    const shotCon = document.getElementById('shot-container');
    if (!wrap || !svg) return;

    // Solo touch? No mostrar cursor custom
    if (window.matchMedia('(hover: none)').matches) {
        wrap.style.display = 'none';
        return;
    }

    // Mover directo sin lerp — sin rAF, sin JS pesado
    document.addEventListener('mousemove', e => {
        wrap.style.transform = `translate(${e.clientX - 36}px,${e.clientY - 36}px)`;
    }, { passive: true });

    // Hover — delegar en el documento, no listener por elemento
    document.addEventListener('mouseover', e => {
        if (e.target.closest('a, button, [role="button"], .card, .tactico-card, .perfil-card-item')) {
            svg.classList.add('hover');
            if (label) { label.textContent = 'VER'; label.classList.add('show'); }
        }
    }, { passive: true });

    document.addEventListener('mouseout', e => {
        if (e.target.closest('a, button, [role="button"], .card, .tactico-card, .perfil-card-item')) {
            svg.classList.remove('hover');
            if (label) label.classList.remove('show');
        }
    }, { passive: true });

    // Click — efecto disparo mínimo (solo 1 ripple)
    document.addEventListener('click', e => {
        if (!shotCon) return;
        const el = document.createElement('div');
        el.className = 'shot-ripple';
        el.style.cssText = `left:${e.clientX}px;top:${e.clientY}px`;
        el.innerHTML = '<div class="shot-ring"></div><div class="shot-flash"></div>';
        shotCon.appendChild(el);
        setTimeout(() => el.remove(), 700);
    });
})();

// =====================================================
// 4. MENÚ HAMBURGER RESPONSIVE
// =====================================================
(function initHamburger() {
    const btn   = document.getElementById('nav-hamburger');
    const links = document.getElementById('nav-links');
    if (!btn || !links) return;

    btn.addEventListener('click', () => {
        btn.classList.toggle('open');
        links.classList.toggle('open');
    });

    // Dropdowns en móvil con click (en desktop los maneja CSS :hover)
    document.querySelectorAll('.dropdown > a').forEach(a => {
        a.addEventListener('click', e => {
            if (window.innerWidth <= 900) {
                e.preventDefault();
                e.stopPropagation();
                const parent = a.parentElement;
                const isOpen = parent.classList.contains('open');
                document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('open'));
                if (!isOpen) parent.classList.add('open');
            }
        });
    });

    // Cerrar al hacer click fuera
    document.addEventListener('click', e => {
        if (!links.contains(e.target) && !btn.contains(e.target)) {
            links.classList.remove('open');
            btn.classList.remove('open');
        }
    });

    // Cerrar al navegar
    links.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            links.classList.remove('open');
            btn.classList.remove('open');
        });
    });
})();

// =====================================================
// 5. ANIMACIONES DE SCROLL — IntersectionObserver
// =====================================================
function initPageAnimations() {
    // Header scroll
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const h = document.getElementById('main-header');
                if (h) h.classList.toggle('scrolled', window.scrollY > 50);
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // Registrar todos los elementos reveal
    initRevealObserver(document);
}

function initRevealObserver(root) {
    const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('revealed');
                io.unobserve(e.target);
            }
        });
    }, { threshold: 0.06, rootMargin: '0px 0px -20px 0px' });

    // Clases CSS reveal
    root.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-zoom').forEach(el => {
        io.observe(el);
    });

    // data-anim legacy (compatibilidad con HTML existente)
    const io3 = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                const delay = parseFloat(e.target.dataset.delay || 0) * 1000;
                setTimeout(() => e.target.classList.add('visible'), delay);
                io3.unobserve(e.target);
            }
        });
    }, { threshold: 0.06 });
    root.querySelectorAll('[data-anim]').forEach(el => io3.observe(el));

    // anim-ready para compat
    const io2 = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) { e.target.classList.add('anim-in'); io2.unobserve(e.target); }
        });
    }, { threshold: 0.1 });
    root.querySelectorAll('.anim-ready').forEach(el => io2.observe(el));
}

// =====================================================
// 6. ANIMACIONES VISTAS DINÁMICAS (GSAP ligero)
// =====================================================
function animarVistaDetalle() {
    // Reveal scroll para la vista detalle
    requestAnimationFrame(() => initRevealObserver(document.getElementById('vista-detalle') || document));
    if (typeof gsap === 'undefined') return;
    gsap.fromTo('.modulo-hero-content',
        { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    );
    gsap.fromTo('.scp-texto',
        { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.45, delay: 0.08, ease: 'power2.out' }
    );
    gsap.fromTo('.scp-imagen, .img-circular',
        { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.5, delay: 0.1, ease: 'power2.out' }
    );
    // Ventaja cards vía IO en vistas detalle
    const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) { e.target.classList.add('anim-in'); io.unobserve(e.target); }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.ventaja-card').forEach(el => {
        el.classList.add('anim-ready'); io.observe(el);
    });
}

// =====================================================
// 7. IMÁGENES POR PRODUCTO — con Unsplash profesional
//    Los perfiles de policías y ambulancias usan imágenes locales
//    Bomberos/forenses/drogas usan Unsplash con imágenes reales
// =====================================================
const imagenesProductos = {
  policias: [
    // [0] Máscaras / Respiradores
    [
      'img/Pro/imgpoli/PR/respiratoria_1.jpeg',
      'img/Pro/imgpoli/PR/respiratoria_2.jpeg',
      'img/Pro/imgpoli/PR/respiratoria_3.png',
      'img/Pro/imgpoli/PR/respiratoria_4.png',
      'img/Pro/imgpoli/PR/respiratoria_5.png',
      'img/Pro/imgpoli/PR/respiratoria_6.png',
    ],
    // [1] Guantes tácticos
    [
      'img/Pro/imgpoli/GT/guantes_1.png',
      'img/Pro/imgpoli/GT/guantes_2.png',
      'img/Pro/imgpoli/GT/guantes_3.png',
      'img/Pro/imgpoli/GT/guantes_4.png',
      'img/Pro/imgpoli/GT/guantes_5.png',
      'img/Pro/imgpoli/GT/guantes_6.png',
    ],
    // [2] Gafas / Protección ocular
    [
      'img/Pro/imgpoli/PO/ocular_1.png.png',
      'img/Pro/imgpoli/PO/ocular_2.png.png',
      'img/Pro/imgpoli/PO/ocular_3.png.png',
      'img/Pro/imgpoli/PO/ocular_4.png.png',
      'img/Pro/imgpoli/PO/ocular_5.png.png',
      'img/Pro/imgpoli/PO/ocular_6.png.png',
    ],
    // [3] Calzado operativo
    [
      'img/Pro/imgpoli/CO/calzado_1.png.png',
      'img/Pro/imgpoli/CO/calzado_2.png.png',
      'img/Pro/imgpoli/CO/calzado_3.png.png',
      'img/Pro/imgpoli/CO/calzado_4.png.png',
      'img/Pro/imgpoli/CO/calzado_5.png.png',
      'img/Pro/imgpoli/CO/calzado_6.png.png',
    ],
    // [4] Cascos
    [
      'img/Pro/imgpoli/cascos/cascos_1.png',
      'img/Pro/imgpoli/cascos/cascos_2.png',
      'img/Pro/imgpoli/cascos/cascos_3.png',
      'img/Pro/imgpoli/cascos/cascos_4.png',
      'img/Pro/imgpoli/cascos/cascos_5.png',
      'img/Pro/imgpoli/cascos/cascos_6.png',
    ],
    // [5] Chalecos tácticos
    [
      'img/Pro/imgpoli/chalecos/chalecos_1.png',
      'img/Pro/imgpoli/chalecos/chalecos_2.png',
      'img/Pro/imgpoli/chalecos/chalecos_3.png',
      'img/Pro/imgpoli/chalecos/chalecos_4..png',
      'img/Pro/imgpoli/chalecos/chalecos_5.png',
      'img/Pro/imgpoli/chalecos/chalecos_6.png',
    ],
  ],

  ambulancia: [
    // [0] Monitoreo clínico
    [
      'img/Pro/img ambulancias/monitorio clinico/monitoreo_1.png',
      'img/Pro/img ambulancias/monitorio clinico/monitoreo_2.png',
      'img/Pro/img ambulancias/monitorio clinico/monitoreo_3.png',
      'img/Pro/img ambulancias/monitorio clinico/monitoreo_4.png',
      'img/Pro/img ambulancias/monitorio clinico/monitoreo_5.png',
      'img/Pro/img ambulancias/monitorio clinico/monitoreo_6.png'
    ],
    // [1] Inmovilización
    [
      'img/Pro/img ambulancias/inmovilizacion/inmovilizacion_1.png',
      'img/Pro/img ambulancias/inmovilizacion/inmovilizacion_2.png',
      'img/Pro/img ambulancias/inmovilizacion/inmovilizacion_3.png',
      'img/Pro/img ambulancias/inmovilizacion/inmovilizacion_4.png',
      'img/Pro/img ambulancias/inmovilizacion/inmovilizacion_5.png',
      'img/Pro/img ambulancias/inmovilizacion/inmovilizacion_6.png'
    ],
    // [2] Respiración asistida
    [
      'img/Pro/img ambulancias/respiracion asistida/respiracion_1.png',
      'img/Pro/img ambulancias/respiracion asistida/respiracion_2.png',
      'img/Pro/img ambulancias/respiracion asistida/respiracion_3.png',
      'img/Pro/img ambulancias/respiracion asistida/respiracion_4.png',
      'img/Pro/img ambulancias/respiracion asistida/respiracion_5.png',
      'img/Pro/img ambulancias/respiracion asistida/respiracion_6.png'
    ],
    // [3] Manejo de trauma
    [
      'img/Pro/img ambulancias/manejo de trauma/manejo_1.png',
      'img/Pro/img ambulancias/manejo de trauma/manejo_2.png',
      'img/Pro/img ambulancias/manejo de trauma/manejo_3.png',
      'img/Pro/img ambulancias/manejo de trauma/manejo_4.png',
      'img/Pro/img ambulancias/manejo de trauma/manejo_5.png',
      'img/Pro/img ambulancias/manejo de trauma/manejo_6.png'
    ],
    // [4] Iluminación médica
    [
      'img/Pro/img ambulancias/iluminacion medica/iluminacion_1.png',
      'img/Pro/img ambulancias/iluminacion medica/iluminacion_2.png',
      'img/Pro/img ambulancias/iluminacion medica/iluminacion_3.png',
      'img/Pro/img ambulancias/iluminacion medica/iluminacion_4.png',
      'img/Pro/img ambulancias/iluminacion medica/iluminacion_5.png',
      'img/Pro/img ambulancias/iluminacion medica/iluminacion_6.png'
    ],
    // [5] Higiene y protección — Unsplash profesional
    [
      'https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?w=600&q=80',
      'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=600&q=80',
      'https://images.unsplash.com/photo-1606206873764-fd15e242fdde?w=600&q=80',
      'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&q=80',
      'https://images.unsplash.com/photo-1578496481449-cf2e845cc00c?w=600&q=80',
      'https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=600&q=80'
    ]
  ],

  // ── BOMBEROS — Imágenes temáticas correctas ──
  bomberos: [
    // [0] Protección térmica — trajes bombero
    [
      'https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=600&q=80',
      'https://images.unsplash.com/photo-1601581974732-bd5c4b4b8c07?w=600&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
      'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=600&q=80',
      'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=600&q=80',
      'https://images.unsplash.com/photo-1517495306984-f84210f9daa8?w=600&q=80'
    ],
    // [1] Herramientas de rescate hidráulico — jaws of life
    [
      'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80',
      'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&q=80',
      'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=600&q=80',
      'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=600&q=80',
      'https://images.unsplash.com/photo-1614961233913-a5113a4a34ed?w=600&q=80',
      'https://images.unsplash.com/photo-1590534247854-e97d5e3feef6?w=600&q=80'
    ],
    // [2] Extintores — fire extinguisher
    [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80',
      'https://images.unsplash.com/photo-1562516155-e0c1ee44059b?w=600&q=80',
      'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&q=80',
      'https://images.unsplash.com/photo-1548678886-c8e5a8ea82bd?w=600&q=80',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80',
      'https://images.unsplash.com/photo-1586953208270-d5b3b5984d68?w=600&q=80'
    ],
    // [3] Respiración SCBA — self contained breathing apparatus
    [
      'https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?w=600&q=80',
      'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80',
      'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=600&q=80',
      'https://images.unsplash.com/photo-1578496481449-cf2e845cc00c?w=600&q=80',
      'https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=600&q=80',
      'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&q=80'
    ],
    // [4] Detección de gases — gas detector industrial
    [
      'https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?w=600&q=80',
      'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=600&q=80',
      'https://images.unsplash.com/photo-1590534247854-e97d5e3feef6?w=600&q=80',
      'https://images.unsplash.com/photo-1562516155-e0c1ee44059b?w=600&q=80',
      'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&q=80',
      'https://images.unsplash.com/photo-1523289333742-be1143f6b766?w=600&q=80'
    ]
  ],

  // ── FORENSES — Imágenes laboratorio forense real ──
  forenses: [
    // [0] Recolección de evidencia biológica
    [
      'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=600&q=80',
      'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600&q=80',
      'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&q=80',
      'https://images.unsplash.com/photo-1614935151651-0bea6508db6b?w=600&q=80',
      'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&q=80',
      'https://images.unsplash.com/photo-1563889362049-d4bf59f6cc7d?w=600&q=80'
    ],
    // [1] Luces forenses ALS/UV — laboratorio con luz UV
    [
      'https://images.unsplash.com/photo-1554080353-a576cf803bda?w=600&q=80',
      'https://images.unsplash.com/photo-1523289333742-be1143f6b766?w=600&q=80',
      'https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=600&q=80',
      'https://images.unsplash.com/photo-1605289982774-9a6fef564df8?w=600&q=80',
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&q=80',
      'https://images.unsplash.com/photo-1527685609591-44b0aef2400b?w=600&q=80'
    ],
    // [2] Equipo laboratorio — microscopio, probetas
    [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
      'https://images.unsplash.com/photo-1581093803997-759b4dddc0ac?w=600&q=80',
      'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600&q=80',
      'https://images.unsplash.com/photo-1518152006812-edab29b069ac?w=600&q=80',
      'https://images.unsplash.com/photo-1606206873764-fd15e242fdde?w=600&q=80',
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&q=80'
    ],
    // [3] Equipo de protección forense — overol, guantes
    [
      'https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?w=600&q=80',
      'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80',
      'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=600&q=80',
      'https://images.unsplash.com/photo-1578496481449-cf2e845cc00c?w=600&q=80',
      'https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=600&q=80',
      'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&q=80'
    ]
  ],

  // ── DROGAS — Imágenes análisis de sustancias real ──
  drogas: [
    // [0] Kits de prueba de campo — test tubes, vials
    [
      'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=600&q=80',
      'https://images.unsplash.com/photo-1606206873764-fd15e242fdde?w=600&q=80',
      'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600&q=80',
      'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&q=80',
      'https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?w=600&q=80',
      'https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=600&q=80'
    ],
    // [1] Espectrómetros — mass spectrometry lab
    [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
      'https://images.unsplash.com/photo-1518152006812-edab29b069ac?w=600&q=80',
      'https://images.unsplash.com/photo-1581093803997-759b4dddc0ac?w=600&q=80',
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&q=80',
      'https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?w=600&q=80',
      'https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?w=600&q=80'
    ],
    // [2] Rayos X y escáner — security scanner
    [
      'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?w=600&q=80',
      'https://images.unsplash.com/photo-1590534247854-e97d5e3feef6?w=600&q=80',
      'https://images.unsplash.com/photo-1523289333742-be1143f6b766?w=600&q=80',
      'https://images.unsplash.com/photo-1605289982774-9a6fef564df8?w=600&q=80',
      'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=600&q=80',
      'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&q=80'
    ],
    // [3] Protección respiratoria — gas mask, respirator
    [
      'https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?w=600&q=80',
      'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80',
      'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=600&q=80',
      'https://images.unsplash.com/photo-1578496481449-cf2e845cc00c?w=600&q=80',
      'https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=600&q=80',
      'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&q=80'
    ]
  ]
};

// =====================================================
// 8. CATÁLOGO ESTRUCTURADO (igual que original)
// =====================================================
const catalogoVariantes = {
    'policias': [
        {
            cat: "Protección Respiratoria", icono: "fa-head-side-mask", color: "#2563eb",
            items: [
                { n: "Mascarilla Táctica M1",        ic: "fa-head-side-mask",      desc: "Nivel protección ABEK2 P3" },
                { n: "Respirador Full-Face M2",       ic: "fa-head-side-mask",      desc: "Visor panorámico antiarañazos" },
                { n: "Semi-mascarilla M3",            ic: "fa-head-side-mask",      desc: "Con filtro combinado tipo 4" },
                { n: "Mascarilla NBQ M4",             ic: "fa-biohazard",           desc: "Protección agentes biológicos" },
                { n: "Respirador Compacto M5",        ic: "fa-head-side-mask",      desc: "Ligero, uso prolongado" },
                { n: "Máscara CBRN M6",               ic: "fa-shield-halved",       desc: "Certificado OTAN" }
            ]
        },
        {
            cat: "Guantes Tácticos", icono: "fa-hand-back-fist", color: "#1d4ed8",
            items: [
                { n: "Guante Corte G1",               ic: "fa-hand-back-fist",      desc: "Resistencia nivel 5 ANSI" },
                { n: "Guante Balístico G2",           ic: "fa-shield-halved",       desc: "Refuerzo metacarpiano" },
                { n: "Guante Dieléctrico G3",         ic: "fa-bolt",                desc: "Hasta 1000V aislamiento" },
                { n: "Guante Táctil G4",              ic: "fa-hand-pointer",        desc: "Compatible pantalla táctil" },
                { n: "Guante Antifricción G5",        ic: "fa-hand-back-fist",      desc: "Palma reforzada Kevlar" },
                { n: "Guante NBQ G6",                 ic: "fa-biohazard",           desc: "Butilo + neopreno doble capa" }
            ]
        },
        {
            cat: "Protección Ocular", icono: "fa-glasses", color: "#0369a1",
            items: [
                { n: "Gafas Antibalísticas O1",      ic: "fa-glasses",             desc: "Policarbonato ANSI Z87+" },
                { n: "Máscara Facial O2",             ic: "fa-face-smile",          desc: "Visera abatible antichoque" },
                { n: "Goggle Táctico O3",             ic: "fa-glasses",             desc: "Antirayado, antiempañante" },
                { n: "Lente Ballistic O4",            ic: "fa-eye",                 desc: "MIL-PRF-31013 certificado" },
                { n: "Goggle NBQ O5",                 ic: "fa-biohazard",           desc: "Sellado hermético perimetral" },
                { n: "Visor Panorámico O6",           ic: "fa-expand",              desc: "Campo visual 180°" }
            ]
        },
        {
            cat: "Calzado Operativo", icono: "fa-shoe-prints", color: "#075985",
            items: [
                { n: "Bota Táctica B1",               ic: "fa-shoe-prints",         desc: "Puntera acero, suela Vibram" },
                { n: "Bota Antiestática B2",          ic: "fa-bolt",                desc: "Disipación electrostática" },
                { n: "Bota NBQ B3",                   ic: "fa-biohazard",           desc: "Impermeabilidad total" },
                { n: "Zapatilla Táctica B4",          ic: "fa-shoe-prints",         desc: "Perfil bajo, suela silenciosa" },
                { n: "Bota Ártica B5",                ic: "fa-snowflake",           desc: "Hasta -40°C, aislamiento" },
                { n: "Bota Antifragmento B6",         ic: "fa-shield-halved",       desc: "Plantilla Kevlar anti-IED" }
            ]
        },
        {
            cat: "Chalecos Especializados", icono: "fa-vest-patches", color: "#1e40af",
            items: [
                { n: "Chaleco NIJ IIIA C1",           ic: "fa-vest-patches",        desc: "Protección pistola y subfusil" },
                { n: "Chaleco NIJ IV C2",             ic: "fa-shield-halved",       desc: "Rifle calibre 30, lámina PE" },
                { n: "Chaleco Modular C3",            ic: "fa-vest-patches",        desc: "Sistema MOLLE, 14 bolsillos" },
                { n: "Chaleco Anti-apuñ. C4",         ic: "fa-knife",               desc: "KR1/SP1, 24 capas laminadas" },
                { n: "Chaleco Flotador C5",           ic: "fa-water",               desc: "Balístico + flotación 50N" },
                { n: "Chaleco CBRN C6",               ic: "fa-biohazard",           desc: "Sellado activo + aire filtrado" }
            ]
        },
        {
            cat: "Cascos de Seguridad", icono: "fa-helmet-safety", color: "#1a3a6b",
            items: [
                { n: "Casco PASGT K1",                ic: "fa-helmet-safety",       desc: "Kevlar 29, NIJ IIIA" },
                { n: "Casco FAST K2",                 ic: "fa-helmet-safety",       desc: "Perfil alto, compatible NVG" },
                { n: "Casco MICH K3",                 ic: "fa-helmet-safety",       desc: "Rieles laterales 3D" },
                { n: "Casco Antidisturbios K4",       ic: "fa-shield-halved",       desc: "Visera abatible 8mm PC" },
                { n: "Casco CBRN K5",                 ic: "fa-biohazard",           desc: "Compatible máscara NBC" },
                { n: "Casco Rescate K6",              ic: "fa-person-falling-burst",desc: "ABS + EPS amortiguación" }
            ]
        }
    ],
    'ambulancia': [
        {
            cat: "Monitoreo Clínico", icono: "fa-heart-pulse", color: "#dc2626",
            items: [
                { n: "Monitor Multiparamétrico M1",   ic: "fa-heart-pulse",         desc: "ECG, SpO2, NIBP, Temp" },
                { n: "Desfibrilador DEA M2",          ic: "fa-bolt",                desc: "Análisis automático ritmo" },
                { n: "Oxímetro Portátil M3",          ic: "fa-lungs",               desc: "SpO2 y pulso en tiempo real" },
                { n: "Capnógrafo M4",                 ic: "fa-wind",                desc: "EtCO2 sidestream, batería 4h" },
                { n: "Monitor Compacto M5",           ic: "fa-heart-pulse",         desc: "3 derivaciones, pantalla 7\"" },
                { n: "Glucómetro Clínico M6",         ic: "fa-droplet",             desc: "Resultado en 5 segundos" }
            ]
        },
        {
            cat: "Inmovilización", icono: "fa-person-rays", color: "#b91c1c",
            items: [
                { n: "Collarín Cervical I1",          ic: "fa-person-rays",         desc: "4 tallas, radiolucente" },
                { n: "Tablero Espinal I2",            ic: "fa-bed-pulse",           desc: "Polietileno, 180kg capacidad" },
                { n: "Inmovilizador KED I3",          ic: "fa-vest-patches",        desc: "Extricación vehicular" },
                { n: "Colchón Vacío I4",              ic: "fa-person-rays",         desc: "Moldeable, estabilización total" },
                { n: "Férula Neumática I5",           ic: "fa-hand",                desc: "Miembro superior/inferior" },
                { n: "Silla de Evacuación I6",        ic: "fa-wheelchair",          desc: "Escalerímetro plegable" }
            ]
        },
        {
            cat: "Respiración Asistida", icono: "fa-lungs", color: "#991b1b",
            items: [
                { n: "Ventilador Portátil R1",        ic: "fa-lungs",               desc: "VCV/PCV, FiO2 21-100%" },
                { n: "Bolsa Válvula Mascarilla R2",   ic: "fa-wind",                desc: "Adulto/pediátrico/neonato" },
                { n: "Aspirador Secreciones R3",      ic: "fa-droplet",             desc: "35 L/min, batería 45min" },
                { n: "Tubo Laríngeo R4",              ic: "fa-circle-nodes",        desc: "Tallas 3-5 adulto" },
                { n: "Mascarilla Laríngea R5",        ic: "fa-head-side-mask",      desc: "Silicona reutilizable" },
                { n: "CPAP de Transporte R6",         ic: "fa-lungs",               desc: "PEEP 4-20 cmH2O" }
            ]
        },
        {
            cat: "Manejo de Trauma", icono: "fa-kit-medical", color: "#7f1d1d",
            items: [
                { n: "Kit TCCC T1",                   ic: "fa-kit-medical",         desc: "Torniquete + venda israelí" },
                { n: "Manta Supervivencia T2",        ic: "fa-temperature-half",    desc: "Foil aluminizado 160×210cm" },
                { n: "Compresor de Heridas T3",       ic: "fa-bandage",             desc: "Hemostático QuikClot" },
                { n: "Aguja Descompresión T4",        ic: "fa-syringe",             desc: "14G × 3.25\" neumotórax" },
                { n: "Venda Israelí T5",              ic: "fa-bandage",             desc: "Presión integrada con lazo" },
                { n: "Torniquete CAT T6",             ic: "fa-circle-dot",          desc: "Windlass, aprobado FDA" }
            ]
        },
        {
            cat: "Iluminación Médica", icono: "fa-lightbulb", color: "#c2410c",
            items: [
                { n: "Linterna Clínica L1",           ic: "fa-lightbulb",           desc: "LED 300 lux, batería 8h" },
                { n: "Lámpara Cuello de Cisne L2",    ic: "fa-lightbulb",           desc: "Flexible 360°, 5W LED" },
                { n: "Oftalmoscopio L3",              ic: "fa-eye",                 desc: "28 aperturas, 8 filtros" },
                { n: "Otoscopio LED L4",              ic: "fa-ear-listen",          desc: "Fibra óptica, batería Li-ion" },
                { n: "Panel LED Portátil L5",         ic: "fa-sun",                 desc: "10W, 6000K, bracket magnético" },
                { n: "Faro Quirúrgico L6",            ic: "fa-lightbulb",           desc: "Luz fría, sin sombras" }
            ]
        },
        {
            cat: "Higiene y Protección", icono: "fa-hand-sparkles", color: "#9a3412",
            items: [
                { n: "Traje Nivel B H1",              ic: "fa-person-dress",        desc: "Encapsulado, vapor químico" },
                { n: "Guante Nitrilo H2",             ic: "fa-hand-back-fist",      desc: "5.0mil, caja × 100 unidades" },
                { n: "Gafas Protección H3",           ic: "fa-glasses",             desc: "Antiempañante, ventilación" },
                { n: "Cubre-zapatos H4",              ic: "fa-shoe-prints",         desc: "Polipropileno antideslizante" },
                { n: "Mascarilla N95 H5",             ic: "fa-head-side-mask",      desc: "NIOSH N95, filtrado 95%" },
                { n: "Bata Desechable H6",            ic: "fa-shirt",               desc: "PP+PE, protección fluidos" }
            ]
        }
    ],
    'bomberos': [
        {
            cat: "Protección Térmica", icono: "fa-fire-flame-curved", color: "#ea580c",
            items: [
                { n: "Traje Proximal T1",             ic: "fa-fire-flame-curved",   desc: "Aluminizado, hasta 1000°C" },
                { n: "Traje Estructural T2",          ic: "fa-shield-halved",       desc: "EN469 nivel 2, 4 capas" },
                { n: "Traje CBRN T3",                 ic: "fa-biohazard",           desc: "Gas-tight clase 1A" },
                { n: "Guante Calor T4",               ic: "fa-hand-back-fist",      desc: "Kevlar + aluminizado" },
                { n: "Capucha Ignífuga T5",           ic: "fa-head-side-mask",      desc: "Nomex, cuello y cabeza" },
                { n: "Traje Subterráneo T6",          ic: "fa-tunnel",              desc: "Reflectante, alta visibilidad" }
            ]
        },
        {
            cat: "Herramientas de Corte", icono: "fa-screwdriver-wrench", color: "#c2410c",
            items: [
                { n: "Cizalla Hidráulica H1",         ic: "fa-screwdriver-wrench",  desc: "Fuerza 420kN, apertura 250mm" },
                { n: "Expansor Hidráulico H2",        ic: "fa-expand",              desc: "Fuerza 150kN, 820mm máx." },
                { n: "Combo Ram+Cizalla H3",          ic: "fa-screwdriver-wrench",  desc: "Unidad combinada portátil" },
                { n: "Sierra de Rescate H4",          ic: "fa-screwdriver-wrench",  desc: "Hoja de carburo de tungsteno" },
                { n: "Tijeras de Rescate H5",         ic: "fa-scissors",            desc: "Acero D2, mango ergonómico" },
                { n: "Cilindro Hidráulico H6",        ic: "fa-expand",              desc: "Carrera 430mm, push-pull" }
            ]
        },
        {
            cat: "Extintores", icono: "fa-fire-extinguisher", color: "#9a3412",
            items: [
                { n: "Extintor Agua E1",              ic: "fa-fire-extinguisher",   desc: "9L agua presurizada" },
                { n: "Extintor CO₂ E2",               ic: "fa-fire-extinguisher",   desc: "5kg, clase B/C eléctrico" },
                { n: "Extintor Polvo E3",             ic: "fa-fire-extinguisher",   desc: "6kg ABC, presurizado" },
                { n: "Extintor Espuma E4",            ic: "fa-fire-extinguisher",   desc: "9L AFFF clase A/B" },
                { n: "Extintor Agua-Niebla E5",       ic: "fa-fire-extinguisher",   desc: "6L niebla ultrafina" },
                { n: "Lanza Monitor E6",              ic: "fa-fire-extinguisher",   desc: "900 L/min, rango 45m" }
            ]
        },
        {
            cat: "Respiración SCBA", icono: "fa-lungs", color: "#7c2d12",
            items: [
                { n: "SCBA 30min S1",                 ic: "fa-lungs",               desc: "Presión positiva, máscara full" },
                { n: "SCBA 45min S2",                 ic: "fa-lungs",               desc: "NFPA 1981 certificado" },
                { n: "SCBA 60min S3",                 ic: "fa-lungs",               desc: "Cilindro compuesto CFRP" },
                { n: "Equipo CBRN S4",                ic: "fa-biohazard",           desc: "Clase A gas-tight" },
                { n: "SCBA Rescate S5",               ic: "fa-life-ring",           desc: "Máscara panorámica, HUD" },
                { n: "Regulador S6",                  ic: "fa-lungs",               desc: "Repuesto universal" }
            ]
        },
        {
            cat: "Detección de Gases", icono: "fa-wind", color: "#6b2500",
            items: [
                { n: "Detector 4 Gases D1",           ic: "fa-wind",                desc: "O2/CO/H2S/LEL, alarma triple" },
                { n: "Detector CBRN D2",              ic: "fa-biohazard",           desc: "Agentes químicos de guerra" },
                { n: "Fotómetro D3",                  ic: "fa-radiation",           desc: "PID VOCs, detección ppm" },
                { n: "Medidor Radiación D4",          ic: "fa-radiation-alt",       desc: "Geiger-Müller, alarma visual" },
                { n: "Espectrómetro Raman D5",        ic: "fa-magnifying-glass",    desc: "Identificación 10,000+ sust." },
                { n: "Portal Detección D6",           ic: "fa-door-open",           desc: "Detecta 200+ sustancias" }
            ]
        }
    ],
    'forenses': [
        {
            cat: "Recolección de Evidencia", icono: "fa-flask", color: "#7c3aed",
            items: [
                { n: "Kit ADN F1",                    ic: "fa-dna",                 desc: "Hisopos, frascos estériles" },
                { n: "Kit Sangre F2",                 ic: "fa-droplet",             desc: "Tarjetas FTA + preservantes" },
                { n: "Kit Biopsia F3",                ic: "fa-syringe",             desc: "Forceps, contenedor bioseg." },
                { n: "Maletín Cadena Custodia F4",    ic: "fa-briefcase",           desc: "Etiquetas numéricas, sellos" },
                { n: "Kit Saliva F5",                 ic: "fa-flask-vial",          desc: "Portador esterilizado RNA-free" },
                { n: "Caja Cadena Custodia F6",       ic: "fa-box-archive",         desc: "Cinta anti-manipulación" }
            ]
        },
        {
            cat: "Luces Forenses ALS", icono: "fa-lightbulb", color: "#6d28d9",
            items: [
                { n: "Luz ALS L1",                    ic: "fa-lightbulb",           desc: "Multibanda 450-630nm" },
                { n: "Linterna UV L2",                ic: "fa-flashlight",          desc: "365nm, 100,000mcd" },
                { n: "Luz Multiespectral L3",         ic: "fa-sun",                 desc: "9 bandas seleccionables" },
                { n: "Linterna Forense L4",           ic: "fa-flashlight",          desc: "Laranja/verde/azul" },
                { n: "Gafas Filtro L5",              ic: "fa-glasses",             desc: "Bloqueadores para ALS" },
                { n: "Panel UV L6",                   ic: "fa-sun",                 desc: "260×150mm, uniforme" }
            ]
        },
        {
            cat: "Equipamiento de Laboratorio", icono: "fa-microscope", color: "#5b21b6",
            items: [
                { n: "Microscopio Comparador M1",     ic: "fa-microscope",          desc: "Objetivo 100x aceite" },
                { n: "Balanza Analítica M2",          ic: "fa-scale-balanced",      desc: "0.0001g precisión" },
                { n: "Centrífuga M3",                 ic: "fa-rotate",              desc: "15,000rpm, 24 tubos" },
                { n: "pH-metro M4",                   ic: "fa-vial",                desc: "±0.01pH, temperatura comp." },
                { n: "Cámara Fuente Luz M5",          ic: "fa-camera",              desc: "Evidencia sin alteraciones" },
                { n: "Espectrofotómetro M6",          ic: "fa-chart-line",          desc: "190-1100nm UV/Vis" }
            ]
        },
        {
            cat: "Protección Personal Forense", icono: "fa-person-dress", color: "#4c1d95",
            items: [
                { n: "Traje Tyvek P1",                ic: "fa-person-dress",        desc: "DuPont 400D, electrost." },
                { n: "Guante Nitrilo Doble P2",       ic: "fa-hand-back-fist",      desc: "5.0mil/8.0mil doble capa" },
                { n: "Mascarilla N99 P3",             ic: "fa-head-side-mask",      desc: "Filtrado 99% partículas" },
                { n: "Protección Ocular P4",          ic: "fa-glasses",             desc: "Sellado total anti-salpicad." },
                { n: "Cubrebotas P5",                 ic: "fa-shoe-prints",         desc: "Antiestático, talla única" },
                { n: "Gorro Quirúrgico P6",           ic: "fa-head-side-mask",      desc: "PP no tejido" }
            ]
        }
    ],
    'drogas': [
        {
            cat: "Kits Prueba de Campo", icono: "fa-flask-vial", color: "#ea580c",
            items: [
                { n: "Kit Multi-Droga K1",            ic: "fa-flask-vial",          desc: "Detecta 10+ sustancias" },
                { n: "Kit Anfetaminas K2",            ic: "fa-flask-vial",          desc: "MDMA, MDA, metanfetamina" },
                { n: "Kit Cannabis K3",               ic: "fa-flask-vial",          desc: "THC, cannabinoides" },
                { n: "Kit Opiáceos K4",               ic: "fa-flask-vial",          desc: "Heroína, morfina, codeína" },
                { n: "Tira Fentanilo K5",             ic: "fa-flask-vial",          desc: "Detección en 5 min" },
                { n: "Kit Cocaína K6",                ic: "fa-flask-vial",          desc: "Scott + Marquis reagentes" }
            ]
        },
        {
            cat: "Espectrómetros Avanzados", icono: "fa-magnifying-glass-chart", color: "#c2410c",
            items: [
                { n: "Raman Portátil E1",             ic: "fa-magnifying-glass-chart", desc: "10,000+ compuestos, 785nm" },
                { n: "FTIR Portátil E2",              ic: "fa-magnifying-glass-chart", desc: "Base 40,000 espectros" },
                { n: "IMS Portátil E3",               ic: "fa-magnifying-glass-chart", desc: "Trazas explosivos/drogas" },
                { n: "GC-MS Portátil E4",             ic: "fa-magnifying-glass-chart", desc: "Confirmación definitiva" },
                { n: "XRF Portátil E5",               ic: "fa-magnifying-glass-chart", desc: "Análisis elemental" },
                { n: "Sensor Electroquímico E6",      ic: "fa-magnifying-glass-chart", desc: "Detección sub-ppm" }
            ]
        },
        {
            cat: "Detección de Portadores", icono: "fa-person-walking-arrow-right", color: "#9a3412",
            items: [
                { n: "Escáner Corporal D1",           ic: "fa-person-rays",         desc: "Rayos X, sin desnudar" },
                { n: "Detector Explosivos D2",        ic: "fa-magnifying-glass",    desc: "IMS, 200+ sust." },
                { n: "Escáner Equipaje D3",           ic: "fa-box",                 desc: "Doble vista, 150kV" },
                { n: "Perro Detector D4",             ic: "fa-paw",                 desc: "Equipo canino certificado" },
                { n: "Detector de Metales D5",        ic: "fa-wand-magic-sparkles", desc: "Portal + de mano" },
                { n: "Portal Detección D6",           ic: "fa-door-open",           desc: "Detecta 200+ sustancias" }
            ]
        },
        {
            cat: "Protección Respiratoria", icono: "fa-head-side-mask", color: "#7c2d12",
            items: [
                { n: "Mascarilla P100 R1",            ic: "fa-head-side-mask",      desc: "Filtros P100 + OV/AG" },
                { n: "SCBA Laboratorio R2",           ic: "fa-lungs",               desc: "30 min, modo positivo" },
                { n: "Respirador ABEK1 R3",           ic: "fa-head-side-mask",      desc: "Semi-máscara industrial" },
                { n: "Capuz Emergencia R4",           ic: "fa-head-side-mask",      desc: "15 min evacuación química" },
                { n: "Traje Ventilado R5",            ic: "fa-fan",                 desc: "Suministro aire +0.5 bar" },
                { n: "Monitor CO Personal R6",        ic: "fa-gauge",               desc: "Clip, alarma vibratoria" }
            ]
        }
    ]
};

// =====================================================
// 9. BASE DE DATOS VISTAS ESTÁNDAR
// =====================================================
const datosVistas = {
    'scp': {
        banner: "img/IMAGENES/Sistema de Control Policial/scp Bk.webp",
        circulo: "img/IMAGENES/Sistema de Control Policial/Scp imag 1.png",
        titulo: "Sistema de Control Policial (SCP)",
        subtitulo: "La Plataforma SCP",
        descripcion: "Gestión operativa integral y seguimiento en tiempo real para fuerzas de seguridad.",
        detalle1: "Plataforma integral diseñada para modernizar la seguridad pública mediante la interconexión en tiempo real entre ciudadanos, policías y centros de mando. El sistema permite gestionar alertas de emergencia, coordinar patrullajes inteligentes y recopilar inteligencia de datos para prevenir el delito.",
        ventajas: [
            { icono: "fa-mobile-screen-button", titulo: "Recuperación de la confianza ciudadana", texto: "Al contar con un botón de denuncia directa y registro digital de cada actuación policial, se eliminan las condiciones que permiten la corrupción." },
            { icono: "fa-stopwatch", titulo: "Reducción en tiempos de respuesta", texto: "La conexión directa entre la aplicación ciudadana y el oficial más cercano permite que la ayuda llegue en minutos." },
            { icono: "fa-shield-halved", titulo: "Protección total a los elementos policiales", texto: "El sistema cuida a quienes nos cuidan; mediante el botón de apoyo y el rastreo GPS, ningún agente queda solo en campo." },
            { icono: "fa-diagram-project", titulo: "Prevención del delito basada en datos", texto: "El análisis inteligente de información permite identificar zonas de riesgo y patrones delictivos reales." }
        ],
        franjaImagen: "img/IMAGENES/Sistema de Control Policial/SCP logo H.png",
        fraseFinal: "Con el SCP, las administraciones gubernamentales no solo vigilan, sino que gestionan la seguridad con inteligencia."
    },
    'infraccion': {
        banner: "img/IMAGENES/INFRACCION DIGITAL/apaisada_infraccion",
        circulo: "img/IMAGENES/INFRACCION DIGITAL/circular_infraccion.webp",
        titulo: "SCP Infracción Digital",
        descripcion: "Plataforma inteligente diseñada para modernizar la labor de los agentes de tránsito.",
        detalle1: "Es una plataforma inteligente diseñada para modernizar la labor de los agentes de tránsito, permitiéndoles aplicar multas de forma digital desde sus dispositivos móviles.",
        ventajas: [
            { icono: "fa-road",             titulo: "Calles más seguras para todos",       texto: "Al agilizar el trabajo de los agentes y detectar reincidentes al momento, se fomenta una cultura vial de respeto." },
            { icono: "fa-shield-halved",    titulo: "Cero corrupción y máxima confianza",  texto: "La digitalización elimina el manejo discrecional de boletas físicas, asegurando que cada proceso sea honesto." },
            { icono: "fa-file-circle-check",titulo: "Justicia rápida y sin errores",       texto: "Gracias a la validación automática de datos, los ciudadanos reciben boletas precisas." },
            { icono: "fa-chart-line",       titulo: "Recursos mejor invertidos",           texto: "Al reducir costos operativos y mejorar la recaudación, el gobierno obtiene más recursos." }
        ],
        fraseFinal: "Con SCP Infracción Digital, transformamos la autoridad vial en un modelo de eficiencia y honestidad."
    },
    'investigacion': {
        banner: "img/IMAGENES/POLICIA E INVESTIGACION/apaisada_policieeinv",
        circulo: "img/IMAGENES/POLICIA E INVESTIGACION/circular_policiaeinv.webp",
        titulo: "SCP Policía de Investigación",
        descripcion: "Herramienta tecnológica avanzada para centralizar y organizar evidencias e investigaciones.",
        detalle1: "Es una herramienta tecnológica avanzada diseñada para centralizar y organizar todas las evidencias, documentos y hallazgos de una investigación en un solo lugar digital seguro.",
        ventajas: [
            { icono: "fa-scale-balanced", titulo: "Resultados reales contra la impunidad",  texto: "Al organizar mejor las pruebas y evidencias, se logran investigaciones más sólidas que terminan en sentencias justas." },
            { icono: "fa-eye",            titulo: "Supervisión directa y transparencia",   texto: "Los mandos pueden verificar el progreso de cada agente en línea, garantizando que el trabajo se realice con honestidad." },
            { icono: "fa-lock",           titulo: "Protección total de la información",    texto: "El control estricto de usuarios evita la filtración de datos sensibles." },
            { icono: "fa-bolt",           titulo: "Justicia más ágil para el ciudadano",   texto: "La digitalización reduce la burocracia en el Ministerio Público." }
        ],
        fraseFinal: "Con SCP Policía de Investigación, tu gobierno fortalece el estado de derecho."
    },
    'inteligencia': {
        banner: "img/IMAGENES/PLATAFORMA DE INTELIGENCIA/apaidadainteligencia",
        circulo: "img/IMAGENES/PLATAFORMA DE INTELIGENCIA/circular_inteligencia",
        titulo: "Plataforma de Inteligencia",
        descripcion: "Centro de mando digital avanzado para procesar grandes volúmenes de información en tiempo real.",
        detalle1: "Es un centro de mando digital avanzado que permite procesar grandes volúmenes de información proveniente de redes sociales, registros telefónicos y cámaras de seguridad en tiempo real.",
        ventajas: [
            { icono: "fa-globe",           titulo: "Prevención del delito en tiempo real",      texto: "Al analizar redes sociales y fuentes abiertas, el gobierno puede anticiparse a situaciones de riesgo." },
            { icono: "fa-car",             titulo: "Ciudades vigiladas y seguras",              texto: "El reconocimiento automático de placas y rostros permite localizar vehículos robados de manera inmediata." },
            { icono: "fa-project-diagram", titulo: "Desarticulación de redes criminales",       texto: "El análisis de vínculos ayuda a entender cómo operan los grupos delictivos." },
            { icono: "fa-brain",           titulo: "Tecnología al servicio del ciudadano",      texto: "El procesamiento inteligente de la información reduce los tiempos de respuesta ante emergencias." }
        ],
        fraseFinal: "Con la Plataforma de Inteligencia, tu administración se coloca a la vanguardia tecnológica."
    },
    'cautelares': {
        banner: "img/IMAGENES/MEDIDAS CAUTELARES/apaisadacautelar.webp",
        circulo: "img/IMAGENES/MEDIDAS CAUTELARES/circulacautelares",
        titulo: "SCP Medidas Cautelares y Brazaletes",
        descripcion: "Solución tecnológica para monitorear en tiempo real a personas con medidas cautelares.",
        detalle1: "Es una solución tecnológica avanzada diseñada para monitorear en tiempo real a personas que, por mandato judicial, llevan su proceso legal en libertad.",
        ventajas: [
            { icono: "fa-shield-halved",  titulo: "Protección efectiva a las víctimas",         texto: "El sistema permite crear perímetros de seguridad que alertan si el imputado se acerca a la víctima." },
            { icono: "fa-building",       titulo: "Despresurización del sistema penitenciario",  texto: "Al permitir que procesos no graves se sigan en libertad vigilada, se reducen la sobrepoblación en penales." },
            { icono: "fa-users",          titulo: "Reinserción social con vigilancia",           texto: "Fomenta que las personas mantengan sus vínculos familiares y laborales bajo supervisión estricta." },
            { icono: "fa-scale-balanced", titulo: "Justicia moderna y humanista",                texto: "Demuestra un gobierno a la vanguardia que utiliza la tecnología para aplicar la ley de forma inteligente." }
        ],
        fraseFinal: "Con SCP Medidas Cautelares y Brazaletes, tu administración transforma la vigilancia en un proceso infalible."
    },
    'visitas': {
        banner: "img/IMAGENES/CONTROL DE VISITAS/apaisada_controldevisitas",
        circulo: "img/IMAGENES/CONTROL DE VISITAS/circular_controldevisitas.webp",
        titulo: "SCP Control de Visitas",
        descripcion: "Plataforma tecnológica para gestionar el acceso a centros penitenciarios de forma segura y digital.",
        detalle1: "Es una plataforma tecnológica avanzada diseñada para gestionar el acceso a los centros penitenciarios de forma segura, rápida y digital.",
        ventajas: [
            { icono: "fa-lock",          titulo: "Penales más seguros y ordenados",              texto: "Al eliminar los registros manuales, el gobierno retoma el control total de quién entra y sale." },
            { icono: "fa-shield-halved", titulo: "Transparencia total frente a la corrupción",   texto: "La digitalización de cada visita impide que se otorguen accesos preferenciales o irregulares." },
            { icono: "fa-users",         titulo: "Respeto a los derechos de las familias",       texto: "Agiliza los tiempos de espera y dignifica el proceso de visita para los ciudadanos." },
            { icono: "fa-eye",           titulo: "Paz social y prevención de incidentes",        texto: "El monitoreo en tiempo real permite detectar patrones sospechosos y prevenir conflictos internos." }
        ],
        fraseFinal: "Con SCP Control de Visitas, tu administración moderniza el sistema penitenciario."
    },
    'lpr_sol': {
        banner: "img/IMAGENES/Plataforma de inteligencia LPR/apaisada_LPR.webp",
        circulo: "img/IMAGENES/Plataforma de inteligencia LPR/circular_lrp.webp",
        titulo: "Plataforma de Inteligencia LPR",
        descripcion: "Ecosistema tecnológico de seguridad perimetral con cámaras ANPR y antenas RFID.",
        detalle1: "Es un ecosistema tecnológico de seguridad perimetral que integra cámaras de lectura de placas (ANPR) y antenas de radiofrecuencia (RFID) para el blindaje de ciudades y carreteras.",
        ventajas: [
            { icono: "fa-road",           titulo: "Blindaje automático del territorio",          texto: "Al monitorear entradas y salidas del estado en tiempo real, el gobierno recupera el control de las vías." },
            { icono: "fa-car",            titulo: "Recuperación efectiva del patrimonio",        texto: "El sistema permite interceptar vehículos robados en tiempo récord." },
            { icono: "fa-camera",         titulo: "Justicia vial y prevención de accidentes",   texto: "A través de la tecnología de fotomultas, se fomenta una cultura de respeto a la ley." },
            { icono: "fa-network-wired",  titulo: "Inteligencia contra el crimen organizado",   texto: "La capacidad de rastrear rutas recurrentes permite desarticular bandas delictivas." }
        ],
        fraseFinal: "Con la Plataforma de Inteligencia LPR, tu administración construye una frontera tecnológica infranqueable."
    },
    'ciberseguridad': {
        banner: "img/ser/Ciber Seguridad BG.webp",
        circulo: "img/ser/Ciber Seguridad C.webp",
        titulo: "Servicios de Ciberseguridad",
        descripcion: "Blindaje digital integral para proteger la infraestructura tecnológica y la información gubernamental.",
        detalle1: "Es un ecosistema de protección digital avanzada diseñado para blindar la infraestructura tecnológica del gobierno contra ataques cibernéticos y el robo de información.",
        ventajas: [
            { icono: "fa-user-shield",           titulo: "Protección de la identidad ciudadana",     texto: "Al asegurar las bases de datos gubernamentales, se evita el robo de información personal." },
            { icono: "fa-server",                titulo: "Continuidad de los servicios públicos",    texto: "La seguridad en redes y nube garantiza que los trámites digitales estén disponibles las 24 horas." },
            { icono: "fa-magnifying-glass-chart",titulo: "Respuesta científica ante incidentes",     texto: "Gracias a la forensia digital, el gobierno cuenta con la capacidad de investigar cualquier evento." },
            { icono: "fa-scale-balanced",        titulo: "Certeza jurídica y cumplimiento legal",    texto: "La asesoría en políticas de seguridad asegura que tu administración cumpla con las leyes." }
        ],
        fraseFinal: "Con nuestros Servicios de Ciberseguridad, tu gobierno construye una muralla digital impenetrable."
    },
    'transcripcion': {
        banner: "img/ser/Transcricion BG.webp",
        circulo: "img/ser/Transcricion C.webp",
        titulo: "SCP Transcripción",
        descripcion: "Conversión inteligente de audio y video en texto estructurado para análisis y toma de decisiones.",
        detalle1: "Es una solución de inteligencia artificial diseñada para convertir automáticamente audios y videos en texto estructurado, facilitando la búsqueda y el análisis de información clave.",
        ventajas: [
            { icono: "fa-gavel",          titulo: "Justicia basada en evidencias sólidas",     texto: "Al contar con transcripciones precisas de entrevistas y comunicaciones, el gobierno fortalece los expedientes." },
            { icono: "fa-tower-broadcast",titulo: "Respuesta inmediata ante emergencias",      texto: "La capacidad de analizar en tiempo real las frecuencias de radio permite detectar palabras de alerta." },
            { icono: "fa-eye",            titulo: "Transparencia en el actuar policial",       texto: "Al registrar y procesar los audios de operativos y patrullajes, se garantiza el comportamiento correcto." },
            { icono: "fa-clock",          titulo: "Optimización de recursos y tiempo",         texto: "Libera a los investigadores de la carga manual de transcribir horas de audio." }
        ],
        fraseFinal: "Con SCP Transcripción, tu administración convierte el sonido en datos procesables."
    },
    'mantenimiento': {
        banner: "img/ser/Matenimiento BG.webp",
        circulo: "img/ser/Matenimiento C.webp",
        titulo: "Mantenimiento Preventivo de PMI",
        descripcion: "Programa continuo de soporte y optimización para garantizar el funcionamiento permanente de la infraestructura.",
        detalle1: "Es un programa integral de soporte técnico y atención continua diseñado para asegurar que la infraestructura tecnológica de seguridad funcione al 100% de su capacidad.",
        ventajas: [
            { icono: "fa-video",           titulo: "Seguridad ciudadana sin interrupciones",  texto: "Al prevenir fallas en cámaras y sistemas de vigilancia, el gobierno garantiza protección las 24 horas." },
            { icono: "fa-coins",           titulo: "Eficiencia en el gasto público",          texto: "El mantenimiento preventivo evita reparaciones costosas y de emergencia." },
            { icono: "fa-shield-check",    titulo: "Confianza total en la tecnología",        texto: "Asegura que, en el momento que se requiera una evidencia o una alerta, el sistema responda con precisión." },
            { icono: "fa-building-shield", titulo: "Protección del patrimonio institucional", texto: "Al mantener los equipos en óptimas condiciones, tu administración protege la inversión tecnológica." }
        ],
        fraseFinal: "Con el Mantenimiento Preventivo de PMI, tu administración asegura que la tecnología nunca descanse."
    },
    'tacticos_imp': {
        banner: "img/ser/Implementacion de tacticos BG.webp",
        circulo: "img/ser/Implementacion de tacticos C.webp",
        titulo: "Implementación de Tácticos",
        descripcion: "Tecnología de localización y rastreo en tiempo real para operativos de alta seguridad.",
        detalle1: "Es una solución de despliegue estratégico diseñada para la localización y rastreo de dispositivos de comunicación en tiempo real.",
        ventajas: [
            { icono: "fa-life-ring",   titulo: "Salvamento de vidas en emergencias",     texto: "En desastres naturales o desapariciones, el gobierno cuenta con la capacidad de localizar personas." },
            { icono: "fa-crosshairs",  titulo: "Golpes precisos a la delincuencia",       texto: "Permite el rastreo de objetivos de alto perfil involucrados en actividades ilegales." },
            { icono: "fa-shield",      titulo: "Paz y orden en situaciones críticas",     texto: "En eventos de riesgo o disturbios, la tecnología táctica ayuda a identificar y neutralizar amenazas." },
            { icono: "fa-star",        titulo: "Liderazgo en inteligencia operativa",     texto: "Proyecta un gobierno equipado con tecnología de élite." }
        ],
        fraseFinal: "Con la Implementación de Tácticos, tu administración dota a las fuerzas del orden de la capacidad de ver lo invisible."
    },
    'desarrollo': {
        banner: "img/ser/Desarrollo de Sitema BG.webp",
        circulo: "img/ser/Desarrollo de Sitema C.webp",
        titulo: "Desarrollo de Sistemas",
        descripcion: "Creación de plataformas digitales personalizadas que optimizan procesos y fortalecen la gestión.",
        detalle1: "Es un servicio especializado en el diseño y creación de software a la medida, construido para resolver los retos específicos de cada institución.",
        ventajas: [
            { icono: "fa-users",       titulo: "Servicios públicos a la medida del ciudadano", texto: "Al crear sistemas específicos para las necesidades del estado, el gobierno elimina trámites innecesarios." },
            { icono: "fa-piggy-bank",  titulo: "Ahorro y optimización del presupuesto",        texto: "El software a la medida evita el pago de licencias externas costosas." },
            { icono: "fa-rocket",      titulo: "Un gobierno digital siempre a la vanguardia",  texto: "La escalabilidad permite que los sistemas crezcan junto con la ciudad." },
            { icono: "fa-database",    titulo: "Soberanía y control de la información",        texto: "Al desarrollar sistemas propios, tu administración mantiene el control total de sus datos." }
        ],
        fraseFinal: "Con nuestro Desarrollo de Sistemas, tu gobierno deja de adaptarse a la tecnología."
    },
    'forensia': {
        banner: "img/equi/Forencia Digital BG.webp",
        circulo: "img/equi/Forencia Digital C.webp",
        titulo: "Forensia Digital",
        descripcion: "Solución científica para extracción y análisis de evidencia digital con validez legal.",
        detalle1: "Es una solución científica avanzada diseñada para la extracción y análisis de información contenida en dispositivos electrónicos.",
        ventajas: [
            { icono: "fa-scale-balanced", titulo: "Justicia implacable contra el delito",    texto: "Al convertir los datos de un celular en pruebas legales, el gobierno asegura que los culpables no queden libres." },
            { icono: "fa-clock",          titulo: "Resolución de casos en tiempo récord",    texto: "La capacidad de procesar miles de mensajes y archivos en minutos permite resolver delitos de alto impacto." },
            { icono: "fa-gavel",          titulo: "Transparencia y procesos defendibles",    texto: "El manejo profesional de la evidencia garantiza que la investigación no pueda ser cuestionada." },
            { icono: "fa-location-dot",   titulo: "Protección y rescate de víctimas",        texto: "El análisis de ubicaciones y contactos es clave para localizar personas desaparecidas." }
        ],
        fraseFinal: "Con la Forensia Digital, tu administración profesionaliza la persecución del delito."
    },
    'tactico_eq': {
        banner: "img/equi/PMI BG.webp",
        circulo: "img/equi/PMI C.webp",
        titulo: "PMI (Punto de Monitoreo Inteligente)",
        descripcion: "Infraestructura urbana inteligente que integra videovigilancia, comunicación y sistemas de alerta ciudadana.",
        detalle1: "Cámaras PTZ de alta definición con zoom óptico y botón de pánico con conexión directa al C5/C4.",
        ventajas: [
            { icono: "fa-video",        titulo: "Videovigilancia 360°",    texto: "Cobertura amplia con cámaras de alta resolución." },
            { icono: "fa-bell",         titulo: "Botón de Pánico",         texto: "Comunicación inmediata con el centro de monitoreo." },
            { icono: "fa-volume-high",  titulo: "Perifoneo Integrado",     texto: "Sistema de altavoces para alertas públicas." },
            { icono: "fa-network-wired",titulo: "Conectividad Segura",     texto: "Enlaces por fibra óptica o microondas." }
        ],
        fraseFinal: "El PMI fortalece la seguridad urbana mediante monitoreo inteligente y respuesta inmediata."
    },
    'lpr_sistemas': {
        banner: "img/equi/Sistema LPR BG.webp",
        circulo: "img/equi/Sistema LPR C.webp",
        titulo: "Sistemas LPR Hardware",
        descripcion: "Infraestructura tecnológica para lectura automática de placas y vigilancia vehicular en tiempo real.",
        detalle1: "Es la infraestructura física de alta precisión compuesta por cámaras de alta velocidad y sensores especializados para la lectura automática de placas (ANPR).",
        ventajas: [
            { icono: "fa-car",        titulo: "Recuperación inmediata del patrimonio",  texto: "Al detectar vehículos robados en segundos, el gobierno protege los bienes de los ciudadanos." },
            { icono: "fa-road",       titulo: "Justicia vial para reducir accidentes",  texto: "La implementación de fotomultas automatizadas fomenta que los conductores respeten los límites." },
            { icono: "fa-border-all", titulo: "Control total de las fronteras",         texto: "La instalación en puntos estratégicos permite saber exactamente quién entra y sale." },
            { icono: "fa-city",       titulo: "Modernización y orden público",          texto: "Sustituir los retenes manuales por tecnología de lectura automática agiliza el tránsito." }
        ],
        fraseFinal: "Con los Sistemas LPR Hardware, tu administración instala los ojos del estado en cada vía."
    },
    'areas': {
        banner: "img/equi/Plataforma AereaBG.webp",
        circulo: "img/equi/Plataforma Aerea C.webp",
        titulo: "Plataforma Aérea",
        descripcion: "Sistema aéreo de largo alcance para patrullaje, monitoreo territorial y transmisión en tiempo real.",
        detalle1: "Es una solución de vigilancia aérea avanzada que combina la versatilidad de un despegue vertical automatizado con el poder de un vuelo de larga duración.",
        ventajas: [
            { icono: "fa-mountain",  titulo: "Vigilancia total de zonas de difícil acceso", texto: "Al cubrir grandes distancias, el gobierno puede monitorear sierras, fronteras y zonas rurales." },
            { icono: "fa-life-ring", titulo: "Operativos de rescate efectivos",              texto: "Su capacidad de vuelo prolongado es vital para localizar personas extraviadas." },
            { icono: "fa-tree",      titulo: "Prevención de desastres ambientales",          texto: "Permite detectar a tiempo incendios forestales, tala clandestina o invasión de predios." },
            { icono: "fa-video",     titulo: "Protección ciudadana desde el aire",           texto: "La transmisión de video en vivo permite coordinar persecuciones o vigilar eventos masivos." }
        ],
        fraseFinal: "Con la Plataforma Aérea, tu administración eleva la seguridad a un nuevo nivel."
    },
    'acceso': {
        banner: "img/equi/apaisada_controlaccesos.webp",
        circulo: "img/equi/circularaccesos.webp",
        titulo: "Control de Accesos",
        descripcion: "Sistema tecnológico para gestión y supervisión segura de accesos físicos.",
        detalle1: "Es una solución tecnológica de alta seguridad diseñada para gestionar y supervisar el ingreso de personas y vehículos a instalaciones estratégicas.",
        ventajas: [
            { icono: "fa-building-shield",  titulo: "Blindaje de las instituciones públicas",  texto: "Al detectar explosivos o sustancias prohibidas, el gobierno garantiza que los edificios sean entornos seguros." },
            { icono: "fa-id-card",          titulo: "Orden y agilidad en el servicio",         texto: "La identificación digital elimina las filas lentas en las entradas." },
            { icono: "fa-clipboard-check",  titulo: "Cero discrecionalidad",                   texto: "Al registrar digitalmente cada entrada y salida, se elimina el uso de bitácoras de papel." },
            { icono: "fa-eye",              titulo: "Prevención inteligente de incidentes",     texto: "El monitoreo continuo permite identificar personas no autorizadas." }
        ],
        fraseFinal: "Con el sistema de Control de Accesos, tu administración establece una frontera de seguridad inteligente."
    },
    'moviles': {
        banner: "img/equi/Pm95 BK.webp",
        circulo: "img/equi/PM95.png",
        titulo: "Dispositivos Móviles",
        descripcion: "Herramienta móvil robusta para operación táctica y conexión en tiempo real.",
        detalle1: "Es la herramienta de mano definitiva para el personal operativo, diseñada para llevar toda la capacidad del centro de control directamente al lugar donde ocurren los hechos.",
        ventajas: [
            { icono: "fa-battery-full", titulo: "Presencia operativa ininterrumpida",  texto: "Gracias a su gran autonomía de energía, el personal puede cumplir jornadas completas sin que la herramienta falle." },
            { icono: "fa-bolt",         titulo: "Coordinación y respuesta inmediata",  texto: "La conectividad de última generación permite enviar y recibir información crítica en tiempo real." },
            { icono: "fa-shield",       titulo: "Resiliencia en condiciones extremas", texto: "Su diseño robusto está hecho para resistir el trabajo rudo en campo." },
            { icono: "fa-headset",      titulo: "Seguridad y apoyo al servidor público",texto: "Con sistemas de audio que eliminan el ruido ambiental y botones de auxilio directo." }
        ],
        fraseFinal: "Con dispositivos como el PM95, tu administración entrega a las corporaciones una herramienta de élite."
    },
    'pmi': {
        banner: "img/equi/PMI BG.webp",
        circulo: "img/equi/PMI C.webp",
        titulo: "PMI (Punto de Monitoreo Inteligente)",
        descripcion: "Infraestructura urbana inteligente que integra videovigilancia, comunicación y sistemas de alerta ciudadana.",
        detalle1: "Cámaras PTZ de alta definición con zoom óptico y botón de pánico con conexión directa al C5/C4.",
        ventajas: [
            { icono: "fa-video",        titulo: "Videovigilancia 360°",    texto: "Cobertura amplia con cámaras de alta resolución." },
            { icono: "fa-bell",         titulo: "Botón de Pánico",         texto: "Comunicación inmediata con el centro de monitoreo." },
            { icono: "fa-volume-high",  titulo: "Perifoneo Integrado",     texto: "Sistema de altavoces para alertas públicas." },
            { icono: "fa-network-wired",titulo: "Conectividad Segura",     texto: "Enlaces por fibra óptica o microondas." }
        ],
        fraseFinal: "El PMI fortalece la seguridad urbana mediante monitoreo inteligente y respuesta inmediata."
    }
};

// =====================================================
// 10. ESTADÍSTICAS ANIMADAS
// =====================================================
function initStatsAnimation() {
    // Activar data-anim elements con IntersectionObserver
    const animEls = document.querySelectorAll('[data-anim]');
    if (animEls.length) {
        const animIO = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) { e.target.classList.add('visible'); animIO.unobserve(e.target); }
            });
        }, { threshold: 0.15 });
        animEls.forEach(el => animIO.observe(el));
    }

    // Contadores animados (sin GSAP — requestAnimationFrame puro)
    const stats = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'));
                const duration = 2000; // ms
                const start = performance.now();
                function tick(now) {
                    const elapsed = now - start;
                    const progress = Math.min(elapsed / duration, 1);
                    // easeOutCubic
                    const eased = 1 - Math.pow(1 - progress, 3);
                    el.innerText = '+' + Math.floor(eased * target).toLocaleString('en-US');
                    if (progress < 1) requestAnimationFrame(tick);
                }
                requestAnimationFrame(tick);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.3 });
    stats.forEach(stat => observer.observe(stat));
}

// =====================================================
// 11. FORMULARIO
// =====================================================
const obtenerHtmlForm = (tituloPersonalizado) => `
    <section class="project-form-section" id="contacto">
        <div class="blue-container">
            <div class="form-header">
                <h2>${tituloPersonalizado || '¿Tienes un proyecto?<br>Hablemos →'}</h2>
                <p><i class="fa-solid fa-phone"></i> 222 970 39 85</p>
                <p><i class="fa-solid fa-envelope"></i> contacto@sysne.com.mx</p>
            </div>
            <form class="form-body" id="contact-form">
                <div class="form-fields">
                    <input type="text"  name="nombre"   placeholder="Nombre"  required>
                    <input type="email" name="correo"   placeholder="Correo"  required>
                    <input type="text"  name="telefono" placeholder="Teléfono" required>
                    <select name="sector" required>
                        <option value="" disabled selected>Sector...</option>
                        <option value="Gobierno">Gobierno</option>
                        <option value="Privado">Privado</option>
                        <option value="Otros">Otros</option>
                    </select>
                    <textarea name="mensaje" placeholder="Mensaje" rows="4" required></textarea>
                    <button type="submit" class="btn-submit">Enviar solicitud</button>
                </div>
            </form>
        </div>
    </section>`;

// =====================================================
// 12. SISTEMA DE VISTAS — CON ANIMACIONES GSAP
// =====================================================
let vistaActual = 'inicio';

function mostrarDetalle(contenidoHTML) {
    const inicio  = document.getElementById('vista-inicio');
    const detalle = document.getElementById('vista-detalle');
    const cont    = document.getElementById('contenido-dinamico');

    // Ocultar inicio INMEDIATAMENTE — sin animación que pueda fallar
    inicio.style.display  = 'none';
    inicio.style.opacity  = '1';
    inicio.style.transform = '';

    // Mostrar detalle
    cont.innerHTML = contenidoHTML;
    detalle.style.display = 'block';
    detalle.style.opacity = '0';
    detalle.style.transform = 'translateY(10px)';

    vistaActual = 'detalle';
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Fade in del detalle
    requestAnimationFrame(() => {
        detalle.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
        detalle.style.opacity = '1';
        detalle.style.transform = 'translateY(0)';
        setTimeout(() => {
            detalle.style.transition = '';
            try { animarVistaDetalle(); } catch(e) {}
        }, 380);
    });
}

function volverInicio() {
    const inicio  = document.getElementById('vista-inicio');
    const detalle = document.getElementById('vista-detalle');
    vistaActual = 'inicio';

    // Ocultar detalle instantáneamente
    detalle.style.display = 'none';
    detalle.style.opacity = '1';
    detalle.style.transform = '';

    // Mostrar inicio
    inicio.style.display = 'block';
    inicio.style.opacity = '0';
    window.scrollTo({ top: 0, behavior: 'instant' });

    requestAnimationFrame(() => {
        inicio.style.transition = 'opacity 0.35s ease';
        inicio.style.opacity = '1';
        setTimeout(() => {
            inicio.style.transition = '';
            initStatsAnimation();
        }, 380);
    });
}

// =====================================================
// 13. VISTAS ESTÁNDAR
// =====================================================
function cargarVista(id) {
    const inicio = document.getElementById('vista-inicio');
    const detalle = document.getElementById('vista-detalle');
    const contenedor = document.getElementById('contenido-dinamico');
    let data = datosVistas[id] || datosVistas['scp'];

    // Transición robusta sin depender de GSAP
    inicio.style.transition = 'opacity 0.28s ease';
    inicio.style.opacity = '0';
    setTimeout(() => {
            inicio.style.display = 'none';
            inicio.style.opacity = '1';
            inicio.style.transition = '';
            detalle.style.display = 'block';
            vistaActual = 'detalle';

            contenedor.innerHTML = `
                <section class="modulo-hero" style="background-image:url('${data.banner}')">
                    <div class="modulo-overlay"></div>
                    <div class="modulo-hero-content">
                        <h1>${data.titulo}</h1>
                        <p>${data.descripcion}</p>
                    </div>
                </section>
                <section class="scp-banner ${id === 'scp' ? 'es-scp' : 'es-modulo'}">
                    <div class="scp-contenido">
                        <div class="scp-texto">
                            <h1>${data.titulo}</h1>
                            <p>${data.detalle1}${data.detalle2 ? '<br><br>' + data.detalle2 : ''}</p>
                        </div>
                        <div class="${id === 'scp' ? 'scp-imagen' : 'img-circular'}">
                            <img src="${data.circulo}" alt="${data.titulo}">
                        </div>
                    </div>
                </section>
                <section class="ventajas-section">
                    <h2>Ventajas Estratégicas</h2>
                    <div class="ventajas-grid">
                        ${data.ventajas.map(v => `
                            <div class="ventaja-card">
                                ${v.icono.includes('img/')
                                    ? `<img src="${v.icono}" class="ventaja-img-icono" alt="icono">`
                                    : `<i class="fa-solid ${v.icono}"></i>`
                                }
                                <h4>${v.titulo}</h4>
                                <p>${v.texto}</p>
                            </div>`).join('')}
                    </div>
                </section>
                <section class="franja-final">
                    <div class="franja-overlay"></div>
                    <div class="franja-content">
                        ${(data.franjaImagen || data.franjaIcono) ? `
                        <div class="franja-icono-unico">
                            ${data.franjaImagen
                                ? `<img src="${data.franjaImagen}" class="franja-img-icono" alt="Icono">`
                                : `<i class="fas ${data.franjaIcono}"></i>`}
                        </div>` : ''}
                        <h3>${data.fraseFinal || ''}</h3>
                    </div>
                </section>
                ${obtenerHtmlForm('Cotizar ' + data.titulo)}`;

            detalle.style.opacity = '0';
            requestAnimationFrame(() => {
                detalle.style.transition = 'opacity 0.3s ease';
                detalle.style.opacity = '1';
                setTimeout(() => { detalle.style.transition = ''; }, 320);
            });
            window.scrollTo({ top: 0, behavior: "instant" });
            setTimeout(animarVistaDetalle, 60);
    }, 290);
}

// =====================================================
// 14. CATÁLOGO EQUIPOS DE PROTECCIÓN
// =====================================================
function cargarVistaEquiposProteccion() {
    const htmlContent = `
        <section class="perfiles-section-custom">
            <div style="text-align:center;padding:60px 5% 40px;">
                <p style="font-size:11px;font-weight:700;letter-spacing:0.3em;color:var(--celeste);text-transform:uppercase;margin-bottom:8px;">CATÁLOGO SYSNE</p>
                <h2 style="font-size:clamp(28px,4vw,48px);font-weight:800;color:var(--azul-oscuro);margin-bottom:12px;">Equipos de Protección</h2>
                <p style="color:#64748b;max-width:540px;margin:0 auto;line-height:1.6;">Selecciona el perfil de uso para explorar el equipamiento especializado disponible.</p>
            </div>
            <div class="perfiles-grid-custom">
                <div class="perfil-card-item pci-policias" onclick="cargarMenuPerfil('policias')">
                    <div class="perfil-icon-box" style="background:linear-gradient(135deg,#1e40af,#1e3a8a);box-shadow:0 4px 12px rgba(30,64,175,0.35);"><i class="fa-solid fa-user-shield"></i></div>
                    <h3>POLICÍAS</h3>
                </div>
                <div class="perfil-card-item pci-ambulancia" onclick="cargarMenuPerfil('ambulancia')">
                    <div class="perfil-icon-box" style="background:linear-gradient(135deg,#16a34a,#15803d);box-shadow:0 4px 12px rgba(22,163,74,0.35);"><i class="fa-solid fa-ambulance"></i></div>
                    <h3>AMBULANCIA</h3>
                </div>
                <div class="perfil-card-item pci-bomberos" onclick="cargarMenuPerfil('bomberos')">
                    <div class="perfil-icon-box" style="background:linear-gradient(135deg,#dc2626,#b91c1c);box-shadow:0 4px 12px rgba(220,38,38,0.35);"><i class="fa-solid fa-fire-extinguisher"></i></div>
                    <h3>BOMBEROS</h3>
                </div>
                <div class="perfil-card-item pci-forenses" onclick="cargarMenuPerfil('forenses')">
                    <div class="perfil-icon-box" style="background:linear-gradient(135deg,#8b5cf6,#7c3aed);box-shadow:0 4px 12px rgba(139,92,246,0.35);"><i class="fa-solid fa-microscope"></i></div>
                    <h3>FORENSES</h3>
                </div>
                <div class="perfil-card-item pci-drogas" onclick="cargarMenuPerfil('drogas')">
                    <div class="perfil-icon-box" style="background:linear-gradient(135deg,#ea580c,#c2410c);box-shadow:0 4px 12px rgba(234,88,12,0.35);"><i class="fa-solid fa-biohazard"></i></div>
                    <h3>DROGAS</h3>
                </div>
            </div>
        </section>
        
        <section class="productos-destacados-section" style="padding:60px 5%;">
            <div class="productos-destacados-header" style="text-align:center;max-width:900px;margin:0 auto;margin-bottom:40px;">
                <div style="display:flex;align-items:center;justify-content:center;gap:12px;margin-bottom:12px;flex-direction:column;">
                    <span style="width:52px;height:52px;border-radius:12px;background:linear-gradient(135deg,#00d4ff,#0099cc);display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 4px 15px rgba(0,212,255,0.3);">
                        <i class="fa-solid fa-truck-fast" style="color:#fff;font-size:1.6rem;"></i>
                    </span>
                    <div style="text-align:center;">
                        <p style="margin:0;font-size:0.9rem;color:#0099cc;font-weight:700;text-transform:uppercase;letter-spacing:0.6px;">Disponibilidad Inmediata</p>
                        <h2 style="margin:4px 0 0;font-size:clamp(22px,3vw,38px);color:#0f172a;font-weight:800;line-height:1.1;">Productos Destacados</h2>
                    </div>
                </div>
                <p style="margin:0;font-size:0.95rem;color:#64748b;line-height:1.6;margin-top:12px;">Selección premium de equipamiento de protección listo para entrega inmediata. Todos con certificación SCP.</p>
            </div>
            <div class="tacticos-grid" id="grid-destacados"></div>
            <div style="margin-top:50px;">${obtenerHtmlForm('Cotizar Productos Destacados')}</div>
        </section>`;

    mostrarDetalle(htmlContent);
    setTimeout(() => { cargarProductosDestacados(); }, 350);
}

// ─────────────────────────────────────────────────────
// cargarMenuPerfil
// ─────────────────────────────────────────────────────
function cargarMenuPerfil(perfilId) {
    const categorias = catalogoVariantes[perfilId];
    if (!categorias) { console.error('Perfil no encontrado:', perfilId); return; }

    const coloresPerfil = {
        policias: '#1e40af', ambulancia: '#dc2626',
        bomberos: '#ea580c', forenses: '#7c3aed', drogas: '#ea580c'
    };
    const colorPerfil = coloresPerfil[perfilId] || '#5fa8d3';

    mostrarDetalle(`
        <div class="proteccion-wrapper">
            <aside class="sidebar-perfil">
                <button class="btn-back-perfiles" onclick="cargarVistaEquiposProteccion()">
                    <i class="fa-solid fa-arrow-left"></i> VOLVER
                </button>
                <div class="sidebar-title" style="margin-top:20px;">
                    <small>CATÁLOGO</small>
                    <h3>${perfilId.toUpperCase().replace('_',' ')}</h3>
                    <div style="width:40px;height:3px;background:${colorPerfil};border-radius:2px;margin-top:8px;"></div>
                </div>
                <ul class="sidebar-nav">
                    ${categorias.map((g, i) => `
                        <li onclick="mostrarVariantes(${i},'${perfilId}')"
                            class="nav-item-catalogo"
                            id="nav-item-${i}"
                            style="opacity:1;">
                            <span class="num-indice">0${i+1}</span>
                            <span class="prod-name">${g.cat}</span>
                        </li>`).join('')}
                </ul>
            </aside>
            <main class="visor-variantes" id="visor-variantes">
                <div style="display:flex;align-items:center;justify-content:center;height:200px;color:#ccc;">
                    <i class="fa-solid fa-spinner fa-spin" style="font-size:2rem;"></i>
                </div>
            </main>
        </div>`
    );

    requestAnimationFrame(() => {
        const items = document.querySelectorAll('.nav-item-catalogo');
        items.forEach((el, i) => {
            el.style.cssText = `opacity:0;transform:translateX(-16px);transition:opacity .3s ${i*0.06}s ease,transform .3s ${i*0.06}s ease`;
            requestAnimationFrame(() => { el.style.opacity='1'; el.style.transform='translateX(0)'; });
        });
        const last = items.length - 1;
        setTimeout(() => mostrarVariantes(0, perfilId), last * 60 + 350);
    });
}

// ─────────────────────────────────────────────────────
// mostrarVariantes — con imágenes Unsplash para fallback
// ─────────────────────────────────────────────────────
function mostrarVariantes(indexCat, perfilId) {
    const visor    = document.getElementById('visor-variantes');
    const categoria = catalogoVariantes[perfilId]?.[indexCat];
    if (!categoria || !visor) return;

    document.querySelectorAll('.nav-item-catalogo').forEach(el => {
        el.classList.remove('active');
        el.style.opacity = '1';
    });
    const navItem = document.getElementById(`nav-item-${indexCat}`);
    if (navItem) navItem.classList.add('active');

    const imgsCategoria = imagenesProductos[perfilId]?.[indexCat] || [];

    const productosHTML = categoria.items.map((prod, prodIdx) => {
        const imgUrl = imgsCategoria[prodIdx] || '';
        return `
        <div class="tactico-card">
            <div style="position:relative;overflow:hidden;min-height:180px;background:#0d1b2e;">
                ${imgUrl ? `
                <img
                    src="${imgUrl}"
                    alt="${prod.n}"
                    style="width:100%;height:180px;object-fit:cover;display:block;transition:transform .4s ease;"
                    onerror="this.style.display='none';this.nextElementSibling.style.display='flex';"
                >` : ''}
                <div style="display:${imgUrl ? 'none' : 'flex'};width:100%;height:180px;align-items:center;justify-content:center;background:linear-gradient(135deg,#0d1b2e,${categoria.color}33);">
                    <i class="fa-solid ${prod.ic}" style="font-size:4rem;color:${categoria.color};"></i>
                </div>
                <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.65) 0%,rgba(0,0,0,.1) 50%,transparent 100%);pointer-events:none;"></div>
                <div style="position:absolute;top:10px;right:10px;width:36px;height:36px;border-radius:8px;background:${categoria.color};display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,.4);">
                    <i class="fa-solid ${prod.ic}" style="color:#fff;font-size:.9rem;"></i>
                </div>
            </div>
            <div style="padding:14px 16px 16px;">
                <h4 style="margin:0 0 4px;font-size:1rem;font-weight:700;color:#0f172a;line-height:1.3;">${prod.n}</h4>
                <p style="margin:0 0 10px;font-size:.83rem;color:#64748b;line-height:1.4;">${prod.desc}</p>
                <div style="display:inline-flex;align-items:center;gap:5px;font-size:.78rem;font-weight:600;color:${categoria.color};">
                    <i class="fa-solid fa-certificate"></i> Certificado SCP
                </div>
            </div>
        </div>`;
    }).join('');

    visor.innerHTML = `
        <div style="margin-bottom:28px;" class="anim-fadeinup">
            <div style="display:flex;align-items:center;gap:14px;margin-bottom:10px;">
                <span style="width:44px;height:44px;border-radius:10px;background:${categoria.color};display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 3px 10px ${categoria.color}55;">
                    <i class="fa-solid ${categoria.icono}" style="color:#fff;font-size:1.35rem;"></i>
                </span>
                <h2 style="margin:0;font-size:clamp(1.2rem,2.5vw,1.6rem);color:#0f172a;">${categoria.cat}</h2>
            </div>
            <div style="height:3px;width:60px;border-radius:2px;background:${categoria.color};"></div>
        </div>
        <div class="tacticos-grid">
            ${productosHTML}
        </div>
        <div style="margin-top:60px;">
            ${obtenerHtmlForm('Cotización: ' + categoria.cat)}
        </div>`;

    // Animar con CSS
    requestAnimationFrame(() => {
        visor.querySelectorAll('.tactico-card').forEach((el, i) => {
            el.style.cssText = `opacity:0;transform:translateY(16px);transition:opacity .35s ${i*0.04}s ease,transform .35s ${i*0.04}s ease`;
            requestAnimationFrame(() => { el.style.opacity='1'; el.style.transform='translateY(0)'; });
        });
    });
}

// ─────────────────────────────────────────────────────
// cargarProductosDestacados
// ─────────────────────────────────────────────────────
function cargarProductosDestacados() {
    const gridDestacados = document.getElementById('grid-destacados');
    if (!gridDestacados) return;

    const productosDestacados = [
        { n: "Respirador Facial Completo G1 – Talla Mediana", desc: "Sistema de sujeción FS, MD, MD NC, 4PT C-HARN. Equivalente al MSA 10156459.", ic: "fa-mask-face", img: "img15/pr1.png", categoria: "policias" },
        { n: "Respirador Facial Completo G1 – Talla Grande",  desc: "Sistema de sujeción FS, MD, MD NC, 4PT C-HARN. Equivalente al MSA 10156460.", ic: "fa-mask-face", img: "img15/pr2.png", categoria: "policias" },
        { n: "Adaptador de Filtro APR G1",                    desc: "Conjunto adaptador APR para respiradores G1. Equivalente al MSA 10144231-SP.", ic: "fa-filter",    img: "img15/pr3.png", categoria: "policias" },
        { n: "Filtros GME-P100",                              desc: "Filtros GME-P100. Paquete con 2 unidades.",                                       ic: "fa-filter",    img: "img15/pr4.png", categoria: "drogas" },
        { n: "Máscara Antigás Ultra-Twin – Talla Grande",     desc: "Máscara facial completa con correas y hebillas. Equivalente al MSA 480267.",    ic: "fa-mask-ventilator", img: "img15/pr5.png", categoria: "forenses" },
        { n: "Máscara Antigás Ultra-Twin – Talla Pequeña",    desc: "Máscara facial completa con correas y hebillas. Equivalente al MSA 480263.",    ic: "fa-mask-ventilator", img: "img15/pr6.png", categoria: "forenses" },
        { n: "Filtros Multigas / P100",                       desc: "Protección contra vapores orgánicos, cloro, SO₂, amoníaco, formaldehído. Caja con 6.", ic: "fa-biohazard", img: "img15/pr7.png", categoria: "drogas" },
        { n: "Guantes Industriales de Nitrilo – Talla M",     desc: "Color negro, sin polvo. Caja con 100 guantes.",                                  ic: "fa-hand",      img: "img15/pr8.png", categoria: "forenses" },
        { n: "Guantes Industriales de Nitrilo – Talla L",     desc: "Color negro, sin polvo. Caja con 100 guantes.",                                  ic: "fa-hand",      img: "img15/pr9.png", categoria: "forenses" },
        { n: "Botas Resistentes a Químicos – Grande",         desc: "Protección especializada contra agentes químicos.",                               ic: "fa-shoe-prints", img: "img15/pr10.png", categoria: "bomberos" },
        { n: "Botas Resistentes a Químicos – Extra Grande",   desc: "Protección avanzada contra sustancias corrosivas.",                              ic: "fa-shoe-prints", img: "img15/pr11.png", categoria: "bomberos" },
        { n: "Generador de Humo Irritante",                   desc: "Caja con 6 piezas. Para pruebas de ajuste de mascarillas.",                      ic: "fa-smog",      img: "img15/pr12.png", categoria: "policias" },
        { n: "Trajes de Entrenamiento Kappler Zytron 100XP",  desc: "Caja con 6 piezas. Tallas 2X / 3X.",                                            ic: "fa-user-shield", img: "img15/pr13.png", categoria: "bomberos" },
        { n: "Papel de Prueba pH Hydrion Jumbo",              desc: "Rango 0–13 pH, 1/2\" x 50'. Caja con 10 rollos.",                               ic: "fa-vial",      img: "img15/pr14.png", categoria: "forenses" },
        { n: "Tiras de Prueba para Fentanilo",                desc: "Detección rápida y confiable de fentanilo.",                                     ic: "fa-flask-vial", img: "img15/pr15.png", categoria: "drogas" }
    ];

    const coloresPorCategoria = {
        policias: '#1e40af', bomberos: '#dc2626',
        ambulancia: '#16a34a', forenses: '#8b5cf6', drogas: '#ea580c'
    };

    const productosHTML = productosDestacados.map((prod) => {
        const colorFondo = coloresPorCategoria[prod.categoria] || '#0099cc';
        return `
        <div class="tactico-card">
            <div style="position:relative;overflow:hidden;min-height:180px;background:#0d1b2e;">
                <img
                    src="${prod.img}"
                    alt="${prod.n}"
                    style="width:100%;height:180px;object-fit:cover;display:block;transition:transform .4s ease;"
                    onerror="this.style.display='none';this.nextElementSibling.style.display='flex';"
                >
                <div style="display:none;width:100%;height:180px;align-items:center;justify-content:center;background:linear-gradient(135deg,#0d1b2e,${colorFondo}33);">
                    <i class="fa-solid ${prod.ic}" style="font-size:4rem;color:${colorFondo};"></i>
                </div>
                <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.65) 0%,rgba(0,0,0,.1) 50%,transparent 100%);pointer-events:none;"></div>
                <div style="position:absolute;top:10px;right:10px;width:36px;height:36px;border-radius:8px;background:${colorFondo};display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,.4);">
                    <i class="fa-solid ${prod.ic}" style="color:#fff;font-size:.9rem;"></i>
                </div>
                <div style="position:absolute;bottom:10px;left:10px;padding:4px 12px;border-radius:6px;background:rgba(0,212,255,0.95);display:flex;align-items:center;gap:6px;font-size:.7rem;font-weight:700;color:#0d1b2e;box-shadow:0 2px 8px rgba(0,212,255,0.3);">
                    <i class="fa-solid fa-check"></i> EN STOCK
                </div>
            </div>
            <div style="padding:14px 16px 16px;">
                <h4 style="margin:0 0 4px;font-size:1rem;font-weight:700;color:#0f172a;line-height:1.3;">${prod.n}</h4>
                <p style="margin:0 0 10px;font-size:.83rem;color:#64748b;line-height:1.4;">${prod.desc}</p>
                <div style="display:inline-flex;align-items:center;gap:5px;font-size:.78rem;font-weight:600;color:${colorFondo};">
                    <i class="fa-solid fa-certificate"></i> Certificado SCP
                </div>
            </div>
        </div>`;
    }).join('');

    gridDestacados.innerHTML = productosHTML;
    // Animar con CSS en lugar de GSAP
    requestAnimationFrame(() => {
        gridDestacados.querySelectorAll('.tactico-card').forEach((el, i) => {
            el.style.cssText = `opacity:0;transform:translateY(18px);transition:opacity .4s ${i*0.04}s ease,transform .4s ${i*0.04}s ease`;
            requestAnimationFrame(() => { el.style.opacity='1'; el.style.transform='translateY(0)'; });
        });
    });
}

// =====================================================
// 15. EMAILJS
// =====================================================
function inicializarEmailJS() {
    if (typeof emailjs === 'undefined') return;
    emailjs.init("O9mrwtxHVDFOOT8vI");
    document.body.addEventListener('submit', function (e) {
        if (e.target && e.target.id === 'contact-form') {
            e.preventDefault();
            const btn = e.target.querySelector('.btn-submit');
            const orig = btn.innerText;
            btn.innerText = 'Enviando...';
            btn.disabled = true;
            emailjs.sendForm('service_sojajgr', 'template_ewwat6h', e.target, 'O9mrwtxHVDFOOT8vI')
                .then(() => {
                    if (typeof Swal !== 'undefined') {
                        Swal.fire({ title: '¡Solicitud Enviada!', text: 'Nos pondremos en contacto pronto.', icon: 'success', confirmButtonColor: '#0056b3' });
                    }
                    btn.innerText = '¡Enviado!';
                    e.target.reset();
                    setTimeout(() => { btn.disabled = false; btn.innerText = orig; volverInicio(); }, 2500);
                })
                .catch(err => {
                    btn.disabled = false; btn.innerText = orig;
                    if (typeof Swal !== 'undefined') {
                        Swal.fire({ title: 'Error', text: 'Hubo un fallo al enviar.', icon: 'error' });
                    }
                    console.error('EmailJS error:', err);
                });
        }
    });
}

// =====================================================
// 16. CARGA INICIAL
// =====================================================
window.addEventListener('load', () => {
    const formInicio = document.getElementById('contenedor-formulario-inicio');
    if (formInicio) formInicio.innerHTML = obtenerHtmlForm();
    initStatsAnimation();
    inicializarEmailJS();
});

window.addEventListener('scroll', () => {
    const header = document.getElementById('main-header');
    if (header) header.classList.toggle('scrolled', window.scrollY > 50);
});