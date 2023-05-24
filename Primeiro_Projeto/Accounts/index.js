const inquirer = require('inquirer')
const chalk = require('chalk')

const fs = require('fs')

operation()

function operation() {

    inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: 'O que você deseja fazer?',
        choices: [
            'Criar uma nova conta',
            'Consultar saldo',
            'Depositar',
            'Sacar',
            'Sair']
    }])
        .then(answer => {
            const action = answer['action']

            if (action === 'Criar uma nova conta') {
                createAccount()
            } else if (action === 'Consultar saldo') {
                checkBalance()
            }
            else if (action === 'Depositar') {
                deposit()
            }
            else if (action === 'Sacar') {
                withdraw()
            }
            else if (action === 'Sair') {
                console.log(chalk.bgRed.bold('Saindo...'))
                process.exit()
            }
        })
        .catch(err => console.log(err))
}

function createAccount() {
    console.log(chalk.blue.bold('Criando uma nova conta...'))
    console.log(chalk.bgGreen.bold('Nova conta criada com sucesso!'))
    console.log(chalk.blue.bold('Defina as opções da sua conta a seguir'))

    buildAccount()
}

function buildAccount() {

    inquirer.prompt([{

        name: 'accountName',
        message: 'Digite um nome para a sua conta: ',
    }
    ])
        .then(answer => {
            const accountName = answer['accountName']
            console.info(accountName)

            if (!fs.existsSync('accounts')) (
                fs.mkdirSync('accounts')
            )

            if (fs.existsSync(`accounts/${accountName}.json`)) {
                console.log(chalk.bgRed.bold('Esta conta já existe'))
                buildAccount()
                return
            }

            fs.writeFileSync(`accounts/${accountName}.json`, '{"balance": 0}', function (err) {
                console.log(err)
            })

            console.log(chalk.bgGreen.bold('Conta criada com sucesso!'))
            operation()
        })
        .catch((err) =>
            console.log(err)
        )
}



function checkBalance() {

    inquirer.prompt([{
        name: 'accountName',
        message: 'Digite o nome da conta: ',
    },
    ]).then(answer => {

        const accountName = answer['accountName']

        if (!checkAccount(accountName)) {
            return checkBalance()
        }

        const accountData = getAccount(accountName)
        console.log(chalk.bgGreen.bold(`O saldo da conta ${accountName} é: R$${accountData.balance}`))
        operation()

    }).catch(err => console.log(err))


}




function deposit() {

    inquirer.prompt([{
        name: 'accountName',
        message: 'Digite o nome da conta: ',
    },
    ])
        .then(answer => {

            const accountName = answer['accountName']

            // verify if account exists

            if (!checkAccount(accountName)) {
                return deposit()
            }

            inquirer.prompt([{
                name: 'value',
                message: 'Digite o valor do depósito: ',
            }
            ]).then(answer => {

                const value = answer['value']

                addAmount(accountName, value)
                operation()

            }).catch(err => console.log(err))

        })
        .catch(err => console.log(err))
}




function checkAccount(accountName) {
    if (!fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(chalk.bgRed.bold('Esta conta não existe, tente novamente!'))
        return false
    }

    return true
}




function addAmount(accountName, value) {

    const accountData = getAccount(accountName)

    if (!value) {
        console.log(chalk.bgRed.bold('Ocorreu um erro ao depositar, tente novamente!'))
        return deposit()
    }
    accountData.balance = parseFloat(value) + parseFloat(accountData.balance)

    fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(accountData), function (err) {
        console.log(err)
    },
    )

    console.log(chalk.bgGreen.bold(`Depósito realizado com sucesso, Valor adicionado: R$${value}!`))
}




function getAccount(accountName) {
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding: 'utf-8',
        flag: 'r'
    })

    return JSON.parse(accountJSON)
}




function withdraw() {

    inquirer.prompt([{
        name: 'accountName',
        message: 'Digite o nome da conta: ',
    }]).then(answer => {

        const accountName = answer['accountName']

        if (!checkAccount(accountName)) {

            return withdraw()

        }

        inquirer.prompt([{
            name: 'value',
            message: 'Digite o valor do saque: ',
        }]).then(answer => {

            const value = answer['value']

            removeValue(accountName, value)

        })
    }).catch(err => console.log(err))
}


function removeValue(accountName, value) {

    const accountData = getAccount(accountName)

    if (!value) {

        console.log(chalk.bgRed.bold('Ocorreu um erro ao sacar, tente novamente!'))
        return withdraw()
    }

    if (accountData.balance < value) {

        console.log(chalk.bgRed.bold('Saldo insuficiente!'))
        return withdraw()
    }

    accountData.balance = parseFloat(accountData.balance) - parseFloat(value)

    fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(accountData), function (err) {
        console.log(err)
    })

    console.log(chalk.bgGreen.bold(`Saque realizado com sucesso, Valor retirado: R$${value}!`))
    operation()
}