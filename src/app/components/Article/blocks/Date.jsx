import React, { Component } from 'react';
import moment from 'moment';

export default class Date extends Component {
    render() {
        const { date } = this.props;

        const daysIntoPast = moment().diff(moment(date), 'days');
        let dateFormatted;


        if (daysIntoPast === 0) {
            dateFormatted = moment(date).format('HH:mm');
        } else if (daysIntoPast === 1) {
            dateFormatted = `včera ${moment(date).format('HH:mm')}`;
        } else if (daysIntoPast === 2) {
            dateFormatted = `předvčírem ${moment(date).format('HH:mm')}`;
        } else {
            dateFormatted = moment(date).format('DD.MM.YYYY HH:mm');
        }

        return (
            <time className="date" dateTime={dateFormatted}>{dateFormatted}</time>
        );
    }
}
