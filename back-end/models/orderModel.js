const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const order = new Schema({
   id: { type: ObjectId }, // Khóa chính
   user_id: { type: ObjectId, ref: 'user' }, // Khóa phụ
   products: { type: Object, ref: 'product' },
   date_order: { type: String },
   total_order: { type: Number },
   status_order: { type: String },
   name_user: { type: String }
});
module.exports = mongoose.models.order || mongoose.model('order', order);

