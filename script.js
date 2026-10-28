/**
 * AutoParts Pro - Inventory & Sales Management
 * Full Version: Multi-page, Multi-language (EN, FR, AR), Algerian Dinar, Mobile-Responsive
 */

// --- Translations ---
const i18n = {
    en: {
        nav_dashboard: 'Dashboard',
        nav_inventory: 'Inventory',
        nav_sales: 'Sales & Losses',
        nav_reset: 'System Reset',
        stat_inv_val: 'Inventory Value',
        stat_pot_profit: 'Potential Profit',
        stat_real_profit: 'Realized Profit',
        stat_net_balance: 'Net Balance',
        title_cat: 'Categories',
        title_item: 'Add Part',
        btn_add: 'Add',
        btn_save_part: 'Save Part',
        filter: 'Filter:',
        all_cats: 'All Categories',
        th_name: 'Part Name',
        th_cat: 'Category',
        th_qty: 'Qty',
        th_price: 'Price',
        th_profit: 'Profit',
        title_loss: 'Record Loss',
        lbl_amount: 'Amount',
        lbl_desc: 'Description',
        btn_log_loss: 'Log Expense',
        title_sales: 'Sales History',
        title_loss_hist: 'Loss History',
        th_date: 'Date',
        th_item: 'Item Sold',
        th_desc: 'Description',
        th_amount: 'Amount',
        btn_clear_loss: 'Clear All',
        lbl_name: 'Part Name',
        lbl_cat: 'Category',
        lbl_qty: 'Quantity',
        lbl_buy: 'Buy Price',
        lbl_sell: 'Sell Price'
    },
    fr: {
        nav_dashboard: 'Tableau de Bord',
        nav_inventory: 'Inventaire',
        nav_sales: 'Ventes et Pertes',
        nav_reset: 'Réinitialiser Système',
        stat_inv_val: 'Valeur Inventaire',
        stat_pot_profit: 'Profit Potentiel',
        stat_real_profit: 'Profit Réalisé',
        stat_net_balance: 'Solde Net',
        title_cat: 'Catégories',
        title_item: 'Ajouter Pièce',
        btn_add: 'Ajouter',
        btn_save_part: 'Sauvegarder',
        filter: 'Filtrer:',
        all_cats: 'Toutes Catégories',
        th_name: 'Nom Pièce',
        th_cat: 'Cat',
        th_qty: 'Qté',
        th_price: 'Prix',
        th_profit: 'Profit',
        title_loss: 'Enregistrer Perte',
        lbl_amount: 'Montant',
        lbl_desc: 'Description',
        btn_log_loss: 'Log dépense',
        title_sales: 'Historique Ventes',
        title_loss_hist: 'Historique Pertes',
        th_date: 'Date',
        th_item: 'Pièce Vendue',
        th_desc: 'Description',
        th_amount: 'Montant',
        btn_clear_loss: 'Tout Effacer',
        lbl_name: 'Nom Pièce',
        lbl_cat: 'Catégorie',
        lbl_qty: 'Quantité',
        lbl_buy: 'Prix d\'achat',
        lbl_sell: 'Prix de vente'
    },
    ar: {
        nav_dashboard: 'لوحة القيادة',
        nav_inventory: 'المخزون',
        nav_sales: 'المبيعات والخسائر',
        nav_reset: 'إعادة ضبط النظام',
        stat_inv_val: 'قيمة المخزون',
        stat_pot_profit: 'الربح المحتمل',
        stat_real_profit: 'الربح المحقق',
        stat_net_balance: 'الرصيد الصافي',
        title_cat: 'الفئات',
        title_item: 'إضافة قطعة',
        btn_add: 'إضافة',
        btn_save_part: 'حفظ القطعة',
        filter: 'تصفية:',
        all_cats: 'كل الفئات',
        th_name: 'اسم القطعة',
        th_cat: 'الفئة',
        th_qty: 'الكمية',
        th_price: 'السعر',
        th_profit: 'الربح',
        title_loss: 'تسجيل خسارة',
        lbl_amount: 'المبلغ',
        lbl_desc: 'الوصف',
        btn_log_loss: 'تسجيل مصروف',
        title_sales: 'سجل المبيعات',
        title_loss_hist: 'سجل الخسائر',
        th_date: 'التاريخ',
        th_item: 'القطعة المباعة',
        th_desc: 'الوصف',
        th_amount: 'المبلغ',
        btn_clear_loss: 'مسح الكل',
        lbl_name: 'اسم القطعة',
        lbl_cat: 'الفئة',
        lbl_qty: 'الكمية',
        lbl_buy: 'سعر الشراء',
        lbl_sell: 'سعر البيع'
    }
};

