import { Button } from "@/components/ui/button"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 text-black p-8">
      {/* رأس الصفحة */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">لوحة التحكم</h1>
          <p className="text-gray-500 mt-1">إدارة منتجاتك ومبيعاتك من هنا</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 font-bold shadow-lg text-white">
          + إضافة منتج جديد
        </Button>
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500">إجمالي المبيعات</h3>
          <div className="text-2xl font-bold mt-2">0.00 د.ج</div>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500">المنتجات النشطة</h3>
          <div className="text-2xl font-bold mt-2">0</div>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500">الطلبات الجديدة</h3>
          <div className="text-2xl font-bold mt-2">0</div>
        </div>
      </div>

      {/* منطقة المنتجات الفارغة */}
      <div className="flex h-[400px] items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white">
        <div className="text-center">
          <h3 className="mt-2 text-lg font-semibold text-gray-900">لا توجد منتجات حتى الآن</h3>
          <p className="mt-1 text-sm text-gray-500">ابدأ بإضافة أول منتج لمتجرك ليراه الزبائن.</p>
        </div>
      </div>
    </div>
  )
}