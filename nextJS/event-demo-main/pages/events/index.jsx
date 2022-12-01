import styles from '../../styles/Home.module.css'
import { getAllEvents } from '../../data/dummy-data'
import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events-search/events-search';
import { Fragment } from 'react';
import {useRouter} from 'next/router'

export default function Events() {
    const router = useRouter();
    const events = getAllEvents();

    function findEventsHandler(year, month){
        const fullPath = `/events/${year}/${month}`;
        router.push(fullPath)
    }

    return (
        <Fragment>
            <EventsSearch onSearch={findEventsHandler}/>
            <EventList items={events}/>
        </Fragment>
    )
}