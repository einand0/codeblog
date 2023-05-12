import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../../utils/api'
import styles from './MyPosts.module.css'

function MyPosts() {

    const [posts, setPosts] = useState([])
    const [token] = useState(localStorage.getItem('token' || ''))

    useEffect(() => {
        api.get('/posts/myposts', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
            .then((response) => {
                setPosts(response.data.posts)
            })
    }, [token])

    async function removePost(id){

        await api.delete(`posts/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
        .then((response) => {
            const updatedPosts = posts.filter((post) => post._id !== id)
            setPosts(updatedPosts)
            return response.data
        })
        .catch((err) => {
            console.log(err.response.data)
        })

    }


    return (
        <section>
            <h1>My Posts</h1>
            <div className={styles.posts_container}>
                {posts.length > 0 &&
                    posts.map((post) => (
                        <div className={styles.post_row} key={post._id}>
                            <div className={styles.post_infos}>
                                <span><bold>id:</bold> {post._id}</span>
                                <p><bold>title:</bold> {post.title}</p>
                            </div>
                            <div className={styles.post_actions}>
                                <Link to={`/post/edit/${post._id}`}>Edit</Link>
                                <button onClick={() => removePost(post._id)}>Delete</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}

export default MyPosts