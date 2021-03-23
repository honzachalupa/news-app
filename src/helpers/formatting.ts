import moment, { Moment } from 'moment';

export const timestampToDate = (timestamp: { seconds: number; nanoseconds: number }) => moment(
    timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000,
);

export const formatDateLabel = (date: Moment) => {
    enum ERelativeDates {
        TODAY = 'TODAY',
        YESTERDAY = 'YESTERDAY',
        THE_DAY_BEFORE_YESTERDAY = 'THE_DAY_BEFORE_YESTERDAY'
    }

    const getTimePreposition = (time: string) =>
        [0, 1, 5, 6, 7, 8, 9, 10, 11, 15, 16, 17, 18, 19].includes(Number(time.split(':')[0])) ? 'v' : 've';

    const originalDate = moment(date).startOf('day');
    const todaysDate = moment().startOf('day');
    const time = date.format('H:mm');

    const relativeDate =
        originalDate.toString() === todaysDate.toString() ? ERelativeDates.TODAY :
        moment(originalDate).add(1, 'days').toString() === todaysDate.toString() ? ERelativeDates.YESTERDAY :
        moment(originalDate).add(2, 'days').toString() === todaysDate.toString() ? ERelativeDates.THE_DAY_BEFORE_YESTERDAY : null;

    return relativeDate === ERelativeDates.TODAY ?
            `Dnes ${getTimePreposition(time)} ${time}` :
        relativeDate === ERelativeDates.YESTERDAY ?
            `Včera ${getTimePreposition(time)} ${time}` :
        relativeDate === ERelativeDates.THE_DAY_BEFORE_YESTERDAY ?
            `Předevčírem ${getTimePreposition(time)} ${time}` :
            `${date.format('D.M.')} v ${time}`;
};

export const clearProviderName = (name: string) => name.replace('Idnes', '').replace('Lidovky', '').trim();
