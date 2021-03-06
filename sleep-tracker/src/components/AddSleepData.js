import React from 'react'
import DatetimeRangePicker from 'react-datetime-range-picker';

import { axiosWithAuth } from '../utils/axiosWithAuth'

class AddSleepData extends React.Component {
    constructor() {
        super()

        this.state = {
            score_wake: 0.0,
            score_day: 0.0,
            score_night: 0.0,
            hours: 0.0,
            start: 0,
            end: 0,
            message: 'Please enter your sleep data'
        }
    }

    updateSleepTime = dateSelection => {
        this.setState({ start: dateSelection.start.getTime() })
        this.setState({ end: dateSelection.end.getTime() })
        if (this.state.start !== 0 || this.state.end !== 0) {
            this.setState({ hours: (([this.state.end] - [this.state.start])) / 3525000})
        }
        console.log(this.state.hours)
    }

    update = e => {
        let nam = e.target.name;
        let val = e.target.value;

        if (nam.includes('score')) {
            this.setState({ [nam]: val * 1 });
        } else {
            this.setState({ [nam]: val });
        }
        console.log(this.state)
    }

    addSleepData = e => {
        e.preventDefault()
        // this.setState({ hours: ([this.state.end.getTime()]-[this.state.start.getTime()])/3525000 })

        if (this.state.score_wake === 0 || this.state.score_day === 0 || this.state.score_night === 0 || this.state.hours === 0) {
            this.setState({ message: 'Please enter all sleep values' });
        } else {
            axiosWithAuth()
                .post('/sleep')
                .then(res => console.log(res))
                .catch(err => console.log('Error is: ', err))
        }
        console.log(this.state)
    }

    render() {
        return (
            <div className='add-sleep-page'>
                <form className='add-sleep-form'>
                    <h3>Add Sleep Data</h3>
                    {/* Sleep time Start */}
                    <div className='start-time'>
                        <DatetimeRangePicker
                            onChange={this.updateSleepTime}
                        />
                        {/* <TextField
                            className='textField'
                            id="date"
                            name="start_day"
                            type="date"
                            defaultValue=''
                            onChange={this.updateStart}
                        />
                        <TimePicker className='clock'
                            disableClock={true}
                            name='start'
                            onChange={this.updateStart}
                            value={this.state.start}
                        /> */}
                    </div>
                    {/* Sleep time End */}
                    {/* <div className='end-time'>
                        <TextField
                            className='textField'
                            id="date"
                            name="end_day"
                            type="date"
                            defaultValue=''
                            onChange={this.updateEndDate}
                        />
                        <TimePicker className='clock'
                            disableClock={true}
                            name='end'
                            onChange={this.updateEndTime}
                            value={this.state.end}
                        />
                    </div> */}
                    {/* Emoji faces Wake */}
                    <select name='score_wake' onChange={this.update}>
                        <option value={0}>Pick Mood</option>
                        <option value={.25}>Very Bad</option>
                        <option value={0.5}>Bad</option>
                        <option value={.75}>Good</option>
                        <option value={1.0}>Very Good</option>
                    </select>
                    {/* Emoji faces Day*/}
                    <select name='score_day' onChange={this.update}>
                        <option value={0}>Pick Mood</option>
                        <option value={.25}>Very Bad</option>
                        <option value={0.5}>Bad</option>
                        <option value={.75}>Good</option>
                        <option value={1.0}>Very Good</option>
                    </select>
                    {/* Emoji faces Night*/}
                    <select name='score_night' onChange={this.update}>
                        <option value={0}>Pick Mood</option>
                        <option value={.25}>Very Bad</option>
                        <option value={0.5}>Bad</option>
                        <option value={.75}>Good</option>
                        <option value={1.0}>Very Good</option>
                    </select>
                    <button onClick={this.addSleepData}>Add Sleep</button>
                    <span className='error'>{this.state.message}</span>
                </form>
            </div>
        )
    }
}

export default AddSleepData;
