import { getReservationSlots } from './HourPicker';

describe('getReservationSlots', () => {
    it('should return an empty array if no date is provided', () => {
        const date = null;
        const result = getReservationSlots(date);
        expect(result).toEqual([]);
    });

    it('should return an array of half hour intervals from 17:30 to 22:00 on Fridays', () => {
        const date = new Date(2020, 0, 3); // Friday
        const result = getReservationSlots(date);
        expect(result).toEqual([
            new Date(2020, 0, 3, 17, 30),
            new Date(2020, 0, 3, 18, 0),
            new Date(2020, 0, 3, 18, 30),
            new Date(2020, 0, 3, 19, 0),
            new Date(2020, 0, 3, 19, 30),
            new Date(2020, 0, 3, 20, 0),
            new Date(2020, 0, 3, 20, 30),
            new Date(2020, 0, 3, 21, 0),
            new Date(2020, 0, 3, 21, 30)
        ]);
    });

    it('should return an array of half hour intervals from 12:00 to 15:00 and 17:30 to 22:00 on Saturdays', () => {
        const date = new Date(2020, 0, 4); // Saturday
        const result = getReservationSlots(date);
        expect(result).toEqual([
            new Date(2020, 0, 4, 12, 0),
            new Date(2020, 0, 4, 12, 30),
            new Date(2020, 0, 4, 13, 0),
            new Date(2020, 0, 4, 13, 30),
            new Date(2020, 0, 4, 14, 0),
            new Date(2020, 0, 4, 14, 30),
            new Date(2020, 0, 4, 17, 30),
            new Date(2020, 0, 4, 18, 0),
            new Date(2020, 0, 4, 18, 30),
            new Date(2020, 0, 4, 19, 0),
            new Date(2020, 0, 4, 19, 30),
            new Date(2020, 0, 4, 20, 0),
            new Date(2020, 0, 4, 20, 30),
            new Date(2020, 0, 4, 21, 0),
            new Date(2020, 0, 4, 21, 30)
        ]);
    });
});