import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'product',
  title: 'المنتجات (Products)',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'اسم المنتج',
      type: 'string',
      description: 'مثال: SACOCHE HERMES LUXE',
    }),
    defineField({
      name: 'price',
      title: 'السعر الحالي (د.ج)',
      type: 'string',
      description: 'مثال: 9,800.00',
    }),
    defineField({
      name: 'oldPrice',
      title: 'السعر القديم (للتخفيض)',
      type: 'string',
      description: 'مثال: 15,000.00',
    }),
    defineField({
      name: 'category',
      title: 'القسم',
      type: 'reference',
      to: [{ type: 'category' }],
      description: 'اختر القسم الذي ينتمي إليه هذا المنتج',
      validation: (rule) => rule.required(),
    }),
    
    // --- الصورة الرئيسية (لم يتم لمسها) ---
    defineField({
      name: 'image',
      title: 'الصورة الرئيسية للمنتج',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    // --- 👇👇 الإضافة الجديدة فقط: معرض الصور 👇👇 ---
    defineField({
      name: 'images',
      title: 'صور إضافية (المعرض)',
      type: 'array', // نوع مصفوفة ليقبل أكثر من صورة
      of: [{ type: 'image' }], // محتوى المصفوفة هو صور
      options: {
        layout: 'grid', // لعرض الصور بشكل شبكة جميلة
      },
    }),
    // ---------------------------------------------
  ],
})