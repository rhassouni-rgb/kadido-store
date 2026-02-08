"use client";

import React, { useState, useEffect, useRef } from "react";
import { ShoppingCart, Search, ArrowRight, Phone, MessageCircle, Instagram, Facebook, Music, Grid } from "lucide-react"; 
import { client } from "@/sanity/lib/client"; 
import imageUrlBuilder from "@sanity/image-url";

// إعداد أداة الصور
const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return source ? builder.image(source) : null;
}

export default function SmartStore() {

  // ================= STATES (المتغيرات) =================
  const productsSectionRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewProduct, setViewProduct] = useState<any>(null);
  const [showInfoBar, setShowInfoBar] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // المتغيرات القادمة من Sanity
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // بيانات استمارة الطلب
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    wilaya: ""
  });

  // ================= جلب البيانات =================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productQuery = `*[_type == "product"]{
          _id,
          name,
          price,
          oldPrice,
          "category": category->categoryId, 
          image,
          images
        }`;

        const categoryQuery = `*[_type == "category"] | order(_createdAt asc) {
          _id,
          name,
          categoryId,
          image
        }`;

        const [pData, cData] = await Promise.all([
          client.fetch(productQuery),
          client.fetch(categoryQuery)
        ]);

        setAllProducts(pData);
        setCategories(cData);
        setLoading(false);

      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ================= الدوال المساعدة =================
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const sendOrderToWhatsApp = () => {
    if (!formData.name || !formData.phone || !formData.address) {
      alert("يرجى ملء جميع المعلومات المطلوبة");
      return;
    }
    const myPhoneNumber = "213000000000"; 
    const message = `
