import type { Product } from './types';

export function renderProducts(products: Product[]): string {
  if (products.length === 0) {
    return `<p>Không tìm thấy sản phẩm nào!</p>`;
  }

  return products.map(product => `
    <div style="border: 1px solid #ccc; margin: 10px; padding: 15px; border-radius: 8px;">
      <h3>${product.title}</h3>
      <p>Giá: <strong>$${product.price}</strong></p>
      <button style="padding: 5px 10px; cursor: pointer;">Xem chi tiết</button>
    </div>
  `).join('');
}