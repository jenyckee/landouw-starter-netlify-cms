import React from 'react'
import styled from 'styled-components'
import { getDay, getHours, setHours, setMinutes } from "date-fns";
import moment from 'moment';

export const getReservationSlots = (date) => {
    if (!date) {
        return [];
    }
    // half hour intervals from 18:00 to 22:00 on Fridays
    if (getDay(date) === 5) {
        return [18, 19, 20, 21].flatMap(hour => [0, 30].map(minute => setMinutes(setHours(date, hour), minute)));
    }
    // half hour intervals from 12:00 to 15:00 and 18:00 to 22:00 on Saturdays and Sundays
    if (getDay(date) === 6 || getDay(date) === 0) {
        return [12, 13, 14, 15, 18, 19, 20, 21].flatMap(hour => [0, 30].map(minute => setMinutes(setHours(date, hour), minute)));
    }
    return [];
}

export const HourPicker = ({value, onChange}) => {

    const handleChange = (hour) => {
        console.log(hour);
        onChange(hour)
    }

    const slots = getReservationSlots(value);

    return (
        <div className='row'>
            {slots.map((hour, index) => (
                <div className='col col-sm-4' key={index}>
                    <HourChip 
                        isSelected={moment(hour).format('HH:mm') === moment(value).format('HH:mm')}
                        onClick={() => handleChange(hour)}>
                        {moment(hour).format('HH:mm')}
                    </HourChip>
                </div>
            ))}
        </div>
    )
}

const HourChip = styled.div`
    background-color: ${props => props.isSelected ? '#c2baa6' : 'white'};
    color: ${props => props.isSelected ? 'white' : 'black'};
    padding: 0.25rem 0.5rem;
    margin-bottom: 0.5rem;
    display: inline-block;
    cursor: pointer;
    @media (min-width: 768px) {
        &:hover {
            background-color: #c2baa6;
            color: white;
        }
    }
`