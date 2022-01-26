const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    dateheure: { type: Date, value: Date.now() },
    gobelet: {type: Schema.Types.ObjectId, ref: 'Gobelet'},
    etat_commande: String,
    boisson: {type: Schema.Types.ObjectId, ref: 'Boisson'},
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('Commande', schema);