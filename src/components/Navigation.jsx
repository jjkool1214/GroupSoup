import burger from '../images/Burger.webp'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';



function Navigation() {

    return (
        <div>
            <header id='Banner'>
                <img src={burger} alt='Menu icon' id='Burger'></img>
                <h1>
                    GroupSoup Rochester
                </h1>
            </header>
            
            <main>
                <nav id='MobileNav'>
                    <Link to="/home">
                    <div>Home</div>
                    </Link>
                    <Link to="/account">
                    <div>Account</div>
                    </Link>
                    <Link to="/groups">
                    <div>Groups</div>
                    </Link>
                </nav>

            </main>
        </div>
    )
}

export default Navigation;