const house = require('./db.json');

let id = 4;

module.exports = {
    getHouses: (req, res) => {
        res.status(200).send(house);
    },

    deleteHouse: (req, res) => {
        let index = house.findIndex(house => house.id === +req.params.id)
        house.splice(index, 1)
        res.status(200).send(house); 
    },

    createHouse: (req, res) => {   //ID, address, price, imageURL  req.body
        let {address, price, imageURL} = req.body;
        let newHouse = {
            id,
            address,
            price: +price,
            imageURL
        }
        house.push(newHouse);
        id++;
        res.status(200).send(house);
    },
    
    updateHouse: (req, res) => {
        let {id} = req.params;
        let {type} = req.body;        

        let index = house.findIndex(element => element.id === +id)
        if (house[index].price < 10000 && type === 'minus') {
             res.status(400).send('nothing is free!')
        }   else if (type === 'plus') {
             house[index].price  += 10000;
             res.status(200).send(house);
        }   else if (type === 'minus') {
             house[index].price -= 10000;
             res.status(200).send(house);
        }   else {
            res.sendStatus(400);
        }        
    },    
}

