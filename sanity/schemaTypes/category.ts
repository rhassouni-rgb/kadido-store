import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'category',
  title: 'صور الأقسام (الدوائر الصفراء)',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'اسم القسم (للعرض)',
      type: 'string',
      description: 'مثال: Casquettes',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'categoryId',
      title: 'معرف القسم (ID) - مهم للفلترة',
      type: 'string',
      description: 'اكتب هنا نفس المعرف المستخدم في المنتجات بالظبط: caps أو bags أو wallets أو shoes',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'الصورة (يفضل أن تكون PNG شفافة)',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
  ],
})