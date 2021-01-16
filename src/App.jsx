import axios from 'axios';
import React from 'react';

const App = () => {
    const startInterval = () => {
        axios.get('/startInterval');
    };

    const stopInterval = () => {
        axios.get('/stopInterval');
    };

    const runBPS = () => {
        axios.get('/runBPS');
    };

    const runHWS = () => {
        axios.get('/runHWS');
    };

    const clearBPSChannel = () => {
        axios.get('/clearBPSChannel');
    };

    const clearHWSChannel = () => {
        axios.get('/clearHWSChannel');
    };

    return (
        <div>
            <button onClick={startInterval}>Start Interval</button>
            <button onClick={stopInterval}>Stop Interval</button>
            <button onClick={runBPS}>Run BPS</button>
            <button onClick={runHWS}>Run HWS</button>
            <button onClick={clearBPSChannel}>Clear Messages in BPS Channel</button>
            <button onClick={clearHWSChannel}>Clear Messages in HWS Channel</button>
        </div>
    )
};

export default App;