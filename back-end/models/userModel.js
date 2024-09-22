const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const user = new Schema({
   id: { type: ObjectId }, // Khóa chính
   email_user: { type: String },
   pass_user: { type: String },
   name_user: { type: String },
   role_user: { type: String }
});
module.exports = mongoose.models.user || mongoose.model('user', user);
