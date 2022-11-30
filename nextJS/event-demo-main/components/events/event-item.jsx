import Link from 'next/link';
import styles from "./event-item.module.css"
import Button from '../UI/button';
import DateIcon from '../icons/date-icon'
import AddressIcon from '../icons/address-icon';
import ArrowRightIcon from '../icons/arrow-right-icon';

export default function EventItem(props) {

    const { title, image, id, location, date } = props;

    const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    const formattedAddress = location.replace(', ', '\n');

    const exploreLink = `/events/${id}`;

    return (
        <li className={styles.item}>
            <img src={'/' + image} alt="" />
            <div className={styles.content}>
                <div>
                    <h2>{title}</h2>
                    <div className={styles.date}>
                        <DateIcon />
                        <time>{humanReadableDate}</time>
                    </div>
                    <div className={styles.date}>
                        <AddressIcon />
                        <address>{formattedAddress}</address>
                    </div>
                </div>

                <div className={styles.action}>
                    <Button link={exploreLink}>
                        <span>Explore Event</span>
                        <span className={styles.icon}><ArrowRightIcon /></span>

                    </Button>
                </div>
            </div>
        </li>
    )
}