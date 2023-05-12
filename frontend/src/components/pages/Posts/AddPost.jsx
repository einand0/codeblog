import api from '../../../utils/api'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PostForm from '../../form/PostForm'

//components

//hooks

function AddPost() {

    const [token] = useState(localStorage.getItem('token') || '')
    const history = useNavigate()

    async function registerPost(post) {

        const data = await api.post('posts/create', post, {
            Authorization: `Bearer ${JSON.parse(token)}`,
            'Content-Type': 'application/json'
        })
            .then(
                (response) => {
                    return response.data
                }
            )
            .catch((err) => {
                return err.response.data
            })

        history('/')

    }

    return (
        <section>
            <h1>ADD POST</h1>
            <PostForm handleSubmit={registerPost} btnText="Add post" />
        </section>
    )
}

export default AddPost