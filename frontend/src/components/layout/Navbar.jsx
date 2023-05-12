import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'

//context
import { useContext } from 'react'
import { Context } from '../../context/UserContext'

function Navbar() {

    const { authenticated, logout } = useContext(Context)

    return (
        <nav className={styles.navbar}>
            <div className={styles.navbar_logo}>
                <h2>codeblog</h2>
            </div>

            <ul>
                <li>
                    <Link to="/">home</Link>
                </li>
                {
                    authenticated
                        ?
                        (
                            <>
                                <li>
                                    <Link to="/post/myposts">my posts</Link>
                                </li>
                                <li>
                                    <Link to="/user/profile">profile</Link>
                                </li>
                                <li onClick={logout} id={styles.logoutBtn}>logout</li>
                            </>
                        )
                        :
                        (
                            <>
                                <li>
                                    <Link to="/login">sign in</Link>
                                </li>
                                <li id={styles.signupBtn}>
                                    <Link to="/register">sign up</Link>
                                </li>
                            </>
                        )
                }
            </ul>
        </nav>

    )

}

export default Navbar