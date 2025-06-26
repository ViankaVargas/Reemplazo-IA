// Cargar las imágenes
const imagenMuchacha = cv.imread('imagen-muchacha');
const imagenEstuche = cv.imread('imagen-estuche');

// Convertir las imágenes a escala de grises
const grayMuchacha = new cv.Mat();
cv.cvtColor(imagenMuchacha, grayMuchacha, cv.COLOR_RGBA2GRAY);
const grayEstuche = new cv.Mat();
cv.cvtColor(imagenEstuche, grayEstuche, cv.COLOR_RGBA2GRAY);

// Detectar el estuche en la imagen de la muchacha
const contoursMuchacha = new cv.MatVector();
cv.findContours(grayMuchacha, contoursMuchacha, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);

// Reemplazar el estuche con el nuevo diseño
for (let i = 0; i < contoursMuchacha.size(); i++) {
    const contour = contoursMuchacha.get(i);
    const x = contour.data32S[0];
    const y = contour.data32S[1];
    const w = contour.data32S[2];
    const h = contour.data32S[3];
    cv.rectangle(imagenMuchacha, new cv.Point(x, y), new cv.Point(x + w, y + h), new cv.Scalar(0, 0, 0, 0), -1);
    cv.resize(imagenEstuche, imagenEstuche, new cv.Size(w, h));
    const roi = imagenMuchacha.roi(new cv.Rect(x, y, w, h));
    imagenEstuche.copyTo(roi);
}

// Mostrar la imagen resultante
cv.imshow('canvas', imagenMuchacha);
