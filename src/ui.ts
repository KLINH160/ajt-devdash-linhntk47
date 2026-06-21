import type { Product } from './types';

export function renderProducts(products: Product[]): string {
  if (products.length === 0) return `<p>Không tìm thấy sản phẩm nào!</p>`;
  
  return `
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px;">
      ${products.map(product => `
        <div style="border: 1px solid #ddd; padding: 15px; border-radius: 8px; text-align: center; box-shadow: 2px 2px 8px rgba(0,0,0,0.1);">
          <img src="${product.thumbnail}" alt="${product.title}" style="width: 100%; height: 180px; object-fit: cover; border-radius: 4px;">
          <h3 style="font-size: 16px; margin: 10px 0;">${product.title}</h3>
          <p style="color: gray; font-size: 12px; text-transform: capitalize;">${product.category}</p>
          <p>Giá: <strong style="color: green; font-size: 18px;">$${product.price}</strong></p>
          <button class="btn-detail" data-id="${product.id}" style="padding: 8px 15px; cursor: pointer; background: #007bff; color: white; border: none; border-radius: 4px; margin-top: 10px;">Xem chi tiết</button>
        </div>
      `).join('')}
    </div>
  `;
}

export function renderProductDetail(product: Product): string {
  return `
    <div style="max-width: 600px; margin: 0 auto; font-family: sans-serif; text-align: center; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
      <button id="btn-back" style="margin-bottom: 20px; padding: 8px 15px; cursor: pointer; background: #6c757d; color: white; border: none; border-radius: 4px;">⬅ Quay lại danh sách</button>
      <br>
      <img src="${product.thumbnail}" style="width: 100%; max-width: 300px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
      <h2>${product.title}</h2>
      <span style="background: #e9ecef; padding: 4px 8px; border-radius: 12px; font-size: 12px; color: #495057;">${product.category}</span>
      <h3 style="color: green; font-size: 24px;">$${product.price}</h3>
      <p style="text-align: left; line-height: 1.6;"><strong>Mô tả:</strong> ${product.description}</p>
    </div>
  `;
}