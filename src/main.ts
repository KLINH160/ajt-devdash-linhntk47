import { fetchProducts } from './api';
import { renderProducts } from './ui';
import type { Product } from './types';

const app = document.querySelector<HTMLDivElement>('#app')!;

let allProducts: Product[] = [];

async function initDashboard() {
  try {
    app.innerHTML = `<h2>Đang tải dữ liệu (Loading)...</h2>`;
    
    const data = await fetchProducts();
    allProducts = data.products; 
    
    app.innerHTML = `
      <div style="max-width: 600px; margin: 0 auto; font-family: sans-serif;">
        <h1>DevDash Products</h1>
        <input 
          type="text" 
          id="searchInput" 
          placeholder="Tìm kiếm sản phẩm theo tên..." 
          style="padding: 10px; width: 100%; margin-bottom: 20px; font-size: 16px; box-sizing: border-box;"
        >
        <div id="productList">
          ${renderProducts(allProducts)}
        </div>
      </div>
    `;

    const searchInput = document.querySelector<HTMLInputElement>('#searchInput')!;
    const productList = document.querySelector<HTMLDivElement>('#productList')!;

    searchInput.addEventListener('input', (e) => {
      const searchTerm = (e.target as HTMLInputElement).value.toLowerCase();
      
      const filteredProducts = allProducts.filter(product => 
        product.title.toLowerCase().includes(searchTerm)
      );
      
      productList.innerHTML = renderProducts(filteredProducts);
    });

  } catch (error) {
    app.innerHTML = `<h2 style="color: red;">Lỗi tải dữ liệu. Vui lòng thử lại sau!</h2>`;
  }
}

initDashboard();