import inquirer from 'inquirer'

inquirer.prompt([{
    name: 'nome',
    message: 'Qual o seu nome?',
},
{
    name: 'nota',
    message: 'qual a sua nota?',
},
{
    name: 'nota2',
    message: 'qual a sua segunda nota?',
}
])
    .then((answers) => {
        console.log(answers)
        const media = (parseInt(answers.nota) + parseInt(answers.nota2)) / 2

        console.log(`A média é: ${media}`)
    })
    .catch((err) => console.log(err))