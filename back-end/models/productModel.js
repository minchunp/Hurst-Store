const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const product = new Schema({
   id: { type: ObjectId }, // Khóa chính
   cate_id: { type: ObjectId, ref: 'category' }, // Khóa phụ
   name_pro: { type: String },
   price_pro: { type: Number },
   sale_pro: { type: Number },
   image_pro: { type: String },
   trending_pro: { type: String },
   description_pro: { type: String },
   quantity_pro: { type: Number},
   size_pro: { type: String }
});
module.exports = mongoose.models.product || mongoose.model('product', product);
