import React from 'react'

function AboutUs() {
    return (
        <div className="about">
            <h1>Perxins</h1>
            <h3>   La vie est belle <br/>
(La vida es bella)</h3>
            <p> La vie es un producto cuya única finalidad es 
                poder garantizar que puedas disfrutar un poco 
                más de tu tiempo y crear recuerdo<br/>
                <p>Que Valga La Pena Compartir.</p>

<p>
                Por esto la app es completamente gratis, tanto 
                para consumidores como para los propietarios de negocios, y su creador no recibe de forma 
                directa ningún beneficio mónico de esta.
</p>
<p>
                X favor, el interés por mejorar la aplicación 
                me atrevo a decir q es mutuo. Si el lector posee
                alguna duda o sugerencia, se le implora que 
                la envie rellenando el siguiente <span>Formulario</span>.
                Espero Tenga un Excelente Día.
                </p>
                </p>
                <section class="thirdPage">
        <div class="form-left">
        
            <div class="column"></div>
            <form class="form" method="POST" action="https://formsubmit.co/masferrerw@gmail.com">
                <h1 class="focus">Contact Me</h1> 
                <div class="form-container">
                <input name="name" type="text" label="Name" required autocomplete="off"/>
                <label class="label-name" for="name"></label>
            </div> 
            <div class="form-container">
                <input name="email" type="email" label="Email" required autocomplete="off"/>
                <label class="label-name" id="email-label"></label>
            </div> 
            <div class="form-container">
                <textarea name="message" rows="5" cols="37" label="Message" class="message" required></textarea>
                <label class="label-name"></label>
            </div> 
                <input type="hidden" name="_captcha" value="false"/>
                <input type="hidden" name="_next" value="none"/>
            <button type="submit" class="send">
                <img alt="send" src="./images/Airplane.svg" />
            </button>
            </form>
    </div>
    <img class="map" src="./images/map.svg" alt=""/>
    </section>
        </div>
    )
}

export default AboutUs
