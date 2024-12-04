const { JSDOM } = require("jsdom");

describe("Pruebas unitarias para videojuegos.js", () => {
  let dom, document;

  beforeEach(() => {
    dom = new JSDOM(`
      <!DOCTYPE html>
      <html>
        <body>
          <form id="form-agregar-videojuego">
            <input id="videojuego-titulo" name="titulo" value="Nuevo Juego">
            <input id="videojuego-precio" name="precio" value="49.99">
            <input id="videojuego-categoria" name="categoria" value="Aventura">
          </form>
          <div id="contenedor-productos"></div>
          <div id="modal-agregar" style="display: none;"></div>
        </body>
      </html>
    `);
    document = dom.window.document;

    global.document = document;
    global.fetch = jest.fn();
    require("public\js\videojuego.js");
  });

  afterEach(() => {
    jest.resetModules();
    delete global.document;
    delete global.fetch;
  });

  test("Debería agregar un videojuego al DOM después de un envío exitoso", async () => {
    fetch.mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          success: true,
          videojuego: {
            id: 1,
            titulo: "Nuevo Juego",
            precio: "$49.99",
            imagen: "/img/nuevo-juego.jpg",
          },
        }),
    });

    const form = document.getElementById("form-agregar-videojuego");
    form.dispatchEvent(new dom.window.Event("submit"));

    expect(fetch).toHaveBeenCalledWith(
      "/agregar-videojuego",
      expect.anything()
    );

    await new Promise((resolve) => setTimeout(resolve, 0));

    const producto = document.querySelector(".producto");
    expect(producto).not.toBeNull();
    expect(producto.dataset.id).toBe("1");
    expect(producto.querySelector(".producto-titulo").textContent).toBe(
      "Nuevo Juego"
    );
    expect(producto.querySelector(".producto-precio").textContent).toBe(
      "$49.99"
    );
  });
});
