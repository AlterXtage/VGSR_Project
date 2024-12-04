// tests/categoria.test.js
const { JSDOM } = require("jsdom");

describe("Pruebas unitarias para categoria.js", () => {
  let dom, document;

  beforeEach(() => {
    // Configurar un entorno DOM simulado
    dom = new JSDOM(`
      <!DOCTYPE html>
      <html>
        <body>
          <button id="nueva-categoria">Agregar Categoría</button>
          <div id="modal-agregar-categoria" style="display: none;"></div>
          <button id="cerrar-modal-categoria">Cerrar</button>
          <form id="agregarCategoriaForm">
            <input id="categoriaNombre" value="Nueva categoría" />
            <button type="submit">Agregar</button>
          </form>
        </body>
      </html>
    `);
    document = dom.window.document;

    // Simular el código de categoria.js
    require("../src/categoria");
  });

  afterEach(() => {
    jest.resetModules(); // Reinicia los módulos después de cada prueba
  });

  test("Debería mostrar el modal al hacer clic en 'Agregar Categoría'", () => {
    const nuevaCategoriaBtn = document.getElementById("nueva-categoria");
    const modal = document.getElementById("modal-agregar-categoria");

    nuevaCategoriaBtn.click();
    expect(modal.style.display).toBe("flex");
  });

  test("Debería cerrar el modal al hacer clic en 'Cerrar'", () => {
    const cerrarModalBtn = document.getElementById("cerrar-modal-categoria");
    const modal = document.getElementById("modal-agregar-categoria");

    modal.style.display = "flex"; // Simula que el modal ya está abierto
    cerrarModalBtn.click();
    expect(modal.style.display).toBe("none");
  });

  test("Debería enviar datos de la nueva categoría al servidor", async () => {
    // Simular `fetch`
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ success: true }),
      })
    );

    const form = document.getElementById("agregarCategoriaForm");
    const categoriaNombreInput = document.getElementById("categoriaNombre");

    // Simula el envío del formulario
    const submitEvent = new dom.window.Event("submit");
    form.dispatchEvent(submitEvent);

    expect(fetch).toHaveBeenCalledWith("/agregar-categoria", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre: categoriaNombreInput.value }),
    });

    // Restaurar fetch
    global.fetch.mockClear();
    delete global.fetch;
  });
});