// --- State Management ---
let state = {
    categories: JSON.parse(localStorage.getItem('car_store_categories')) || ['Engine', 'Brakes', 'Electronics', 'Body'],
    items: JSON.parse(localStorage.getItem('car_store_items')) || [],
    losses: JSON.parse(localStorage.getItem('car_store_losses')) || [],
    transactions: JSON.parse(localStorage.getItem('car_store_transactions')) || [],
    realizedProfit: parseFloat(localStorage.getItem('car_store_realized_profit')) || 0,
    currentLang: localStorage.getItem('app_lang') || 'en'
};

function saveState() {
    localStorage.setItem('car_store_categories', JSON.stringify(state.categories));
    localStorage.setItem('car_store_items', JSON.stringify(state.items));
    localStorage.setItem('car_store_losses', JSON.stringify(state.losses));
    localStorage.setItem('car_store_transactions', JSON.stringify(state.transactions));
    localStorage.setItem('car_store_realized_profit', state.realizedProfit.toString());
    localStorage.setItem('app_lang', state.currentLang);
    render();
}

// --- UI & Theme Management ---
function initUI() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const htmlElement = document.documentElement;
    const langSwitcher = document.getElementById('langSwitcher');
    const menuToggle = document.getElementById('menuToggle');
    const sideMenu = document.getElementById('sideMenu');

    const savedTheme = localStorage.getItem('app_theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    if (savedTheme === 'dark') {
        htmlElement.classList.add('dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
    themeToggle.addEventListener('click', () => {
        const isDark = htmlElement.classList.toggle('dark');
        localStorage.setItem('app_theme', isDark ? 'dark' : 'light');
        themeIcon.classList.toggle('fa-moon');
        themeIcon.classList.toggle('fa-sun');
    });

    langSwitcher.value = state.currentLang;
    langSwitcher.addEventListener('change', (e) => {
        state.currentLang = e.target.value;
        saveState();
        updateLanguage();
    });

    menuToggle.addEventListener('click', () => {
        sideMenu.classList.toggle('menu-hidden');
    });

    updateLanguage();
}

function updateLanguage() {
    const htmlElement = document.documentElement;
    if (state.currentLang === 'ar') {
        htmlElement.classList.add('rtl');
        htmlElement.dir = 'rtl';
    } else {
        htmlElement.classList.remove('rtl');
        htmlElement.dir = 'ltr';
    }

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = i18n[state.currentLang][key] || el.textContent;
    });
}

function showPage(pageId) {
    document.querySelectorAll('.page-content').forEach(p => p.classList.add('hidden-page'));
    document.getElementById(`page-${pageId}`).classList.remove('hidden-page');

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageId) link.classList.add('active');
    });

    if (window.innerWidth < 768) {
        document.getElementById('sideMenu').classList.add('menu-hidden');
    }
}

function showNotification(message) {
    const notifyDiv = document.getElementById('notification');
    notifyDiv.textContent = message;
    notifyDiv.classList.remove('hidden');
    setTimeout(() => notifyDiv.classList.add('hidden'), 3000);
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('fr-DZ', { style: 'currency', currency: 'DZD' }).format(amount);
}

// --- Logic ---

function addCategory(name) {
    if (state.categories.includes(name)) {
        showNotification('Category already exists!');
        return;
    }
    state.categories.push(name);
    saveState();
}

function removeCategory(name) {
    async function tripleCheck() {
        const step1 = await showCustomConfirm(
            'Delete Category?',
            `Are you sure you want to delete the category "${name}"?`,
            'fa-question', 'text-blue-500'
        );
        if (!step1) return;

        const step2 = await showCustomConfirm(
            'SURELY?',
            `This will also delete ALL items belonging to "${name}".`,
            'fa-triangle-exclamation', 'text-amber-500'
        );
        if (!step2) return;

        const step3 = await showCustomConfirm(
            'LAST WARNING!',
            `Last chance! Delete category "${name}" and all its items forever?`,
            'fa-circle-exclamation', 'text-red-500'
        );
        if (!step3) return;

        // Delete items belonging to this category
        state.items = state.items.filter(item => item.category !== name);

        // Remove the category itself
        state.categories = state.categories.filter(c => c !== name);
        saveState();
        showNotification(`Category ${name} and its items deleted.`);
    }
    tripleCheck();
}

