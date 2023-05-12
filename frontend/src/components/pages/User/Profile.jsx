import styles from '../../form/Form.module.css'
import Input from '../../form/Input'
import { useState, useEffect } from 'react'
import api from '../../../utils/api'

function Profile(){

    const [user, setUser] = useState({})
    const [token] = useState(localStorage.getItem('token') || '')
    
    useEffect(() => {
        api.get('/users/checkuser', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            setUser(response.data)
        })
    }, [token])

    function handleChange(e){
        setUser({...user, [e.target.name]: e.target.value})
    }

    async function handleSubmit(e){
        e.preventDefault()

        // const formData = new FormData()

        // const userFormData = await Object.keys(user).forEach((key) => {
        //     formData.append(key, user[key])
        // })

        // formData.append('user', userFormData)

        const data = await api.patch(`/users/edit/${user._id}`, user, {
            headers:{
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            return response.data
        }).catch((err) => {
            return err.response.data
        })

        console.log(data.message)

    }

    return(
        <section>
            <div className={styles.profile_header}>
                <h1>Perfil</h1>
            </div>
            <form onSubmit={handleSubmit} className={styles.form_container}>
                <Input 
                    text="E-mail"
                    type="email"
                    name="email"
                    placeholder="Digite o seu e-mail"
                    handleOnChange={handleChange}
                    value={user.email || ""}
                />
                <Input
                    text="Nome"
                    type="text"
                    name="name"
                    placeholder="Digite o seu nome"
                    handleOnChange={handleChange}
                    value={user.name || ""}
                />
                <Input
                    text="Senha"
                    type="password"
                    name="password"
                    placeholder="Digite a sua senha"
                    handleOnChange={handleChange}
                />
                <Input
                    text="Senha"
                    type="password"
                    name="confirmpassword"
                    placeholder="Confirme a sua senha"
                    handleOnChange={handleChange}
                />
                <input type="submit" value="Editar" />
            </form>
        </section>
    )

}

export default Profile