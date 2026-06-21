import type { ProductResponse } from './types';

export async function fetchProducts(): Promise<ProductResponse> {
  try {
    const res = await fetch('https://dummyjson.com/products');
    
    if (!res.ok) {
      throw new Error(`Lỗi mạng: ${res.status}`);
    }
    
    const data: ProductResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Lỗi khi tải dữ liệu:", error);
    throw error;
  }
}