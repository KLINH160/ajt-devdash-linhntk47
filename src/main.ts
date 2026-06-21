import { fetchProducts, fetchProductById } from './api';
import { renderProducts, renderProductDetail } from './ui';
import type { Product } from './types';

const app = document.querySelector<HTMLDivElement>('#app')!;
let allProducts: Product[] = [];

async function renderHomePage() {
  app.innerHTML = `
    <div style="max-width: 600px; margin: 0 auto; font-family: sans-serif;">
      <h1>DevDash Products</h1>
      <input type="text" id="searchInput" placeholder="Tìm kiếm..." style="padding: 10px; width: 100%; margin-bottom: 20px;">
      <div id="productList">${renderProducts(allProducts)}</div>
    </div>
  `;

  document.querySelector('#searchInput')!.addEventListener('input', (e) => {
    const searchTerm = (e.target as HTMLInputElement).value.toLowerCase();
    const filtered = allProducts.filter(p => p.title.toLowerCase().includes(searchTerm));
    document.querySelector('#productList')!.innerHTML = renderProducts(filtered);
  });
}

document.addEventListener('click', async (e) => {
  const target = e.target as HTMLElement;

  if (target.classList.contains('btn-detail')) {
    const id = Number(target.getAttribute('data-id'));
    app.innerHTML = `<h2>Đang tải chi tiết...</h2>`;
    try {
      const product = await fetchProductById(id);
      app.innerHTML = renderProductDetail(product);
    } catch (error) {
      app.innerHTML = `<h2 style="color: red;">Lỗi tải chi tiết!</h2><button id="btn-back">Quay lại</button>`;
    }
  }

  if (target.id === 'btn-back') {
    renderHomePage();
  }
});

async function init() {
  try {
    app.innerHTML = `<h2>Đang tải dữ liệu (Loading)...</h2>`;
    const data = await fetchProducts();
    allProducts = data.products;
    renderHomePage();
  } catch (error) {
    app.innerHTML = `<h2 style="color: red;">Lỗi tải dữ liệu. Vui lòng thử lại sau!</h2>`;
  }
}

init();