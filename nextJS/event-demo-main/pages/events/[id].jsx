import { useRouter } from 'next/router'
import { Fragment } from 'react';

import { getEventById } from '../../data/dummy-data'
import EventSummary from '../../components/event-detail/event-summary';
import EventContent from '../../components/event-detail/event-content';
import EventLogistics from '../../components/event-detail/event-logistics';


export default function EventPage() {
    const router = useRouter()
    const id = router.query.id;
    const event = getEventById(id);

    if (!event) {
        return <p>No event found!</p>
    }

    return (
        <Fragment>
            <EventSummary title={event.title} />
            <EventLogistics date={event.date} address={event.location} image={event.image} imageAlt={event.title} />
            <EventContent>{event.description}</EventContent>
        </Fragment>

    )
}
