import api from '../../utils/api'
import { useState, useEffect } from 'react'
import styles from './Home.module.css'
import { Link } from 'react-router-dom'

//context
import { useContext } from 'react'
import { Context } from '../../context/UserContext'

function Home() {

    const { authenticated } = useContext(Context)
    const [posts, setPosts] = useState([])

    useEffect(() => {
        api.get('/posts')
            .then((response) => {
                setPosts(response.data.posts)
                console.log(posts)
            })
    }, [])

    return (
        <section>
            <div className={styles.posts_container}>
                <div className={styles.posts_container_header}>
                    <h1>Posts</h1>
                    {authenticated
                        ?
                        (<>
                            <Link to="/post/add">create post</Link>
                        </>)
                        :
                        (<></>)
                    }
                </div>
                {posts.length > 0 && (
                    posts.map((post) => (
                        <div className={styles.post_card} key={post.title}>
                            <div className={styles.post_card_header}>
                                <h3>{post.title}</h3>
                            </div>
                            <div className={styles.post_card_content}>
                                <p>{post.content}</p>
                            </div>
                            <div className={styles.post_card_infos}>
                                <span>@{post.user.name}</span>
                                <span>{post.createdAt}</span>
                            </div>


                        </div>
                    ))
                )}
            </div>
        </section>
    )


}

export default Home