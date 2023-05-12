import api from '../../../utils/api'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PostForm from '../../form/PostForm'
import { useNavigate } from 'react-router-dom'

function EditPost() {

    const [post, setPost] = useState({})
    const [token] = useState(localStorage.getItem('token') || '')
    const { id } = useParams()
    const history = useNavigate()

    useEffect(() => {
        api.get(`/posts/${id}`, {
            Authorization: `Bearer ${JSON.parse(token)}`
        })
            .then((response) => {
                setPost(response.data.post)
            })
    }, [token, id])


    async function updatePost(post) {


        const data = await api.patch(`posts/${post._id}`, post, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                return response.data

            })
            .catch((err) => {
                console.log(err)
            })

        history('/')

    }

    return (
        <section>
            <div className="editpost_header">
                <h1>Edit post: {post.title}</h1>
                {post.title && (
                    <PostForm
                        handleSubmit={updatePost}
                        btnText="Update"
                        postData={post}
                    />
                )}
            </div>
        </section>

    )
}

export default EditPost