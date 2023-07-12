const mongoose = require('../db/conn');
const {Schema} = mongoose;

const Pet = mongoose.model(
    'Pet',
    new Schema({
      name: {
        type: String,
        required: true,
        },
        age: {
            type: Number,
            required: true,
        },
        weight: {
            type: Number,
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
        images: {
            type: Array,
            required: true,
        },
        available: {
            type: Boolean,
            required: true,
        },
        // informações de quem cadastrou o pet
        user: Object,
        // informações de quem adotou o pet
        adopter: Object
    },
    // marcar a data de criação e atualização do pet
    {timestamps: true},
    ),
);

module.exports = Pet;