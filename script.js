
// Sample product data (replace with your actual products)
const products = {
  food: [
    { name: 'Fresh Chicken', price: '$9.99', image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781' },
    // Add more food items here
  ],
  electronics: [
    { name: 'Smart Watch', price: '$199.99', image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12' },
    // Add more electronics items here
  ]
};

let currentPage = {
  food: 0,
  electronics: 0
};

const itemsPerPage = 20;

function createProductCard(product) {
  return `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}">
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>${product.price}</p>
      </div>
    </div>
  `;
}

function loadMore(category) {
  const grid = document.getElementById(`${category}Grid`);
  const start = currentPage[category] * itemsPerPage;
  const items = products[category].slice(start, start + itemsPerPage);
  
  if (items.length > 0) {
    items.forEach(item => {
      grid.innerHTML += createProductCard(item);
    });
    currentPage[category]++;
  }
  
  if ((currentPage[category] * itemsPerPage) >= products[category].length) {
    document.querySelector(`#${category} .load-more`).style.display = 'none';
  }
}

// Initialize product grids
document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.includes('products.html')) {
    loadMore('food');
    loadMore('electronics');
  }
});
