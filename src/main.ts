import { fetchProducts, fetchProductById, fetchCategories } from './api';
import { renderProducts, renderProductDetail } from './ui';
import type { Product } from './types';
import { updateState } from './state';  

const app = document.querySelector<HTMLDivElement>('#app')!;
let allProducts: Product[] = [];

function debounce(func: Function, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

async function renderHomePage() {
  app.innerHTML = `
    <div style="max-width: 1000px; margin: 0 auto; font-family: sans-serif;">
      <h1 style="text-align: center;">DevDash Store</h1>
      <input type="text" id="searchInput" placeholder="Gõ tên sản phẩm... " style="padding: 12px; width: 100%; margin-bottom: 20px; box-sizing: border-box; border-radius: 6px; border: 1px solid #ccc; font-size: 16px;">
      <div id="productList">${renderProducts(allProducts)}</div>
    </div>
  `;

  const handleSearch = debounce((e: Event) => {
    const searchTerm = (e.target as HTMLInputElement).value.toLowerCase();
    const filtered = allProducts.filter(p => p.title.toLowerCase().includes(searchTerm));
    document.querySelector('#productList')!.innerHTML = renderProducts(filtered);
  }, 500); 

  document.querySelector('#searchInput')!.addEventListener('input', handleSearch);
}

document.addEventListener('click', async (e) => {
  const target = e.target as HTMLElement;

  if (target.classList.contains('btn-detail')) {
    const id = Number(target.getAttribute('data-id'));
    app.innerHTML = `<h2 style="text-align: center; margin-top: 50px;">Đang tải chi tiết...</h2>`;
    try {
      const product = await fetchProductById(id);
      app.innerHTML = renderProductDetail(product);
    } catch (error) {
      app.innerHTML = `<h2 style="color: red; text-align: center;">Lỗi tải chi tiết!</h2><button id="btn-back">Quay lại</button>`;
    }
  }

  if (target.id === 'btn-back') {
    renderHomePage();
  }
});

async function init() {
  try {
    app.innerHTML = `<h2 style="text-align: center; margin-top: 50px;">Đang tải dữ liệu (Loading)...</h2>`;
    
    const [productsData, categoriesData] = await Promise.all([
      fetchProducts(),
      fetchCategories()
    ]);
    
    console.log("Danh mục đã tải song song:", categoriesData); 
    allProducts = productsData.products;

    updateState({ status: 'success', data: allProducts });
    
    renderHomePage();
  } catch (error) {
    updateState({ status: 'error', error: 'Fetch failed' });
    app.innerHTML = `<h2 style="color: red; text-align: center;">Lỗi tải dữ liệu. Vui lòng thử lại sau!</h2>`;
  }
}

init();