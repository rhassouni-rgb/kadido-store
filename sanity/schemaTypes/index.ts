import { type SchemaTypeDefinition } from 'sanity'
// استيراد الملفين
import product from './product'
import category from './category'

export const schema: { types: SchemaTypeDefinition[] } = {
  // دمج الملفين في القائمة
  types: [product, category],
}