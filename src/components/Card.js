import React from 'react'
import image from '../img/her-fruits.webp'


const Card = () => {
  return (
    <div className='flex w-1/6 gap-3 flex-col border'>
      <div>
        <img className='w-48' src={image} alt='fruits' />
      </div>
      <div className='text-left p-5'>
        <h1 className='text-xl'>Title</h1>
        <p>Description</p>
        <p>Price</p>
      </div>
      <div>
        <button>Add to cart</button>
      </div>
    </div>
  )
}

export default Card
