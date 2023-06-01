const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

const hbs = exphbs.create({
    partialsDir: ['views/partials'],
})

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/dashboard', (req, res) => {

    var produtos = [
        {
            nome: 'Camisa',
            Img: '//static.netshoes.com.br/produtos/camisa-adidas-entrada-22-masculina/14/FB8-4610-014/FB8-4610-014_zoom1.jpg?ts=1669732375',
            descricao: 'Camisa de algodão',
            preco: 50.00,
        },
        {
            nome: 'Calça',
            Img: '//static.netshoes.com.br/produtos/calca-jeans-skinny-terminal-com-puidos-masculina/08/MCM-0101-008/MCM-0101-008_zoom1.jpg?ts=1680623608',
            descricao: 'Calça jeans',
            preco: 100.00,
        },
        {
            nome: 'Tênis',
            Img: '//static.netshoes.com.br/produtos/tenis-masculino-galaxy-5-esportivo-adidas-gw3848/06/FB8-7608-006/FB8-7608-006_zoom1.jpg?ts=1680208992',
            descricao: 'Tênis esportivo',
            preco: 200.00,
        },
    ]

    res.render('dashboard', { produtos });
}
)

app.get('/', (req, res) => {

    res.render('home');
})
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
}
);
