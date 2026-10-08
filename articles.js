let total = 0;
let currentCategory = "Tous";

// Chargement des articles depuis Supabase
async function loadArticles() {
  const { data, error } = await supabase.from("articles").select("*").order("id");
  if (error) {
    document.getElementById("products").innerHTML =
      "<p class='error'>⚠️ Impossible de charger les articles.</p>";
    return;
  }
  buildFilters(data);
  displayArticles(data);
}

// Filtres par catégorie
function buildFilters(data) {
  const categories = ["Tous", ...new Set(data.map(a => a.categorie))];
  const filtersEl = document.getElementById("filters");
  filtersEl.innerHTML = categories.map(c =>
    `<button class="filter-btn ${c === "Tous" ? "active" : ""}" onclick="filterCat('${c}', this)">${c}</button>`
  ).join("");
}

function filterCat(cat, btn) {
  currentCategory = cat;
  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  loadFiltered();
}

async function loadFiltered() {
  const { data } = await supabase.from("articles").select("*").order("id");
  const filtered = currentCategory === "Tous"
    ? data
    : data.filter(a => a.categorie === currentCategory);
  displayArticles(filtered);
}

// Affichage des articles
function displayArticles(articles) {
  const container = document.getElementById("products");
  if (!articles || articles.length === 0) {
    container.innerHTML = "<p>Aucun article disponible.</p>";
    return;
  }
  container.innerHTML = articles.map(a => `
    <div class="product-card">
      <div class="product-img">🛒</div>
      <h3>${a.nom}</h3>
      <p class="product-cat">${a.categorie}</p>
      <p class="product-price">${Number(a.prix).toFixed(2)} $</p>
      <button class="btn" onclick="addTotal(${a.prix})">+ Ajouter au total</button>
    </div>
  `).join("");
}

// Total (pas de panier — juste le montant affiché)
function addTotal(price) {
  total += Number(price);
  updateTotal();
}

function resetTotal() {
  total = 0;
  updateTotal();
}

function updateTotal() {
  document.getElementById("totalAmount").textContent = total.toFixed(2) + " $";
}

loadArticles();
