"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AddProductPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: any) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.target)
    const name = formData.get("name")
    const price = formData.get("price")

    try {
      // 1. التأكد من وجود متجر (أو إنشاؤه تلقائياً لأول مرة)
      let { data: shop } = await supabase.from('shops').select('id').single()
      
      if (!shop) {
        // إذا لم يكن هناك متجر، ننشئ واحداً باسم افتراضي
        const { data: newShop, error: shopError } = await supabase
          .from('shops')
          .insert([{ name: 'متجري الأول' }])
          .select()
          .single()
        
        if (shopError) throw shopError
        shop = newShop
      }

      // 2. إضافة المنتج وربطه بالمتجر
      const { error: productError } = await supabase
        .from('products')
        .insert([
          { 
            name, 
            price, 
           shop_id: shop!.id
          }
        ])

      if (productError) throw productError

      // 3. النجاح والعودة للوحة التحكم
      alert("تمت إضافة المنتج بنجاح! 🎉")
      router.push("/dashboard")
      router.refresh() // لتحديث البيانات في الصفحة السابقة

    } catch (error) {
      console.error(error)
      alert("حدث خطأ أثناء الحفظ")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            إضافة منتج جديد
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            أدخل تفاصيل المنتج ليظهر في متجرك
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">اسم المنتج</Label>
              <Input id="name" name="name" type="text" required placeholder="مثلاً: قميص صيفي" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="price">السعر (د.ج)</Label>
              <Input id="price" name="price" type="number" required placeholder="1500" className="mt-1" />
            </div>
          </div>

          <div className="flex gap-4">
            <Button type="button" variant="outline" className="w-full" onClick={() => router.back()}>
              إلغاء
            </Button>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
              {loading ? "جاري الحفظ..." : "حفظ المنتج"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}