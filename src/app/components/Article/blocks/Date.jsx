import React, { Component } from 'react';
import moment from 'moment';

export default class Date extends Component {
    render() {
        const { date } = this.props;

        const daysIntoPast = moment().diff(moment(date), 'days');
        const minutesIntoPast = moment().diff(moment(date), 'minutes');
        let dateFormatted;

        if (daysIntoPast === 0) {
            if (minutesIntoPast < 10) {
                dateFormatted = 'právě teď';
            } else if (minutesIntoPast < 60) {
                dateFormatted = `před ${minutesIntoPast} minutami`;
            } else {
                dateFormatted = `dnes v ${moment(date).format('H:mm')}`;
            }
        } else if (daysIntoPast === 1) {
            dateFormatted = `včera v ${moment(date).format('H:mm')}`;
        } else if (daysIntoPast === 2) {
            dateFormatted = `předvčírem v ${moment(date).format('H:mm')}`;
        } else {
            dateFormatted = moment(date).format('DD.MM.YYYY');
        }

        return (
            <time className="date" dateTime={dateFormatted}>{dateFormatted}</time>
        );
    }
}
