const { JSDOM } = require("jsdom");
const { filtrarProductos } = require("../src/filtro");

describe("Pruebas unitarias para filtro.js", () => {
  let dom, document;

  beforeEach(() => {
    dom = new JSDOM(`
      <!DOCTYPE html>
      <html>
        <body>
          <div id="categorias">
            <button class="category" data-categoria="todos">Todos</button>
            <button class="category" data-categoria="accion">Acción</button>
            <button class="category" data-categoria="aventura">Aventura</button>
          </div>
          <div id="productos">
            <div class="producto" data-categoria="accion" style="display: block;">Producto 1</div>
            <div class="producto" data-categoria="aventura" style="display: block;">Producto 2</div>
            <div class="producto" data-categoria="accion" style="display: block;">Producto 3</div>
          </div>
        </body>
      </html>
    `);

    document = dom.window.document;
    global.document = document;
    require("../src/filtro"); // Importar el archivo original
  });

  afterEach(() => {
    jest.resetModules();
    delete global.document;
  });

  test("Debería mostrar todos los productos si se selecciona 'todos'", () => {
    filtrarProductos("todos");

    const productos = document.querySelectorAll(".producto");
    productos.forEach((producto) => {
      expect(producto.style.display).toBe("block");
    });
  });

  test("Debería mostrar solo productos de la categoría 'acción'", () => {
    filtrarProductos("accion");

    const productos = document.querySelectorAll(".producto");
    productos.forEach((producto) => {
      const categoria = producto.getAttribute("data-categoria");
      if (categoria === "accion") {
        expect(producto.style.display).toBe("block");
      } else {
        expect(producto.style.display).toBe("none");
      }
    });
  });

  test("Debería mostrar solo productos de la categoría 'aventura'", () => {
    filtrarProductos("aventura");

    const productos = document.querySelectorAll(".producto");
    productos.forEach((producto) => {
      const categoria = producto.getAttribute("data-categoria");
      if (categoria === "aventura") {
        expect(producto.style.display).toBe("block");
      } else {
        expect(producto.style.display).toBe("none");
      }
    });
  });
});