function addItem(name, category, qty, buyPrice, sellPrice) {
    const newItem = {
        id: Date.now(),
        name,
        category,
        quantity: parseInt(qty),
        buyPrice: parseFloat(buyPrice),
        sellPrice: parseFloat(sellPrice)
    };
    state.items.push(newItem);
    saveState();
}

function updateQuantity(id, newQty) {
    const item = state.items.find(i => i.id === id);
    if (!item) return;

    const oldQty = item.quantity;
    const qty = parseInt(newQty);

    if (qty <= 0) {
        const profitPerUnit = item.sellPrice - item.buyPrice;
        const totalSaleProfit = oldQty * profitPerUnit;
        state.realizedProfit += totalSaleProfit;
        recordTransaction(item.name, oldQty, totalSaleProfit);
        state.items = state.items.filter(i => i.id !== id);
        saveState();
        showNotification('Item sold out!');
    } else if (qty < oldQty) {
        const diff = oldQty - qty;
        const profitPerUnit = item.sellPrice - item.buyPrice;
        const saleProfit = diff * profitPerUnit;
        state.realizedProfit += saleProfit;
        recordTransaction(item.name, diff, saleProfit);
        item.quantity = qty;
        saveState();
    } else {
        item.quantity = qty;
        saveState();
    }
}

function recordTransaction(itemName, qty, profit) {
    state.transactions.push({
        id: Date.now(),
        itemName,
        quantity: qty,
        profit: profit,
        date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    });
}

function removeItem(id) {
    const item = state.items.find(i => i.id === id);
    if (item) {
        const profitPerUnit = item.sellPrice - item.buyPrice;
        const totalSaleProfit = item.quantity * profitPerUnit;
        state.realizedProfit += totalSaleProfit;
        recordTransaction(item.name, item.quantity, totalSaleProfit);
    }
    state.items = state.items.filter(i => i.id !== id);
    saveState();
}

function addLoss(amount, description) {
    state.losses.push({
        id: Date.now(),
        amount: parseFloat(amount),
        description,
        date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    });
    saveState();
}

function clearLosses() {
    if (confirm('Clear all loss history?')) {
        state.losses = [];
        saveState();
    }
}

function resetEntireSystem() {
    async function tripleCheck() {
        const step1 = await showCustomConfirm(
            'System Reset?',
            'Are you sure you want to wipe ALL data from the store?',
            'fa-question', 'text-blue-500'
        );
        if (!step1) return;

        const step2 = await showCustomConfirm(
            'SURELY?',
            'This will delete all inventory, sales history, and categories.',
            'fa-triangle-exclamation', 'text-amber-500'
        );
        if (!step2) return;

        const step3 = await showCustomConfirm(
            'TOTAL DESTRUCTION!',
            'Last warning: This is permanent and cannot be undone. Reset now?',
            'fa-skull-crossbones', 'text-red-600'
        );
        if (!step3) return;

        localStorage.clear();
        state = {
            categories: ['Engine', 'Brakes', 'Electronics', 'Body'],
            items: [],
            losses: [],
            transactions: [],
            realizedProfit: 0,
            currentLang: 'en'
        };
        saveState();
        // Force full reload to reset everything clean
        window.location.reload();
    }
    tripleCheck();
}

// --- Rendering ---

