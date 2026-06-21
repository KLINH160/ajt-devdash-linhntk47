(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();async function e(e){let t=await fetch(e);if(!t.ok)throw Error(`Lỗi mạng: ${t.status}`);return await t.json()}async function t(){try{return await e(`https://dummyjson.com/products`)}catch(e){throw console.error(`Lỗi tải sản phẩm:`,e),e}}async function n(t){try{return await e(`https://dummyjson.com/products/${t}`)}catch(e){throw console.error(`Lỗi tải chi tiết:`,e),e}}async function r(){return await e(`https://dummyjson.com/products/categories`)}function i(e){return e.length===0?`<p>Không tìm thấy sản phẩm nào!</p>`:`
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px;">
      ${e.map(e=>`
        <div style="border: 1px solid #ddd; padding: 15px; border-radius: 8px; text-align: center; box-shadow: 2px 2px 8px rgba(0,0,0,0.1);">
          <img src="${e.thumbnail}" alt="${e.title}" style="width: 100%; height: 180px; object-fit: cover; border-radius: 4px;">
          <h3 style="font-size: 16px; margin: 10px 0;">${e.title}</h3>
          <p style="color: gray; font-size: 12px; text-transform: capitalize;">${e.category}</p>
          <p>Giá: <strong style="color: green; font-size: 18px;">$${e.price}</strong></p>
          <button class="btn-detail" data-id="${e.id}" style="padding: 8px 15px; cursor: pointer; background: #007bff; color: white; border: none; border-radius: 4px; margin-top: 10px;">Xem chi tiết</button>
        </div>
      `).join(``)}
    </div>
  `}function a(e){return`
    <div style="max-width: 600px; margin: 0 auto; font-family: sans-serif; text-align: center; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
      <button id="btn-back" style="margin-bottom: 20px; padding: 8px 15px; cursor: pointer; background: #6c757d; color: white; border: none; border-radius: 4px;">⬅ Quay lại danh sách</button>
      <br>
      <img src="${e.thumbnail}" style="width: 100%; max-width: 300px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
      <h2>${e.title}</h2>
      <span style="background: #e9ecef; padding: 4px 8px; border-radius: 12px; font-size: 12px; color: #495057;">${e.category}</span>
      <h3 style="color: green; font-size: 24px;">$${e.price}</h3>
      <p style="text-align: left; line-height: 1.6;"><strong>Mô tả:</strong> ${e.description}</p>
    </div>
  `}var o={status:`idle`};function s(e){o=e,console.log(`Trạng thái app hiện tại:`,o.status)}var c=document.querySelector(`#app`),l=[];function u(e,t){let n;return(...r)=>{clearTimeout(n),n=setTimeout(()=>e(...r),t)}}async function d(){c.innerHTML=`
    <div style="max-width: 1000px; margin: 0 auto; font-family: sans-serif;">
      <h1 style="text-align: center;">DevDash Store</h1>
      <input type="text" id="searchInput" placeholder="Gõ tên sản phẩm... (chức năng tìm kiếm đã tối ưu Debounce)" style="padding: 12px; width: 100%; margin-bottom: 20px; box-sizing: border-box; border-radius: 6px; border: 1px solid #ccc; font-size: 16px;">
      <div id="productList">${i(l)}</div>
    </div>
  `;let e=u(e=>{let t=e.target.value.toLowerCase(),n=l.filter(e=>e.title.toLowerCase().includes(t));document.querySelector(`#productList`).innerHTML=i(n)},500);document.querySelector(`#searchInput`).addEventListener(`input`,e)}document.addEventListener(`click`,async e=>{let t=e.target;if(t.classList.contains(`btn-detail`)){let e=Number(t.getAttribute(`data-id`));c.innerHTML=`<h2 style="text-align: center; margin-top: 50px;">Đang tải chi tiết...</h2>`;try{c.innerHTML=a(await n(e))}catch{c.innerHTML=`<h2 style="color: red; text-align: center;">Lỗi tải chi tiết!</h2><button id="btn-back">Quay lại</button>`}}t.id===`btn-back`&&d()});async function f(){try{c.innerHTML=`<h2 style="text-align: center; margin-top: 50px;">Đang tải dữ liệu (Loading)...</h2>`;let[e,n]=await Promise.all([t(),r()]);console.log(`Danh mục đã tải song song:`,n),l=e.products,s({status:`success`,data:l}),d()}catch{s({status:`error`,error:`Fetch failed`}),c.innerHTML=`<h2 style="color: red; text-align: center;">Lỗi tải dữ liệu. Vui lòng thử lại sau!</h2>`}}f();