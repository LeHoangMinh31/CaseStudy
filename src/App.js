import React, { useContext, useEffect, useState } from "react"
import "./App.css"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Header from "./common/header/Header"
import Pages from "./pages/Pages"
import Cart from "./common/Cart/Cart"
import Footer from "./common/footer/Footer"
import Sdata from "./components/shops/Sdata"
import Login from "./components/login/Login"
import Register from "./components/login/Register"
import api from "./api"
import { AuthenticationContext } from "./contexts/AuthenticationContext"
import CheckOut from "./common/Cart/CheckOut"
import { CartContext } from "./contexts/CartContext"
import TrackOrder from "./components/track-order/TrackOrder"
import OrderDetail from "./components/track-order/OrderDetail"

function App() {

    const { shopItems } = Sdata

    const [productItems, setProductItems] = useState([])

    const { cartItems, setCartItems } = useContext(CartContext)

    const { signedInUsername } = useContext(AuthenticationContext)

    useEffect(() => {
        (async () => {
            const productsResponse = await api.get('products')

            setProductItems(productsResponse.data)
        })()
    }, [])

    const addToCart = async (product) => {

        console.log(product)

        if (!signedInUsername) {
            alert('please login first!')
            return
        }

        const foundProductIndex = cartItems.findIndex((item) => item.productId === product.id)

        if (foundProductIndex !== -1) {
            const newCartItems = [...cartItems]
            newCartItems[foundProductIndex].qty += 1;
            setCartItems(newCartItems)
        } else {

            const cartItem = {
                productId: product.id,
                productName: product.name,
                productPrice: product.price,
                productImage: product.image,
                username: signedInUsername,
                qty: 1
            }

            const response = await api.post('carts', JSON.stringify(cartItem), {
                headers: {
                    "Content-Type": "application/json"
                }
            })

            cartItem.id = response.data.id

            setCartItems([...cartItems, cartItem])
        }
    }

    const decreaseQty = async (cartItem) => {

        if (cartItem.qty === 1) {
            setCartItems(cartItems.filter((item) => item.id !== cartItem.id))

            await api.delete(`carts/${cartItem.id}`)
        } else {
            const newCartItem = { ...cartItem, qty: cartItem.qty - 1 }
            setCartItems(
                cartItems.map(
                    (item) => item.id === cartItem.id ? newCartItem : item
                )
            )

            await api.patch(`carts/${cartItem.id}`, newCartItem, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
        }
    }

    const increaseQty = async (cartItem) => {
        const newCartItem = { ...cartItem, qty: cartItem.qty + 1 }

        setCartItems(
            cartItems.map(
                (item) => item.id === cartItem.id ? newCartItem : item
            )
        )

        await api.patch(`carts/${cartItem.id}`, newCartItem, {
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    const deleteCartItem = async (cartItemId) => {
        await api.delete(`carts/${cartItemId}`)

        setCartItems(cartItems.filter(item => item.id !== cartItemId))
    }

    return (
        <Router>
            <Header />
            <Switch>
                <Route path='/' exact>
                    <Pages productItems={productItems} addToCart={addToCart} shopItems={shopItems} />
                </Route>
                <Route path='/cart' exact>
                    <Cart increaseQty={increaseQty} decreaseQty={decreaseQty} deleteCartItem={deleteCartItem} />
                </Route>
                <Route path='/check-out' exact>
                    <CheckOut />
                </Route>
                <Route path='/track' exact component={TrackOrder}></Route>
                <Route path='/track/orders/:orderId' exact component={OrderDetail}></Route>
                <Route path='/sign-in' exact component={Login}></Route>
                <Route path='/register' exact component={Register}></Route>
            </Switch>
            <Footer />
        </Router>
    )
}

export default App
