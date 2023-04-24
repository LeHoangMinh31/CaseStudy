import React, { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { AuthenticationContext } from "../../contexts/AuthenticationContext"

const Navbar = ({ isUserSignedIn }) => {
  // Toogle Menu
  const [MobileMenu, setMobileMenu] = useState(false)
  const navigate = useHistory()

  const { setSignedInUsername } = useContext(AuthenticationContext)

  return (
    <>
      <header className='header'>
        <div className='container d_flex'>
          <div className='catgrories d_flex'>
            <span className='fa-solid fa-border-all'></span>
            <h4>
              Categories <i className='fa fa-chevron-down'></i>
            </h4>
          </div>

          <div className='navlink'>
            <ul className={MobileMenu ? "nav-links-MobileMenu" : "link f_flex capitalize"} onClick={() => setMobileMenu(false)}>
              {/*<ul className='link f_flex uppercase {MobileMenu ? "nav-links-MobileMenu" : "nav-links"} onClick={() => setMobileMenu(false)}'>*/}
              <li>
                <Link to='/'>home</Link>
              </li>
              <li>
                <Link to='/pages'>pages</Link>
              </li>
              <li>
                <Link to='/track'>track my order</Link>
              </li>
              <li>
                <Link to='/contact'>contact</Link>
              </li>
              {
                isUserSignedIn
                  ? (
                    <li>
                      <a href="#" onClick={() => {
                        sessionStorage.clear()
                        setSignedInUsername(null)
                        navigate.push('/')
                      }}>Logout</a>
                    </li>
                  ) : (
                    <>
                      <li>
                        <Link to='/sign-in'>Login</Link>
                      </li>
                      <li>
                        <Link to='/register'>Register</Link>
                      </li>
                    </>
                  )
              }
            </ul>

            <button className='toggle' onClick={() => setMobileMenu(!MobileMenu)}>
              {MobileMenu ? <i className='fas fa-times close home-btn'></i> : <i className='fas fa-bars open'></i>}
            </button>
          </div>
        </div>
      </header>
    </>
  )
}

export default Navbar

