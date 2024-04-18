// Seleccionar el elemento textarea
const textArea = document.getElementById('texto-entrada');

// Función para cargar el texto desde el almacenamiento local al cargar la página
// Asegúrate de que el contenido cargado no contenga scripts maliciosos
window.addEventListener('load', () => {
  let safeText = localStorage.getItem('notepadText') || '';
  // Utiliza textContent para evitar que se interprete como HTML
  textArea.textContent = safeText;
});

// Función para guardar el texto en el almacenamiento local en cualquier cambio
textArea.addEventListener('input', () => {
  // Antes de guardar, puedes realizar una validación del texto aquí
  localStorage.setItem('notepadText', textArea.value);
});

// Suponiendo que el textarea tiene el ID 'texto-entrada' y el botón tiene el ID 'miBoton'
const copyButton = document.getElementById('miBoton');

copyButton.addEventListener('click', function() {
  // Selecciona el texto en el textarea
  textArea.select();

  // Copia el texto seleccionado al portapapeles
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(textArea.value)
      .then(() => {
        console.log('Texto copiado al portapapeles!');
        // Aquí también puedes mostrar un mensaje de éxito al usuario
      })
      .catch(err => {
        console.error('Error al copiar el texto:', err);
        // Aquí también puedes mostrar un mensaje de error al usuario
      });
  } else {
    // Alternativa para navegadores antiguos
    const textRange = document.createRange();
    textRange.selectNode(textArea);
    window.getSelection().addRange(textRange);

    try {
      document.execCommand('copy');
      console.log('Texto copiado al portapapeles!');
      // Aquí también puedes mostrar un mensaje de éxito al usuario
    } catch (err) {
      console.error('Error al copiar el texto:', err);
      // Aquí también puedes mostrar un mensaje de error al usuario
    }

    window.getSelection().removeAllRanges(); // Limpia la selección
  }
});

const clearButton = document.getElementById('miBoton1');

clearButton.addEventListener('click', () => {
  textArea.value = '';
  textArea.focus(); // Establece el foco al principio
});


  
