// =====================================================
// 1. LENIS - SCROLL SUAVE
// =====================================================
const lenis = new Lenis({
    lerp: 0.1,
    wheelMultiplier: 1,
    gestureOrientation: 'vertical',
    normalizeWheel: true,
    smoothWheel: true
});
function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);

// =====================================================
// 2. IMÁGENES INDIVIDUALES POR PRODUCTO (Unsplash)
//    Cada producto tiene su propia imagen específica.
// =====================================================
const imagenesProductos = {
  policias: [
    // [0] Máscaras / Respiradores — IMÁGENES LOCALES
    [
      'img/Pro/imgpoli/PR/respiratoria_1.jpeg',
      'img/Pro/imgpoli/PR/respiratoria_2.jpeg',
      'img/Pro/imgpoli/PR/respiratoria_3.png',
      'img/Pro/imgpoli/PR/respiratoria_4.png',
      'img/Pro/imgpoli/PR/respiratoria_5.png',
      'img/Pro/imgpoli/PR/respiratoria_6.png',
    ],

    // [1] Guantes tácticos — IMÁGENES LOCALES
    [
      'img/Pro/imgpoli/GT/guantes_1.png',
      'img/Pro/imgpoli/GT/guantes_2.png',
      'img/Pro/imgpoli/GT/guantes_3.png',
      'img/Pro/imgpoli/GT/guantes_4.png',
      'img/Pro/imgpoli/GT/guantes_5.png',
      'img/Pro/imgpoli/GT/guantes_6.png',
    ],

    // [2] Gafas / Protección ocular — IMÁGENES LOCALES
    [
      'img/Pro/imgpoli/PO/ocular_1.png.png',
      'img/Pro/imgpoli/PO/ocular_2.png.png',
      'img/Pro/imgpoli/PO/ocular_3.png.png',
      'img/Pro/imgpoli/PO/ocular_4.png.png',
      'img/Pro/imgpoli/PO/ocular_5.png.png',
      'img/Pro/imgpoli/PO/ocular_6.png.png',
    ],

    // [3] Calzado operativo — IMÁGENES LOCALES
    [
      'img/Pro/imgpoli/CO/calzado_1.png.png',
      'img/Pro/imgpoli/CO/calzado_2.png.png',
      'img/Pro/imgpoli/CO/calzado_3.png.png',
      'img/Pro/imgpoli/CO/calzado_4.png.png',
      'img/Pro/imgpoli/CO/calzado_5.png.png',
      'img/Pro/imgpoli/CO/calzado_6.png.png',
    ],
    // [4] Cascos — IMÁGENES LOCALES
    [
      'img/Pro/imgpoli/cascos/cascos_1.png',
      'img/Pro/imgpoli/cascos/cascos_2.png',
      'img/Pro/imgpoli/cascos/cascos_3.png',
      'img/Pro/imgpoli/cascos/cascos_4.png',
      'img/Pro/imgpoli/cascos/cascos_5.png',
      'img/Pro/imgpoli/cascos/cascos_6.png',
    ],

    // [5] Chalcos / Chalecos táticos — IMÁGENES LOCALES
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
   // [0] Monitorio clínico — IMÁGENES LOCALES
    [
      'img/Pro/img ambulancias/monitorio clinico/monitoreo_1.png',
      'img/Pro/img ambulancias/monitorio clinico/monitoreo_2.png',
      'img/Pro/img ambulancias/monitorio clinico/monitoreo_3.png',
      'img/Pro/img ambulancias/monitorio clinico/monitoreo_4.png',
      'img/Pro/img ambulancias/monitorio clinico/monitoreo_5.png',
      'img/Pro/img ambulancias/monitorio clinico/monitoreo_6.png'
    ],

    // [1] Respiración asistida — IMÁGENES LOCALES
    [
      'img/Pro/img ambulancias/respiracion asistida/respiracion_1.png',
      'img/Pro/img ambulancias/respiracion asistida/respiracion_2.png',
      'img/Pro/img ambulancias/respiracion asistida/respiracion_3.png',
      'img/Pro/img ambulancias/respiracion asistida/respiracion_4.png',
      'img/Pro/img ambulancias/respiracion asistida/respiracion_5.png',
      'img/Pro/img ambulancias/respiracion asistida/respiracion_6.png'
    ],

    // [2] Manejo de trauma — IMÁGENES LOCALES
    [
      'img/Pro/img ambulancias/manejo de trauma/manejo_1.png',
      'img/Pro/img ambulancias/manejo de trauma/manejo_2.png',
      'img/Pro/img ambulancias/manejo de trauma/manejo_3.png',
      'img/Pro/img ambulancias/manejo de trauma/manejo_4.png',
      'img/Pro/img ambulancias/manejo de trauma/manejo_5.png',
      'img/Pro/img ambulancias/manejo de trauma/manejo_6.png'
    ],

    // [3] Inmovilización — IMÁGENES LOCALES
    [
      'img/Pro/img ambulancias/inmovilizacion/inmovilizacion_1.png',
      'img/Pro/img ambulancias/inmovilizacion/inmovilizacion_2.png',
      'img/Pro/img ambulancias/inmovilizacion/inmovilizacion_3.png',
      'img/Pro/img ambulancias/inmovilizacion/inmovilizacion_4.png',
      'img/Pro/img ambulancias/inmovilizacion/inmovilizacion_5.png',
      'img/Pro/img ambulancias/inmovilizacion/inmovilizacion_6.png'
    ],

    // [4] Iluminación médica — IMÁGENES LOCALES
    [
      'img/Pro/img ambulancias/iluminacion medica/iluminacion_1.png',
      'img/Pro/img ambulancias/iluminacion medica/iluminacion_2.png',
      'img/Pro/img ambulancias/iluminacion medica/iluminacion_3.png',
      'img/Pro/img ambulancias/iluminacion medica/iluminacion_4.png',
      'img/Pro/img ambulancias/iluminacion medica/iluminacion_5.png',
      'img/Pro/img ambulancias/iluminacion medica/iluminacion_6.png'
    ]
  ],

  bomberos: [
    [
      'https://upload.wikimedia.org/wikipedia/commons/4/4e/Proximity_fire_suit.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/2/2f/Firefighter_turnout_gear.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/9/9a/CBRN_suit.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/6/6f/Fire_resistant_gloves.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/1/1c/Fire_resistant_hood.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/0/0c/Underground_rescue_suit.jpg'
    ],
    [
      'https://upload.wikimedia.org/wikipedia/commons/8/8c/Hydraulic_rescue_tool.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/1/1d/Hydraulic_spreader.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/5/5a/Rescue_ram.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/3/3f/Rescue_saw.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/0/0f/Rescue_shears.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/4/4b/Hydraulic_ram.jpg'
    ],
    [
      'https://upload.wikimedia.org/wikipedia/commons/3/3d/Fire_extinguisher_water.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/1/1b/CO2_fire_extinguisher.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/0/0a/Dry_powder_extinguisher.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/2/2b/Foam_fire_extinguisher.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/9/9f/Water_mist_extinguisher.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/6/6e/Foam_nozzle.jpg'
    ]
  ],

  forenses: [
    [
      'https://upload.wikimedia.org/wikipedia/commons/4/4c/DNA_swab_kit.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/7/7c/Blood_collection_kit.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/2/2e/Biopsy_kit.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/8/8b/DNA_collection_case.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/3/3c/Saliva_collection_kit.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/1/1f/Chain_of_custody_box.jpg'
    ],
    [
      'https://upload.wikimedia.org/wikipedia/commons/6/6a/ALS_forensic_light.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/5/5d/UV_flashlight.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/2/2d/Multispectral_light.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/0/0e/Forensic_flashlight.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/7/7a/Forensic_filter_glasses.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/9/9c/UV_panel.jpg'
    ]
  ],

  drogas: [
    [
      'https://upload.wikimedia.org/wikipedia/commons/1/1b/Drug_test_kit.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/3/3d/Amphetamine_test_kit.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/8/8a/Cannabis_test_kit.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/6/6d/Opiate_test_kit.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/5/5e/Multi_drug_test_kit.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/2/2c/Fentanyl_test_strip.jpg'
    ],
    [
      'https://upload.wikimedia.org/wikipedia/commons/0/0b/Raman_spectrometer.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/4/4f/FTIR_spectrometer.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/9/9a/Ion_mobility_spectrometer.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/3/3e/GC-MS_instrument.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/1/1e/XRF_analyzer.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/7/7d/Electrochemical_sensor.jpg'
    ]
  ]
};


