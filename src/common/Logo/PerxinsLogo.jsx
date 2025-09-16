import React,{ useLayoutEffect, useRef } from 'react'
import "./PerxinsLogo.css"

function PerxinsLogo({
    logoFill = 2.7,
    delayBetweenLettersAnimation = 0.3,
    lettersAnimation = 0.8}) {
    const svg = useRef()
    useLayoutEffect(() => {

        svg.current.style.animation = `fill 1s ease forwards ${logoFill}s`
        const paths = svg.current.children
        console.log(paths)
        for(let letterNumber = 1; letterNumber < paths.length; letterNumber++ ){
            paths[letterNumber].style.strokeDasharray = paths[letterNumber].getTotalLength()
            paths[letterNumber].style.strokeDashoffset = paths[letterNumber].getTotalLength()
            paths[letterNumber].style.animation = `logoAnimation ${lettersAnimation}s ease forwards ${letterNumber*delayBetweenLettersAnimation}s`
            console.log(paths[letterNumber])
        }
    }, [])
    return (<div>
    <svg 
    ref={svg}
    id="logo"
    width="110" height="125" viewBox="0 0 106 117"
    fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            id="hexaedro"
            stroke='white'
            d="M106 89V27L52.5 0L6.10352e-05 27V89L53 116.5L106 89Z" 
            //fill="white"
            />
        <path 
            stroke='white'
            d="M28.3449 61.828L29.5565 61.1559L40.0802 55.2913L40.101 55.3021L59.9487 44.2851L59.9439 34.8461L11.3613 61.8019L71.0243 94.4901L79.2366 89.9346L64.0317 81.5365L28.3449 61.828Z" 
            //fill="black"
            />
        <path 
            stroke='white'
            d="M61.626 45.2154L61.6364 67.1018L70.0658 71.7195L70.0395 17.6689L10.5378 50.6813L10.5426 60.393L61.6196 32.056L61.626 45.2154Z" 
            //fill="black"
            />
        <path 
            stroke='white'
            d="M71.7432 74.4952L61.638 68.9579L61.6372 68.9633L59.8218 67.9623L40.1066 57.1597L31.7035 61.825L80.0856 88.5442L80.0529 22.2836L71.716 17.6797L71.7432 74.4952Z" 
            //fill="black"
            />
    </svg>
</div>
    )
}
export default PerxinsLogo