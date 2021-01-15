import axios from 'axios';
import React from 'react';

const App = () => {
    const startInterval = () => {
        axios.get('/startInterval')
            .then((response) => {
                console.log('Start Interval Running');
            })
            .catch((error) => {
                console.error("Error running start interval");
            })
    };

    const stopInterval = () => {
        axios.get('/stopInterval')
            .then((response) => {
                console.log('Stop Interval Running');
            })
            .catch((error) => {
                console.error("Error running stop interval");
            })
    };

    const runBPS = () => {
        axios.get('/runBPS')
            .then((response) => {
                console.log('Ran BPS Function');
            })
            .catch((error) => {
                console.error("Error running BPS function");
            })
    };

    const runHWS = () => {
        axios.get('/runHWS')
            .then((response) => {
                console.log('Ran HWS Function');
            })
            .catch((error) => {
                console.error("Error running HWS function");
            })
    };

    const clearBPSChannel = () => {
        axios.get('/clearBPSChannel')
            .then((response) => {
                console.log('BPS Channel Cleared');
            })
            .catch((error) => {})
    };

    const clearHWSChannel = () => {
        axios.get('/clearHWSChannel')
            .then((response) => {
                console.log('HWS Channel Cleared');
            })
            .catch((error) => {})
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