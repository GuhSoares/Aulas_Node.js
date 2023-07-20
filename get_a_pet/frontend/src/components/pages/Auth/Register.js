import Input from '../../form/Input.js'
import styles from '../../form/Form.module.css'

function Register() {

    function handleOnChange(e) {}
    return(
        <section className={styles.form_container}>
            <h1>Registrar</h1>
            <form>
             <Input 
             text="Nome"
                type="text"
                name="name"
                placeholder="Digite seu nome"
                handleOnChange={handleOnChange}
             />
             <Input 
             text="Telefone"
                type="text"
                name="phone"
                placeholder="Digite seu telefone"
                handleOnChange={handleOnChange}
             />
             <Input 
             text="E-mail"
                type="email"
                name="email"
                placeholder="Digite seu E-mail"
                handleOnChange={handleOnChange}
             />
             <Input 
             text="Senha"
                type="password"
                name="password"
                placeholder="Digite sua senha"
                handleOnChange={handleOnChange}
             />
             <Input 
             text="Confirmação de Senha"
                type="password"
                name="confirmpassword"
                placeholder="Confirme sua senha"
                handleOnChange={handleOnChange}
             />
             <input type="submit" value="Cadastrar"/>
            </form>
            <p>
                Já tem uma conta?<a href="/login">Clique Aqui!</a>
            </p>
        </section>
    )
    }
    
    export default Register;