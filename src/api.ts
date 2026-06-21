import type { ProductResponse, Product } from './types';

export async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Lỗi mạng: ${res.status}`);
  }
  return await res.json();
}

export async function fetchProducts(): Promise<ProductResponse> {
  try {
    return await fetchJson<ProductResponse>('https://dummyjson.com/products');
  } catch (error) {
    console.error("Lỗi tải sản phẩm:", error);
    throw error;
  }
}


export async function fetchProductById(id: number): Promise<Product> {
  try {
    return await fetchJson<Product>(`https://dummyjson.com/products/${id}`);
  } catch (error) {
    console.error("Lỗi tải chi tiết:", error);
    throw error;
  }
}