import React, { useState } from "react"


const FlashCard = ({ productItem, addToCart }) => {

  const [count, setCount] = useState(0)

  const increment = () => {
    setCount(count + 1)
  }

  return (
    <div className='box' key={productItem.id}>
      <div className='product mtop'>
        <div className='img'>
          <span className='discount'>{productItem.discount}% Off</span>
          <img src={productItem.image} alt='' />
          <div className='product-like'>
            <label>{count}</label> <br />
            <i className='fa-regular fa-heart' onClick={increment}></i>
          </div>
        </div>
        <div className='product-details'>
          <h3>{productItem.name}</h3>
          <div className='rate'>
            <i className='fa fa-star'></i>
            <i className='fa fa-star'></i>
            <i className='fa fa-star'></i>
            <i className='fa fa-star'></i>
            <i className='fa fa-star'></i>
          </div>
          <div className='price'>
            <h4>${productItem.price}.00 </h4>
            <button onClick={() => addToCart(productItem)}>
              <i className='fa fa-plus'></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FlashCard

