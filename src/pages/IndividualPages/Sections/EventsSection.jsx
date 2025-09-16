import React from 'react'
import { Link } from 'react-router-dom'
/* import { eventsDaysFormate } from '../../../helpers/eventsDaysRendering'
import weekDay from '../../../helpers/weekDay' */
import Cards from '../../../Components/Cards'

function EventsSection({
    serviceOrEvent,
    individualService,

}) {
    return (
        <>
            {(serviceOrEvent === "service" && individualService.events.length !== 0) &&
                <div style={{ marginBottom: "3vh" }}>
                    <div className="t-a-s font-color-white">
                        <p style={{
                            display: "inline",
                            background: "#0F83C3",
                            padding: "5px 5px 0 5px",
                            borderTopRightRadius: "15px",
                            marginLeft: "auto"
                        }}
                            className="t-a-s"
                        >
                            Eventos Próximos
                        </p>
                        <hr style={{ color: "#0F83C3", height: "3px", background: "rgb(15, 131, 195)" }} />
                    </div>
                    <div className='d-f j-c-c a-i-c f-d-c secondaryImagesIndividualPage'>
                        {individualService.events.map((e, key) =>
                            e.reviewLink ? <a
                                key={key}
                                href={`${e.reviewLink}`}
                                target="_blank"
                            >
                                <Cards
                                    service={e}
                                    serviceOrEvent={"event"}
                                />
                            </a>
                                :
                                <Link key={key} to={`/event/${e._id}`}>
                                    <Cards
                                        service={e}
                                        serviceOrEvent={"event"}
                                    />
                                </Link>
                        )}
                    </div>
                </div>}
        </>
    )
}

export default EventsSection