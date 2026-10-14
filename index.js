const ADMIN_PASSWORD = "NovaFit2026";
const menu = document.getElementById("menu");

function abrirMenu(){
    if(menu) menu.classList.toggle("active");
}

document.querySelectorAll("nav a").forEach(enlace=>{
    enlace.addEventListener("click",()=>{
        if(menu) menu.classList.remove("active");
    });
});

/* SOCIOS Y PAGOS - conserva toda tu lógica original */
let socios = JSON.parse(localStorage.getItem("novaFitSocios")) || [];
let pagos = JSON.parse(localStorage.getItem("novaFitPagos")) || [];

const formSocio = document.getElementById("formSocio");
const tablaSocios = document.getElementById("tablaSocios");
const tablaPagos = document.getElementById("tablaPagos");
const formPago = document.getElementById("formPago");

/* DATOS DE COMIDAS Y BEBIDAS según tu lista completa */
const comidas = {
    cardioBreakfast: [
        {nombre:"Avena con banana y yogur", desc:"Aporta hidratos de absorción moderada y proteína láctea para comenzar la actividad."},
        {nombre:"Huevos con pan integral y fruta", desc:"Combina proteína de huevo, fibra del pan y azúcares naturales de la fruta."},
        {nombre:"Yogur con avena y manzana", desc:"Contiene fibra, calcio y carbohidratos suaves para un desayuno ligero."},
        {nombre:"Quinua con leche y fruta", desc:"Aporta proteína vegetal‑animal, hidratos y micronutrientes variados."},
        {nombre:"Tostadas integrales con palta y huevo", desc:"Incluye grasas saludables, proteína y fibra para energía sostenida."},
        {nombre:"Avena con manzana y canela", desc:"Brinda hidratos complejos y fibra, sin exceso de azúcares añadidos."}
    ],
    cardioLunch: [
        {nombre:"Pollo a la plancha con arroz y ensalada", desc:"Proteína magra, hidratos para reposición y verduras con vitaminas y fibra."},
        {nombre:"Pescado al horno con papa y verduras", desc:"Proteína fácil de digerir, hidratos y micronutrientes de las hortalizas."},
        {nombre:"Quinua con pollo y verduras", desc:"Proteína mixta, fibra y minerales para acompañar el gasto energético."},
        {nombre:"Lentejas con arroz y ensalada", desc:"Proteína vegetal, hierro, hidratos y fibra para una comida equilibrada."},
        {nombre:"Pollo salteado con verduras y quinua", desc:"Proteína magra, hidratos complejos y antioxidantes de las verduras."},
        {nombre:"Pescado con quinua y ensalada", desc:"Proteína suave, hidratos y compuestos vegetales beneficiosos."}
    ],
    cardioDinner: [
        {nombre:"Sopa de verduras con huevo", desc:"Hidratación, vitaminas y proteína ligera para la cena después de entrenar."},
        {nombre:"Ensalada de pollo y verduras", desc:"Proteína magra, fibra y antioxidantes con bajo aporte de hidratos."},
        {nombre:"Tortilla de verduras con pan integral", desc:"Proteína de huevo, fibra y pequeñas cantidades de hidratos complejos."},
        {nombre:"Pescado con verduras cocidas", desc:"Proteína fácil de digerir y micronutrientes sin cargas pesadas."},
        {nombre:"Quinua con verduras y huevo", desc:"Proteína mixta, fibra y minerales en porción moderada para la noche."},
        {nombre:"Sopa de quinua con verduras", desc:"Aporta hidratos suaves, proteína vegetal y fibra para cerrar el día."}
    ],
    muscleBreakfast: [
        {nombre:"Avena con leche, banana y huevo", desc:"Combina hidratos, proteína láctea‑huevo y potasio para apoyar la preparación."},
        {nombre:"Huevos con pan integral y fruta", desc:"Proteína elevada, fibra y azúcares naturales para energía y construcción."},
        {nombre:"Yogur con avena, banana y semillas", desc:"Proteína láctea, hidratos, grasas saludables y magnesio de las semillas."},
        {nombre:"Quinua con leche y fruta", desc:"Proteína vegetal‑animal, hidratos complejos y antioxidantes de la fruta."},
        {nombre:"Omelette de verduras con pan integral", desc:"Alta proporción de proteína, fibra y vitaminas de hortalizas."},
        {nombre:"Avena con yogur y frutos secos", desc:"Hidratos, proteína láctea y grasas insaturadas para nutrición prolongada."}
    ],
    muscleLunch: [
        {nombre:"Pollo con arroz y ensalada", desc:"Proteína magra para músculos, hidratos para energía y fibra‑vitaminas."},
        {nombre:"Carne magra con papa y verduras", desc:"Proteína animal, hierro, hidratos y compuestos antioxidantes vegetales."},
        {nombre:"Pescado con quinua y verduras", desc:"Proteína fácil de asimilar, proteína vegetal y micronutrientes variados."},
        {nombre:"Lentejas con arroz y huevo", desc:"Proteína vegetal‑huevo, hidratos, hierro y fibra de legumbre‑cereal."},
        {nombre:"Pollo con quinua y palta", desc:"Proteína magra, proteína vegetal y grasas monoinsaturadas de la palta."},
        {nombre:"Carne magra con arroz y ensalada", desc:"Proteína animal, hidratos complejos y antioxidantes de las verduras frescas."}
    ],
    muscleDinner: [
        {nombre:"Pollo con quinua y verduras", desc:"Proteína magra, proteína vegetal y fibra, para recuperación nocturna moderada."},
        {nombre:"Tortilla de huevo con papa y ensalada", desc:"Proteína de huevo, hidratos y vitaminas sin exceso de grasas saturadas."},
        {nombre:"Pescado con arroz y verduras", desc:"Proteína suave, hidratos y minerales para una cena orientada a recuperación."},
        {nombre:"Lentejas con huevo y verduras", desc:"Proteína mixta, fibra, hierro y antioxidantes en preparación ligera."},
        {nombre:"Pollo con papa y ensalada", desc:"Proteína magra, hidratos y compuestos vegetales para cerrar la jornada."},
        {nombre:"Omelette con queso fresco y verduras", desc:"Proteína láctea‑huevo, calcio y vitaminas de hortalizas frescas."}
    ]
};

