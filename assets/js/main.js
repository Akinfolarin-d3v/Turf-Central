/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

    /* Menu show */
    if(navToggle){
        navToggle.addEventListener('click', () =>{
            navMenu.classList.add('show-menu')
        })
    }

    /* Menu hidden */
    if(navClose){
        navClose.addEventListener('click', () =>{
            navMenu.classList.remove('show-menu')
        })
    }


/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    //when we click on each nav--link, we remmove the show-menu //
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== SWIPER CLOTHING ===============*/
let swiperHome = new Swiper('.home__swiper', {
    loop: true,
    grabCursor: true,
    slidesPerview: 'auto',
   
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }, 
    
    breakpoints:{
        768:{
            slidesPerview: 3,
            centeredSlides: 'auto'
        },
        1152:{
            centeredSlides: 'auto',
            spaceBetween: -64,
        }
    }
})


/*=============== CHANGE BACKGROUND HEADER ===============*/
const bgHeader = () =>{
    const header = document.getElementById('header')
    this.scrollY >= 50 ? header.classList.add('bg-header')
    : header.classList.remove('bg-header')
}
window.addEventListener('scroll', bgHeader)


/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    //reset: true // animations repeat
})
sr.reveal('.home__swiper, .home__footer')
sr.reveal('.home__circle', {scale: 1.5, delay: 300})
sr.reveal('.home__subcircle', {scale: 1.5, delay: 500})
sr.reveal('.home__title', {scale: 1, origin: 'bottom', delay: 1200})
sr.reveal('.swiper-button-prev, .swiper-button-next', {origin: 'bottom', })

// Retrieve saved data or initialize as empty arrays
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// Save functions for local storage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function saveFavorites() {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

// ----- Modal Functions ----- //
function createCartModal() {
  const cartModal = document.createElement("div");
  cartModal.id = "cartModal";
  cartModal.className = "modal";
  cartModal.style.display = "none"; // hidden by default

  const modalContent = document.createElement("div");
  modalContent.className = "modal-content";

  const closeButton = document.createElement("span");
  closeButton.className = "close-button";
  closeButton.innerHTML = "&times;";
  closeButton.onclick = () => closeModal("cartModal");

  const cartItemsContainer = document.createElement("div");
  cartItemsContainer.id = "cart-items";

  const totalContainer = document.createElement("div");
  totalContainer.id = "total-price";

  const checkoutBtn = document.createElement("button");
  checkoutBtn.innerText = "Checkout ";
  checkoutBtn.onclick = checkout;

  modalContent.appendChild(closeButton);
  modalContent.appendChild(cartItemsContainer);
  modalContent.appendChild(totalContainer);
  modalContent.appendChild(checkoutBtn);
  cartModal.appendChild(modalContent);
  document.body.appendChild(cartModal);
}

function createFavoriteModal() {
  const favModal = document.createElement("div");
  favModal.id = "favoriteModal";
  favModal.className = "modal";
  favModal.style.display = "none"; // hidden by default

  const modalContent = document.createElement("div");
  modalContent.className = "modal-content";

  const closeButton = document.createElement("span");
  closeButton.className = "close-button";
  closeButton.innerHTML = "&times;";
  closeButton.onclick = () => closeModal("favoriteModal");

  const favItemsContainer = document.createElement("div");
  favItemsContainer.id = "favorite-items";

  modalContent.appendChild(closeButton);
  modalContent.appendChild(favItemsContainer);
  favModal.appendChild(modalContent);
  document.body.appendChild(favModal);
}

function openModal(modalId) {
  document.getElementById(modalId).style.display = "flex";
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}

// ----- UI Update Functions ----- //
function updateCart() {
  const cartContainer = document.getElementById("cart-items");
  cartContainer.innerHTML = "";
  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    const itemRow = document.createElement("div");
    itemRow.className = "item-row";
    itemRow.innerHTML = `
      <span class="product">${item.product}</span>
      <span class="price">$${item.price}</span>
      <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
    `;
    cartContainer.appendChild(itemRow);
  });
  document.getElementById("total-price").innerText = "Total: $" + total;
  updateCartIconCount();
}

