import type { Product } from './types';


export function renderProducts(products: Product[]): string {
  if (products.length === 0) return `<p>Không tìm thấy sản phẩm nào!</p>`;
  
  return products.map(product => `
    <div style="border: 1px solid #ccc; margin: 10px; padding: 15px; border-radius: 8px;">
      <h3>${product.title}</h3>
      <p>Giá: <strong>$${product.price}</strong></p>
      <!-- Gắn class btn-detail và data-id để main.ts bắt sự kiện -->
      <button class="btn-detail" data-id="${product.id}" style="padding: 5px 10px; cursor: pointer;">Xem chi tiết</button>
    </div>
  `).join('');
}

export function renderProductDetail(product: Product): string {
  return `
    <div style="max-width: 600px; margin: 0 auto; font-family: sans-serif;">
      <button id="btn-back" style="margin-bottom: 20px; padding: 5px 10px; cursor: pointer;">⬅ Quay lại danh sách</button>
      <h2>${product.title}</h2>
      <h3 style="color: green;">Giá: $${product.price}</h3>
      <p><strong>Mô tả:</strong> ${product.description}</p>
    </div>
  `;
}