import React from 'react'

const ServiceCard = ({title, content}) => {
    return (
        <div className='  bg-palette-dark text-palette-beige flex flex-col justify-center items-center relative before:absolute before:w-[50px] before:h-[50px] before:bg-palette-lightgreen before:rounded-br-full before:top-0 before:left-0 after:absolute after:w-[50px] after:h-[50px] after:bg-palette-beige after:rounded-tl-full after:bottom-0 after:right-0'>
            <h3 className='font-righteous text-lg tracking-wider'>{title}</h3>
            <p className='font-jost w-auto'>{content}</p>
        </div>
    )
}

export default ServiceCard