function render() {
    // 1. Render Category Dropdown, Category List and Filter
    const categorySelect = document.getElementById('itemCategory');
    const filterSelect = document.getElementById('filterCategory');
    const categoryList = document.getElementById('categoryList');
    categorySelect.innerHTML = '<option value="" disabled selected>Select Category</option>';
    filterSelect.innerHTML = '<option value="all">All Categories</option>';
    if (categoryList) categoryList.innerHTML = '';

    // Sort categories alphabetically
    const sortedCats = [...state.categories].sort((a, b) => a.localeCompare(b));

    sortedCats.forEach(cat => {
        const opt = document.createElement('option'); opt.value = cat; opt.textContent = cat;
        categorySelect.appendChild(opt);
        const fOpt = document.createElement('option'); fOpt.value = cat; fOpt.textContent = cat;
        filterSelect.appendChild(fOpt);

        if (categoryList) {
            const catItem = document.createElement('div');
            catItem.className = 'flex items-center justify-between bg-slate-50 dark:bg-slate-900/50 p-2 rounded-lg text-sm border border-slate-100 dark:border-slate-800 group';
            catItem.innerHTML = `
                <span class="font-medium text-slate-700 dark:text-slate-300">${cat}</span>
                <button onclick="removeCategory('${cat}')" class="text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                    <i class="fa-solid fa-trash-can text-xs"></i>
                </button>
            `;
            categoryList.appendChild(catItem);
        }
    });

    // 2. Render Inventory Table
    const tbody = document.getElementById('inventoryBody');
    const emptyState = document.getElementById('emptyState');
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filterTerm = document.getElementById('filterCategory').value;
    tbody.innerHTML = '';

    // Filter and sort items alphabetically by name
    const filteredItems = state.items
        .filter(item => (item.name.toLowerCase().includes(searchTerm)) && (filterTerm === 'all' || item.category === filterTerm))
        .sort((a, b) => a.name.localeCompare(b.name));

    if (filteredItems.length === 0) {
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');

        // Group items by category for better organization
        const itemsByCategory = {};
        filteredItems.forEach(item => {
            const cat = item.category || 'Uncategorized';
            if (!itemsByCategory[cat]) itemsByCategory[cat] = [];
            itemsByCategory[cat].push(item);
        });

        // Render sorted categories alphabetically
        const sortedCatsForDisplay = Object.keys(itemsByCategory).sort((a, b) => a.localeCompare(b));

        sortedCatsForDisplay.forEach(cat => {
            // Category Header Row - Folder style
            const headerRow = document.createElement('tr');
            headerRow.className = 'bg-slate-100 dark:bg-slate-900/80 font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors';
            headerRow.innerHTML = `
                <td colspan="6" class="px-6 py-3 border-b dark:border-slate-700 flex items-center gap-2">
                    <i class="fa-solid fa-folder-open text-blue-500"></i>
                    <span>${cat}</span>
                </td>
            `;
            tbody.appendChild(headerRow);

            // Items in this category
            itemsByCategory[cat].forEach(item => {
                const row = document.createElement('tr');
                row.className = 'border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors';
                const profitPerUnit = item.sellPrice - item.buyPrice;
                row.innerHTML = `
                    <td class="px-6 py-4 font-medium text-slate-800 dark:text-slate-200">
                        <div class="flex items-center gap-2">
                            ${item.name}
                            ${item.quantity <= 3 ? '<span class="bg-red-100 text-red-600 text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase">Low Stock</span>' : ''}
                        </div>
                    </td>
                    <td class="px-6 py-4 text-sm">${item.category}</td>
                    <td class="px-6 py-4">
                        <div class="flex items-center gap-2">
                            <input type="number" value="${item.quantity}" onchange="handleQtyChange(${item.id}, this.value)" class="w-16 border rounded-lg px-1 py-1 text-center bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-blue-500">
                            <span class="text-[10px] text-slate-400 uppercase font-bold">Update</span>
                        </div>
                    </td>
                    <td class="px-6 py-4 text-slate-600 dark:text-slate-400">${formatCurrency(item.sellPrice)}</td>
                    <td class="px-6 py-4 text-green-600 dark:text-green-400 font-bold">${formatCurrency(profitPerUnit)}</td>
                    <td class="px-6 py-4 text-center"><button onclick="confirmDelete(${item.id})" class="text-red-400 hover:text-red-600 transition-colors"><i class="fa-solid fa-trash"></i></button></td>
                `;
                tbody.appendChild(row);
            });
        });
    }

    // 3. Render Sales
    const salesBody = document.getElementById('salesBody');
    const emptySalesState = document.getElementById('emptySalesState');
    salesBody.innerHTML = '';
    if (state.transactions.length === 0) {
        emptySalesState.classList.remove('hidden');
    } else {
        emptySalesState.classList.add('hidden');
        [...state.transactions].reverse().forEach(tx => {
            const row = document.createElement('tr');
            row.className = 'border-b dark:border-slate-700 text-sm';
            row.innerHTML = `<td class="px-6 py-4 text-slate-500">${tx.date}</td><td class="px-6 py-4 font-medium">${tx.itemName}</td><td class="px-6 py-4">${tx.quantity}</td><td class="px-6 py-4 text-right text-green-600 font-bold">${formatCurrency(tx.profit)}</td>`;
            salesBody.appendChild(row);
        });
    }

    // 4. Render Losses
    const lossBody = document.getElementById('lossHistoryBody');
    const emptyLossState = document.getElementById('emptyLossState');
    lossBody.innerHTML = '';
    if (state.losses.length === 0) {
        emptyLossState.classList.remove('hidden');
    } else {
        emptyLossState.classList.add('hidden');
        [...state.losses].reverse().forEach(loss => {
            const row = document.createElement('tr');
            row.className = 'border-b dark:border-slate-700 text-sm';
            row.innerHTML = `<td class="px-6 py-4 text-slate-500">${loss.date}</td><td class="px-6 py-4">${loss.description || '...'}</td><td class="px-6 py-4 text-right text-red-600 font-bold">${formatCurrency(loss.amount)}</td>`;
            lossBody.appendChild(row);
        });
    }

    // 5. Stats
    let invVal = 0, potProf = 0;
    state.items.forEach(item => {
        invVal += item.sellPrice * item.quantity;
        potProf += (item.sellPrice - item.buyPrice) * item.quantity;
    });
    const totalLoss = state.losses.reduce((sum, loss) => sum + loss.amount, 0);
    document.getElementById('totalValue').textContent = formatCurrency(invVal);
    document.getElementById('totalProfit').textContent = formatCurrency(potProf);
    document.getElementById('realizedProfit').textContent = formatCurrency(state.realizedProfit);
    document.getElementById('netBalance').textContent = formatCurrency(state.realizedProfit + potProf - totalLoss);
}

