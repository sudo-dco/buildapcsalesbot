import axios from 'axios';
import React from 'react';

const App = () => {
    const handleClick = (path) => {
        axios.get(`/${path}`);
    }

    return (
        <div onClick={e => handleClick(e.target.value)}>
            <button value={"startBPSInterval"}>Start BPS Interval</button>
            <button value={"startHWSInterval"}>Start HWS Interval</button>
            <button value={"stopInterval"}>Stop Interval</button>
            <button value={"runBPS"}>Run BPS</button>
            <button value={"runHWS"}>Run HWS</button>
            <button value={"runHLS"}>Run HLS</button>
            <button value={"clearBPSChannel"}>Clear Messages in BPS Channel</button>
            <button value={"clearHWSChannel"}>Clear Messages in HWS Channel</button>
        </div>
    )
};

export default App;