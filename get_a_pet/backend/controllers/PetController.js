const { get } = require('mongoose');
const Pet = require('../models/Pet');

// helpers
const getToken = require('../helpers/get-token');
const getUserByToken = require('../helpers/get-user-by-token');

module.exports = class PetController {

    // create a pet 
    static async create(req, res) {
    
        const {name, age, weight, color} = req.body;

        const images = req.files
        const available = true;

        // images upload

        // validation
        if(!name) {
            return res.status(400).json({message: 'Nome é obrigatório'});
        }

        if(!age) {
            return res.status(400).json({message: 'A idade é obrigatório'});
        }

        if(!weight) {
            return res.status(400).json({message: 'O peso é obrigatório'});
        }

        if(!color) {
            return res.status(400).json({message: 'A cor é obrigatório'});
        }

        if(!images.length > 0) {
            return res.status(400).json({message: 'A imagem é obrigatório'});
        }

        // get pet owner
        const token = getToken(req);
        const user = await getUserByToken(token);
        // create a pet
        const pet = new Pet ({
            name,
            age,
            weight,
            color,
            available,
            images: [],
            user: {
                _id: user._id,
                name: user.name,
                image: user.image,
                phone: user.phone,
            }

        })

        images.map((image) => {
            pet.images.push(image.filename)
        })

        try{

            const newPet = await pet.save();
            res.status(201).json({message: 'Pet criado com sucesso', 
            newPet,
        });
        }catch (error) {
            res.status(500).json({message: 'Erro ao criar pet', error});
        }
    }
    static async getAll(req, res) {

        const pets = await Pet.find().sort('-createdAt')

        res.status(200).json({pets})
    }

    static async getAllUserPets(req, res) {
            
            const token = getToken(req);
            const user = await getUserByToken(token);
    
            const pets = await Pet.find({'user._id': user._id}).sort('-createdAt')
    
            res.status(200).json({pets})
    }

    static async getAllUserAdoptions(req, res) {
       
        const token = getToken(req);
        const user = await getUserByToken(token);

        const pets = await Pet.find({'adopter._id': user._id}).sort('-createdAt')

        res.status(200).json({pets})
    }
}