const jugosVerdes = [
    {nombre:"Pepino, manzana y limón", desc:"Aporta agua, vitamina C y compuestos vegetales propios de sus frutas‑hortalizas."},
    {nombre:"Espinaca, manzana y limón", desc:"Contiene clorofila, vitamina C, potasio y azúcares naturales de la manzana."},
    {nombre:"Apio, pepino y manzana", desc:"Predomina el contenido hídrico, junto con minerales y antioxidantes vegetales."},
    {nombre:"Piña y espinaca", desc:"Brinda vitamina C, manganeso y compuestos vegetales de la espinaca."},
    {nombre:"Manzana, pepino y menta", desc:"Aporta agua, fibra soluble, minerales y compuestos aromáticos de la menta."},
    {nombre:"Kiwi, espinaca y manzana", desc:"Alto contenido de vitamina C, folatos y antioxidantes de sus ingredientes."}
];

const bebidasMusculo = [
    {nombre:"Batido de plátano con leche y yogur", desc:"Aporta proteínas y carbohidratos que ayudan a complementar la alimentación y la recuperación muscular."},
    {nombre:"Licuado de avena, maní y yogur natural", desc:"Combina proteínas, carbohidratos y grasas saludables para complementar la alimentación."},
    {nombre:"Batido de fresa con yogur y leche", desc:"Aporta proteínas, calcio y carbohidratos, además del sabor y los nutrientes de las fresas."},
    {nombre:"Bebida de remolacha y manzana", desc:"Combina frutas y verduras que aportan agua, carbohidratos y diferentes micronutrientes."},
    {nombre:"Batido de plátano, cacao y leche", desc:"Aporta carbohidratos, proteínas y calcio, con el sabor del plátano y el cacao."},
    {nombre:"Licuado de papaya, avena y leche", desc:"Combina carbohidratos, proteínas y fibra para complementar una alimentación variada."}
];

function crearComidas(id, lista, carpeta){
    const contenedor = document.getElementById(id);
    if(!contenedor) return;
    contenedor.innerHTML = lista.map((obj,i)=>{
        const numero = String(i+1).padStart(2,"0");
        return `
        <article class="meal-card">
            <img src="${carpeta}-${numero}.jpeg" alt="${obj.nombre}" loading="lazy">
            <div class="meal-body">
                <h5>${obj.nombre}</h5>
                <p>${obj.desc}</p>
            </div>
        </article>`;
    }).join("");
}

