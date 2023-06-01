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

    const items = ["item 1", "item 2", "item 3", "item 4", "item 5"]

    res.render('dashboard', { items });
});

app.get('/post', (req, res) => {
    const post = {
        title: 'Aprender NodeJS',
        category: 'Javascript',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
        comments: 4,
    }

    res.render('blogpost', { post });
})

app.get('/blog', (req, res) => {
    const posts = [
        {
            title: 'Aprender NodeJS',
            category: 'Javascript',
            body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
            comments: 4,
        },
        {
            title: 'Aprender PHP',
            category: 'PHP',
            body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
            comments: 2,
        },
        {
            title: 'Aprender React',
            category: 'Javascript',
            body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
            comments: 10,
        },
    ]

    res.render('blog', { posts })
}
)

app.get('/', (req, res) => {
    const user = {
        name: 'João',
        surname: 'Silva',
        age: 25,
        city: 'São Paulo'
    }

    const palavra = 'Olá mundo!';

    const auth = true

    const approved = false

    res.render('home', { user: user, palavra, auth, approved });
});


app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
}
);