// =====================================================
// 3. CATÁLOGO ESTRUCTURADO
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
                { n: "Sierra Disco H4",               ic: "fa-circle-notch",        desc: "Disco diamante, 5000 rpm" },
                { n: "Tijera Multifunción H5",        ic: "fa-scissors",            desc: "Cinturón+vidrio+panel" },
                { n: "Ariete Hidráulico H6",          ic: "fa-hammer",              desc: "Fuerza 80kN puertas" }
            ]
        },
        {
            cat: "Extinción Portátil", icono: "fa-fire-extinguisher", color: "#9a3412",
            items: [
                { n: "Extintor Agua 9L E1",           ic: "fa-fire-extinguisher",   desc: "Clase A, rociador cónico" },
                { n: "Extintor CO2 5kg E2",           ic: "fa-fire-extinguisher",   desc: "Clase B y equipos eléctricos" },
                { n: "Extintor Polvo 12kg E3",        ic: "fa-fire-extinguisher",   desc: "ABC, polvo seco polivalente" },
                { n: "Extintor Espuma E4",            ic: "fa-fire-extinguisher",   desc: "AFFF, clase A y B" },
                { n: "Extintor Agua Nebulizada E5",   ic: "fa-droplets",            desc: "Alta eficacia, mínimo daño" },
                { n: "Lanza Espuma E6",               ic: "fa-spray-can-sparkles",  desc: "Inductora proporcional 3-6%" }
            ]
        },
        {
            cat: "Rescate en Altura", icono: "fa-mountain", color: "#7c2d12",
            items: [
                { n: "Cuerda Dinámica R1",            ic: "fa-circle-nodes",        desc: "10.5mm, UIAA certificado" },
                { n: "Arnés Rescate R2",              ic: "fa-person-walking",      desc: "4 puntos anclaje, EN361" },
                { n: "Descensor Petzl R3",            ic: "fa-arrow-down",          desc: "ID, freno automático" },
                { n: "Kit Polipasto R4",              ic: "fa-arrows-up-down",      desc: "3:1 / 6:1, carga 300kg" },
                { n: "Trípode de Rescate R5",         ic: "fa-mountain",            desc: "Aluminio, carga 300kg, 2.7m" },
                { n: "Bolsa Lanzamiento R6",          ic: "fa-bag-shopping",        desc: "40m cuerda flotante" }
            ]
        },
        {
            cat: "Iluminación ATEX", icono: "fa-lightbulb", color: "#b45309",
            items: [
                { n: "Linterna ATEX Zona 0 L1",       ic: "fa-lightbulb",           desc: "300 lm, EX-e IIB T4" },
                { n: "Foco LED Portátil L2",          ic: "fa-sun",                 desc: "10W, 1200 lm, zona 1" },
                { n: "Luz de Área L3",                ic: "fa-circle",              desc: "360° difuso, 5000 lm" },
                { n: "Casco con Linterna L4",         ic: "fa-helmet-safety",       desc: "250 lm, IPX6, Ex ia" },
                { n: "Torre de Iluminación L5",       ic: "fa-tower-broadcast",     desc: "4×250W LED, elevable 8m" },
                { n: "Bastón Luminoso L6",            ic: "fa-wand-magic-sparkles", desc: "Señalización emergencia" }
            ]
        },
        {
            cat: "Suministro de Aire", icono: "fa-lungs", color: "#92400e",
            items: [
                { n: "SCBA 30 min A1",                ic: "fa-lungs",               desc: "300 bar, máscara panorámica" },
                { n: "SCBA 45 min A2",                ic: "fa-lungs",               desc: "Alarma vibratoria, HUD" },
                { n: "SCBA 60 min A3",                ic: "fa-lungs",               desc: "Telemetría inalámbrica" },
                { n: "Equipo Evasión A4",             ic: "fa-person-running",      desc: "15 min, EEBA compacto" },
                { n: "Compresor de Relleno A5",       ic: "fa-gauge",               desc: "300 bar, 100 L/min" },
                { n: "Botella Backup A6",             ic: "fa-gas-pump",            desc: "Composite 6.8L/300 bar" }
            ]
        }
    ],
    'forenses': [
        {
            cat: "Muestreo de ADN", icono: "fa-dna", color: "#7c3aed",
            items: [
                { n: "Kit Hisopo ADN F1",             ic: "fa-dna",                 desc: "Hisopo + tubo estéril" },
                { n: "Kit Sangre F2",                 ic: "fa-droplet",             desc: "Tarjeta FTA + pinzas" },
                { n: "Kit Biopsia F3",                ic: "fa-syringe",             desc: "Punch 3mm + tubo criovial" },
                { n: "Maletín ADN Completo F4",       ic: "fa-briefcase",           desc: "30 muestras, precintado" },
                { n: "Kit Saliva F5",                 ic: "fa-circle-dot",          desc: "Enjuague bucal estéril" },
                { n: "Caja Cadena Custodia F6",       ic: "fa-lock",                desc: "Código QR + RFID sellado" }
            ]
        },
        {
            cat: "Luces Forenses", icono: "fa-circle-radiation", color: "#6d28d9",
            items: [
                { n: "Luz ALS 450nm L1",              ic: "fa-circle-radiation",    desc: "Revelado fluidos, fibras" },
                { n: "UV 365nm Portátil L2",          ic: "fa-sun",                 desc: "9 LED, batería 6h" },
                { n: "Luz Multiespectral L3",         ic: "fa-circle-radiation",    desc: "395-650nm, 5 longitudes" },
                { n: "Linterna Criminalística L4",    ic: "fa-lightbulb",           desc: "Modo blanco + forense" },
                { n: "Gafas Filtro Forense L5",       ic: "fa-glasses",             desc: "OG-500, naranja transmisión" },
                { n: "Panel UV Grande L6",            ic: "fa-expand",              desc: "30×20cm, 315nm" }
            ]
        },
        {
            cat: "Huellas y Rastros", icono: "fa-fingerprint", color: "#5b21b6",
            items: [
                { n: "Polvo Negro Magnético H1",      ic: "fa-fingerprint",         desc: "Para superficies lisas" },
                { n: "Polvo Fluorescente H2",         ic: "fa-fingerprint",         desc: "Rojo/verde, UV reactivo" },
                { n: "Revelador Forense H3",          ic: "fa-flask",               desc: "Ninhydrina spray 400mL" },
                { n: "Kit Levantamiento H4",          ic: "fa-fingerprint",         desc: "Gelatina + acetato + película" },
                { n: "Cianoacrilato Cámara H5",       ic: "fa-box",                 desc: "Fuming chamber portátil" },
                { n: "Scanner 3D Huellas H6",         ic: "fa-cube",                desc: "Resolución 1000 ppp, USB" }
            ]
        },
        {
            cat: "Protección Biológica", icono: "fa-biohazard", color: "#4c1d95",
            items: [
                { n: "Traje Tyvek Pro B1",            ic: "fa-biohazard",           desc: "Clase 5-6, costuras selladas" },
                { n: "Traje Nivel A B2",              ic: "fa-biohazard",           desc: "Gas-tight, SCBA interno" },
                { n: "Guante Viton B3",               ic: "fa-hand-back-fist",      desc: "Resistencia química alta" },
                { n: "Bota PVC Química B4",           ic: "fa-shoe-prints",         desc: "Resistente ácidos/bases" },
                { n: "Gafas Hermética B5",            ic: "fa-glasses",             desc: "Sin ventilación, ANSI Z87" },
                { n: "Kit Ducha Descontam. B6",       ic: "fa-shower",              desc: "Portátil, 70L capacidad" }
            ]
        },
        {
            cat: "Marcaje de Escena", icono: "fa-location-dot", color: "#3730a3",
            items: [
                { n: "Indicadores Plásticos M1",      ic: "fa-location-dot",        desc: "Numerados 1-100, amarillo" },
                { n: "Cinta Perimetral M2",           ic: "fa-tape",                desc: "500m, 'ESCENA DEL CRIMEN'" },
                { n: "Escala Forense M3",             ic: "fa-ruler",               desc: "15cm, L-frame, bicolor" },
                { n: "Regla Fotográfica M4",          ic: "fa-ruler-horizontal",    desc: "30cm, cuadrícula mm" },
                { n: "Flecha Dirección M5",           ic: "fa-arrow-right",         desc: "Fluorescente, reutilizable" },
                { n: "Estaca GPS M6",                 ic: "fa-map-pin",             desc: "GNSS precisa ±2cm" }
            ]
        },
        {
            cat: "Documentación 3D", icono: "fa-cube", color: "#1e1b4b",
            items: [
                { n: "Escáner Laser 3D D1",           ic: "fa-cube",                desc: "Precisión 3mm a 100m" },
                { n: "Cámara Fotogramétrica D2",      ic: "fa-camera",              desc: "42MP + GPS, nube puntos" },
                { n: "Drone Topográfico D3",          ic: "fa-helicopter",          desc: "RTK centimétrico, 4K" },
                { n: "Software Reconstrucción D4",    ic: "fa-desktop",             desc: "Licencia post-proceso" },
                { n: "Escáner Handheld D5",           ic: "fa-hand",                desc: "Indoor, 1mm precisión" },
                { n: "Miras Dianas D6",               ic: "fa-crosshairs",          desc: "Targets planos + esféricos" }
            ]
        }
    ],
    'drogas': [
        {
            cat: "Narcotest Campo", icono: "fa-flask", color: "#059669",
            items: [
                { n: "Narcotest Cocaína N1",          ic: "fa-flask",               desc: "Scott Modified, azul positivo" },
                { n: "Narcotest Anfetaminas N2",      ic: "fa-flask",               desc: "Marquis + Simon bifásico" },
                { n: "Narcotest Cannabis N3",         ic: "fa-flask",               desc: "Duquénois-Levine" },
                { n: "Narcotest Opiáceos N4",         ic: "fa-flask",               desc: "Mandelin, naranja positivo" },
                { n: "Kit Multi-droga 10 N5",         ic: "fa-boxes-stacked",       desc: "10 reactivos en maletín" },
                { n: "Narcotest Fentanilo N6",        ic: "fa-triangle-exclamation",desc: "Lateral flow, 1min resultado" }
            ]
        },
        {
            cat: "Análisis Químico", icono: "fa-atom", color: "#047857",
            items: [
                { n: "Espectrómetro Raman A1",        ic: "fa-atom",                desc: "785nm, 1cm⁻¹ resolución" },
                { n: "Analizador FTIR A2",            ic: "fa-wave-square",         desc: "ATR portátil, base datos 10k" },
                { n: "Detector IMS A3",               ic: "fa-magnifying-glass",    desc: "Espectrometría movilidad ions" },
                { n: "Cromatógrafo GC-MS A4",         ic: "fa-chart-line",          desc: "Portátil, biblioteca NIST" },
                { n: "Analizador XRF A5",             ic: "fa-radiation",           desc: "Fluorescencia RX, trazas" },
                { n: "Sensor Electroquímico A6",      ic: "fa-bolt",                desc: "Array sensores, IA onboard" }
            ]
        },
        {
            cat: "Pesaje Precisión", icono: "fa-scale-balanced", color: "#065f46",
            items: [
                { n: "Balanza 0.001g P1",             ic: "fa-scale-balanced",      desc: "500g/0.001g, calibración auto" },
                { n: "Báscula Forense P2",            ic: "fa-scale-balanced",      desc: "1000g/0.01g, viento anti" },
                { n: "Balanza Portátil P3",           ic: "fa-scale-balanced",      desc: "200g/0.01g, batería 20h" },
                { n: "Báscula Carga P4",              ic: "fa-weight-hanging",      desc: "60kg/1g, plataforma IP67" },
                { n: "Balanza Joyería P5",            ic: "fa-gem",                 desc: "50g/0.001g, anti-estática" },
                { n: "Kit Calibración P6",            ic: "fa-tools",               desc: "Pesas OIML clase F1/F2" }
            ]
        },
        {
            cat: "Contención Segura", icono: "fa-box-archive", color: "#064e3b",
            items: [
                { n: "Bolsa Evidencia C1",            ic: "fa-bag-shopping",        desc: "Anti-estática, autosellable" },
                { n: "Caja Transporte C2",            ic: "fa-box-archive",         desc: "PP, cierre seguridad" },
                { n: "Contenedor Biológico C3",       ic: "fa-biohazard",           desc: "UN3373, triple embalaje" },
                { n: "Frascos Evidencia C4",          ic: "fa-jar",                 desc: "Ámbar, tapa inviolable" },
                { n: "Maletín Acero Inox. C5",        ic: "fa-briefcase",           desc: "Cierre biométrico, IP65" },
                { n: "Etiquetas Cadena C6",           ic: "fa-tag",                 desc: "Tamper-evident, QR integrado" }
            ]
        },
        {
            cat: "Detección Vapores", icono: "fa-wind", color: "#134e4a",
            items: [
                { n: "Detector PID V1",               ic: "fa-wind",                desc: "0.01-10.000 ppm COV" },
                { n: "Detector MultiGas V2",          ic: "fa-gauge",               desc: "O2,CO,H2S,LEL simultáneo" },
                { n: "Nariz Electrónica V3",          ic: "fa-circle-nodes",        desc: "Array 32 sensores, IA" },
                { n: "Unidad K9 Homologada V4",       ic: "fa-paw",                 desc: "Detección canina certificada" },
                { n: "Detector Walkaround V5",        ic: "fa-person-walking",      desc: "Modo barrido continuo" },
                { n: "Portal de Detección V6",        ic: "fa-door-open",           desc: "Detecta 200+ sustancias" }
            ]
        },
        {
            cat: "Protección Respiratoria", icono: "fa-head-side-mask", color: "#0f766e",
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
// 4. BASE DE DATOS VISTAS ESTÁNDAR
// =====================================================
const datosVistas = {
    'scp': {
        banner: "img/IMAGENES/Sistema de Control Policial/scp Bk.webp",
        circulo: "img/IMAGENES/Sistema de Control Policial/Scp imag 1.png",
        titulo: "Sistema de Control Policial (SCP)",
        subtitulo: "La Plataforma SCP",
        descripcion: "Gestión operativa integral y seguimiento en tiempo real para fuerzas de seguridad.",
        detalle1: "Plataforma integral diseñada para modernizar la seguridad pública mediante la interconexión en tiempo real entre ciudadanos, policías y centros de mando. El sistema permite gestionar alertas de emergencia, coordinar patrullajes inteligentes y recopilar inteligencia de datos para prevenir el delito. Al digitalizar cada interacción, desde una solicitud de auxilio médico hasta un reporte de corrupción, el SCP transforma la seguridad en un servicio ágil, transparente y basado en resultados medibles que fortalecen la paz social.",
        ventajas: [
            { icono: "img/IMAGENES/Sistema de Control Policial/Iconos VE 1.png", titulo: "Recuperación de la confianza ciudadana y combate a la corrupción", texto: "Al contar con un botón de denuncia directa y registro digital de cada actuación policial, se eliminan las malas prácticas y se garantiza a los ciudadanos que su voz es escuchada y atendida con transparencia." },
            { icono: "img/IMAGENES/Sistema de Control Policial/Iconos VE 2.png", titulo: "Reducción en tiempos de respuesta ante emergencias", texto: "La conexión directa entre la aplicación ciudadana y el oficial más cercano permite que la ayuda llegue en minutos, salvando vidas y aumentando la percepción de seguridad en las calles." },
            { icono: "img/IMAGENES/Sistema de Control Policial/Iconos VE 3.png", titulo: "Protección y respaldo total a los elementos policiales", texto: "El sistema cuida a quienes nos cuidan; mediante el botón de apoyo y el rastreo GPS, los oficiales nunca están solos, facilitando refuerzos inmediatos y generando evidencias digitales." },
            { icono: "img/IMAGENES/Sistema de Control Policial/Iconos VE 4.png", titulo: "Prevención del delito basada en datos exactos", texto: "El análisis inteligente de información permite a los gobernantes identificar zonas de riesgo y patrones delictivos reales, permitiendo diseñar políticas públicas de seguridad más efectivas." }
        ],
        franjaImagen: "img/IMAGENES/Sistema de Control Policial/SCP logo H.png",
        fraseFinal: "Con el SCP, las administraciones gubernamentales no solo vigilan, sino que gestionan la seguridad con inteligencia, devolviendo la tranquilidad a las familias y construyendo una ciudad más resiliente y conectada."
    },
    'infraccion': {
        banner: "img/IMAGENES/INFRACCION DIGITAL/apaisada_infraccion",
        circulo: "img/IMAGENES/INFRACCION DIGITAL/circular_infraccion.webp",
        titulo: "SCP Infracción Digital",
        descripcion: "Plataforma inteligente diseñada para modernizar la labor de los agentes de tránsito.",
        detalle1: "Es una plataforma inteligente diseñada para modernizar la labor de los agentes de tránsito, permitiéndoles aplicar multas de forma digital desde sus dispositivos móviles. El sistema sustituye el papel por un proceso electrónico que registra fotos, ubicación y firmas en tiempo real, conectando cada infracción directamente con el centro de control de manera inmediata y segura.",
        ventajas: [
            { icono: "fa-road",             titulo: "Calles más seguras para todos",       texto: "Al agilizar el trabajo de los agentes y detectar reincidentes al momento, se fomenta una cultura vial de respeto que protege la vida de los peatones y conductores." },
            { icono: "fa-shield-halved",    titulo: "Cero corrupción y máxima confianza",  texto: "La digitalización elimina el manejo discrecional de boletas físicas, asegurando que cada proceso sea honesto y transparente ante los ojos de la ciudadanía." },
            { icono: "fa-file-circle-check",titulo: "Justicia rápida y sin errores",       texto: "Gracias a la validación automática de datos, los ciudadanos reciben boletas precisas, evitando molestias por errores de dedo o datos equivocados del vehículo." },
            { icono: "fa-chart-line",       titulo: "Recursos mejor invertidos",           texto: "Al reducir costos operativos y mejorar la recaudación de forma ordenada, el gobierno obtiene más recursos para reinvertir en infraestructura y servicios públicos." }
        ],
        fraseFinal: "Con SCP Infracción Digital, transformamos la autoridad vial en un modelo de eficiencia y honestidad."
    },
    'investigacion': {
        banner: "img/IMAGENES/POLICIA E INVESTIGACION/apaisada_policieeinv",
        circulo: "img/IMAGENES/POLICIA E INVESTIGACION/circular_policiaeinv.webp",
        titulo: "SCP Policía de Investigación",
        descripcion: "Herramienta tecnológica avanzada para centralizar y organizar evidencias e investigaciones.",
        detalle1: "Es una herramienta tecnológica avanzada diseñada para centralizar y organizar todas las evidencias, documentos y hallazgos de una investigación en un solo lugar digital seguro. La plataforma permite que los supervisores monitoreen el avance de cada caso en tiempo real, asegurando que las diligencias se realicen conforme a la ley y con total control sobre quién accede a la información sensible.",
        ventajas: [
            { icono: "fa-scale-balanced", titulo: "Resultados reales contra la impunidad",  texto: "Al organizar mejor las pruebas y evidencias, se logran investigaciones más sólidas que terminan en sentencias justas, dando resultados visibles a la sociedad." },
            { icono: "fa-eye",            titulo: "Supervisión directa y transparencia",   texto: "Los mandos pueden verificar el progreso de cada agente en línea, garantizando que el trabajo se realice con honestidad y sin retrasos injustificados." },
            { icono: "fa-lock",           titulo: "Protección total de la información",    texto: "El control estricto de usuarios evita la filtración de datos sensibles, protegiendo tanto a las víctimas como la integridad de los procesos judiciales." },
            { icono: "fa-bolt",           titulo: "Justicia más ágil para el ciudadano",   texto: "La digitalización reduce la burocracia en el Ministerio Público, permitiendo que las víctimas reciban respuestas y atención en mucho menos tiempo." }
        ],
        fraseFinal: "Con SCP Policía de Investigación, tu gobierno fortalece el estado de derecho, transformando la investigación criminal en un proceso profesional, transparente y orientado a dar paz a las familias."
    },
    'inteligencia': {
        banner: "img/IMAGENES/PLATAFORMA DE INTELIGENCIA/apaidadainteligencia",
        circulo: "img/IMAGENES/PLATAFORMA DE INTELIGENCIA/circular_inteligencia",
        titulo: "Plataforma de Inteligencia",
        descripcion: "Centro de mando digital avanzado para procesar grandes volúmenes de información en tiempo real.",
        detalle1: "Es un centro de mando digital avanzado que permite procesar grandes volúmenes de información proveniente de redes sociales, registros telefónicos y cámaras de seguridad en tiempo real. La herramienta utiliza inteligencia artificial para identificar rostros, reconocer placas vehiculares y analizar vínculos entre personas, transformando datos aislados en conocimiento estratégico.",
        ventajas: [
            { icono: "fa-globe",           titulo: "Prevención del delito en tiempo real",      texto: "Al analizar redes sociales y fuentes abiertas, el gobierno puede anticiparse a situaciones de riesgo y actuar antes de que los problemas afecten a la comunidad." },
            { icono: "fa-car",             titulo: "Ciudades vigiladas y seguras",              texto: "El reconocimiento automático de placas y rostros permite localizar vehículos robados o personas buscadas de manera inmediata." },
            { icono: "fa-project-diagram", titulo: "Desarticulación de redes criminales",       texto: "El análisis de vínculos ayuda a entender cómo operan los grupos delictivos, permitiendo golpes precisos a la delincuencia." },
            { icono: "fa-brain",           titulo: "Tecnología al servicio del ciudadano",      texto: "El procesamiento inteligente de la información reduce los tiempos de respuesta ante emergencias." }
        ],
        fraseFinal: "Con la Plataforma de Inteligencia, tu administración se coloca a la vanguardia tecnológica, convirtiendo la información en una herramienta de protección efectiva y justicia para todas las familias."
    },
    'cautelares': {
        banner: "img/IMAGENES/MEDIDAS CAUTELARES/apaisadacautelar.webp",
        circulo: "img/IMAGENES/MEDIDAS CAUTELARES/circulacautelares",
        titulo: "SCP Medidas Cautelares y Brazaletes",
        descripcion: "Solución tecnológica para monitorear en tiempo real a personas con medidas cautelares.",
        detalle1: "Es una solución tecnológica avanzada diseñada para monitorear en tiempo real a personas que, por mandato judicial, llevan su proceso legal en libertad. A través de un brazalete electrónico de alta resistencia, las autoridades pueden rastrear la ubicación exacta del usuario, establecer zonas de movilidad permitidas y recibir alertas inmediatas ante cualquier incumplimiento.",
        ventajas: [
            { icono: "fa-shield-halved",  titulo: "Protección efectiva a las víctimas",         texto: "El sistema permite crear perímetros de seguridad que alertan si el imputado se acerca a la víctima, garantizando tranquilidad y una respuesta policial inmediata." },
            { icono: "fa-building",       titulo: "Despresurización del sistema penitenciario",  texto: "Al permitir que procesos no graves se sigan en libertad vigilada, se reducen la sobrepoblación en penales y los costos de manutención." },
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
        detalle1: "Es una plataforma tecnológica avanzada diseñada para gestionar el acceso a los centros penitenciarios de forma segura, rápida y digital. El sistema automatiza el registro de entradas y salidas, validando la identidad de cada visitante mediante documentos oficiales y fotografía en tiempo real.",
        ventajas: [
            { icono: "fa-lock",          titulo: "Penales más seguros y ordenados",              texto: "Al eliminar los registros manuales, el gobierno retoma el control total de quién entra y sale, reduciendo drásticamente el riesgo de ingresos no autorizados." },
            { icono: "fa-shield-halved", titulo: "Transparencia total frente a la corrupción",   texto: "La digitalización de cada visita impide que se otorguen accesos preferenciales o irregulares." },
            { icono: "fa-users",         titulo: "Respeto a los derechos de las familias",       texto: "Agiliza los tiempos de espera y dignifica el proceso de visita para los ciudadanos." },
            { icono: "fa-eye",           titulo: "Paz social y prevención de incidentes",        texto: "El monitoreo en tiempo real permite detectar patrones sospechosos y prevenir conflictos internos." }
        ],
        fraseFinal: "Con SCP Control de Visitas, tu administración moderniza el sistema penitenciario, sustituyendo el caos operativo por una gestión inteligente."
    },
    'lpr_sol': {
        banner: "img/IMAGENES/Plataforma de inteligencia LPR/apaisada_LPR.webp",
        circulo: "img/IMAGENES/Plataforma de inteligencia LPR/circular_lrp.webp",
        titulo: "Plataforma de Inteligencia LPR",
        descripcion: "Ecosistema tecnológico de seguridad perimetral con cámaras ANPR y antenas RFID.",
        detalle1: "Es un ecosistema tecnológico de seguridad perimetral que integra cámaras de lectura de placas (ANPR) y antenas de radiofrecuencia (RFID) para el blindaje de ciudades y carreteras. La plataforma no solo captura matrículas y chips REPUVE en milisegundos, sino que procesa esa información mediante inteligencia artificial para detectar patrones de comportamiento y emitir alertas automáticas.",
        ventajas: [
            { icono: "fa-road",           titulo: "Blindaje automático del territorio",          texto: "Al monitorear entradas y salidas del estado en tiempo real, el gobierno recupera el control de las vías de comunicación." },
            { icono: "fa-car",            titulo: "Recuperación efectiva del patrimonio",        texto: "El sistema permite interceptar vehículos robados en tiempo récord, devolviendo la tranquilidad a las familias." },
            { icono: "fa-camera",         titulo: "Justicia vial y prevención de accidentes",   texto: "A través de la tecnología de fotomultas, se fomenta una cultura de respeto a la ley." },
            { icono: "fa-network-wired",  titulo: "Inteligencia contra el crimen organizado",   texto: "La capacidad de rastrear rutas recurrentes permite desarticular bandas delictivas mediante operativos precisos." }
        ],
        fraseFinal: "Con la Plataforma de Inteligencia LPR, tu administración construye una frontera tecnológica infranqueable."
    },
    'ciberseguridad': {
        banner: "img/ser/Ciber Seguridad BG.webp",
        circulo: "img/ser/Ciber Seguridad C.webp",
        titulo: "Servicios de Ciberseguridad",
        descripcion: "Blindaje digital integral para proteger la infraestructura tecnológica y la información gubernamental.",
        detalle1: "Es un ecosistema de protección digital avanzada diseñado para blindar la infraestructura tecnológica del gobierno contra ataques cibernéticos y el robo de información. A través de evaluaciones de vulnerabilidad, pruebas de penetración y seguridad en la nube, el sistema garantiza que los datos permanezcan íntegros y privados.",
        ventajas: [
            { icono: "fa-user-shield",           titulo: "Protección de la identidad ciudadana",     texto: "Al asegurar las bases de datos gubernamentales, se evita el robo de información personal de los habitantes, previniendo fraudes." },
            { icono: "fa-server",                titulo: "Continuidad de los servicios públicos",    texto: "La seguridad en redes y nube garantiza que los trámites digitales estén disponibles las 24 horas." },
            { icono: "fa-magnifying-glass-chart",titulo: "Respuesta científica ante incidentes",     texto: "Gracias a la forensia digital, el gobierno cuenta con la capacidad de investigar cualquier evento sospechoso." },
            { icono: "fa-scale-balanced",        titulo: "Certeza jurídica y cumplimiento legal",    texto: "La asesoría en políticas de seguridad asegura que tu administración cumpla con las leyes de protección de datos." }
        ],
        fraseFinal: "Con nuestros Servicios de Ciberseguridad, tu gobierno construye una muralla digital impenetrable."
    },
    'transcripcion': {
        banner: "img/ser/Transcricion BG.webp",
        circulo: "img/ser/Transcricion C.webp",
        titulo: "SCP Transcripción",
        descripcion: "Conversión inteligente de audio y video en texto estructurado para análisis y toma de decisiones.",
        detalle1: "Es una solución de inteligencia artificial diseñada para convertir automáticamente audios y videos en texto estructurado, facilitando la búsqueda y el análisis de información clave. El sistema procesa comunicaciones de radio policial, telefonía, entrevistas de investigación y evidencias digitales.",
        ventajas: [
            { icono: "fa-gavel",          titulo: "Justicia basada en evidencias sólidas",     texto: "Al contar con transcripciones precisas de entrevistas y comunicaciones, el gobierno fortalece los expedientes judiciales." },
            { icono: "fa-tower-broadcast",titulo: "Respuesta inmediata ante emergencias",      texto: "La capacidad de analizar en tiempo real las frecuencias de radio permite detectar palabras de alerta." },
            { icono: "fa-eye",            titulo: "Transparencia en el actuar policial",       texto: "Al registrar y procesar los audios de operativos y patrullajes, se garantiza que el comportamiento de los agentes sea el adecuado." },
            { icono: "fa-clock",          titulo: "Optimización de recursos y tiempo",         texto: "Libera a los investigadores de la carga manual de transcribir horas de audio, permitiéndoles enfocarse en el análisis estratégico." }
        ],
        fraseFinal: "Con SCP Transcripción, tu administración convierte el sonido en datos procesables."
    },
    'mantenimiento': {
        banner: "img/ser/Matenimiento BG.webp",
        circulo: "img/ser/Matenimiento C.webp",
        titulo: "Mantenimiento Preventivo de PMI",
        descripcion: "Programa continuo de soporte y optimización para garantizar el funcionamiento permanente de la infraestructura tecnológica.",
        detalle1: "Es un programa integral de soporte técnico y atención continua diseñado para asegurar que la infraestructura tecnológica de seguridad funcione al 100% de su capacidad. A través de visitas programadas y correcciones inmediatas, el sistema garantiza que cámaras, arcos y centros de mando operen sin interrupciones.",
        ventajas: [
            { icono: "fa-video",           titulo: "Seguridad ciudadana sin interrupciones",  texto: "Al prevenir fallas en cámaras y sistemas de vigilancia, el gobierno garantiza que la ciudad esté protegida las 24 horas." },
            { icono: "fa-coins",           titulo: "Eficiencia en el gasto público",          texto: "El mantenimiento preventivo evita reparaciones costosas y de emergencia, permitiendo que los recursos se utilicen de manera planeada." },
            { icono: "fa-shield-check",    titulo: "Confianza total en la tecnología",        texto: "Asegura que, en el momento que se requiera una evidencia o una alerta, el sistema responda con precisión." },
            { icono: "fa-building-shield", titulo: "Protección del patrimonio institucional", texto: "Al mantener los equipos en óptimas condiciones, tu administración protege la inversión tecnológica realizada." }
        ],
        fraseFinal: "Con el Mantenimiento Preventivo de PMI, tu administración asegura que la tecnología de seguridad nunca descanse."
    },
    'tacticos_imp': {
        banner: "img/ser/Implementacion de tacticos BG.webp",
        circulo: "img/ser/Implementacion de tacticos C.webp",
        titulo: "Implementación de Tácticos",
        descripcion: "Tecnología de localización y rastreo en tiempo real para operativos de alta seguridad.",
        detalle1: "Es una solución de despliegue estratégico diseñada para la localización y rastreo de dispositivos de comunicación en tiempo real. Mediante tecnología de intercepción de señales, el sistema permite a las unidades tácticas ubicar con precisión milimétrica objetivos de interés o personas en riesgo.",
        ventajas: [
            { icono: "fa-life-ring",   titulo: "Salvamento de vidas en emergencias",     texto: "En desastres naturales o desapariciones, el gobierno cuenta con la capacidad de localizar a personas atrapadas o extraviadas." },
            { icono: "fa-crosshairs",  titulo: "Golpes precisos a la delincuencia",       texto: "Permite el rastreo de objetivos de alto perfil involucrados en actividades ilegales." },
            { icono: "fa-shield",      titulo: "Paz y orden en situaciones críticas",     texto: "En eventos de riesgo o disturbios, la tecnología táctica ayuda a identificar y neutralizar amenazas de forma quirúrgica." },
            { icono: "fa-star",        titulo: "Liderazgo en inteligencia operativa",     texto: "Proyecta un gobierno equipado con tecnología de élite, capaz de resolver situaciones complejas." }
        ],
        fraseFinal: "Con la Implementación de Tácticos, tu administración dota a las fuerzas del orden de la capacidad de ver lo invisible."
    },
    'desarrollo': {
        banner: "img/ser/Desarrollo de Sitema BG.webp",
        circulo: "img/ser/Desarrollo de Sitema C.webp",
        titulo: "Desarrollo de Sistemas",
        descripcion: "Creación de plataformas digitales personalizadas que optimizan procesos y fortalecen la gestión.",
        detalle1: "Es un servicio especializado en el diseño y creación de software a la medida, construido para resolver los retos específicos de cada institución. A través de soluciones tecnológicas personalizadas, desarrollamos plataformas escalables y de alta calidad.",
        ventajas: [
            { icono: "fa-users",       titulo: "Servicios públicos a la medida del ciudadano", texto: "Al crear sistemas específicos para las necesidades del estado, el gobierno elimina trámites innecesarios." },
            { icono: "fa-piggy-bank",  titulo: "Ahorro y optimización del presupuesto",        texto: "El software a la medida evita el pago de licencias externas costosas y herramientas que no se usan." },
            { icono: "fa-rocket",      titulo: "Un gobierno digital siempre a la vanguardia",  texto: "La escalabilidad permite que los sistemas crezcan junto con la ciudad." },
            { icono: "fa-database",    titulo: "Soberanía y control de la información",        texto: "Al desarrollar sistemas propios, tu administración mantiene el control total de sus datos." }
        ],
        fraseFinal: "Con nuestro Desarrollo de Sistemas, tu gobierno deja de adaptarse a la tecnología para que la tecnología trabaje exclusivamente para el bienestar de tu gente."
    },
    'forensia': {
        banner: "img/equi/Forencia Digital BG.webp",
        circulo: "img/equi/Forencia Digital C.webp",
        titulo: "Forensia Digital",
        descripcion: "Solución científica para extracción y análisis de evidencia digital con validez legal.",
        detalle1: "Es una solución científica avanzada diseñada para la extracción y análisis de información contenida en dispositivos electrónicos. El sistema permite recuperar de forma segura evidencias críticas como mensajes, fotos, grabaciones de audio y ubicaciones GPS.",
        ventajas: [
            { icono: "fa-scale-balanced", titulo: "Justicia implacable contra el delito",    texto: "Al convertir los datos de un celular o computadora en pruebas legales, el gobierno asegura que los culpables no queden libres." },
            { icono: "fa-clock",          titulo: "Resolución de casos en tiempo récord",    texto: "La capacidad de procesar miles de mensajes y archivos en minutos permite a las fiscalías resolver delitos de alto impacto." },
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
        detalle1: "Es la infraestructura física de alta precisión compuesta por cámaras de alta velocidad y sensores especializados para la lectura automática de placas (ANPR). Este hardware robusto está diseñado para operar en condiciones extremas.",
        ventajas: [
            { icono: "fa-car",        titulo: "Recuperación inmediata del patrimonio",  texto: "Al detectar vehículos robados en segundos, el gobierno protege los bienes de los ciudadanos." },
            { icono: "fa-road",       titulo: "Justicia vial para reducir accidentes",  texto: "La implementación de fotomultas automatizadas fomenta que los conductores respeten los límites de velocidad." },
            { icono: "fa-border-all", titulo: "Control total de las fronteras",         texto: "La instalación de estos sensores en puntos estratégicos permite saber exactamente quién entra y sale." },
            { icono: "fa-city",       titulo: "Modernización y orden público",          texto: "Sustituir los retenes manuales por tecnología de lectura automática agiliza el tránsito." }
        ],
        fraseFinal: "Con los Sistemas LPR Hardware, tu administración instala los ojos del estado en cada vía."
    },
    'areas': {
        banner: "img/equi/Plataforma AereaBG.webp",
        circulo: "img/equi/Plataforma Aerea C.webp",
        titulo: "Plataforma Aérea",
        descripcion: "Sistema aéreo de largo alcance para patrullaje, monitoreo territorial y transmisión en tiempo real.",
        detalle1: "Es una solución de vigilancia aérea avanzada que combina la versatilidad de un despegue vertical automatizado con el poder de un vuelo de larga duración. Con una autonomía de hasta 12 horas y un alcance de 180 km.",
        ventajas: [
            { icono: "fa-mountain",  titulo: "Vigilancia total de zonas de difícil acceso", texto: "Al cubrir grandes distancias, el gobierno puede monitorear sierras, fronteras y zonas rurales." },
            { icono: "fa-life-ring", titulo: "Operativos de rescate efectivos",              texto: "Su capacidad de vuelo prolongado es vital para localizar personas extraviadas o náufragos." },
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
        detalle1: "Es una solución tecnológica de alta seguridad diseñada para gestionar y supervisar el ingreso de personas y vehículos a instalaciones estratégicas. El sistema automatiza la verificación de identidad mediante documentos oficiales, fotografía y biometría en tiempo real.",
        ventajas: [
            { icono: "fa-building-shield",  titulo: "Blindaje de las instituciones públicas",  texto: "Al detectar de manera automática explosivos o sustancias prohibidas, el gobierno garantiza que los edificios sean entornos seguros." },
            { icono: "fa-id-card",          titulo: "Orden y agilidad en el servicio",         texto: "La identificación digital elimina las filas lentas en las entradas." },
            { icono: "fa-clipboard-check",  titulo: "Cero discrecionalidad",                   texto: "Al registrar digitalmente cada entrada y salida, se elimina el uso de bitácoras de papel." },
            { icono: "fa-eye",              titulo: "Prevención inteligente de incidentes",     texto: "El monitoreo continuo permite identificar personas no autorizadas o comportamientos sospechosos." }
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
            { icono: "fa-shield",       titulo: "Resiliencia en condiciones extremas", texto: "Su diseño robusto está hecho para resistir el trabajo rudo en campo, soportando agua, polvo y caídas." },
            { icono: "fa-headset",      titulo: "Seguridad y apoyo al servidor público",texto: "Al contar con sistemas de audio que eliminan el ruido ambiental y botones de auxilio directo, el agente se siente respaldado." }
        ],
        fraseFinal: "Con la evolución hacia dispositivos como el PM95, tu administración entrega a las corporaciones una herramienta de élite."
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
// 5. ESTADÍSTICAS ANIMADAS
// =====================================================
function initStatsAnimation() {
    const stats = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const targetValue = parseInt(el.getAttribute('data-target'));
                const hasPlus = el.getAttribute('data-target').includes('+') || el.innerText.includes('+');
                let countObj = { val: 0 };
                gsap.to(countObj, {
                    val: targetValue, duration: 2.5, ease: "power3.out",
                    onUpdate() { el.innerText = (hasPlus ? "+" : "") + Math.floor(countObj.val).toLocaleString('en-US'); }
                });
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.3 });
    stats.forEach(stat => observer.observe(stat));
}

// =====================================================
// 6. FORMULARIO
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
// 7. SISTEMA DE VISTAS — CERO PARPADEO
// =====================================================
let vistaActual = 'inicio';

function mostrarDetalle(contenidoHTML) {
    const inicio  = document.getElementById('vista-inicio');
    const detalle = document.getElementById('vista-detalle');
    const cont    = document.getElementById('contenido-dinamico');

    if (vistaActual === 'detalle') {
        cont.innerHTML = contenidoHTML;
        lenis.scrollTo(0, { immediate: true });
        return;
    }

    vistaActual = 'detalle';
    gsap.killTweensOf([inicio, detalle]);
    gsap.to(inicio, {
        opacity: 0, duration: 0.25, ease: "power1.out",
        onComplete() {
            inicio.style.display  = 'none';
            inicio.style.opacity  = '1';
            cont.innerHTML = contenidoHTML;
            detalle.style.display = 'block';
            detalle.style.opacity = '0';
            gsap.to(detalle, { opacity: 1, duration: 0.3, ease: "power1.in" });
            lenis.scrollTo(0, { immediate: true });
        }
    });
}
function volverInicio() {
    const inicio  = document.getElementById('vista-inicio');
    const detalle = document.getElementById('vista-detalle');
    vistaActual = 'inicio';
    gsap.killTweensOf([inicio, detalle]);
    gsap.to(detalle, {
        opacity: 0, duration: 0.25, ease: "power1.out",
        onComplete() {
            detalle.style.display = 'none';
            detalle.style.opacity = '1';
            inicio.style.display  = 'block';
            inicio.style.opacity  = '0';
            gsap.to(inicio, { opacity: 1, duration: 0.3, ease: "power1.in" });
            lenis.scrollTo(0, { immediate: true });
            initStatsAnimation();
        }
    });
}

// =====================================================
// 8. VISTAS ESTÁNDAR
// =====================================================
function cargarVista(id) {
    const inicio = document.getElementById('vista-inicio');
    const detalle = document.getElementById('vista-detalle');
    const contenedor = document.getElementById('contenido-dinamico');
    let data = datosVistas[id] || datosVistas['scp'];

    gsap.to(inicio, {
        opacity: 0, duration: 0.3,
        onComplete: () => {
            inicio.style.display = 'none';
            detalle.style.display = 'block';
            contenedor.innerHTML = `
                <section class="modulo-hero" style="background-image:url('${data.banner}')">
                    <div class="modulo-overlay"></div>
                    <div class="modulo-hero-content">
                        <h1>${data.titulo}</h1>
                        <p>${data.descripcion}</p>
                    </div>
                </section>
                <section class="scp-banner">
                    <div class="scp-contenido">
                        <div class="scp-texto">
                            <h1>${data.titulo}</h1>
                            <p>${data.detalle1}${data.detalle2 ? '<br><br>' + data.detalle2 : ''}</p>
                        </div>
                        <div class="scp-imagen">
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
            gsap.to(detalle, { opacity: 1, duration: 0.4 });
            lenis.scrollTo(0, { immediate: true });
        }
    });
}

// =====================================================
// 9. CATÁLOGO EQUIPOS DE PROTECCIÓN
// =====================================================
function cargarVistaEquiposProteccion() {
    const htmlContent = `
        <section class="perfiles-section-custom">
            <div class="perfiles-header">
                <p class="hero-sub" style="color:var(--celeste);text-align:center;font-weight:bold;">EQUIPAMIENTO PROFESIONAL</p>
                <h2 class="perfiles-titulo-main">Equipo de Protección Especializado</h2>
            </div>
            <div class="perfiles-grid-custom" style="display:flex;justify-content:center;gap:16px;flex-wrap:nowrap;padding:0 20px;margin-bottom:60px;">
                <div class="perfil-card-item" onclick="cargarMenuPerfil('policias')" style="min-width:160px;padding:24px 16px;flex:1;max-width:160px;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;border-radius:14px;background:linear-gradient(135deg,rgba(30,64,175,0.08),rgba(30,64,175,0.04));border:1.5px solid rgba(30,64,175,0.2);transition:all 0.3s ease;position:relative;overflow:hidden;">
                    <div style="position:absolute;inset:0;background:linear-gradient(135deg,rgba(30,64,175,0.1),transparent);pointer-events:none;opacity:0;transition:opacity 0.3s ease;" class="perfil-bg"></div>
                    <div class="perfil-icon-box" style="width:56px;height:56px;border-radius:12px;background:linear-gradient(135deg,#1e40af,#1e3a8a);display:flex;align-items:center;justify-content:center;margin-bottom:12px;box-shadow:0 4px 12px rgba(30,64,175,0.3);font-size:1.8rem;color:#fff;transition:all 0.3s ease;position:relative;z-index:1;"><i class="fa-solid fa-user-shield"></i></div>
                    <h3 style="margin:0;font-size:0.95rem;font-weight:700;color:#0f172a;text-align:center;position:relative;z-index:1;line-height:1.3;">POLICÍAS</h3>
                </div>
                <div class="perfil-card-item" onclick="cargarMenuPerfil('ambulancia')" style="min-width:160px;padding:24px 16px;flex:1;max-width:160px;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;border-radius:14px;background:linear-gradient(135deg,rgba(22,163,74,0.08),rgba(22,163,74,0.04));border:1.5px solid rgba(22,163,74,0.2);transition:all 0.3s ease;position:relative;overflow:hidden;">
                    <div style="position:absolute;inset:0;background:linear-gradient(135deg,rgba(22,163,74,0.1),transparent);pointer-events:none;opacity:0;transition:opacity 0.3s ease;" class="perfil-bg"></div>
                    <div class="perfil-icon-box" style="width:56px;height:56px;border-radius:12px;background:linear-gradient(135deg,#16a34a,#15803d);display:flex;align-items:center;justify-content:center;margin-bottom:12px;box-shadow:0 4px 12px rgba(22,163,74,0.3);font-size:1.8rem;color:#fff;transition:all 0.3s ease;position:relative;z-index:1;"><i class="fa-solid fa-ambulance"></i></div>
                    <h3 style="margin:0;font-size:0.95rem;font-weight:700;color:#0f172a;text-align:center;position:relative;z-index:1;line-height:1.3;">AMBULANCIA</h3>
                </div>
                <div class="perfil-card-item" onclick="cargarMenuPerfil('bomberos')" style="min-width:160px;padding:24px 16px;flex:1;max-width:160px;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;border-radius:14px;background:linear-gradient(135deg,rgba(220,38,38,0.08),rgba(220,38,38,0.04));border:1.5px solid rgba(220,38,38,0.2);transition:all 0.3s ease;position:relative;overflow:hidden;">
                    <div style="position:absolute;inset:0;background:linear-gradient(135deg,rgba(220,38,38,0.1),transparent);pointer-events:none;opacity:0;transition:opacity 0.3s ease;" class="perfil-bg"></div>
                    <div class="perfil-icon-box" style="width:56px;height:56px;border-radius:12px;background:linear-gradient(135deg,#dc2626,#b91c1c);display:flex;align-items:center;justify-content:center;margin-bottom:12px;box-shadow:0 4px 12px rgba(220,38,38,0.3);font-size:1.8rem;color:#fff;transition:all 0.3s ease;position:relative;z-index:1;"><i class="fa-solid fa-fire-extinguisher"></i></div>
                    <h3 style="margin:0;font-size:0.95rem;font-weight:700;color:#0f172a;text-align:center;position:relative;z-index:1;line-height:1.3;">BOMBEROS</h3>
                </div>
                <div class="perfil-card-item" onclick="cargarMenuPerfil('forenses')" style="min-width:160px;padding:24px 16px;flex:1;max-width:160px;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;border-radius:14px;background:linear-gradient(135deg,rgba(139,92,246,0.08),rgba(139,92,246,0.04));border:1.5px solid rgba(139,92,246,0.2);transition:all 0.3s ease;position:relative;overflow:hidden;">
                    <div style="position:absolute;inset:0;background:linear-gradient(135deg,rgba(139,92,246,0.1),transparent);pointer-events:none;opacity:0;transition:opacity 0.3s ease;" class="perfil-bg"></div>
                    <div class="perfil-icon-box" style="width:56px;height:56px;border-radius:12px;background:linear-gradient(135deg,#8b5cf6,#7c3aed);display:flex;align-items:center;justify-content:center;margin-bottom:12px;box-shadow:0 4px 12px rgba(139,92,246,0.3);font-size:1.8rem;color:#fff;transition:all 0.3s ease;position:relative;z-index:1;"><i class="fa-solid fa-microscope"></i></div>
                    <h3 style="margin:0;font-size:0.95rem;font-weight:700;color:#0f172a;text-align:center;position:relative;z-index:1;line-height:1.3;">FORENSES</h3>
                </div>
                <div class="perfil-card-item" onclick="cargarMenuPerfil('drogas')" style="min-width:160px;padding:24px 16px;flex:1;max-width:160px;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;border-radius:14px;background:linear-gradient(135deg,rgba(234,88,12,0.08),rgba(234,88,12,0.04));border:1.5px solid rgba(234,88,12,0.2);transition:all 0.3s ease;position:relative;overflow:hidden;">
                    <div style="position:absolute;inset:0;background:linear-gradient(135deg,rgba(234,88,12,0.1),transparent);pointer-events:none;opacity:0;transition:opacity 0.3s ease;" class="perfil-bg"></div>
                    <div class="perfil-icon-box" style="width:56px;height:56px;border-radius:12px;background:linear-gradient(135deg,#ea580c,#c2410c);display:flex;align-items:center;justify-content:center;margin-bottom:12px;box-shadow:0 4px 12px rgba(234,88,12,0.3);font-size:1.8rem;color:#fff;transition:all 0.3s ease;position:relative;z-index:1;"><i class="fa-solid fa-biohazard"></i></div>
                    <h3 style="margin:0;font-size:0.95rem;font-weight:700;color:#0f172a;text-align:center;position:relative;z-index:1;line-height:1.3;">DROGAS</h3>
                </div>
            </div>
        </section>
        
        <!-- SECCIÓN PRODUCTOS DESTACADOS PARA ENTREGA INMEDIATA -->
        <section class="productos-destacados-section" style="margin-top:8px;padding:0 20px;">
            <div class="productos-destacados-header" style="text-align:center;max-width:900px;margin:0 auto;margin-bottom:40px;">
                <div style="display:flex;align-items:center;justify-content:center;gap:12px;margin-bottom:12px;flex-direction:column;">
                    <span style="width:52px;height:52px;border-radius:12px;background:linear-gradient(135deg,#00d4ff,#0099cc);display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 4px 15px rgba(0,212,255,0.3);">
                        <i class="fa-solid fa-truck-fast" style="color:#fff;font-size:1.6rem;"></i>
                    </span>
                    <div style="text-align:center;">
                        <p style="margin:0;font-size:0.9rem;color:#0099cc;font-weight:700;text-transform:uppercase;letter-spacing:0.6px;">Disponibilidad Inmediata</p>
                        <h2 style="margin:4px 0 0;font-size:2.6rem;color:#0f172a;font-weight:800;line-height:1.1;">Productos Destacados</h2>
                    </div>
                </div>
                <p style="margin:0;font-size:0.95rem;color:#64748b;line-height:1.6;margin-top:12px;">Selección premium de equipamiento de protección listos para entrega inmediata. Todos nuestros productos cuentan con certificación SCP.</p>
            </div>
            <div class="tacticos-grid" id="grid-destacados" style="margin-top:30px;">
                <!-- Se cargará dinámicamente -->
            </div>
            <div style="margin-top:50px;">
                ${obtenerHtmlForm('Cotizar Productos Destacados')}
            </div>
        </section>`;
    
    // Mostrar el contenido HTML
    mostrarDetalle(htmlContent);
    
    // Cargar productos destacados después de que el DOM esté completamente renderizado
    // Usar un timing mayor para asegurar que GSAP y el DOM están listos
    setTimeout(() => {
        cargarProductosDestacados();
    }, 300);
}

// ─────────────────────────────────────────────────────
// cargarMenuPerfil
// ★ Al entrar al perfil se auto-selecciona la PRIMERA categoría
// ─────────────────────────────────────────────────────
function cargarMenuPerfil(perfilId) {
    const categorias = catalogoVariantes[perfilId];
    if (!categorias) { console.error('Perfil no encontrado:', perfilId); return; }

    mostrarDetalle(`
        <div class="proteccion-wrapper">
            <aside class="sidebar-perfil">
                <button class="btn-back-perfiles" onclick="cargarVistaEquiposProteccion()">
                    <i class="fa-solid fa-arrow-left"></i> VOLVER
                </button>
                <div class="sidebar-title">
                    <small>CATÁLOGO</small>
                    <h3>${perfilId.toUpperCase().replace('_',' ')}</h3>
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
                <!-- Se cargará la primera categoría automáticamente -->
            </main>
        </div>`
    );

    // Animar sidebar y luego auto-seleccionar primera categoría
    requestAnimationFrame(() => {
        gsap.fromTo(".nav-item-catalogo",
            { opacity: 0, x: -20 },
            {
                opacity: 1, x: 0, stagger: 0.07, duration: 0.35,
                ease: "power2.out", clearProps: "opacity,x,transform",
                onComplete() {
                    // ★ Auto-seleccionar la primera categoría al terminar la animación
                    mostrarVariantes(0, perfilId);
                }
            }
        );
    });
}

// ─────────────────────────────────────────────────────
// mostrarVariantes
// Imagen individual por producto desde imagenesProductos[][]
// ─────────────────────────────────────────────────────
function mostrarVariantes(indexCat, perfilId) {
    const visor    = document.getElementById('visor-variantes');
    const categoria = catalogoVariantes[perfilId]?.[indexCat];
    if (!categoria || !visor) return;

    // Marcar activo en sidebar
    document.querySelectorAll('.nav-item-catalogo').forEach(el => {
        el.classList.remove('active');
        el.style.opacity = '1';
    });
    const navItem = document.getElementById(`nav-item-${indexCat}`);
    if (navItem) navItem.classList.add('active');

    // Obtener array de imágenes individuales para esta categoría
    const imgsCategoria = imagenesProductos[perfilId]?.[indexCat] || [];

    // Construir tarjetas — cada producto tiene su propia imagen
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
                <!-- Fallback si la imagen falla -->
                <div style="display:${imgUrl ? 'none' : 'flex'};width:100%;height:180px;align-items:center;justify-content:center;background:linear-gradient(135deg,#0d1b2e,${categoria.color}33);">
                    <i class="fa-solid ${prod.ic}" style="font-size:4rem;color:${categoria.color};"></i>
                </div>
                <!-- Overlay degradado -->
                <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.65) 0%,rgba(0,0,0,.1) 50%,transparent 100%);pointer-events:none;"></div>
                <!-- Badge ícono -->
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
        <div style="margin-bottom:28px;">
            <div style="display:flex;align-items:center;gap:14px;margin-bottom:10px;">
                <span style="width:44px;height:44px;border-radius:10px;background:${categoria.color};display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 3px 10px ${categoria.color}55;">
                    <i class="fa-solid ${categoria.icono}" style="color:#fff;font-size:1.35rem;"></i>
                </span>
                <h2 style="margin:0;font-size:1.6rem;color:#0f172a;">${categoria.cat}</h2>
            </div>
            <div style="height:3px;width:60px;border-radius:2px;background:${categoria.color};"></div>
        </div>
        <div class="tacticos-grid">
            ${productosHTML}
        </div>
        <div style="margin-top:60px;">
            ${obtenerHtmlForm('Cotización: ' + categoria.cat)}
        </div>`;

    gsap.fromTo(".tactico-card",
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, stagger: 0.055, duration: 0.45,
          ease: "power2.out", clearProps: "opacity,y,transform" }
    );
}

// ─────────────────────────────────────────────────────
// cargarProductosDestacados
// ★ Carga 15 productos destacados con diseño de tarjetas
// ─────────────────────────────────────────────────────
function cargarProductosDestacados() {
    const gridDestacados = document.getElementById('grid-destacados');
    if (!gridDestacados) return;

    // Array de 15 productos destacados
   const productosDestacados = [
    {
        n: "Respirador Facial Completo G1 – Talla Mediana",
        desc: "Sistema de sujeción FS, MD, MD NC, 4PT C-HARN. Equivalente al MSA 10156459.",
        ic: "fa-mask-face",
        img: "img15/pr1.png",
        categoria: "policias"
    },
    {
        n: "Respirador Facial Completo G1 – Talla Grande",
        desc: "Sistema de sujeción FS, MD, MD NC, 4PT C-HARN. Equivalente al MSA 10156460.",
        ic: "fa-mask-face",
        img: "img15/pr2.png",
        categoria: "policias"
    },
    {
        n: "Adaptador de Filtro APR G1",
        desc: "Conjunto adaptador APR para respiradores G1. Equivalente al MSA 10144231-SP.",
        ic: "fa-filter",
        img: "img15/pr3.png",
        categoria: "policias"
    },
    {
        n: "Cartuchos Advantage GME-P100",
        desc: "Filtros GME-P100. Paquete con 2 unidades.",
        ic: "fa-filter-circle",
        img: "img15/pr4.png",
        categoria: "drogas"
    },
    {
        n: "Máscara Antigás Ultra-Twin – Talla Grande",
        desc: "Máscara facial completa con correas y hebillas. Equivalente al MSA 480267.",
        ic: "fa-mask-ventilator",
        img: "img15/pr5.png",
        categoria: "forenses"
    },
    {
        n: "Máscara Antigás Ultra-Twin – Talla Pequeña",
        desc: "Máscara facial completa con correas y hebillas. Equivalente al MSA 480263.",
        ic: "fa-mask-ventilator",
        img: "img15/pr6.png",
        categoria: "forenses"
    },
    {
        n: "Filtros Multigas / P100",
        desc: "Protección contra vapores orgánicos, cloro, SO₂, amoníaco, formaldehído y más. Caja con 6 unidades.",
        ic: "fa-biohazard",
        img: "img15/pr7.png",
        categoria: "drogas"
    },
    {
        n: "Guantes Industriales de Nitrilo – Talla M",
        desc: "Color negro, sin polvo. Caja con 100 guantes.",
        ic: "fa-hand",
        img: "img15/pr8.png",
        categoria: "forenses"
    },
    {
        n: "Guantes Industriales de Nitrilo – Talla L",
        desc: "Color negro, sin polvo. Caja con 100 guantes.",
        ic: "fa-hand",
        img: "img15/pr9.png",
        categoria: "forenses"
    },
    {
        n: "Botas Resistentes a Productos Químicos – Talla Grande",
        desc: "Protección especializada contra agentes químicos.",
        ic: "fa-shoe-prints",
        img: "img15/pr10.png",
        categoria: "bomberos"
    },
    {
        n: "Botas Resistentes a Productos Químicos – Talla Extra Grande",
        desc: "Protección avanzada contra sustancias corrosivas.",
        ic: "fa-shoe-prints",
        img: "img15/pr11.png",
        categoria: "bomberos"
    },
    {
        n: "Generador de Humo Irritante para Pruebas de Ajuste",
        desc: "Caja con 6 piezas. Equivalente al VeriFit Irritant Smoke Test.",
        ic: "fa-smog",
        img: "img15/pr12.png",
        categoria: "policias"
    },
    {
        n: "Trajes de Entrenamiento Kappler Zytron 100XP",
        desc: "Caja con 6 piezas. Tallas 2X / 3X.",
        ic: "fa-user-shield",
        img: "img15/pr13.png",
        categoria: "bomberos"
    },
    {
        n: "Papel de Prueba pH Hydrion Jumbo",
        desc: "Rango 0–13 pH, 1/2\" x 50'. Caja con 10 rollos. Equivalente a VWR 60786-043.",
        ic: "fa-vial",
        img: "img15/pr14.png",
        categoria: "forenses"
    },
    {
        n: "Tiras de Prueba para Fentanilo",
        desc: "Detección rápida y confiable de fentanilo.",
        ic: "fa-flask-vial",
        img: "img15/pr15.png",
        categoria: "drogas"
    }
];

    // Colores según categoría
    const coloresPorCategoria = {
        policias: '#1e40af',
        bomberos: '#dc2626',
        ambulancia: '#16a34a',
        forenses: '#8b5cf6',
        drogas: '#ea580c'
    };

    // Construir HTML de tarjetas
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
                <!-- Fallback si la imagen falla -->
                <div style="display:none;width:100%;height:180px;align-items:center;justify-content:center;background:linear-gradient(135deg,#0d1b2e,${colorFondo}33);">
                    <i class="fa-solid ${prod.ic}" style="font-size:4rem;color:${colorFondo};"></i>
                </div>
                <!-- Overlay degradado -->
                <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.65) 0%,rgba(0,0,0,.1) 50%,transparent 100%);pointer-events:none;"></div>
                <!-- Badge ícono -->
                <div style="position:absolute;top:10px;right:10px;width:36px;height:36px;border-radius:8px;background:${colorFondo};display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,.4);">
                    <i class="fa-solid ${prod.ic}" style="color:#fff;font-size:.9rem;"></i>
                </div>
                <!-- Badge de entrega inmediata -->
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

    // Animar tarjetas al cargar
    gsap.fromTo(".tactico-card",
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, stagger: 0.055, duration: 0.45,
          ease: "power2.out", clearProps: "opacity,y,transform" }
    );
}
// =====================================================
// 10. EMAILJS
// =====================================================
function inicializarEmailJS() {
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
                    Swal.fire({ title: '¡Solicitud Enviada!', text: 'Nos pondremos en contacto pronto.', icon: 'success', confirmButtonColor: '#0056b3' });
                    btn.innerText = '¡Enviado!';
                    e.target.reset();
                    setTimeout(() => { btn.disabled = false; btn.innerText = orig; volverInicio(); }, 2500);
                })
                .catch(err => {
                    btn.disabled = false;
                    btn.innerText = orig;
                    Swal.fire({ title: 'Error', text: 'Hubo un fallo al enviar.', icon: 'error' });
                    console.error('EmailJS error:', err);
                });
        }
    });
}

// =====================================================
// 11. CARGA INICIAL
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