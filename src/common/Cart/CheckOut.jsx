import { useContext, useEffect, useState } from "react"
import api from "../../api"
import { AuthenticationContext } from "../../contexts/AuthenticationContext"
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { CartContext } from "../../contexts/CartContext"

const CheckOut = () => {

  const [paymentMethod, setPaymentMethod] = useState('COD')
  const [visaCardInformation, setVisaCardInformation] = useState()
  const { signedInUsername } = useContext(AuthenticationContext)
  const { cartItems, setCartItems, isLoading } = useContext(CartContext)

  const navigate = useHistory()

  const totalPrice = cartItems.reduce((price, item) => price + item.qty * item.productPrice, 0)

  useEffect(() => {
    if (!isLoading && cartItems.length === 0) {
      alert('Your cart is being empty!')
      navigate('/')
    } 
  }, [isLoading])

  const validate = () => {
    if (paymentMethod === 'COD')
      return true;

    let errorMessage = ''

    if (!visaCardInformation.cardHolderName) {
      errorMessage = 'Card holder name is required'
    } else if (!visaCardInformation.cardNumber) {
      errorMessage = 'Card number is required'
    } else if (!visaCardInformation.cvv) {
      errorMessage = 'CVV is required'
    } else if (!/^\d{16}$/.test(visaCardInformation.cardNumber)) {
      errorMessage = 'Card number must be consist of 16 numbers'
    } else if (!/^\d{3}$/.test(visaCardInformation.cvv)) {
      errorMessage = 'CVV must be exactly 3 numbers'
    }

    if (errorMessage) {
      alert(errorMessage)
      return false
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (validate()) {

      const data = {
        username: signedInUsername,
        paymentMethod: paymentMethod,
        paymentInformation: visaCardInformation,
        cartItems: cartItems,
        date: new Date().toJSON()
      }

      api.post('orders', JSON.stringify(data), {
        headers: {
          "Content-Type": 'application/json'
        }
      })

      alert('Check out complete successfully')

      const deleteCartItemsTask = cartItems.map((cartItem) => {
        return api.delete(`carts/${cartItem.id}`)
      })

      await Promise.all(deleteCartItemsTask)

      setCartItems([])
    }
  }

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
                  <h4>Tổng :</h4>
                  <h3>${totalPrice}.00</h3>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
      <form className="container mtop" onSubmit={handleSubmit} style={{ textAlign: "center" }}>
        <div className="card-header">
          <h1>Checkout</h1>
        </div>
        <div className="form-group">
          <label>Payment method</label>
          <br></br>
          <input type="radio" checked={paymentMethod === 'COD'} onChange={e => setPaymentMethod(e.target.value)} name="payment-method" value="COD" className="app-check" />
          <label htmlFor="payment-method">Cash on delivery</label>
          <input type="radio" checked={paymentMethod === 'VISA'} onChange={e => setPaymentMethod(e.target.value)} name="payment-method" value="VISA" className="app-check" />
          <label htmlFor="payment-method">VISA Card</label>
        </div>
        {
          paymentMethod === 'VISA'
          && (
            <>
              <div className="form-group">
                <label>Card holder name <span className="errmsg">*</span></label>
                <input value={visaCardInformation?.cardHolderName ?? ''} onChange={e => setVisaCardInformation({ ...visaCardInformation, cardHolderName: e.target.value })} className="form-control" />
              </div>
              <div className="form-group">
                <label>Card number <span className="errmsg">*</span></label>
                <input value={visaCardInformation?.cardNumber ?? ''} onChange={e => setVisaCardInformation({ ...visaCardInformation, cardNumber: e.target.value })} className="form-control" />
              </div>
              <div className="form-group">
                <label>CVV <span className="errmsg">*</span></label>
                <input value={visaCardInformation?.cvv ?? ''} onChange={e => setVisaCardInformation({ ...visaCardInformation, cvv: e.target.value })} className="form-control" />
              </div>
            </>
          )
        }
        <button type="submit" className="btn btn-primary mbottom" style={{ marginRight: '25px', cursor: 'pointer' }}>Check out</button>
        <Link className="btn btn-success navigate-url" to={'/'}>Continue shopping</Link>
      </form>
    </>
  )
}

export default CheckOut