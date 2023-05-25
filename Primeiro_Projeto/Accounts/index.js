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
            'Consultar Contas',
            'Depositar',
            'Transferir',
            'Sacar',
            'Encerrar Conta',
            'Sair'
        ],
    },
    ],
    )
        .then(answer => {
            const action = answer['action']

            if (action === 'Criar uma nova conta') {
                createAccount()
            } else if (action === 'Consultar saldo') {
                checkBalance()
            }
            else if (action === 'Consultar Contas') {
                showAccountList()
            }
            else if (action === 'Depositar') {
                deposit()
            }
            else if (action === 'Sacar') {
                withdraw()
            }
            else if (action === 'Transferir') {
                transfer()
            }
            else if (action === 'Encerrar Conta') {
                deleteAccount()
            }
            else if (action === 'Sair') {
                console.log(chalk.bgRed.bold('Saindo...'))
                process.exit()
            }
        })
        .catch(err => console.log(err))
}

function operation2() {

    inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: 'O que você deseja fazer?',
        choices: [
            'Menu Principal',
            'Sair',
        ],
    },
    ],
    )
        .then(answer => {
            const action = answer['action']

            if (action === 'Menu Principal') {
                operation()
            } else if (action === 'Sair') {
                console.log(chalk.bgRed.bold('Saindo...'))
                process.exit()
            }
        }
        )
}

function createAccount() {
    console.log(chalk.blue.bold('Criando uma nova conta...'))
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



function showAccountList() {
    const accountList = getAccountList()
    console.log(chalk.bgBlue.bold('Contas disponíveis:'))
    accountList.forEach((account) => {
        console.log(chalk.bgGreen.bold(account))
    })
    return operation2()
}



function getAccountList() {
    const accountFiles = fs.readdirSync('accounts')
    return accountFiles.map((file) => file.replace('.json', ''))
}



function transfer() {
    inquirer
        .prompt([
            {
                name: 'sourceAccount',
                message: 'Digite o nome da conta de origem: ',
            },
            {
                name: 'destinationAccount',
                message: 'Digite o nome da conta de destino: ',
            },
            {
                name: 'amount',
                message: 'Digite o valor a ser transferido: ',
            },
        ])
        .then((answer) => {
            const sourceAccount = answer['sourceAccount']
            const destinationAccount = answer['destinationAccount']
            const amount = parseFloat(answer['amount'])

            if (!checkAccount(sourceAccount) || !checkAccount(destinationAccount)) {
                return transfer()
            }

            if (amount <= 0) {
                console.log(chalk.bgRed.bold('O valor da transferência deve ser maior que zero.'))
                return transfer()
            }

            const sourceAccountData = getAccount(sourceAccount)
            const destinationAccountData = getAccount(destinationAccount)

            if (sourceAccountData.balance < amount) {
                console.log(chalk.bgRed.bold('Saldo insuficiente na conta de origem!'))
                return transfer()
            }

            sourceAccountData.balance -= amount
            destinationAccountData.balance += amount

            fs.writeFileSync(
                `accounts/${sourceAccount}.json`,
                JSON.stringify(sourceAccountData),
                function (err) {
                    console.log(err)
                }
            )

            fs.writeFileSync(
                `accounts/${destinationAccount}.json`,
                JSON.stringify(destinationAccountData),
                function (err) {
                    console.log(err)
                }
            )

            console.log(
                chalk.bgGreen.bold(
                    `Transferência realizada com sucesso! Valor transferido: R$${amount}`
                )
            )
            operation()
        })
        .catch((err) => console.log(err))
}



function deleteAccount() {
    inquirer
        .prompt([
            {
                name: 'accountName',
                message: 'Digite o nome da conta a ser encerrada: ',
            },
        ])
        .then((answer) => {
            const accountName = answer['accountName']

            if (!checkAccount(accountName)) {
                return deleteAccount()
            }

            fs.unlinkSync(`accounts/${accountName}.json`)

            console.log(chalk.bgGreen.bold('Conta encerrada com sucesso!'))
            operation2()
        })
        .catch((err) => console.log(err))
}