crearComidas("cardioBreakfast", comidas.cardioBreakfast, "cardio-desayunos");
crearComidas("cardioLunch", comidas.cardioLunch, "cardio-almuerzos");
crearComidas("cardioDinner", comidas.cardioDinner, "cardio-cenas");
crearComidas("muscleBreakfast", comidas.muscleBreakfast, "muscular-desayunos");
crearComidas("muscleLunch", comidas.muscleLunch, "muscular-almuerzos");
crearComidas("muscleDinner", comidas.muscleDinner, "muscular-cenas");

function crearBebidas(id, lista, carpeta){
    const contenedor = document.getElementById(id);
    if(!contenedor) return;
    contenedor.innerHTML = lista.map((obj,i)=>{
        const numero = String(i+1).padStart(2,"0");
        return `
        <article class="juice-card">
            <img src="${carpeta}-${numero}.jpeg" alt="${obj.nombre}" loading="lazy">
            <div>
                <h4>${obj.nombre}</h4>
                <p>${obj.desc}</p>
            </div>
        </article>`;
    }).join("");
}

crearBebidas("greenJuices", jugosVerdes, "jugos-verdes");
crearBebidas("muscleDrinks", bebidasMusculo, "bebidas-musculares");

function escapeHtml(valor){
    return String(valor).replace(/[&<>'"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c]));
}

function mostrarSocios(){
    if(!tablaSocios) return;
    const busqueda = (document.getElementById("buscarSocio")?.value||"").toLowerCase().trim();
    tablaSocios.innerHTML = "";
    const lista = socios.filter(socio=>`${socio.nombre} ${socio.ci} ${socio.telefono}`.toLowerCase().includes(busqueda));
    if(lista.length===0){
        tablaSocios.innerHTML = `<tr><td colspan="5">No hay socios que coincidan.</td></tr>`;
        return;
    }
    lista.forEach(socio=>{
        const indice = socios.indexOf(socio);
        const fila = document.createElement("tr");
        fila.innerHTML = `
        <td>${escapeHtml(socio.nombre)}</td>
        <td>${escapeHtml(socio.ci)}</td>
        <td>${escapeHtml(socio.telefono)}</td>
        <td>${escapeHtml(socio.objetivo)}</td>
        <td><button class="btn-eliminar" onclick="eliminarSocio(${indice})"><i class="bi bi-trash"></i> Eliminar</button></td>`;
        tablaSocios.appendChild(fila);
    });
}

if(formSocio){
    formSocio.addEventListener("submit",evento=>{
        evento.preventDefault();
        const nombre = document.getElementById("nombre").value.trim();
        const ci = document.getElementById("ci").value.trim();
        const telefono = document.getElementById("telefono").value.trim();
        const objetivo = document.getElementById("objetivo").value;
        if(socios.some(socio=>socio.ci===ci)){
            alert("Ya existe un socio registrado con ese carnet.");
            return;
        }
        socios.push({nombre,ci,telefono,objetivo,fechaRegistro:new Date().toLocaleDateString("es‑BO")});
        localStorage.setItem("novaFitSocios",JSON.stringify(socios));
        formSocio.reset();
        alert("Socio registrado correctamente.");
        mostrarSocios(); actualizarStats();
    });
}

function eliminarSocio(indice){
    if(!confirm("¿Está seguro de eliminar este socio?")) return;
    const ci = socios[indice].ci;
    socios.splice(indice,1);
    pagos = pagos.filter(pago=>pago.ci!==ci);
    localStorage.setItem("novaFitSocios",JSON.stringify(socios));
    localStorage.setItem("novaFitPagos",JSON.stringify(pagos));
    mostrarSocios(); mostrarPagos(); actualizarStats();
    alert("Socio eliminado correctamente.");
}

function nombreSocio(ci){
    const socio = socios.find(s=>s.ci===ci);
    return socio ? socio.nombre : "Socio no encontrado";
}

function mostrarPagos(){
    if(!tablaPagos) return;
    tablaPagos.innerHTML = "";
    if(pagos.length===0){
        tablaPagos.innerHTML = `<tr><td colspan="6">No hay pagos registrados.</td></tr>`;
        return;
    }
    pagos.forEach((pago,indice)=>{
        const fila = document.createElement("tr");
        fila.innerHTML = `
        <td>${escapeHtml(nombreSocio(pago.ci))}</td>
        <td>${escapeHtml(pago.ci)}</td>
        <td>${escapeHtml(pago.mes)}</td>
        <td>Bs. ${Number(pago.monto).toFixed(2)}</td>
        <td>${escapeHtml(pago.fecha)}</td>
        <td><button class="btn-eliminar" onclick="eliminarPago(${indice})"><i class="bi bi-trash"></i> Eliminar</button></td>`;
        tablaPagos.appendChild(fila);
    });
}

if(formPago){
    formPago.addEventListener("submit",evento=>{
        evento.preventDefault();
        const ci = document.getElementById("ciPago").value.trim();
        const mes = document.getElementById("mesPago").value;
        const monto = document.getElementById("montoPago").value;
        const fecha = document.getElementById("fechaPago").value;
        if(!socios.some(socio=>socio.ci===ci)){
            alert("Primero debe registrarse el socio con ese carnet.");
            return;
        }
        pagos.push({ci,mes,monto,fecha});
        localStorage.setItem("novaFitPagos",JSON.stringify(pagos));
        formPago.reset(); ponerFecha(); mostrarPagos(); actualizarStats();
        alert("Pago presencial registrado correctamente.");
    });
}

function eliminarPago(indice){
    if(!confirm("¿Está seguro de eliminar este pago?")) return;
    pagos.splice(indice,1);
    localStorage.setItem("novaFitPagos",JSON.stringify(pagos));
    mostrarPagos(); actualizarStats();
    alert("Pago eliminado correctamente.");
}

function ponerFecha(){
    const fecha = document.getElementById("fechaPago");
    if(fecha && !fecha.value){
        const hoy = new Date();
        fecha.value = `${hoy.getFullYear()}-${String(hoy.getMonth()+1).padStart(2,"0")}-${String(hoy.getDate()).padStart(2,"0")}`;
    }
}

function actualizarStats(){
    const totalSocios = document.getElementById("totalSocios");
    const totalPagos = document.getElementById("totalPagos");
    const totalRecaudado = document.getElementById("totalRecaudado");
    if(totalSocios) totalSocios.textContent = socios.length;
    if(totalPagos) totalPagos.textContent = pagos.length;
    if(totalRecaudado) totalRecaudado.textContent = `Bs. ${pagos.reduce((total,pago)=>total+Number(pago.monto||0),0).toFixed(2)}`;
}

document.getElementById("buscarSocio")?.addEventListener("input",mostrarSocios);

const adminLoginForm = document.getElementById("adminLoginForm");
const adminLoginPage = document.getElementById("adminLoginPage");
const adminPanel = document.getElementById("adminPanel");
const adminLoginError = document.getElementById("adminLoginError");

if(adminLoginForm){
    adminLoginForm.addEventListener("submit",evento=>{
        evento.preventDefault();
        const password = document.getElementById("adminPassword").value;
        if(password!==ADMIN_PASSWORD){
            adminLoginError.textContent = "Contraseña incorrecta.";
            return;
        }
        sessionStorage.setItem("novaFitAdmin","true");
        mostrarAdmin();
    });
}

function mostrarAdmin(){
    if(!adminLoginPage || !adminPanel) return;
    adminLoginPage.style.display = "none";
    adminPanel.hidden = false;
    mostrarSocios(); mostrarPagos(); ponerFecha(); actualizarStats();
}

function cerrarSesion(){
    sessionStorage.removeItem("novaFitAdmin");
    window.location.href = "index.html";
}

if(adminLoginPage && adminPanel){
    if(sessionStorage.getItem("novaFitAdmin")==="true") mostrarAdmin();
}

const topBtn = document.getElementById("topBtn");
window.addEventListener("scroll",()=>{
    if(topBtn) topBtn.style.display = window.scrollY>400 ? "block" : "none";
});

function subirArriba(){
    window.scrollTo({top:0, behavior:"smooth"});
}

mostrarSocios(); mostrarPagos(); ponerFecha(); actualizarStats();
