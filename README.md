# MateStore

Single Page Application de e-commerce de productos materos argentinos. El proyecto prioriza una estructura simple, modular y fácil de explicar.

## Funcionalidades

- Catálogo completo y filtro por categoría desde Firestore.
- Detalle individual con selector de cantidad y validación de stock.
- Carrito global con React Context: agrega, acumula, elimina y calcula totales.
- Checkout validado y creación de órdenes en la colección `orders`.
- Estados de carga, catálogo vacío, error y compra exitosa.
- Diseño responsive con CSS puro.

## Tecnologías

- React + Vite
- React Router DOM
- Firebase / Cloud Firestore
- Context API y Hooks
- CSS puro por componentes

## Instalación y ejecución

```bash
npm install
npm run dev
```

Para verificar o generar la versión de producción:

```bash
npm run build
npm run preview
```

## Configuración de Firebase

1. Crear un proyecto en [Firebase Console](https://console.firebase.google.com/).
2. Crear una aplicación web y una base de datos Cloud Firestore.
3. Copiar las credenciales de la aplicación.
4. Reemplazar los placeholders de `src/firebase/config.js`.
5. Configurar reglas de Firestore que permitan las lecturas de `products` y la creación de `orders` según el entorno de entrega.

No se incluye una configuración real para evitar publicar credenciales asociadas a un proyecto personal.

## Cargar productos en Firestore

Crear una colección llamada `products`. El archivo `src/data/products.js` contiene ocho objetos de referencia. Para cada objeto:

1. Crear un documento dentro de `products`.
2. Usar preferentemente el valor `id` del mock como ID del documento (por ejemplo, `mate-camionero`).
3. Cargar los campos `name`, `category`, `description`, `price`, `stock` e `image` con sus tipos correspondientes.
4. El campo `id` no necesita guardarse dentro del documento: la aplicación toma el ID de Firestore.

Las categorías deben escribirse exactamente como `mates`, `bombillas`, `termos`, `yerbas` o `combos` para que los filtros coincidan.

## Rutas

- `/`: catálogo completo.
- `/category/:categoryId`: catálogo filtrado.
- `/item/:itemId`: detalle de producto.
- `/cart`: carrito.
- `/checkout`: formulario de compra.

## Conceptos de React aplicados

- Componentes reutilizables y props para distribuir información.
- `useState` para cantidades, formularios y estados de carga.
- `useEffect` para consultar Firestore al cambiar una ruta.
- `useParams` para leer categorías e IDs.
- Context API y hook `useCart` para compartir el carrito.
- Eventos controlados en botones y formulario.
- Renderizado condicional para carga, errores, stock y confirmación.
- React Router para navegación sin recargar la página.
