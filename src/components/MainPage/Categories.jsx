import React from "react"

const Categories = () => {
  const data = [
    {
      cateImg: "/images/category/cat1.png",
      cateName: "Fashion",
    },
    {
      cateImg: "/images/category/cat2.png",
      cateName: "Electronic",
    },
    {
      cateImg: "/images/category/cat5.png",
      cateName: "Gifts",
    },
    {
      cateImg: "/images/category/cat8.png",
      cateName: "Fashion Pets",
    },
    {
      cateImg: "/images/category/cat9.png",
      cateName: "Fashion Baby",
    },
    {
      cateImg: "/images/category/cat11.png",
      cateName: "Accessory",
    },
  ]

  return (
    <>
      <div className='category'>
        {data.map((value, index) => {
          return (
            <div className='box f_flex' key={index}>
              <img src={value.cateImg} alt='' />
              <span>{value.cateName}</span>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Categories

