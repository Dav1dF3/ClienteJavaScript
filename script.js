const API_URL_ADD_GUITAR = "http://localhost:8090/instrumentos";

//Agregar Guitarra
const addButton = document.getElementById('btn-add-guitar');
if (addButton) {
  addButton.addEventListener('click', async function(e) {
    e.preventDefault();

    // Validar campos requeridos
    const codigo = document.getElementById('input-code-guitar').value.trim();
    const nombre = document.getElementById('input-name-guitar').value.trim();
    const marca = document.getElementById('input-brand-guitar').value.trim();
    const precio = document.getElementById('input-price-guitar').value.trim();
    const stock = document.getElementById('input-stock-guitar').value.trim();
    const tipo = document.getElementById('select-type-guitar').value.trim();
    const materialCuerpo = document.getElementById('input-material-guitar').value.trim();
    

    const tieneFunda = document.getElementById('tieneFunda').checked;

    let fundaData = null;
    if (tieneFunda) {
        const fundaCodigo = document.getElementById('input-code-case')?.value.trim();
        const fundaNombre = document.getElementById('input-name-case')?.value.trim();
        const fundaPrecio = document.getElementById('input-price-case')?.value.trim();
            fundaData = [{ 
                codigo: fundaCodigo,
                nombre: fundaNombre,
                precio: fundaPrecio
            }];
        }
    
    try {
        const response = await fetch(API_URL_ADD_GUITAR, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": "Basic " + btoa("admin:admin")
        },
        body: JSON.stringify({
        "type": "guitarra",
        "codigo": codigo,
        "nombre": nombre,
        "marca": marca,
        "precioBase": precio,
        "stock": stock,
        "fechaIngreso": "2025-10-01",
        "tipo": tipo,
        "materialCuerpo": materialCuerpo,
        "fundas": fundaData
    })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Respuesta del servidor:", errorText);
        throw new Error(`Error HTTP: ${response.status} - ${errorText}`);
      }

      alert('Guitarra agregada exitosamente');
      window.location.href = 'guitarras.html';
      
    } catch (error) {
      console.error("Error completo:", error);
      alert(`Error al agregar la guitarra: ${error.message}`);
    }
  });
}


//Buscar Guitarra
const buscarButton = document.getElementById('buscarButton');
if (buscarButton) {
  buscarButton.addEventListener('click', async function() {
      const codigo = document.getElementById('codigo').value.trim();
      if (!codigo) {
          alert("Por favor, ingrese el código.");
          return;
      }

      try {
          const response = await fetch(`http://localhost:8090/instrumentos/${codigo}`, {
          method: 'GET',
          headers: { 
              "Content-Type": "application/json",
              "Authorization": "Basic " + btoa("admin:admin") // ← Agregar credenciales
              }
          });
          if (!response.ok) {
              alert("No se encontró el código");
              return;
          }
          const data = await response.json();
          
          document.getElementById('nombre').value = data.nombre || '';
          document.getElementById('marca').value = data.marca || '';
          document.getElementById('precio').value = data.precioBase || '';
          document.getElementById('stock').value = data.stock || '';
          document.getElementById('tipo').value = data.tipo || '';
          document.getElementById('materialCuerpo').value = data.materialCuerpo || '';
          
      } catch (error) {
          alert("Error al buscar el código");
          console.error(error);
      }
    });
}
