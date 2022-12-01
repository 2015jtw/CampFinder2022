import styles from '../../styles/Home.module.css'
import {useRouter} from 'next/router'
import { getFilteredEvents } from '../../data/dummy-data';
import EventList from '../../components/events/event-list';


export default function FilterPage() {

    const router = useRouter();
    const filterData = router.query.filter;
    
    if(!filterData){
        return(
            <p className='center'>Loading</p>
        )
    }

    const filteredYear = filterData[0];
    const filteredMonth = filterData[1];

    const numYear = +filteredYear;
    const numMonth = +filteredMonth;

    if(isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2021 || numMonth > 12 || numMonth < 1){
        return(
            <p>Invalid filter. Please adjust your dates.</p>
        )
    }

    const filteredEvents = getFilteredEvents({
        year: numYear, 
        month: numMonth
    });

    if(!filteredEvents || filteredEvents.length === 0){
        return (
            <p>No events found.</p>
        )
    }

    return (
        <div className={styles.container}>
            <h1>Filter Feature</h1>
            <EventList items={filteredEvents} />
        </div>
    )
}