function handleQtyChange(id, value) { updateQuantity(id, value); }
// --- Custom Modal Logic ---
function showCustomConfirm(title, message, icon = 'fa-triangle-exclamation', iconColor = 'text-amber-500', onConfirm) {
    return new Promise((resolve) => {
        const modal = document.getElementById('confirmModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalMessage = document.getElementById('modalMessage');
        const modalIcon = document.getElementById('modalIcon');
        const modalConfirm = document.getElementById('modalConfirm');
        const modalCancel = document.getElementById('modalCancel');

        modalTitle.textContent = title;
        modalMessage.textContent = message;
        modalIcon.className = `fa-solid ${icon} text-4xl ${iconColor}`;

        modal.classList.remove('hidden');

        const close = (confirmed) => {
            modal.classList.add('hidden');
            modalConfirm.removeEventListener('click', handleConfirm);
            modalCancel.removeEventListener('click', handleCancel);
            resolve(confirmed);
        };

        const handleConfirm = () => close(true);
        const handleCancel = () => close(false);

        modalConfirm.addEventListener('click', handleConfirm);
        modalCancel.addEventListener('click', handleCancel);
    });
}

function confirmDelete(id) {
    showCustomConfirm(
        'Delete Item?',
        'Are you sure you want to delete this item?',
        'fa-triangle-exclamation', 'text-amber-500',
        () => {
            removeItem(id);
            showNotification('Item deleted successfully.');
        }
    ).then(confirmed => {
        if (confirmed) {
            removeItem(id);
            showNotification('Item deleted successfully.');
        }
    });
}

document.getElementById('categoryForm').addEventListener('submit', (e) => {
    e.preventDefault();
    addCategory(document.getElementById('categoryName').value);
    document.getElementById('categoryName').value = '';
});

document.getElementById('itemForm').addEventListener('submit', (e) => {
    e.preventDefault();
    addItem(document.getElementById('itemName').value, document.getElementById('itemCategory').value, document.getElementById('itemQty').value, document.getElementById('itemBuyPrice').value, document.getElementById('itemSellPrice').value);
    e.target.reset();
});

document.getElementById('lossForm').addEventListener('submit', (e) => {
    e.preventDefault();
    addLoss(document.getElementById('lossAmount').value, document.getElementById('lossDesc').value);
    e.target.reset();
});

document.getElementById('searchInput').addEventListener('input', render);
document.getElementById('filterCategory').addEventListener('change', render);

// Explicitly expose functions to the global window object to ensure HTML onclick handlers can find them
window.showPage = showPage;
window.resetEntireSystem = resetEntireSystem;
window.confirmDelete = confirmDelete;
window.handleQtyChange = handleQtyChange;
window.removeCategory = removeCategory;

document.addEventListener('DOMContentLoaded', () => {
    initUI();
    document.getElementById('currentDate').textContent = new Date().toLocaleDateString();
    render();
});
