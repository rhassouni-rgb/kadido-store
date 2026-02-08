import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: "q3ui6u4i", // 👈 تم وضع الكود الخاص بك هنا
  dataset: "production", // هذا هو الاسم الافتراضي لقاعدة البيانات
  apiVersion: "2024-01-01",
  useCdn: true,
})