👋 طلب جديد:
📦 ${viewProduct.name}
💰 ${viewProduct.price} د.ج
👤 ${formData.name} | 📱 ${formData.phone}
🏠 ${formData.address} | 📍 ${formData.wilaya}
    `;
    window.open(`https://wa.me/${myPhoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleCategoryClick = (id: string) => {
    setViewProduct(null);
    setSelectedCategory(id);
    setTimeout(() => {
      if (productsSectionRef.current) productsSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleProductClick = (product: any) => {
    setViewProduct(product);
    setActiveImageIndex(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goHome = () => {
    setViewProduct(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const handleScroll = () => {
      setShowInfoBar(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => { setShowInfoBar(false); }, 3000);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const displayedProducts = selectedCategory === "all" ? allProducts : allProducts.filter(p => p.category === selectedCategory);
  const getProductImages = (product: any) => product.images?.length ? product.images : (product.image ? [product.image] : []);

  // شاشة التحميل
  if (loading) {
    return (
      <div style={{ height: '100vh', backgroundColor: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '20px' }}>
        <div style={{ width: '50px', height: '50px', border: '5px solid #333', borderTop: '5px solid #FFD700', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
        <p style={{ fontWeight: 'bold', fontSize: '18px', color: '#fff' }}>جاري تجهيز الصالة...</p>
        <style jsx>{` @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } } `}</style>
      </div>
    );
  }

  // ================= واجهة المستخدم =================
  return (
    <div style={{ 
      fontFamily: 'sans-serif', 
      backgroundColor: '#f0f0f0', 
      backgroundImage: 'url("https://images.unsplash.com/photo-1566008885218-90abf9200ddb?q=80&w=1920&auto=format&fit=crop")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      minHeight: '100vh', 
      direction: 'rtl', 
      paddingBottom: '120px', 
      color: '#333',
      position: 'relative',
      overflowX: 'hidden'
    }}>
      
      {/* الطبقة البيضاء الشفافة */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(8px)', zIndex: 0 }}></div>

      {/* المحتوى الرئيسي */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        
        {/* HEADER - الشريط العلوي */}
        <header style={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.95)', 
          backdropFilter: 'blur(15px)', 
          borderBottom: '1px solid rgba(255, 215, 0, 0.3)', 
          boxShadow: '0 5px 20px rgba(0,0,0,0.5)',
          height: '100px', 
          width: '100%', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', 
          position: 'fixed',
          top: '0', left: '0',
          zIndex: 9999,
        }}>
          <div style={{ width: '100%', maxWidth: '1400px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' }}>
            
            {/* 1. زر "الكل" وزر القائمة - يظهران على اليمين */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                {/* زر عرض الكل */}
                <div onClick={() => handleCategoryClick("all")} style={{
                    display: 'flex', alignItems: 'center', gap: '5px',
                    backgroundColor: selectedCategory === 'all' ? '#FFD700' : 'rgba(255,255,255,0.1)',
                    color: selectedCategory === 'all' ? '#000' : '#fff',
                    padding: '8px 15px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', transition: '0.3s'
                }}>
                    <Grid size={16} />
                    <span>عرض الكل</span>
                </div>

                {/* روابط الأقسام السريعة (تختفي في الهاتف) */}
                <div className="hidden md:flex gap-4 items-center">
                    {categories.slice(0, 3).map(c => (
                        <span key={c._id} onClick={() => handleCategoryClick(c.categoryId)} 
                            style={{ color: '#aaa', cursor: 'pointer', fontSize: '13px', transition: '0.3s' }}
                            onMouseOver={e => e.currentTarget.style.color = '#fff'}
                            onMouseOut={e => e.currentTarget.style.color = '#aaa'}
                        >
                            {c.name}
                        </span>
                    ))}
                </div>
            </div>

            {/* 2. اللوجو والعنوان في المنتصف */}
            <div onClick={goHome} style={{ 
                textAlign: 'center', cursor: 'pointer', position: 'absolute', left: '50%', transform: 'translateX(-50%)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
            }}>
                <img 
                  src="/logo.png" 
                  alt="Logo" 
                  style={{ height: '40px', objectFit: 'contain', marginBottom: '2px' }} 
                />
                <h1 style={{ 
                  color: '#fff', 
                  fontSize: '16px', margin: 0, fontFamily: 'serif', fontWeight: '900', letterSpacing: '2px', textTransform: 'uppercase'
                }}>
                  KADIDO Auto
                </h1>
            </div>

            {/* 3. عنوان الترحيب وأيقونات (على اليسار) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                 {/* عنوان الترحيب - يظهر في الهاتف والكمبيوتر */}
                 <div style={{ color: '#FFD700', fontSize: '12px', fontWeight: 'bold', letterSpacing: '1px', border: '1px solid #FFD700', padding: '5px 10px', borderRadius: '5px' }}>
                    Welcome To Kadido
                 </div>

                 {/* سلة المشتريات */}
                 <div style={{ position: 'relative', cursor: 'pointer' }}>
                    <ShoppingCart style={{ width: '22px', height: '22px', color: '#fff' }} />
                    <span style={{ position: 'absolute', top: '-5px', right: '-5px', backgroundColor: 'red', color: '#fff', fontSize: '10px', width: '15px', height: '15px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>0</span>
                 </div>
            </div>

          </div>
        </header>

        <div style={{ height: '100px', width: '100%' }}></div>

        {/* BODY */}
        {viewProduct ? (
          <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px', display: 'flex', flexWrap: 'wrap', gap: '40px' }}>
            <div style={{ width: '100%', marginBottom: '10px' }}>
               <button onClick={goHome} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '16px', fontWeight: 'bold', color: '#333' }}>
                 <ArrowRight size={20} color="#FFD700" /> العودة للمعرض
               </button>
            </div>

            <div style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
               <div style={{ 
                 backgroundColor: 'rgba(255, 255, 255, 0.7)', 
                 backdropFilter: 'blur(15px)',
                 border: '1px solid rgba(255, 255, 255, 0.9)',
                 boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                 borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                 padding: '40px', height: '500px', position: 'relative'
               }}>
                  {getProductImages(viewProduct)[activeImageIndex] && (
                     <img src={urlFor(getProductImages(viewProduct)[activeImageIndex])?.url()} alt={viewProduct.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                  )}
               </div>
               
               <div style={{ display: 'flex', gap: '10px', overflowX: 'auto' }}>
                  {getProductImages(viewProduct).map((img: any, index: number) => (
                    <div key={index} onClick={() => setActiveImageIndex(index)}
                      style={{ 
                        width: '80px', height: '80px', 
                        border: activeImageIndex === index ? '2px solid #FFD700' : '1px solid rgba(255,255,255,0.5)',
                        backgroundColor: 'rgba(255,255,255,0.5)',
                        borderRadius: '10px', cursor: 'pointer', overflow: 'hidden',
                        opacity: activeImageIndex === index ? 1 : 0.7, transition: '0.3s'
                      }}
                    >
                      <img src={urlFor(img)?.width(150).url()} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  ))}
               </div>
            </div>

            <div style={{ flex: '1 1 400px' }}>
              <h1 style={{ fontSize: '40px', fontWeight: '900', margin: '0 0 10px 0', color: '#333' }}>{viewProduct.name}</h1>
              <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '30px' }}>
                  <span style={{ fontSize: '30px', fontWeight: 'bold', color: '#FFD700' }}>{viewProduct.price} د.ج</span>
                  {viewProduct.oldPrice && <span style={{ fontSize: '20px', textDecoration: 'line-through', color: '#999' }}>{viewProduct.oldPrice} د.ج</span>}
              </div>

              <div style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                backdropFilter: 'blur(15px)',
                border: '1px solid rgba(255, 255, 255, 0.9)',
                boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
                borderRadius: '15px', padding: '30px'
              }}>
                <h3 style={{ marginTop: 0, marginBottom: '20px', color: '#333' }}>معلومات التوصيل</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <input type="text" name="name" placeholder="الاسم الكامل" value={formData.name} onChange={handleInputChange} 
                    style={{ width: '100%', padding: '15px', borderRadius: '8px', border: '1px solid #eee', backgroundColor: '#fff', color: '#333' }} />
                  <input type="tel" name="phone" placeholder="رقم الهاتف" value={formData.phone} onChange={handleInputChange} 
                    style={{ width: '100%', padding: '15px', borderRadius: '8px', border: '1px solid #eee', backgroundColor: '#fff', color: '#333' }} />
                  <input type="text" name="address" placeholder="العنوان" value={formData.address} onChange={handleInputChange} 
                    style={{ width: '100%', padding: '15px', borderRadius: '8px', border: '1px solid #eee', backgroundColor: '#fff', color: '#333' }} />
                  <select name="wilaya" value={formData.wilaya} onChange={handleInputChange} 
                    style={{ width: '100%', padding: '15px', borderRadius: '8px', border: '1px solid #eee', backgroundColor: '#fff', color: '#333' }}>
                      <option value="">اختر الولاية...</option>
                      <option value="16 - الجزائر">16 - الجزائر</option>
                  </select>
                  <button onClick={sendOrderToWhatsApp} style={{ 
                    backgroundColor: '#111', color: '#FFD700', width: '100%', padding: '16px', border: 'none', borderRadius: '8px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px', boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
                  }}>طلب الآن (WhatsApp)</button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <section style={{ padding: '60px 20px' }}>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '50px', flexWrap: 'wrap' }}>
                {categories.map((item) => (
                  <div key={item._id} onClick={() => handleCategoryClick(item.categoryId)} style={{ textAlign: 'center', cursor: 'pointer', transition: '0.3s' }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
                    <div style={{ 
                      width: '120px', height: '120px', borderRadius: '50%', border: '2px solid #FFD700',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '15px',
                      backgroundColor: 'rgba(255,255,255,0.8)', boxShadow: '0 5px 15px rgba(0,0,0,0.1)', transition: '0.3s'
                    }} onMouseOver={e => e.currentTarget.style.backgroundColor = '#fff'} onMouseOut={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.8)'}>
                      {item.image && <img src={urlFor(item.image)?.url()} alt={item.name} style={{ width: '95%', height: '95%', objectFit: 'contain' }} />}
                    </div>
                    <h2 style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>{item.name}</h2>
                  </div>
                ))}
              </div>
            </section>

            <section ref={productsSectionRef} style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
              <h3 style={{ textAlign: 'center', fontSize: '30px', color: '#333', marginBottom: '40px', fontWeight: '900' }}>
                  {selectedCategory === "all" ? "المعرض الفاخر" : "المنتجات"}
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
                {displayedProducts.map((product: any) => (
                  <div key={product._id} onClick={() => handleProductClick(product)} 
                    style={{ 
                      backgroundColor: 'rgba(255,255,255,0.75)', 
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.9)',
                      boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
                      borderRadius: '15px', padding: '20px', textAlign: 'center', cursor: 'pointer', transition: '0.3s'
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.borderColor = '#FFD700'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.9)'; }}
                    onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.9)'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.75)'; }}
                  >
                    <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '15px' }}>
                      {getProductImages(product)[0] && (
                        <img src={urlFor(getProductImages(product)[0])?.url()} alt={product.name} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', filter: 'drop-shadow(0 5px 5px rgba(0,0,0,0.1))' }} />
                      )}
                    </div>
                    <h4 style={{ fontSize: '18px', color: '#333', marginBottom: '10px', fontWeight: 'bold' }}>{product.name}</h4>
                    <span style={{ color: '#333', fontWeight: '900', fontSize: '20px' }}>{product.price} د.ج</span>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
      
      {/* التنبيه العائم القديم */}
      <div style={{ 
        position: 'fixed', bottom: showInfoBar ? '110px' : '-100px', 
        left: '50%', transform: 'translateX(-50%)', 
        backgroundColor: 'rgba(255,255,255,0.9)', padding: '10px 25px', borderRadius: '50px', 
        boxShadow: '0 5px 20px rgba(0,0,0,0.1)', color: '#333', fontWeight: 'bold', border: '1px solid #FFD700',
        transition: 'bottom 0.5s ease', zIndex: 2000, display: 'flex', alignItems: 'center', gap: '10px'
      }}>
        <span style={{color: '#FFD700'}}>✨</span> خدمة التوصيل متوفرة لـ 58 ولاية
      </div>

      {/* ========================================================== */}
      {/* 🚀 5-ITEM LUXURY DOCK (فيسبوك - تيك توك - واتساب - انستغرام - اتصال) 🚀 */}
      {/* ========================================================== */}
      <div style={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '94%',
          maxWidth: '400px',
          height: '70px',
          backgroundColor: 'rgba(20, 20, 20, 0.85)',
          backdropFilter: 'blur(20px)',
          borderRadius: '35px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.1)',
          border: '1px solid rgba(255, 215, 0, 0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 20px',
          zIndex: 10000,
      }}>
          
          {/* 1. زر فيسبوك (Facebook) */}
          <div onClick={() => window.open('https://facebook.com', '_blank')} 
               style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', cursor: 'pointer', opacity: 0.8, transition: '0.3s' }}
               onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
               onMouseOut={(e) => e.currentTarget.style.opacity = '0.8'}>
              <Facebook size={20} color="#fff" strokeWidth={1.5} />
              <span style={{ fontSize: '9px', color: '#fff', fontWeight: '300' }}>فيسبوك</span>
          </div>

          {/* 2. زر تيك توك (TikTok) */}
          <div onClick={() => window.open('https://tiktok.com', '_blank')} 
               style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', cursor: 'pointer', opacity: 0.8, transition: '0.3s' }}
               onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
               onMouseOut={(e) => e.currentTarget.style.opacity = '0.8'}>
              <Music size={20} color="#fff" strokeWidth={1.5} /> 
              <span style={{ fontSize: '9px', color: '#fff', fontWeight: '300' }}>تيك توك</span>
          </div>

          {/* 3. زر الواتساب (النجم ⭐) - يطفو للأعلى */}
          <div onClick={() => window.open('https://wa.me/213000000000', '_blank')}
               style={{ 
                  width: '55px', height: '55px', 
                  backgroundColor: '#111', 
                  borderRadius: '50%', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transform: 'translateY(-20px)', 
                  boxShadow: '0 0 0 5px rgba(20,20,20,0.85), 0 10px 20px rgba(255, 215, 0, 0.3)',
                  border: '1px solid #FFD700',
                  cursor: 'pointer',
                  transition: '0.3s'
               }}
               onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-25px) scale(1.05)'; e.currentTarget.style.boxShadow = '0 0 0 5px rgba(20,20,20,0.85), 0 15px 30px rgba(255, 215, 0, 0.5)'; }}
               onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(-20px)'; e.currentTarget.style.boxShadow = '0 0 0 5px rgba(20,20,20,0.85), 0 10px 20px rgba(255, 215, 0, 0.3)'; }}
               >
              <MessageCircle size={26} color="#FFD700" fill="#FFD700" />
          </div>

          {/* 4. زر إنستغرام */}
          <div onClick={() => window.open('https://instagram.com', '_blank')} 
               style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', cursor: 'pointer', opacity: 0.8, transition: '0.3s' }}
               onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
               onMouseOut={(e) => e.currentTarget.style.opacity = '0.8'}>
              <Instagram size={20} color="#fff" strokeWidth={1.5} />
              <span style={{ fontSize: '9px', color: '#fff', fontWeight: '300' }}>انستغرام</span>
          </div>

          {/* 5. زر الاتصال */}
          <div onClick={() => window.open('tel:0550000000', '_self')}
               style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', cursor: 'pointer', opacity: 0.8, transition: '0.3s' }}
               onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
               onMouseOut={(e) => e.currentTarget.style.opacity = '0.8'}>
              <Phone size={20} color="#fff" strokeWidth={1.5} />
              <span style={{ fontSize: '9px', color: '#fff', fontWeight: '300' }}>اتصل</span>
          </div>

      </div>

    </div>
  );
}