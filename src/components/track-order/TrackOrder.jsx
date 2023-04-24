import { useContext, useEffect, useState } from "react"
import { AuthenticationContext } from "../../contexts/AuthenticationContext"
import api from "../../api"
import { Link } from "react-router-dom/cjs/react-router-dom.min"

const PAYMENT_METHODS = {
  'COD': 'Cash on Delivery',
  'VISA': 'VISA Card'
}

const TrackOrder = () => {

  const [orders, setOrders] = useState([])

  const { signedInUsername } = useContext(AuthenticationContext)

  useEffect(() => {
    if (!signedInUsername) {
      alert('You are not signed in')
    } else {
      (async () => {
        const response = await api.get(`orders?username=${signedInUsername}`)

        setOrders(response.data)
      })()
    }
  }, [signedInUsername])

  return (
    <section className='cart-items'>
      <div className='container d_flex'>

        <div className='cart-details'>
          {orders.length === 0 && <h1 className='no-items product'>You do not have any orders</h1>}

          {orders.map((order) => {
            const totalPrice = order.cartItems.reduce((price, item) => price + item.qty * item.productPrice, 0)
            const date = new Date(order.date)
            const day = date.getDate()
            const month = date.getMonth() + 1
            const year = date.getFullYear()

            const hour = date.getHours()
            const minute = date.getMinutes()

            return (
              <div className='cart-list product d_flex' key={order.id}>
                <div className='cart-details'>
                  <h3>Number of product: {order.cartItems.length}</h3>
                  <h3>Total price: ${totalPrice}.00</h3>
                  <h3>Checked out at: {day}/{month}/{year} {hour}:{minute}</h3>
                  <h3>Payment method: {PAYMENT_METHODS[order.paymentMethod]}</h3>
                  {
                    order.paymentMethod === 'VISA'
                      ? (
                        <>
                          <h4>Card holder name: {order.paymentInformation.cardHolderName}</h4>
                          <h4>Card number: {order.paymentInformation.cardNumber}</h4>
                          <h4>CVV: {order.paymentInformation.cvv}</h4>
                        </>
                      ) : (
                        <></>
                      )
                  }
                </div>
                <Link to={`track/orders/${order.id}`}>
                  View products in this order
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default TrackOrder