import React,{useEffect, useRef} from 'react'
import { useHistory } from 'react-router-dom';
import Mail from '../../../SVG/Mail';
function EverythingReady() {
    const container = useRef()
    useEffect(()=>{
        container.current.classList.add('slide-in')
    },[])

    const history = useHistory()
    return (
        <div
        className='d-f a-i-c j-c-c f-d-c t-a-c slider'
        ref={container}
        style={{height: "100%"}}
        >
            <p className='font-size-40'>Perxins</p>
            <p className='font-size-32 margin-top-5vh'>Que bolá</p>
            <p className='font-size-32'>¿ Te cuadró ?</p>

            <div 
            className="font-size-32"
            style={{
                background: "linear-gradient(#0F83C3,#027E7E)",
                padding: "10px 70px",
                borderRadius: "50px",
                margin: "50px 0",
            }} onClick={()=>{history.push('/')}}>Bienvenido</div>
        <div>
            <p
            style={{margin: "0 40px"}}>Recuerda que trabajamos para tí, dinos que te gustaría ver</p>
            <Mail color='#0F83C3'/>
        </div>
        </div>
    )
}

export default EverythingReady
