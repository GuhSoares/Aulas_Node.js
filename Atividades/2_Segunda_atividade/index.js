const inquirer = require("inquirer")
const chalk = require("chalk")



inquirer.prompt([{ name: 'nome', message: 'Qual o seu nome?' },]).then((answers) => {
    console.log(answers)
    const nome = answers.nome

    inquirer.prompt([{ name: 'idade', message: 'Qual a sua idade?' },]).then((answers) => {
        console.log(answers)
        const idade = answers.idade

        if (idade >= 18) {
            console.log(chalk.bgYellow.green.bold(`Olá ${nome}, você pode dirigir!`))
        } else {
            console.log(chalk.bgYellow.red.bold(`Olá ${nome}, você não pode dirigir!`))
        }
    })
        .catch((err) => console.log(err))
})
