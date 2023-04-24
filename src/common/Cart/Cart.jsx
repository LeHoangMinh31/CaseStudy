import React, { useContext } from "react"
import "./style.css"
import { Link } from "react-router-dom/cjs/react-router-dom.min"
import { CartContext } from "../../contexts/CartContext"

const Cart = ({ increaseQty, decreaseQty, deleteCartItem }) => {

  const { cartItems } = useContext(CartContext)

  const totalPrice = cartItems.reduce((price, item) => price + item.qty * item.productPrice, 0)

  return (
    <>
      <section className='cart-items'>
        <div className='container d_flex'>

          <div className='cart-details'>
            {cartItems.length === 0 && <h1 className='no-items product'>No Items are add in Cart</h1>}

            {cartItems.map((item) => {
              const productQty = item.productPrice * item.qty

              return (
                <div className='cart-list product d_flex' key={item.id}>
                  <div className='img'>
                    <img src={item.productImage} alt='' />
                  </div>
                  <div className='cart-details'>
                    <h3>{item.productName}</h3>
                    <h4>
                      ${item.productPrice}.00 * {item.qty}
                      <span>${productQty}.00</span>
                    </h4>
                  </div>
                  <div className='cart-items-function'>
                    <div className='removeCart'>
                      <button className='removeCart' onClick={() => deleteCartItem(item.id)}>
                        <i className='fa-solid fa-xmark'></i>
                      </button>
                    </div>

                    <div className='cartControl d_flex'>
                      <button className='desCart' onClick={() => decreaseQty(item)}>
                        <i className='fa-solid fa-minus'></i>
                      </button>
                      <button className='incCart' onClick={() => increaseQty(item)}>
                        <i className='fa-solid fa-plus'></i>
                      </button>
                    </div>
                  </div>

                  <div className='cart-item-price'></div>
                </div>
              )
            })}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }} className="d_flex cart-total product">
            <div>
              <div>
                <h2>Cart Summary</h2>
                <div className='d_flex'>
                  <h4>Tá»•ng :</h4>
                  <h3>${totalPrice}.00</h3>
                </div>
              </div>
            </div>
            {
              cartItems.length
                ? (
                  <Link className="btn btn-primary" style={{ cursor: 'pointer', marginTop: '40px', textAlign: 'center' }} to='/check-out'>
                    Check out
                  </Link>
                ) : (
                  <></>
                )
            }
          </div>

        </div>
      </section>
    </>
  )
}

export default Cart
