import { useState } from 'react'
import Input from './Input'
import styles from './Form.module.css'

function PostForm({ postData, btnText, handleSubmit }) {

    const [post, setPost] = useState(postData || {})

    function handleChange(e) {
        setPost({ ...post, [e.target.name]: e.target.value })
    }

    function submit(e) {
        e.preventDefault()
        handleSubmit(post)
    }

    return (
        <form onSubmit={submit} className={styles.form_container}>
            <Input
                type="text"
                text="Título"
                name="title"
                placeholder="Digite o título do post..."
                handleOnChange={handleChange}
                value={post.title || ''}
            />
            <Input
                type="text"
                text="Conteúdo"
                name="content"
                placeholder="Digite o conteúdo do post..."
                handleOnChange={handleChange}
                value={post.content || ''}
            />
            <input type="submit" value={btnText} />
        </form>
    )

}

export default PostForm