// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Установка текущего года в футере
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Инициализация меню
    initializeMenu();
    
    // Инициализация столиков
    initializeTables();
    
    // Инициализация корзины
    initializeCart();
    
    // Инициализация мобильного меню
    initializeMobileMenu();
    
    // Инициализация формы бронирования
    initializeReservationForm();
    
    // Установка минимальной даты для бронирования (сегодня)
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').min = today;
    
    // Установка времени по умолчанию (ближайший час)
    const now = new Date();
    const nextHour = new Date(now.getTime() + 60 * 60 * 1000);
    const hours = nextHour.getHours().toString().padStart(2, '0');
    const minutes = nextHour.getMinutes().toString().padStart(2, '0');
    document.getElementById('time').value = `${hours}:${minutes}`;
    
    // Вычисляем среднее время приготовления
    updateAverageTime();
});

// Меню ресторана с фотографиями
const menuItems = [
    {
        id: 1,
        name: "Цезарь с креветками",
        category: "cold",
        price: 890,
        description: "Свежий салат с тигровыми креветками, листьями айсберга, пармезаном и соусом цезарь",
        prepTime: 15,
        image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        icon: "fas fa-leaf"
    },
    {
        id: 2,
        name: "Тартар из лосося",
        category: "cold",
        price: 950,
        description: "Нежный тартар из свежего лосося с авокадо и цитрусовым соусом",
        prepTime: 20,
        image: "https://images.unsplash.com/photo-1553621042-f6e147245754?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        icon: "fas fa-fish"
    },
    {
        id: 3,
        name: "Стейк Рибай",
        category: "hot",
        price: 1850,
        description: "Мраморный стейк из говядины с розмарином и овощами гриль",
        prepTime: 25,
        image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        icon: "fas fa-utensils"
    },
    {
        id: 4,
        name: "Паста Карбонара",
        category: "hot",
        price: 750,
        description: "Спагетти с беконом, пармезаном и соусом на основе желтков",
        prepTime: 20,
        image: "https://images.unsplash.com/photo-1598866594230-a7c12756260f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        icon: "fas fa-pasta"
    },
    {
        id: 5,
        name: "Тыквенный суп-пюре",
        category: "hot",
        price: 550,
        description: "Нежный крем-суп из тыквы с гренками и семечками",
        prepTime: 15,
        image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        icon: "fas fa-utensil-spoon"
    },
    {
        id: 6,
        name: "Мохито",
        category: "drinks",
        price: 450,
        description: "Классический мохито со свежей мятой и лаймом",
        prepTime: 5,
        image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        icon: "fas fa-glass-whiskey"
    },
    {
        id: 7,
        name: "Красное вино Merlot",
        category: "drinks",
        price: 350,
        description: "Бокал выдержанного Мерло, Италия",
        prepTime: 2,
        image: "https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        icon: "fas fa-wine-glass-alt"
    },
    {
        id: 8,
        name: "Тирамису",
        category: "desserts",
        price: 650,
        description: "Классический итальянский десерт с кофе и маскарпоне",
        prepTime: 10,
        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        icon: "fas fa-birthday-cake"
    },
    {
        id: 9,
        name: "Чизкейк Нью-Йорк",
        category: "desserts",
        price: 580,
        description: "Нежный чизкейк с ягодным соусом",
        prepTime: 10,
        image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        icon: "fas fa-cheese"
    },
    {
        id: 10,
        name: "Бургер с трюфелем",
        category: "hot",
        price: 990,
        description: "Ангус биф с сыром, трюфельным соусом и рукколой",
        prepTime: 18,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        icon: "fas fa-hamburger"
    },
    {
        id: 11,
        name: "Брускетта с томатами",
        category: "cold",
        price: 420,
        description: "Хрустящий хлеб с вялеными томатами и базиликом",
        prepTime: 10,
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        icon: "fas fa-bread-slice"
    },
    {
        id: 12,
        name: "Латте арт",
        category: "drinks",
        price: 320,
        description: "Кофе с молоком и художественной пенкой",
        prepTime: 7,
        image: "https://images.unsplash.com/photo-1561047029-3000c68339ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        icon: "fas fa-coffee"
    }
];

// Функция для обновления среднего времени приготовления
function updateAverageTime() {
    const avgTime = Math.round(menuItems.reduce((sum, item) => sum + item.prepTime, 0) / menuItems.length);
    document.getElementById('avgTime').textContent = `${avgTime} мин`;
}

