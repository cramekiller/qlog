const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: { type: String, unique: true, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    ingredients: [{ingretient: {type: Schema.Types.ObjectId, ref: 'Ingredient'}, quantity: Number}],
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('Boisson', schema);