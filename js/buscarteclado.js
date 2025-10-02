document.getElementById("btn-search-keyboard").addEventListener("click", async () => {
    const codigo = document.getElementById("input-code-keyboard").value.trim();
  
    if (!codigo) {
      alert("Por favor ingresa un código para buscar");
      return;
    }
  
    try {
      const instrumento = await buscarInstrumento(codigo);
  
      if (!instrumento) {
        alert("No se encontró ningún instrumento con ese código ❌");
        limpiarCampos();
        return;
      }
  
      // Validar que sea un teclado
      if (instrumento.type !== "teclado") {
        alert("El código corresponde a otro tipo de instrumento, no a un teclado ⚠️");
        limpiarCampos();
        return;
      }
  
      // Llenar campos según tu HTML
      document.getElementById("input-name-keyboard").value = instrumento.nombre || "";
      document.getElementById("input-brand-keyboard").value = instrumento.marca || "";
      document.getElementById("input-price-keyboard").value = instrumento.precioBase || "";
      document.getElementById("input-stock-keyboard").value = instrumento.stock || "";
      document.getElementById("input-date-keyboard").value = instrumento.fechaIngreso || "";
      document.getElementById("input-keys-number").value = instrumento.numeroTeclas || "";
      document.getElementById("input-digital-keyboard").value = instrumento.digital ? "Digital" : "Analógico" || "";
      document.getElementById("input-sensitivity").value = instrumento.sensibilidad || "";
  
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error al buscar el teclado ❌");
    }
  });
  
  function limpiarCampos() {
    document.getElementById("input-name-keyboard").value = "";
    document.getElementById("input-brand-keyboard").value = "";
    document.getElementById("input-price-keyboard").value = "";
    document.getElementById("input-stock-keyboard").value = "";
    document.getElementById("input-date-keyboard").value = "";
    document.getElementById("input-keys-number").value = "";
    document.getElementById("input-digital-keyboard").value = "";
    document.getElementById("input-sensitivity").value = "";
  }
  