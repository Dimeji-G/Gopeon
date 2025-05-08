// 1. CONFIG: map each category key → folder name
const categoryConfig = {
  food:      'Frozen',
  drinks:    'Drinks',
  biscuits:  'Biscuits',
  electronics: 'Electronics'
};

// 2. DYNAMIC: scan each folder to get its image count
//    (you’ll need to fill in a real implementation of getImageCount)
function getImageCount(folderName) {
  // TODO: replace this stub with your own logic—e.g. 
  //       an API call, or a server-side endpoint that returns file counts.
  // For now we’ll just fall back to your hard-coded numbers:
  const fallback = { Frozen:110, Drinks:36, Biscuits:19, Electronics:0 };
  return fallback[folderName] || 0;
}

// 3. GENERATE product arrays
function generateProductData(folderName, count) {
  return Array.from({ length: count }, (_, i) => ({
    name:   `${folderName} Item ${i+1}`,
    image:  `Images/${folderName}/${i+1}.jpeg`
  }));
}

const products = {};
for (let [key, folder] of Object.entries(categoryConfig)) {
  const count = getImageCount(folder);
  products[key] = generateProductData(folder, count);
}

// 4. PAGINATION state
const currentPage = Object.fromEntries(
  Object.keys(categoryConfig).map(k => [k, 0])
);

const itemsPerPage = {
  initial: 5,
  loadMore: 10
};

// 5. RENDERING
function createProductCard({ name, image }) {
  return `
    <div class="product-card">
      <a href="${image}">
        <img src="${image}" alt="${name}">
      </a>
      <div class="product-info">
        <h3>${name}</h3>
      </div>
    </div>
  `;
}

function loadMore(category) {
  const page = currentPage[category];
  const start = page * itemsPerPage.loadMore;
  const count = (page === 0 ? itemsPerPage.initial : itemsPerPage.loadMore);
  const slice = products[category].slice(start, start + count);

  // append cards
  const grid = document.getElementById(`${category}Grid`);
  slice.forEach(p => grid.insertAdjacentHTML('beforeend', createProductCard(p)));

  // advance page
  currentPage[category]++;

  // hide “load more” if done
  const totalLoaded = currentPage[category] * itemsPerPage.loadMore;
  if (totalLoaded >= products[category].length) {
    document.querySelector(`#${category} .load-more`).style.display = 'none';
  }
}

// 6. INITIALIZE on page load
document.addEventListener('DOMContentLoaded', () => {
  if (!window.location.pathname.includes('products.html')) return;

  // for each category: render first batch *and* attach its button
  Object.keys(categoryConfig).forEach(category => {
    loadMore(category);

    const btn = document.querySelector(`#${category} .load-more`);
    if (btn) {
      btn.addEventListener('click', () => loadMore(category));
      // hide button immediately if no items at all
      if (products[category].length === 0) btn.style.display = 'none';
    }
  });
});
