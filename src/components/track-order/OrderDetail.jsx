import { useEffect, useMemo, useState } from "react"
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min"
import api from "../../api"

const OrderDetail = () => {
  const { orderId } = useParams()
  const [cartItems, setCartItems] = useState([])
  const navigate = useHistory()

  useEffect(() => {
    api.get(`orders/${orderId}`)
      .then((response) => {
        setCartItems(response.data.cartItems)
      })
      .catch(() => {
        alert('This order is not existed!')
        navigate.push('/')
      })
  }, [orderId])

  const totalPrice = useMemo(() => {
    return cartItems.reduce((price, item) => price + item.qty * item.productPrice, 0)
  }, [cartItems])

  return (
    <section className='cart-items'>
      <div className='container d_flex'>

        <div className='cart-details'>
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
  )
}

export default OrderDetail