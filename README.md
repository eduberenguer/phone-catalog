# Phone Catalog

SPA de catálogo de smartphones con buscador, ficha de producto y carrito de compra,
construida con React + TypeScript + Vite y consumiendo una API REST externa.

**Demo:** https://phone-catalog-beige.vercel.app

---

## Requisitos

Se han cubierto todos los requisitos del enunciado: las tres vistas, el buscador, el estado
global con Context API, testing, diseño responsive, accesibilidad, linters y formatters,
consola sin errores ni advertencias, los dos modos de compilación y el uso de variables CSS.

La única excepción es el **renderizado en servidor (SSR)**, planteado como opcional en el
enunciado. Como muestra de trabajo con Next.js, aquí hay una aplicación propia:
[eduberenguer/recipe-app](https://github.com/eduberenguer/recipe-app).

Tampoco se implementa el control **"Filtrar"** del diseño móvil, porque el buscador ya filtra
en tiempo real contra la API y un botón que dispare el mismo filtrado sería redundante.

---

## Cómo arrancar el proyecto

**Requisitos previos:** Node.js 18 o superior (desarrollado con Node 22) y npm.

```bash
git clone https://github.com/eduberenguer/phone-catalog.git
cd phone-catalog
npm install
cp .env.example .env
```

Rellena el `.env` recién creado:

```env
VITE_API_URL=https://prueba-tecnica-api-tienda-moviles.onrender.com
VITE_API_KEY=tu-api-key
```

```bash
npm run dev
```

Disponible en `http://localhost:5173`.

> **Primera carga lenta:** la API está en el plan gratuito de Render, que apaga el servidor
> por inactividad. La primera petición tras un rato sin uso puede tardar **30-50 segundos**.
> Es del alojamiento, no de la aplicación: por eso el listado muestra skeletons reales.

---

## Stack

| Tecnología                      | Motivo                                                          |
| ------------------------------- | --------------------------------------------------------------- |
| **React 18 + TypeScript**       | Requisito del enunciado                                         |
| **Vite 5**                      | Arranque rápido y distinción nativa entre modos dev/producción  |
| **React Router v7**             | Tres vistas más el 404; API clásica, sin necesidad de data APIs |
| **Context API**                 | Requisito del enunciado para el carrito                         |
| **CSS Modules + variables CSS** | Estilos aislados y tokens centralizados, sin dependencias extra |
| **Vitest + Testing Library**    | Comparte configuración con Vite; se testea por rol accesible    |
| **Playwright**                  | E2E sobre el build de producción, no sobre el servidor de dev   |

---

## Arquitectura y estructura

El proyecto usa **agrupación por tipo**: `api/`, `hooks/`, `context/`, `components/`, `pages/`
y `styles/`, con cada componente colocalizado junto a sus estilos.

```
src/
├── api/                     # Capa de datos: no conoce React
│   ├── client.ts            # fetch + cabecera x-api-key + AbortSignal → ApiError tipado
│   ├── products.ts          # getProducts() y getProductById()
│   └── mappers.ts           # Normaliza la respuesta cruda de la API
│
├── types/                   # Tipos del dominio
│   ├── product.ts           # Product, ProductDetail, ColorOption, StorageOption, Specs
│   └── cart.ts              # CartItem
│
├── context/                 # Estado global
│   ├── cart-context.ts      # createContext + tipo del valor expuesto
│   ├── CartProvider.tsx     # Estado, persistencia en localStorage y operaciones
│   └── useCart.ts           # Hook consumidor; lanza error fuera del provider
│
├── hooks/                   # Lógica reutilizable con estado
│   ├── useProducts.ts       # Listado + búsqueda, con cancelación de peticiones
│   ├── useProductDetail.ts  # Ficha de producto, distinguiendo el 404
│   ├── useDebouncedValue.ts # Retardo genérico para el buscador
│   └── usePageTitle.ts      # document.title por vista
│
├── components/              # UI reutilizable (.tsx + .module.css)
│   ├── Layout/ Navbar/ ScrollToTop/
│   ├── SearchBar/ PhoneGrid/ PhoneCard/ Skeleton/
│   ├── StorageSelector/ ColorSelector/ SpecsTable/ SimilarProducts/ BackLink/
│   └── CartItemRow/ StatusMessage/
│
├── pages/                   # Las vistas; orquestan hooks + componentes
│   ├── PhoneList/           # Listado con buscador
│   ├── PhoneDetail/         # Ficha de producto
│   ├── Cart/                # Carrito
│   └── NotFound/            # 404
│
├── styles/
│   ├── tokens.css           # Variables CSS: colores, tipografía, espaciado
│   ├── global.css           # Reset mínimo y tipografía base
│   └── container.module.css # Contenedor centrado compartido por Navbar y Layout
│
├── utils/format.ts          # formatPrice()
├── router.tsx               # Definición de rutas
└── main.tsx                 # Punto de entrada
```

**Flujo de datos:** componente → hook → `api/products.ts` → `api/client.ts` → API, con
`api/mappers.ts` normalizando la respuesta antes de llegar al estado. El carrito va aparte:
`useCart()` → `CartProvider` → `localStorage`.

### Por qué esta estructura y no Clean Architecture

Se valoró organizarlo por capas, y el reparto habría sido este:

| Capa            | Contenido                         |
| --------------- | --------------------------------- |
| Dominio         | `types/`                          |
| Infraestructura | `api/` (cliente y mappers)        |
| Aplicación      | —                                 |
| UI              | `hooks/`, `components/`, `pages/` |

La capa de aplicación se quedaba vacía, y esa es la razón de descartarlo: los casos de uso
aquí son pedir un listado y sumar un carrito en memoria, sin reglas de negocio propias que
aislar. Serían clases envolviendo una llamada a `fetch`.

La separación que sí importa está igualmente: `api/` no importa nada de React, los componentes
nunca llaman a `fetch` (la frontera son los hooks) y el carrito solo se toca a través de
`useCart`.

---

## Decisiones técnicas

**Búsqueda con retardo y cancelación.** El buscador espera 300 ms antes de lanzar la petición
y aborta la anterior si sigue en vuelo, para que una respuesta antigua no pise a una reciente.

**Identificador propio por línea de carrito.** Cada línea lleva un `lineId` generado con
`crypto.randomUUID()`, porque sin selector de cantidad añadir dos veces la misma variante debe
crear dos líneas independientes.

**Persistencia automática.** El carrito se guarda en `localStorage` mediante un `useEffect`
sobre el estado, de forma que cualquier operación presente o futura queda persistida sin
tener que acordarse; un JSON corrupto arranca vacío en lugar de romper la aplicación.

**Precios sin separador de millares.** `formatPrice()` usa `Intl.NumberFormat` con `en-US` y
un máximo de dos decimales, que solo aparecen si existen: `1219 EUR`, `553.31 EUR`.

**La clave de API viaja en el cliente.** Es inevitable en una SPA sin backend propio y así lo
plantea el enunciado; en un proyecto real iría tras un proxy que añadiese la cabecera.

**Reescritura de rutas en Vercel.** `vercel.json` redirige todo a `index.html`, sin lo cual
recargar en `/cart` o `/phone/XXX` devolvería el 404 de Vercel en vez de resolver el router.

---

## Modos de desarrollo y producción

`vite.config.ts` activa la minificación solo en producción y los sourcemaps solo fuera de
ella. Diferencia real medida con `npm run build` frente a `npm run build:dev`:

| Modo           | JavaScript | Gzip     | Sourcemap |
| -------------- | ---------- | -------- | --------- |
| **Producción** | 196,37 kB  | 64,71 kB | —         |
| **Desarrollo** | 332,92 kB  | 82,05 kB | 831,25 kB |

---

## Trampas de los datos reales

La API se auditó producto a producto antes de escribir la interfaz:

**Un producto viene duplicado.** El id `XMI-RN13P5G` aparece dos veces, así que `dedupeById()`
lo filtra en la capa de mapeo para evitar el aviso de `key` duplicada: por eso salen 19
tarjetas y no 20.

**No todos los móviles traen las mismas `specs`.** `screenRefreshRate` falta en uno y `storage`
solo aparece en 1 de los 23, así que todas las claves se declaran opcionales y la tabla pinta
solo las presentes, en lugar de dejar propiedades sin valor.

**`basePrice` engaña: no es el precio más bajo.** En 5 de los 23 productos alguna variante
cuesta menos (el Galaxy S24 Ultra anuncia 1329 y su versión de 256 GB vale 1229). El listado
muestra `basePrice` porque es lo único que devuelve `/products`, pero la ficha calcula el
mínimo real sobre `storageOptions` para el texto `From X EUR`.

**Todas las imágenes vienen por `http://`.** Se normalizan a `https` en el mapeo, porque en
producción el navegador bloquearía el contenido mixto.

**Formatos inconsistentes.** Conviven `"128 GB"` y `"128GB"`, o `XIAOMI` y `Xiaomi`, así que la
capacidad se normaliza y el resto se uniformiza al mostrarlo.

**El detalle no devuelve `imageUrl` en la raíz.** Se usa la imagen de la primera opción de
color como principal.

**Los nombres de color mezclan idiomas.** Se muestran tal cual por ser datos de la API y no
texto propio de la interfaz.

**El encuadre del móvil cambia en cada foto.** Los archivos no comparten tamaño ni proporción y
el móvil ocupa entre el 61% y el 100% del alto de su imagen, así que unos se ven hasta el doble
de grandes que otros. Se prototipó corregirlo en el navegador midiendo el canal alfa y
reencuadrando con relleno (la variación bajaba de 2,01x a 1,24x), pero se descartó: gastaría
CPU del usuario en cada visita, el resultado no es cacheable por CDN y no arregla la URL
canónica. En producción se resuelve al subir la imagen o con un CDN de imágenes.

---

## Testing

**50 tests unitarios y de componentes** con Vitest y Testing Library, cubriendo la capa de API
y sus mappers, el carrito completo, los hooks y las cuatro vistas.

**2 tests end to end** con Playwright, que recorren los dos flujos de compra completos
(buscar → ficha → elegir variante → añadir → eliminar, y el mismo camino hasta pagar) sobre el
build de producción y contra la API real.

```bash
npm test          # unitarios y de componentes
npm run test:e2e  # end to end
```

---

## Accesibilidad y calidad de código

Todo lo interactivo es un `<button>` o `<a>` real, los selectores de color y almacenamiento son
`radiogroup` con `aria-checked`, las imágenes llevan `alt`, el contador del carrito se anuncia
con `aria-label`, los resultados de búsqueda viven en una región `aria-live` y cada vista tiene
su propio título de página. Se verifica automáticamente con `eslint-plugin-jsx-a11y`, junto a
ESLint, Prettier, commitlint y Husky, que se ejecutan antes de cada commit. La consola del
navegador está limpia en las tres vistas, tanto en desarrollo como sobre el build de
producción.

```bash
npm run lint    # ESLint, incluidas las reglas de accesibilidad
npm run format  # Prettier
```
