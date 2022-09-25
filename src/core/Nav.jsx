import {React, Fragment} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isAuthenticated, signout } from '../auth/helper';
const activeTab = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#1B98F5" }
    } else {
        return { color: "#FFFFFF" }
    }
}
const Nav = ({ history }) => {
    return (
        <div >
            <ul className="nav nav-tabs bg-dark">
                <li className="nav-item">
                    <Link style={activeTab(history, "/")} className='nav-link' to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link style={activeTab(history, "/cart")} className='nav-link' to="/cart">My Cart</Link>
                </li>
               {isAuthenticated() && isAuthenticated().user.role === 0 && ( <li className="nav-item">
                    <Link style={activeTab(history, "/user/dashboard")} className='nav-link' to="/user/dashboard">User Dashboard</Link>
                </li>)}
                {isAuthenticated() && isAuthenticated().user.role === 1 && ( <li className="nav-item">
                    <Link style={activeTab(history, "/admin/dashboard")} className='nav-link' to="/admin/dashboard">Admin Dashboard</Link>
                </li>)}
                {!isAuthenticated() && (
                    <Fragment>

                    <li className="nav-item">
                        <Link style={activeTab(history, "/signin")} className='nav-link' to="/signin">Signin</Link>
                    </li>
                    <li className="nav-item">
                        <Link style={activeTab(history, "/signup")} className='nav-link' to="/signup">Signup</Link>
                    </li>
                    </Fragment>
                )}
                {
                    isAuthenticated() && (
                        <li className="nav-item">
                            <span className="nav-link text-warning" onClick={() => { signout(() => { history.push("/"); }) }}>Signout</span>
                        </li>)
                }
            </ul>
        </div>
    )
}
export default withRouter(Nav);