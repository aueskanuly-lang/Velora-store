(() => {
  const $ = selector => document.querySelector(selector);
  const money = value => `${new Intl.NumberFormat('kk-KZ',{maximumFractionDigits:0}).format(Number(value)||0)} ₸`;
  const words = {
    kz:{empty:'Себетіңіз бос.',add:'Рәсімдеу алдында себетке тауар қосыңыз.',fail:'Тапсырысты жіберу мүмкін болмады. Қайталап көріңіз.',success:'Тапсырысыңыз қабылданды. Тапсырыс нөмірі: '},
    ru:{empty:'Корзина пуста.',add:'Добавьте товары перед оформлением заказа.',fail:'Не удалось отправить заказ. Попробуйте ещё раз.',success:'Ваш заказ принят. Номер заказа: '},
    en:{empty:'Your bag is empty.',add:'Please add products before checkout.',fail:'Could not submit your order. Please try again.',success:'Your order has been received. Order number: '}
  };
  const phrase = key => (words[window.currentLanguage||'kz']||words.kz)[key];
  function render(){
    const cart=JSON.parse(localStorage.getItem('velora-cart')||'[]'),products=JSON.parse(localStorage.getItem('velora-products')||'[]');
    const lines=cart.map(item=>({...item,product:products.find(p=>String(p.id)===String(item.id))})).filter(x=>x.product),host=$('#checkout-items');
    if(!lines.length){host.textContent=phrase('empty');$('#checkout-total').textContent=money(0);return;}
    host.innerHTML=lines.map(line=>`<div class="checkout-line"><span>${line.product.name} × ${line.qty}</span><strong>${money(line.product.price*line.qty)}</strong></div>`).join('');
    $('#checkout-total').textContent=money(lines.reduce((sum,line)=>sum+Number(line.product.price)*line.qty,0));
  }
  document.addEventListener('DOMContentLoaded',()=>{
    if(window.VeloraBackend?.configured)window.VeloraBackend.loadProducts().then(rows=>{localStorage.setItem('velora-products',JSON.stringify(rows));render();}).catch(error=>console.error('Could not refresh checkout products:',error));
    render();document.addEventListener('click',e=>{if(e.target.closest('[data-language]'))setTimeout(render,0)});
    $('#checkout-form').addEventListener('submit',async event=>{
      event.preventDefault();const cart=JSON.parse(localStorage.getItem('velora-cart')||'[]'),products=JSON.parse(localStorage.getItem('velora-products')||'[]'),
        items=cart.map(line=>({product_id:line.id,quantity:Number(line.qty)})).filter(line=>products.some(p=>String(p.id)===String(line.product_id))),
        status=$('#checkout-message'),button=event.currentTarget.querySelector('[type=submit]');
      if(!items.length){status.textContent=phrase('add');status.classList.add('error');return;}
      if(!window.VeloraBackend?.configured){status.textContent=phrase('fail');status.classList.add('error');return;}
      const data=new FormData(event.currentTarget);button.disabled=true;status.textContent='';status.classList.remove('error');
      try{
        const result=await window.VeloraBackend.placeOrder({customer_name:String(data.get('customer_name')).trim(),phone:String(data.get('phone')).trim(),city:String(data.get('city')).trim(),address:String(data.get('address')).trim(),comment:String(data.get('comment')||'').trim(),items});
        const id=typeof result==='string'?result:result.order_number||result.id;
        localStorage.setItem('velora-cart','[]');render();status.textContent=phrase('success')+id;event.currentTarget.reset();
      }catch(error){console.error('Order submission failed:',error);status.textContent=phrase('fail');status.classList.add('error');}
      finally{button.disabled=false;}
    });
  });
})();
