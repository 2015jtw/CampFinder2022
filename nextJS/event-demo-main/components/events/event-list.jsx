import EventItem from "./event-item"
import styles from './event-list.module.css';

export default function EventList(props) {

    // const { items } = props;

    return (
        <ul className={styles.list}>
            {props.items.map((evt) => (
                <EventItem
                    id={evt.id}
                    image={evt.image}
                    title={evt.title}
                    location={evt.location}
                    date={evt.date}
                    key={evt.id}
                />))}

        </ul>
    )
}