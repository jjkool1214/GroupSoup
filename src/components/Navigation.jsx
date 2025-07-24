import burger from '../images/Burger.webp'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import supabase from '../supabaseClient';



function Navigation() {

    return (
        <div>
            <header id='Banner'>
                <img src={burger} alt='Menu icon' id='Burger' onClick={handleClick}></img>
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
                    <Link to="/" onClick={handleSignOut}>
                    <div>Sign Out</div>
                    </Link>
                </nav>

            </main>
        </div>
    )
}

const handleClick = (event) => {
    var links = document.getElementById("MobileNav");
    if (event.target.id === "Burger") {
      if (links.style.left == "-100vw" | links.style.left == "") {
        links.style.left = "0vw"
      } else {
        links.style.left = "-100vw"
      }
    } else if (event.target.closest("#MobileNav")) {
      links.style.left = "-100vw"
    }
};

const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
};

export default Navigation;