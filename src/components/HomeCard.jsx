import React from 'react'

const HomeCard = ({ title, parragraph, image, reverse }) => {
    return (
        <div className={`w-full h-[450px] p-4 flex mt-4 ${reverse && 'flex-row-reverse'}  justify-center`}>
            <div className='w-[40%]'>
                <img src={image} alt='home image' className='w-full h-full' />
            </div>
            <div className='w-1/2 h-full pt-5 flex flex-col items-center mt-10 '>
                <div className='w-[85%]'>
                    <h2 className='font-righteous text-4xl text-palette-dark'>{title}</h2>
                    <div className='w-[100px] h-[5px] bg-palette-lightgreen rounded-r-full mt-2'></div>
                </div>
                <p className='w-[85%] mt-4 text-justify font-jost border-4 border-dashed p-1'>{parragraph}</p>
            </div>
        </div>
    )
}

export default HomeCard