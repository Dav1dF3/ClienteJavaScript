const BASE_URL = 'http://localhost:8090/instrumentos';

const username = 'admin';
const password = 'admin';
const headers = new Headers({
  'Authorization': 'Basic ' + btoa(username + ':' + password),
  'Content-Type': 'application/json'
});

// GET /instrumentos - Listar todos los instrumentos
async function listarInstrumentos() {
  const response = await fetch(BASE_URL, {
    method: 'GET',
    headers: headers
  });
  return response.json();
}

// POST /instrumentos - Agregar nuevo instrumento
async function agregarInstrumento(instrumento) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(instrumento)
  });
  return response.json();
}

// GET /instrumentos/guitarras - Listar guitarras
async function listarGuitarras() {
  const response = await fetch(`${BASE_URL}/guitarras`, {
    method: 'GET',
    headers: headers
  });
  return response.json();
}

// GET /instrumentos/teclados - Listar teclados
async function listarTeclados() {
  const response = await fetch(`${BASE_URL}/teclados`, {
    method: 'GET',
    headers: headers
  });
  return response.json();
}

// GET /instrumentos/{codigo} - Buscar instrumento por código
async function buscarInstrumento(codigo) {
  const response = await fetch(`${BASE_URL}/${codigo}`, {
    method: 'GET',
    headers: headers
  });
  if(response.status === 404) {
    return null; // Instrumento no encontrado
  }
  return response.json();
}

// PUT /instrumentos/{codigo} - Editar instrumento
async function editarInstrumento(codigo, instrumentoModificado) {
  const response = await fetch(`${BASE_URL}/${codigo}`, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify(instrumentoModificado)
  });
  return response.json();
}

// DELETE /instrumentos/{codigo} - Eliminar instrumento
async function eliminarInstrumento(codigo) {
  const response = await fetch(`${BASE_URL}/${codigo}`, {
    method: 'DELETE',
    headers: headers
  });
  return response.ok;
}

// POST /instrumentos/guitarras/{codigo}/fundas - Agregar fundas a guitarra
async function agregarFundas(codigo, fundas) {
  const response = await fetch(`${BASE_URL}/guitarras/${codigo}/fundas`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(fundas)
  });
  return response.json();
}

// PUT /instrumentos/guitarras/{codigo}/fundas/{codigoFunda} - Editar funda
async function editarFunda(codigo, codigoFunda, fundaModificada) {
  const response = await fetch(`${BASE_URL}/guitarras/${codigo}/fundas/${codigoFunda}`, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify(fundaModificada)
  });
  return response.json();
}

// DELETE /instrumentos/guitarras/{codigo}/fundas/{codigoFunda} - Eliminar funda
async function eliminarFunda(codigo, codigoFunda) {
  const response = await fetch(`${BASE_URL}/guitarras/${codigo}/fundas/${codigoFunda}`, {
    method: 'DELETE',
    headers: headers
  });
  return response.ok;
}

// GET /instrumentos/filtrar - Filtrar instrumentos (en tu controlador es @GetMapping con @RequestBody)
async function filtrarInstrumentos(filtro) {
  const response = await fetch(`${BASE_URL}/filtrar`, {
    method: 'GET',
    headers: headers,
    body: JSON.stringify(filtro)
  });
  return response.json();
}

// GET /instrumentos/healthCheck - Verificar estado del servicio
async function healthCheck() {
  const response = await fetch(`${BASE_URL}/healthCheck`, {
    method: 'GET'
  });
  return response.text();
}
