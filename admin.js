(() => {
  const backend = window.VeloraBackend;
  const $ = selector => document.querySelector(selector);
  const translations = {
    kz: {
      'Protected workspace':'Қорғалған басқару панелі','Admin sign in':'Әкімші ретінде кіру','Sign in with your store administrator account.':'Дүкен әкімшісінің аккаунтымен кіріңіз.','Email':'Email','Password':'Құпиясөз','Sign in':'Кіру','YOUR STUDIO':'СІЗДІҢ СТУДИЯҢЫЗ','Overview':'Шолу','Products':'Тауарлар','Back to store':'Дүкенге оралу','Sign out':'Шығу','Your store.':'Дүкеніңіз.','A quick look at your product collection.':'Тауарлар топтамасына қысқаша шолу.','PRODUCTS':'ТАУАРЛАР','IN STOCK':'ҚОЙМАДА','In your collection':'Топтамадағы тауарлар','Available units':'Қолжетімді дана','Welcome to your store admin':'Дүкеннің басқару панеліне қош келдіңіз','Add products and they will appear in Shop for every visitor.':'Қосылған тауарлар барлық келушіге Shop бөлімінде көрінеді.','Manage products':'Тауарларды басқару','Add, update, and search your products.':'Тауарларды қосу, өзгерту және іздеу.','Add Product':'Тауар қосу','Search products':'Тауар іздеу','Choose Image':'Сурет таңдау','JPG, PNG, or WEBP · up to 10 MB':'JPG, PNG немесе WEBP · 10 МБ-қа дейін','Product name':'Тауар атауы','Category':'Санат','Price':'Бағасы','Regular price':'Негізгі бағасы','Discount price (optional)':'Жеңілдік бағасы (міндетті емес)','Discount must be lower than regular price':'Жеңілдік бағасы негізгі бағадан төмен болуы керек','Stock quantity':'Қоймадағы саны','Description':'Сипаттамасы','Sizes':'Өлшемдері','Color':'Түсі','New arrival':'Жаңа тауар','Save Product':'Тауарды сақтау','Cancel':'Бас тарту','Delete':'Өшіру','Edit':'Өзгерту','Image':'Сурет','Actions':'Әрекет','T-shirt':'Футболка','Dress':'Көйлек','Trousers':'Шалбар','Hoodie':'Худи','Shoes':'Аяқ киім','Other':'Басқа','Please choose an image file.':'Сурет файлын таңдаңыз.','Only JPG, PNG, or WEBP images up to 10 MB are supported.':'Тек JPG, PNG, WEBP форматтары, көлемі 10 МБ-қа дейін.','Password is incorrect':'Құпиясөз қате','Could not sign in. Check your email and password.':'Кіру мүмкін болмады. Email мен құпиясөзді тексеріңіз.','This account is not authorized as a store admin.':'Бұл аккаунтқа дүкен әкімшісі рұқсаты берілмеген.','Supabase is not configured yet.':'Supabase конфигурациясы әлі енгізілмеген.','Could not load products. Check the Supabase setup.':'Тауарлар жүктелмеді. Supabase баптауларын тексеріңіз.','Could not save product. Check Storage and database policies.':'Тауар сақталмады. Storage және кесте саясаттарын тексеріңіз.','Could not delete product.':'Тауар өшірілмеді.','Product saved.':'Тауар сақталды.','Product deleted.':'Тауар өшірілді.','No products yet. Add your first product.':'Әзірше тауар жоқ. Алғашқы тауарыңызды қосыңыз.','Search by name or category':'Атауы немесе санаты бойынша іздеу','Keep current image':'Ағымдағы суретті қалдыру','Choose a replacement image to change it.':'Суретті ауыстыру үшін жаңасын таңдаңыз.'
    },
    ru: {
      'Protected workspace':'Защищённая панель','Admin sign in':'Вход администратора','Sign in with your store administrator account.':'Войдите с аккаунтом администратора магазина.','Email':'Email','Password':'Пароль','Sign in':'Войти','YOUR STUDIO':'ВАША СТУДИЯ','Overview':'Обзор','Products':'Товары','Back to store':'Вернуться в магазин','Sign out':'Выйти','Your store.':'Ваш магазин.','A quick look at your product collection.':'Краткий обзор ассортимента.','PRODUCTS':'ТОВАРЫ','IN STOCK':'НА СКЛАДЕ','In your collection':'В каталоге','Available units':'Доступно единиц','Welcome to your store admin':'Добро пожаловать в панель магазина','Add products and they will appear in Shop for every visitor.':'Добавленные товары появятся в магазине у всех посетителей.','Manage products':'Управление товарами','Add, update, and search your products.':'Добавляйте, изменяйте и ищите товары.','Add Product':'Добавить товар','Search products':'Поиск товаров','Choose Image':'Выбрать изображение','JPG, PNG, or WEBP · up to 10 MB':'JPG, PNG или WEBP · до 10 МБ','Product name':'Название товара','Category':'Категория','Price':'Цена','Regular price':'Обычная цена','Discount price (optional)':'Цена со скидкой (необязательно)','Discount must be lower than regular price':'Цена со скидкой должна быть ниже обычной цены','Stock quantity':'Количество на складе','Description':'Описание','Sizes':'Размеры','Color':'Цвет','New arrival':'Новинка','Save Product':'Сохранить товар','Cancel':'Отмена','Delete':'Удалить','Edit':'Изменить','Image':'Изображение','Actions':'Действия','T-shirt':'Футболка','Dress':'Платье','Trousers':'Брюки','Hoodie':'Худи','Shoes':'Обувь','Other':'Другое','Please choose an image file.':'Выберите файл изображения.','Only JPG, PNG, or WEBP images up to 10 MB are supported.':'Поддерживаются JPG, PNG, WEBP размером до 10 МБ.','Password is incorrect':'Неверный пароль','Could not sign in. Check your email and password.':'Не удалось войти. Проверьте email и пароль.','This account is not authorized as a store admin.':'Этому аккаунту не предоставлен доступ администратора.','Supabase is not configured yet.':'Supabase ещё не настроен.','Could not load products. Check the Supabase setup.':'Не удалось загрузить товары. Проверьте настройки Supabase.','Could not save product. Check Storage and database policies.':'Не удалось сохранить товар. Проверьте Storage и политики таблицы.','Could not delete product.':'Не удалось удалить товар.','Product saved.':'Товар сохранён.','No products yet. Add your first product.':'Товаров пока нет. Добавьте первый товар.','Search by name or category':'Поиск по названию или категории','Keep current image':'Оставить текущее изображение','Choose a replacement image to change it.':'Выберите новое изображение, чтобы заменить.'
    }
  };
  Object.assign(translations.kz, {'Orders':'Тапсырыстар','Manage customer orders and delivery status.':'Клиент тапсырыстары мен жеткізу мәртебесін басқару.','Refresh':'Жаңарту','No orders yet.':'Әзірге тапсырыс жоқ.','Order status':'Тапсырыс мәртебесі','Could not load orders.':'Тапсырыстарды жүктеу мүмкін болмады.','Could not update order status.':'Тапсырыс мәртебесін өзгерту мүмкін болмады.'});
  Object.assign(translations.ru, {'Orders':'Заказы','Manage customer orders and delivery status.':'Управление заказами и статусом доставки.','Refresh':'Обновить','No orders yet.':'Заказов пока нет.','Order status':'Статус заказа','Could not load orders.':'Не удалось загрузить заказы.','Could not update order status.':'Не удалось изменить статус заказа.'});
  const tr = phrase => translations[localStorage.getItem('velora-language') || 'kz']?.[phrase] || phrase;
  const money = amount => `${new Intl.NumberFormat('kk-KZ',{maximumFractionDigits:0}).format(Number(amount)||0)} ₸`;
  let products = [];
  let orders = [];
  let selectedFile = null;
  let previewUrl = '';

  function paintTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const source = el.dataset.i18n || el.dataset.adminSource || el.textContent.trim();
      el.dataset.adminSource = source;
      el.textContent = tr(source);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const source = el.dataset.i18nPlaceholder || el.dataset.adminPlaceholder || el.getAttribute('placeholder') || 'Search products';
      el.dataset.adminPlaceholder = source;
      el.placeholder = tr(source);
    });
    document.querySelectorAll('[data-language]').forEach(btn => {
      const active = btn.dataset.language === window.currentLanguage;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
    renderRows();
    renderOrders();
  }
  window.renderAdminTranslations = paintTranslations;

  function showMessage(target, text, error = false) {
    const node = $(target);
    if (!node) return;
    node.textContent = text;
    node.classList.toggle('error', error);
  }
  function escaped(value) {
    return String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  }
  function renderRows() {
    const host = $('#products-table');
    if (!host || $('#admin-app').hidden) return;
    const query = ($('#product-search')?.value || '').trim().toLowerCase();
    const visible = products.filter(p => `${p.name} ${p.category}`.toLowerCase().includes(query));
    $('#product-total').textContent = String(products.length);
    if (!visible.length) {
      host.innerHTML = `<p class="admin-empty">${tr(products.length ? 'Search by name or category' : 'No products yet. Add your first product.')}</p>`;
    } else {
      host.innerHTML = `<div class="admin-product-list">${visible.map(p => `<article class="admin-product-row"><img src="${escaped(p.image)}" alt="" loading="lazy"><div class="admin-product-main"><strong>${escaped(p.name)}</strong><small>${tr(p.category)} · ${Number(p.stock)||0} ${tr('IN STOCK')}</small></div><div class="admin-row-price"><strong>${money(p.price)}</strong>${p.oldPrice?`<del>${money(p.oldPrice)}</del>`:''}</div><div class="admin-row-actions"><button type="button" data-edit="${escaped(p.id)}">${tr('Edit')}</button><button type="button" class="danger" data-delete="${escaped(p.id)}">${tr('Delete')}</button></div></article>`).join('')}</div>`;
    }
    $('.product-stat').textContent = String(products.length);
    $('#stock-stat').textContent = String(products.reduce((sum,p)=>sum+(Number(p.stock)||0),0));
  }
  function renderOrders() {
    const host = $('#orders-table'); if (!host || $('#admin-app').hidden) return;
    const labels = {pending:{kz:'Күтуде',ru:'Ожидает',en:'Pending'},confirmed:{kz:'Расталды',ru:'Подтверждён',en:'Confirmed'},shipped:{kz:'Жөнелтілді',ru:'Отправлен',en:'Shipped'},delivered:{kz:'Жеткізілді',ru:'Доставлен',en:'Delivered'},cancelled:{kz:'Бас тартылды',ru:'Отменён',en:'Cancelled'}};
    const lang=window.currentLanguage||'kz';
    if (!orders.length) { host.innerHTML=`<p class="admin-empty">${tr('No orders yet.')}</p>`; return; }
    host.innerHTML=`<div class="admin-orders">${orders.map(o=>`<article class="admin-order"><div class="admin-order-top"><strong>#${escaped(o.order_number||String(o.id).slice(0,8))}</strong><span>${new Intl.DateTimeFormat(lang==='kz'?'kk-KZ':lang,{dateStyle:'medium',timeStyle:'short'}).format(new Date(o.created_at))}</span><strong>${money(o.total_amount)}</strong><select data-order-status="${escaped(o.id)}" aria-label="${tr('Order status')}">${['pending','confirmed','shipped','delivered','cancelled'].map(s=>`<option value="${s}" ${o.status===s?'selected':''}>${labels[s][lang]||labels[s].en}</option>`).join('')}</select></div><div class="admin-order-details"><strong>${escaped(o.customer_name)}</strong><a href="tel:${escaped(o.phone)}">${escaped(o.phone)}</a><span>${escaped(o.city)} · ${escaped(o.address)}</span>${o.comment?`<small>${escaped(o.comment)}</small>`:''}</div><ul>${(o.items||[]).map(line=>`<li>${escaped(line.name)} × ${Number(line.quantity)} — ${money(line.unit_price*line.quantity)}</li>`).join('')}</ul></article>`).join('')}</div>`;
  }
  async function refreshOrders() { orders=await backend.loadOrders();renderOrders(); }
  async function refreshProducts() {
    if (!backend?.configured) return;
    products = await backend.loadProducts();
    renderRows();
  }
  function openProduct(product) {
    const form = $('#admin-product-form');
    form.reset(); selectedFile = null;
    $('#product-message').textContent = '';
    $('#image-preview').hidden = true;
    $('#product-dialog-title').textContent = tr(product ? 'Edit' : 'Add Product');
    form.elements.id.value = product?.id || '';
    if (product) {
      form.elements.name.value = product.name || '';
      form.elements.category.value = product.category || 'Other';
      form.elements.price.value = product.oldPrice || product.price || '';
      form.elements.discountPrice.value = product.oldPrice ? product.price : '';
      form.elements.stock.value = product.stock ?? 0;
      form.elements.description.value = product.description || '';
      form.elements.color.value = product.color || '';
      form.elements.isNew.checked = Boolean(product.isNew);
      form.dataset.currentImage = product.image || '';
      form.elements.sizes.forEach(input => input.checked = (product.sizes || []).includes(input.value));
      if (product.image) { $('#image-preview').src = product.image; $('#image-preview').hidden = false; }
    } else {
      form.dataset.currentImage = '';
      form.elements.price.value = '';
      form.elements.discountPrice.value = '';
    }
    $('#product-dialog').showModal();
  }

  async function init() {
    if (!backend?.configured) {
      showMessage('#login-message', tr('Supabase is not configured yet.'), true);
      return;
    }
    const { data: { session } } = await backend.client.auth.getSession();
    if (session) await openAdmin(session.user);
    $('#admin-login-form').addEventListener('submit', async event => {
      event.preventDefault();
      const form = new FormData(event.currentTarget);
      const { data, error } = await backend.client.auth.signInWithPassword({ email: form.get('email'), password: form.get('password') });
      if (error) {
        const message = /invalid login credentials/i.test(error.message) ? 'Password is incorrect' : 'Could not sign in. Check your email and password.';
        showMessage('#login-message', tr(message), true);
        return;
      }
      await openAdmin(data.user);
    });
    $('#admin-signout').addEventListener('click', async () => {
      await backend.client.auth.signOut();
      $('#admin-app').hidden = true; $('#admin-login').hidden = false;
    });
    $('#add-product').addEventListener('click', () => openProduct());
    document.querySelectorAll('[data-open-products]').forEach(button => button.addEventListener('click', () => showSection('products')));
    $('#product-search').addEventListener('input', renderRows);
    $('#refresh-orders')?.addEventListener('click', async () => { try { await refreshOrders(); } catch(error) { console.error(error); showMessage('#orders-message', tr('Could not load orders.'), true); } });
    $('#orders-table')?.addEventListener('change', async event => {
      const select=event.target.closest('[data-order-status]'); if(!select)return;
      select.disabled=true;
      try { await backend.updateOrderStatus(select.dataset.orderStatus,select.value); await refreshOrders(); }
      catch(error) { console.error(error); showMessage('#orders-message',tr('Could not update order status.'),true); }
      finally { select.disabled=false; }
    });
    $('#admin-product-form').addEventListener('change', event => {
      if (event.target.name !== 'imageFile') return;
      const file = event.target.files?.[0];
      if (!file) return;
      if (!['image/jpeg','image/png','image/webp'].includes(file.type) || file.size > 10 * 1024 * 1024) {
        event.target.value = ''; selectedFile = null;
        showMessage('#product-message', tr('Only JPG, PNG, or WEBP images up to 10 MB are supported.'), true);
        return;
      }
      selectedFile = file;
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      previewUrl = URL.createObjectURL(file);
      $('#image-preview').src = previewUrl; $('#image-preview').hidden = false;
    });
    $('#admin-product-form').addEventListener('submit', async event => {
      event.preventDefault();
      const form = event.currentTarget;
      if (!selectedFile && !form.dataset.currentImage) {
        showMessage('#product-message', tr('Please choose an image file.'), true); return;
      }
      const data = new FormData(form);
      const regularPrice = Number(data.get('price'));
      const discountPrice = Number(data.get('discountPrice')) || 0;
      if (discountPrice && discountPrice >= regularPrice) {
        showMessage('#product-message', tr('Discount must be lower than regular price'), true); return;
      }
      const item = {
        id: data.get('id') || null, name: String(data.get('name')).trim(),
        category: data.get('category'), price: discountPrice || regularPrice,
        oldPrice: discountPrice ? regularPrice : null, stock: Number(data.get('stock')),
        description: String(data.get('description') || '').trim(), color: String(data.get('color') || '').trim(),
        sizes: [...form.querySelectorAll('[name="sizes"]:checked')].map(input => input.value),
        isNew: form.elements.isNew.checked, image: form.dataset.currentImage || ''
      };
      const button = form.querySelector('[type=submit]'); button.disabled = true;
      try {
        products = await backend.saveProduct(item, selectedFile);
        renderRows(); $('#product-dialog').close();
        if (previewUrl) URL.revokeObjectURL(previewUrl); previewUrl = ''; selectedFile = null;
      } catch (error) {
        console.error(error);
        const message = error.message === 'Choose a product image.' ? 'Please choose an image file.' : 'Could not save product. Check Storage and database policies.';
        showMessage('#product-message', tr(message), true);
      } finally { button.disabled = false; }
    });
    $('[data-close-dialog]').addEventListener('click', () => $('#product-dialog').close());
    document.querySelectorAll('.admin-nav [data-section]').forEach(button => button.addEventListener('click', () => showSection(button.dataset.section)));
    $('#products-table').addEventListener('click', async event => {
      const edit = event.target.closest('[data-edit]');
      const del = event.target.closest('[data-delete]');
      if (edit) openProduct(products.find(p => String(p.id) === edit.dataset.edit));
      if (del && confirm(tr('Delete') + '?')) {
        try { products = await backend.deleteProduct(del.dataset.delete); renderRows(); }
        catch (error) { console.error(error); alert(tr('Could not delete product.')); }
      }
    });
  }
  function showSection(name) {
    document.querySelectorAll('.admin-nav [data-section]').forEach(button => button.classList.toggle('active', button.dataset.section === name));
    document.querySelectorAll('.admin-section').forEach(section => section.hidden = section.id !== `${name}-section`);
  }
  async function openAdmin(user) {
    const { data, error } = await backend.client.from('velora_admins').select('user_id').eq('user_id', user.id).maybeSingle();
    if (error || !data) {
      await backend.client.auth.signOut();
      showMessage('#login-message', tr('This account is not authorized as a store admin.'), true);
      return;
    }
    $('#admin-login').hidden = true; $('#admin-app').hidden = false;
    $('#admin-date').textContent = new Intl.DateTimeFormat(window.currentLanguage === 'kz' ? 'kk-KZ' : window.currentLanguage).format(new Date());
    try { await refreshProducts(); await refreshOrders(); }
    catch (error) { console.error(error); showMessage('#login-message', tr('Could not load products. Check the Supabase setup.'), true); }
    paintTranslations();
  }
  document.addEventListener('DOMContentLoaded', init);
})();

