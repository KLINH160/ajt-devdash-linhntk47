import { fetchProducts } from './api';

const app = document.querySelector<HTMLDivElement>('#app')!;

async function initDashboard() {
  try {
    app.innerHTML = `<h2>Đang tải dữ liệu (Loading)...</h2>`;
    
    const data = await fetchProducts();
    
    const productHTML = data.products.map(product => `
      <div style="border: 1px solid #ccc; margin: 10px; padding: 10px;">
        <h3>${product.title}</h3>
        <p>Giá: $${product.price}</p>
        <button onclick="alert('Đang làm tính năng chi tiết!')">Xem chi tiết</button>
      </div>
    `).join('');
    
    app.innerHTML = `
      <h1>DevDash Products</h1>
      ${productHTML}
    `;

  } catch (error) {
    app.innerHTML = `<h2 style="color: red;">Lỗi tải dữ liệu. Vui lòng thử lại sau!</h2>`;
  }
}

initDashboard();