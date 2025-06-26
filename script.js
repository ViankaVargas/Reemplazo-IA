const imagenMuchachaInput = document.getElementById('imagen-muchacha-input');
const imagenEstucheInput = document.getElementById('imagen-estuche-input');
const cambiarDisenoBtn = document.getElementById('cambiar-diseño-btn');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const imagenMuchacha = document.getElementById('imagen-muchacha');

let imagenMuchachaCargada = null;
let imagenEstucheCargada = null;

imagenMuchachaInput.addEventListener('change', (e) => {
    const archivo = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
        imagenMuchachaCargada = new Image();
        imagenMuchachaCargada.onload = () => {
            imagenMuchacha.src = reader.result;
        };
        imagenMuchachaCargada.src = reader.result;
    };
    reader.readAsDataURL(archivo);
});

imagenEstucheInput.addEventListener('change', (e) => {
    const archivo = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
        imagenEstucheCargada = new Image();
        imagenEstucheCargada.onload = () => {
            // No hacer nada aquí
        };
        imagenEstucheCargada.src = reader.result;
    };
    reader.readAsDataURL(archivo);
});

cambiarDisenoBtn.addEventListener('click', () => {
    if (!imagenMuchachaCargada || !imagenEstucheCargada) {
        alert('Por favor, carga ambas imágenes');
        return;
    }

    canvas.width = imagenMuchachaCargada.width;
    canvas.height = imagenMuchachaCargada.height;

    ctx.drawImage(imagenMuchachaCargada, 0, 0);

    // Suponiendo que el estuche está en el centro de la imagen
    const estucheX = (canvas.width - imagenEstucheCargada.width) / 2;
    const estucheY = (canvas.height - imagenEstucheCargada.height) / 2;

    ctx.drawImage(imagenEstucheCargada, estucheX, estucheY);

    imagenMuchacha.src = canvas.toDataURL();
});
