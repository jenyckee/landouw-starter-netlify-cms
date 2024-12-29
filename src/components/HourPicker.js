import { getDay, setHours, setMinutes } from "date-fns";
import moment from 'moment';
import React from 'react';
import styled from 'styled-components';

export const getReservationSlots = (date) => {
    if (!date) {
        return [];
    }
    // half hour intervals from 17:30 to 22:00 on Fridays
    if (getDay(date) === 5) {
        return ["17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"]
            .map(time => setHours(setMinutes(date, time.split(":")[1]), time.split(":")[0]));
    }
    // half hour intervals from 12:00 to 15:00 and 17:30 to 22:00 on Saturdays
    if (getDay(date) === 6) {
        return ["12:00", "12:30", "13:00", "13:30", "14:00", "14:30", 
                "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"]
        .map(time => setHours(setMinutes(date, time.split(":")[1]), time.split(":")[0]));
    }
    // Sundays half hour intervals from 12:00 to 22:00
    if (getDay(date) === 0) {
        return ["12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00",
                "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"]
        .map(time => setHours(setMinutes(date, time.split(":")[1]), time.split(":")[0]));
    }
    return [];
}

export const HourPicker = ({value, onChange}) => {

    const slots = getReservationSlots(value);

    return (
        <div className='row'>
            {slots.map((hour, index) => (
                <div className='col-3 col-sm-4' key={index}>
                    <HourChip 
                        isSelected={moment(hour).format('HH:mm') === moment(value).format('HH:mm')}
                        onClick={() => onChange(hour)}>
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