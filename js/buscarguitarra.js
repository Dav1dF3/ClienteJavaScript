document.getElementById("btn-search-guitar").addEventListener("click", async () => {
    const codigo = document.getElementById("input-code-search").value.trim();

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

      // ✅ llenar los campos solo si el instrumento es de tipo guitarra
      if (instrumento.type !== "guitarra") {
        alert("El código corresponde a otro tipo de instrumento, no a una guitarra ⚠️");
        limpiarCampos();
        return;
      }

      document.getElementById("input-name-search").value = instrumento.nombre || "";
      document.getElementById("input-brand-search").value = instrumento.marca || "";
      document.getElementById("input-price-search").value = instrumento.precioBase || "";
      document.getElementById("input-stock-search").value = instrumento.stock || "";
      document.getElementById("input-date-search").value = instrumento.fechaIngreso || "";
      document.getElementById("input-type-search").value = instrumento.tipo || "";
      document.getElementById("input-material-search").value = instrumento.materialCuerpo || "";
      document.getElementById("input-case-search").value =
        instrumento.fundas && instrumento.fundas.length > 0
          ? instrumento.fundas.map(f => f.nombre || f).join(", ")
          : "";

    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error al buscar la guitarra ❌");
    }
  });

  function limpiarCampos() {
    document.getElementById("input-name-search").value = "";
    document.getElementById("input-brand-search").value = "";
    document.getElementById("input-price-search").value = "";
    document.getElementById("input-stock-search").value = "";
    document.getElementById("input-date-search").value = "";
    document.getElementById("input-type-search").value = "";
    document.getElementById("input-material-search").value = "";
    document.getElementById("input-case-search").value = "";
  }