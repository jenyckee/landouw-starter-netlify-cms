import { getDay } from "date-fns";
import moment from 'moment';
import React from 'react';
import styled from 'styled-components';

function generateIntervals(date, startHour, startMinute, endHour, endMinute, intervalMinutes) {
    const start = new Date(date);
    start.setHours(startHour, startMinute, 0, 0);

    const end = new Date(date);
    end.setHours(endHour, endMinute, 0, 0);

    const totalIntervals = Math.floor((end - start) / (intervalMinutes * 60 * 1000)) + 1;

    return Array.from({ length: totalIntervals }, (_, i) => {
        const time = new Date(start.getTime() + i * intervalMinutes * 60 * 1000);
        return time;
    });
}

export const getReservationSlots = (date) => {
    const day = getDay(date);

    if (day === 5) { // Friday: 17:30 to 21:30
        return generateIntervals(date, 17, 30, 21, 30, 30);
    } else if (day === 6) { // Saturday: 12:00 to 14:30 and 17:30 to 21:30
        return [
            ...generateIntervals(date, 12, 0, 14, 30, 30),
            ...generateIntervals(date, 17, 30, 21, 30, 30),
        ];
    } else if (day === 0) { // Sunday: 12:00 to 21:30
        return generateIntervals(date, 12, 0, 21, 30, 30);
    }
    
    return [];
}

export const HourPicker = ({value, onChange}) => {

    const slots = getReservationSlots(value);

    return (
        <ChipContainer>
            {slots.map((hour) => (
                <HourChip 
                    isSelected={moment(hour).format('HH:mm') === moment(value).format('HH:mm')}
                    onClick={() => onChange(hour)}>
                    {moment(hour).format('HH:mm')}
                </HourChip>
            ))}
        </ChipContainer>
    )
}

const ChipContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 0.5rem;
`

const HourChip = styled.div`
    background-color: ${props => props.isSelected ? '#c2baa6' : 'white'};
    text-align: center;
    color: ${props => props.isSelected ? 'white' : 'black'};
    padding: 0.25rem 0.5rem;
    display: inline-block;
    cursor: pointer;
    font-family: "Helvetica Neue", helvetica, arial, sans-serif;
    @media (min-width: 768px) {
        &:hover {
            background-color: #c2baa6;
            color: white;
        }
    }
`