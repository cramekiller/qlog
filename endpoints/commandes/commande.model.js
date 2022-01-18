const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    dateheure: { type: Date, value: Date.now() },
    gobelet: [{ingretient: {type: Schema.Types.ObjectId, ref: 'Gobelet'}, quantity: Number}],
    etat_commande: [{ingretient: {type: Schema.Types.ObjectId, ref: 'Etat'}, quantity: Number}],
    boisson: [{ingretient: {type: Schema.Types.ObjectId, ref: 'Boisson'}, quantity: Number}],
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('Commande', schema);