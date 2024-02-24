import React, { useState } from 'react'
import CarouselItem from './CarouselItem'

const Carousel = () => {
    const [activeIndex ,setActivateIndex] = useState(0)
    const items = [
        {
            id: 1,
            title: "Tovalds",
            description: "We’re moving into the bonus round here, but lets show off a many-to-many relationship. We’ll sneak in some other features too, just to take a tour. We’ll make our application a blog application, where users can write BlogPost items, which have Keyword items associated with them.",
            icon: require('../assets/images/fluent_people-community-32-filled.svg')

        },
        {
            id: 2,
            title: "Mark",
            description: "blah blah blah blah",
            icon: require('../assets/images/fluent_people-community-32-filled.svg')

        },
        {
            id : 3,
            title: "Ouch",
            description: "blah blah blah blah",
            icon: require('../assets/images/fluent_people-community-32-filled.svg')

        },

    ]

    const updateIndex = (newIndex) => {
        if (newIndex < 0) {
            newIndex = 0
        } else if (newIndex >= items.length) {
            newIndex = items.length - 1
        }
        setActivateIndex(newIndex)
        console.log(newIndex)
    }

  return (
    <div className='container'>
        <div className="corousel">
            <div className='inner'
                            style={{transform: `translate(-${activeIndex * 100}%)`}}
            >
                {items.map((item) => {
                    return <CarouselItem key={item.id} item={item} width={'100%'}/>
                })}
            </div>
        </div>
        <div className='carousel-buttons'>
            <button onClick={() => updateIndex(activeIndex - 1)}>
                <span className="material-symbols-outlined">arrow_back_ios</span>
            </button>
            <div className='indicators'>
                {items.map((item, index) => {
                    return( 
                    <button key={item.id} onClick={() => updateIndex(index)}>
                        <span className="material-symbols-outlined">radio_button_checked</span>
                    </button>)
                })}
            </div>
            <button onClick={() => updateIndex(activeIndex + 1)}>
                    <span className="material-symbols-outlined">arrow_forward_ios</span>
            </button>
        </div>
    </div>
  )
}

export default Carousel