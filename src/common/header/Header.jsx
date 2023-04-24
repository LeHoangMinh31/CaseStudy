import React, { useContext } from "react"
import "./Header.css"
import Head from "./Head"
import Search from "./Search"
import Navbar from "./Navbar"
import { AuthenticationContext } from "../../contexts/AuthenticationContext"

const Header = () => {

  const { signedInUsername } = useContext(AuthenticationContext)

  return (
    <>
      <Head />
      <Search />
      <Navbar isUserSignedIn={Boolean(signedInUsername)} />
    </>
  )
}

export default Header
