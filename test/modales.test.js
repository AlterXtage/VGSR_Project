// tests/modales.test.js
const { JSDOM } = require("jsdom");

describe("Pruebas unitarias para modales.js", () => {
  let dom, document;

  beforeEach(() => {
    // Configurar un entorno DOM simulado
    dom = new JSDOM(`
      <!DOCTYPE html>
      <html>
        <body>
          <button id="agregar-videojuego">Agregar Videojuego</button>
          <button id="editar-videojuego">Editar Videojuego</button>
          <button id="eliminar-videojuego">Eliminar Videojuego</button>

          <div id="modal-agregar" style="display: none;"></div>
          <div id="modal-editar" style="display: none;"></div>
          <div id="modal-eliminar" style="display: none;"></div>

          <button id="cerrar-modal">Cerrar Modal Agregar</button>
          <button id="cerrar-modal-editar">Cerrar Modal Editar</button>
          <button id="cerrar-modal-eliminar">Cerrar Modal Eliminar</button>
        </body>
      </html>
    `);
    document = dom.window.document;

    // Simular el código de modales.js
    require("../src/modales");
  });

  afterEach(() => {
    jest.resetModules(); // Reinicia los módulos después de cada prueba
  });

  test("Debería mostrar el modal de agregar al hacer clic en 'Agregar Videojuego'", () => {
    const agregarBtn = document.getElementById("agregar-videojuego");
    const modalAgregar = document.getElementById("modal-agregar");

    agregarBtn.click();
    expect(modalAgregar.style.display).toBe("flex");
  });

  test("Debería mostrar el modal de editar al hacer clic en 'Editar Videojuego'", () => {
    const editarBtn = document.getElementById("editar-videojuego");
    const modalEditar = document.getElementById("modal-editar");

    editarBtn.click();
    expect(modalEditar.style.display).toBe("flex");
  });

  test("Debería mostrar el modal de eliminar al hacer clic en 'Eliminar Videojuego'", () => {
    const eliminarBtn = document.getElementById("eliminar-videojuego");
    const modalEliminar = document.getElementById("modal-eliminar");

    eliminarBtn.click();
    expect(modalEliminar.style.display).toBe("flex");
  });

  test("Debería cerrar el modal de agregar al hacer clic en 'Cerrar Modal Agregar'", () => {
    const cerrarAgregarBtn = document.getElementById("cerrar-modal");
    const modalAgregar = document.getElementById("modal-agregar");

    modalAgregar.style.display = "flex"; // Simula que el modal ya está abierto
    cerrarAgregarBtn.click();
    expect(modalAgregar.style.display).toBe("none");
  });

  test("Debería cerrar el modal de editar al hacer clic en 'Cerrar Modal Editar'", () => {
    const cerrarEditarBtn = document.getElementById("cerrar-modal-editar");
    const modalEditar = document.getElementById("modal-editar");

    modalEditar.style.display = "flex"; // Simula que el modal ya está abierto
    cerrarEditarBtn.click();
    expect(modalEditar.style.display).toBe("none");
  });

  test("Debería cerrar el modal de eliminar al hacer clic en 'Cerrar Modal Eliminar'", () => {
    const cerrarEliminarBtn = document.getElementById("cerrar-modal-eliminar");
    const modalEliminar = document.getElementById("modal-eliminar");

    modalEliminar.style.display = "flex"; // Simula que el modal ya está abierto
    cerrarEliminarBtn.click();
    expect(modalEliminar.style.display).toBe("none");
  });
});