// Инициализация меню с фотографиями
function initializeMenu() {
    const menuGrid = document.getElementById('menuGrid');
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    // Функция отрисовки элементов меню с фотографиями
    function renderMenuItems(category = 'all') {
        menuGrid.innerHTML = '';
        
        const filteredItems = category === 'all' 
            ? menuItems 
            : menuItems.filter(item => item.category === category);
        
        filteredItems.forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.className = 'menu-item';
            menuItem.dataset.category = item.category;
            
            menuItem.innerHTML = `
                <div class="menu-item-img" style="background-image: url('${item.image}');">
                    <div class="menu-item-overlay"></div>
                    <div class="menu-item-category">${getCategoryName(item.category)}</div>
                </div>
                <div class="menu-item-content">
                    <div class="menu-item-header">
                        <h3 class="menu-item-title">${item.name}</h3>
                        <div class="menu-item-price">${item.price} ₽</div>
                    </div>
                    <p class="menu-item-desc">${item.description}</p>
                    <div class="menu-item-footer">
                        <div class="menu-item-time">
                            <i class="fas fa-clock"></i>
                            <span>${item.prepTime} мин</span>
                        </div>
                        <button class="add-to-cart" data-id="${item.id}">
                            <i class="fas fa-cart-plus"></i>
                            В корзину
                        </button>
                    </div>
                </div>
            `;
            
            menuGrid.appendChild(menuItem);
        });
        
        // Добавление обработчиков для кнопок "В корзину"
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                const itemId = parseInt(this.dataset.id);
                addToCart(itemId);
            });
        });
    }
    
    // Функция для получения названия категории
    function getCategoryName(category) {
        const categories = {
            'cold': 'Холодные закуски',
            'hot': 'Горячие блюда',
            'drinks': 'Напитки',
            'desserts': 'Десерты'
        };
        return categories[category] || category;
    }
    
    // Изначальная отрисовка всех элементов
    renderMenuItems();
    
    // Обработчики для кнопок категорий
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Удаляем активный класс у всех кнопок
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс нажатой кнопке
            this.classList.add('active');
            // Отрисовываем элементы выбранной категории
            renderMenuItems(this.dataset.category);
        });
    });
}

// Инициализация столиков
function initializeTables() {
    const tablesGrid = document.getElementById('tablesGrid');
    
    // Генерация 12 столиков со случайным статусом
    for (let i = 1; i <= 12; i++) {
        const table = document.createElement('div');
        
        // Случайный статус столика
        const statuses = ['available', 'reserved', 'occupied'];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        
        table.className = `table ${randomStatus}`;
        table.textContent = i;
        table.dataset.tableNumber = i;
        
        // Добавляем обработчик только для доступных столиков
        if (randomStatus === 'available') {
            table.addEventListener('click', function() {
                showNotification(`Вы выбрали столик №${this.textContent}. Заполните форму бронирования справа.`);
                // Можно добавить автоматическое заполнение номера столика в форму
            });
        }
        
        tablesGrid.appendChild(table);
    }
}

// Корзина
let cart = [];

// Инициализация корзины
function initializeCart() {
    const cartButton = document.getElementById('cartButton');
    const cartModal = document.getElementById('cartModal');
    const closeCart = document.getElementById('closeCart');
    const clearCart = document.getElementById('clearCart');
    const checkout = document.getElementById('checkout');
    
    // Открытие корзины
    cartButton.addEventListener('click', function() {
        cartModal.classList.add('active');
        updateCartDisplay();
    });
    
    // Закрытие корзины
    closeCart.addEventListener('click', function() {
        cartModal.classList.remove('active');
    });
    
    // Очистка корзины
    clearCart.addEventListener('click', function() {
        if (cart.length === 0) return;
        
        cart = [];
        updateCart();
        showNotification('Корзина очищена');
    });
    
    // Оформление заказа
    checkout.addEventListener('click', function() {
        if (cart.length === 0) {
            showNotification('Корзина пуста! Добавьте блюда из меню.');
            return;
        }
        
        const orderDetails = cart.map(item => 
            `${item.name} x${item.quantity} - ${item.price * item.quantity} ₽`
        ).join('\n');
        
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        showNotification(`Заказ оформлен! Итого: ${total} ₽. Ожидайте доставки к вашему столику.`);
        
        cart = [];
        updateCart();
        cartModal.classList.remove('active');
    });
    
    // Закрытие корзины при клике вне ее
    window.addEventListener('click', function(event) {
        if (event.target === cartModal) {
            cartModal.classList.remove('active');
        }
    });
}

