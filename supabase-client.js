(() => {
  const config = window.VELORA_SUPABASE_CONFIG || {};
  const configured = /^https:\/\/.+\.supabase\.co$/.test(config.url || '') &&
    config.anonKey && !String(config.anonKey).includes('YOUR_');

  if (!configured || !window.supabase?.createClient) {
    window.VeloraBackend = { configured: false };
    return;
  }

  const client = window.supabase.createClient(config.url, config.anonKey, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
  });
  const bucket = config.bucket || 'product-images';

  window.VeloraBackend = {
    configured: true,
    client,
    async loadProducts() {
      const { data, error } = await client.from('products').select('*').order('created_at');
      if (error) throw error;
      return (data || []).map(row => ({
        id: row.id, name: row.name, image: row.image_url, price: Number(row.price),
        oldPrice: row.old_price == null ? null : Number(row.old_price), category: row.category,
        description: row.description || '', stock: Number(row.stock) || 0,
        sizes: row.sizes || [], color: row.color || '', rating: Number(row.rating) || 5,
        badge: row.old_price ? `${Math.round((1 - Number(row.price) / Number(row.old_price)) * 100)}% OFF` : '',
        isNew: Boolean(row.is_new)
      }));
    },
    async saveProduct(product, file) {
      let imageUrl = product.image || '';
      if (file) {
        const extension = file.name.split('.').pop().toLowerCase();
        const path = `${crypto.randomUUID()}.${extension}`;
        const { error: uploadError } = await client.storage.from(bucket).upload(path, file, {
          cacheControl: '31536000', upsert: false, contentType: file.type
        });
        if (uploadError) throw uploadError;
        imageUrl = client.storage.from(bucket).getPublicUrl(path).data.publicUrl;
      }
      if (!imageUrl) throw new Error('Choose a product image.');
      const payload = {
        name: product.name, image_url: imageUrl, price: product.price,
        old_price: product.oldPrice, category: product.category,
        description: product.description, stock: product.stock, sizes: product.sizes,
        color: product.color, is_new: product.isNew
      };
      const query = product.id
        ? client.from('products').update(payload).eq('id', product.id)
        : client.from('products').insert(payload);
      const { error } = await query;
      if (error) throw error;
      return this.loadProducts();
    },
    async deleteProduct(id) {
      const { error } = await client.from('products').delete().eq('id', id);
      if (error) throw error;
      return this.loadProducts();
    }
  };
})();