function updateFavorites() {
  const favContainer = document.getElementById("favorite-items");
  favContainer.innerHTML = "";
  favorites.forEach((item, index) => {
    const itemRow = document.createElement("div");
    // Use a different structure for favorite modal: details on the first row, buttons on the second row.
    itemRow.className = "fav-item-row";
    itemRow.innerHTML = `
      <div class="fav-item-details">
        <span class="product">${item.product}</span>
        <span class="price">$${item.price}</span>
      </div>
      <div class="fav-item-actions">
        <button class="add-to-cart-btn" onclick="moveFavoriteToCart(${index})">Add to Cart</button>
        <button class="remove-btn" onclick="removeFromFavorite(${index})">Remove</button>
      </div>
    `;
    favContainer.appendChild(itemRow);
  });
}

function updateCartIconCount() {
  // Locate the cart icon and add/update a badge for the count.
  const cartIcon = document.querySelector(".ri-shopping-cart-line");
  let countSpan = cartIcon.querySelector(".cart-count");
  if (!countSpan) {
    countSpan = document.createElement("span");
    countSpan.className = "cart-count";
    countSpan.style.background = "red";
    countSpan.style.color = "white";
    countSpan.style.borderRadius = "50%";
    countSpan.style.padding = "2px 6px";
    countSpan.style.fontSize = "0.8rem";
    countSpan.style.marginLeft = "5px";
    cartIcon.appendChild(countSpan);
  }
  countSpan.innerText = cart.length;
}

// ----- Cart & Favorite Functions ----- //
function addToCart(product, price) {
  cart.push({ product, price });
  saveCart();
  updateCart();
}

function addToFavorite(product, price) {
  favorites.push({ product, price });
  saveFavorites();
  updateFavorites();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  updateCart();
}

function removeFromFavorite(index) {
  favorites.splice(index, 1);
  saveFavorites();
  updateFavorites();
}

function moveFavoriteToCart(index) {
  const item = favorites[index];
  addToCart(item.product, item.price);
  removeFromFavorite(index);
}

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  const orderSummary = cart
    .map(item => `${item.product} - $${item.price}`)
    .join("%0A");
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const message =
    "Hello, I would like to order:%0A" +
    orderSummary +
    "%0A%0ATotal: $" +
    total;
  // WhatsApp number
  const whatsappURL = "https://wa.me/9160054688?text=" + message;
  window.open(whatsappURL, "_blank");
}

// ----- DOMContentLoaded: Setup Event Listeners, Modals & Icon Buttons ----- //
document.addEventListener("DOMContentLoaded", () => {
  // Create modals for cart and favorites
  createCartModal();
  createFavoriteModal();

  // Attach click listeners to nav icons 
  const cartIcon = document.querySelector(".ri-shopping-cart-line");
  const favoriteIcon = document.querySelector(".ri-heart-3-line");

  cartIcon.addEventListener("click", () => openModal("cartModal"));
  favoriteIcon.addEventListener("click", () => openModal("favoriteModal"));

  // Add icon buttons to each product article
  document.querySelectorAll(".home__article").forEach(article => {
    const productName = article.querySelector(".home__product").innerText;
    const priceText = article.querySelector(".home__price").innerText;
    const price = parseFloat(priceText.replace("$", ""));

    // Create "Add to Cart" icon button
    const cartBtn = document.createElement("button");
    cartBtn.className = "icon-btn add-to-cart-btn";
    const cartIconBtn = document.createElement("i");
    cartIconBtn.className = "ri-shopping-cart-line";
    cartBtn.appendChild(cartIconBtn);
    cartBtn.onclick = () => addToCart(productName, price);
    article.appendChild(cartBtn);

    // Create "Add to Favorite" icon button
    const favBtn = document.createElement("button");
    favBtn.className = "icon-btn add-to-favorite-btn";
    const favIconBtn = document.createElement("i");
    favIconBtn.className = "ri-heart-3-line";
    favBtn.appendChild(favIconBtn);
    favBtn.onclick = () => addToFavorite(productName, price);
    article.appendChild(favBtn);
  });

  // Update UI from saved data
  updateCart();
  updateFavorites();
});