// Добавление в корзину
function addToCart(itemId) {
    const item = menuItems.find(menuItem => menuItem.id === itemId);
    
    if (!item) return;
    
    // Проверяем, есть ли уже такой товар в корзине
    const existingItemIndex = cart.findIndex(cartItem => cartItem.id === itemId);
    
    if (existingItemIndex > -1) {
        // Увеличиваем количество
        cart[existingItemIndex].quantity += 1;
    } else {
        // Добавляем новый товар
        cart.push({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: 1
        });
    }
    
    updateCart();
    showNotification(`${item.name} добавлен в корзину`);
    
    // Анимация кнопки корзины
    const cartButton = document.getElementById('cartButton');
    cartButton.style.transform = 'scale(1.2)';
    setTimeout(() => {
        cartButton.style.transform = 'scale(1)';
    }, 300);
}

// Обновление корзины
function updateCart() {
    // Обновляем счетчик
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cartCount').textContent = cartCount;
    
    // Обновляем общую сумму
    const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    document.getElementById('cartTotal').textContent = cartTotal;
    
    // Обновляем отображение корзины, если она открыта
    if (document.getElementById('cartModal').classList.contains('active')) {
        updateCartDisplay();
    }
}

// Обновление отображения корзины
function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #94a3b8; padding: 20px;">Корзина пуста</p>';
        return;
    }
    
    cartItems.innerHTML = '';
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <div class="cart-item-price">${item.price} ₽</div>
            </div>
            <div class="cart-item-actions">
                <div class="cart-item-quantity">
                    <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn increase" data-id="${item.id}">+</button>
                </div>
                <button class="remove-item" data-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        cartItems.appendChild(cartItem);
    });
    
    // Добавляем обработчики для кнопок изменения количества
    document.querySelectorAll('.decrease').forEach(button => {
        button.addEventListener('click', function() {
            const itemId = parseInt(this.dataset.id);
            decreaseQuantity(itemId);
        });
    });
    
    document.querySelectorAll('.increase').forEach(button => {
        button.addEventListener('click', function() {
            const itemId = parseInt(this.dataset.id);
            increaseQuantity(itemId);
        });
    });
    
    // Добавляем обработчики для кнопок удаления
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const itemId = parseInt(this.dataset.id);
            removeFromCart(itemId);
        });
    });
}

// Уменьшение количества товара
function decreaseQuantity(itemId) {
    const itemIndex = cart.findIndex(item => item.id === itemId);
    
    if (itemIndex > -1) {
        if (cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity -= 1;
        } else {
            cart.splice(itemIndex, 1);
        }
        
        updateCart();
    }
}

// Увеличение количества товара
function increaseQuantity(itemId) {
    const itemIndex = cart.findIndex(item => item.id === itemId);
    
    if (itemIndex > -1) {
        cart[itemIndex].quantity += 1;
        updateCart();
    }
}

// Удаление товара из корзины
function removeFromCart(itemId) {
    const itemIndex = cart.findIndex(item => item.id === itemId);
    
    if (itemIndex > -1) {
        const itemName = cart[itemIndex].name;
        cart.splice(itemIndex, 1);
        updateCart();
        showNotification(`${itemName} удален из корзины`);
    }
}

// Инициализация мобильного меню
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    const navList = mainNav.querySelector('ul');
    
    mobileMenuBtn.addEventListener('click', function() {
        navList.classList.toggle('active');
        
        // Меняем иконку
        const icon = this.querySelector('i');
        if (navList.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Закрытие меню при клике на ссылку
    mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            navList.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
        });
    });
}

// Инициализация формы бронирования
function initializeReservationForm() {
    const reservationForm = document.getElementById('reservationForm');
    
    reservationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Получаем данные формы
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const guests = document.getElementById('guests').value;
        const tableType = document.getElementById('tableType').value;
        
        // Форматируем дату
        const formattedDate = new Date(date).toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
        
        // Показываем подтверждение
        showNotification(`Бронирование подтверждено! Столик забронирован на ${formattedDate} в ${time}.`);
        
        // Сбрасываем форму
        reservationForm.reset();
        
        // Устанавливаем значения по умолчанию
        const now = new Date();
        const nextHour = new Date(now.getTime() + 60 * 60 * 1000);
        const hours = nextHour.getHours().toString().padStart(2, '0');
        const minutes = nextHour.getMinutes().toString().padStart(2, '0');
        document.getElementById('time').value = `${hours}:${minutes}`;
        document.getElementById('guests').value = '2';
    });
}

// Функция показа уведомлений
function showNotification(message) {
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notificationText');
    
    notificationText.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Плавная прокрутка к якорям
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Закрываем мобильное меню если оно открыто
            const navList = document.querySelector('nav ul');
            const mobileMenuBtn = document.getElementById('mobileMenuBtn');
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            }
        }
    });
});