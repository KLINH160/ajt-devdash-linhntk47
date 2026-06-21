
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnail: string; 
  category: string;  
}

export interface ProductResponse {
  products: Product[];
}

export type ProductCardDTO = Pick<Product, 'id' | 'title' | 'price' | 'thumbnail' | 'category'>;