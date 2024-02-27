import React from 'react'

const CarouselItem = ({item, width}) => {

  return (
    <div className='corousel-item' style={{width: width}}>
        <div>

        </div>
        <img className='corousel-img' src={item.icon.default}/>
        <div className='corousel-item--text'>
            <p>{item.description}</p>
        </div>
    </div>
  )
}

export default CarouselItem