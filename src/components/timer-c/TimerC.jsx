import React, { useState, useEffect, useRef } from "react";
import "./TimerC.scss";

import { APP_COLORS, APP_FONTS } from "../../consts/generalConsts";

const TIME_LIMIT_MINS = 0;
const TIME_LIMIT_SECS = 15;

function formatTime(minutes = 0, seconds = 0) {
    let mins = minutes;
    let secs = seconds;

    if (mins < 10) {
        mins = `0${mins}`;
    }

    if (secs < 10) {
        secs = `0${secs}`;
    }

    return `${mins}:${secs}`;
}

function calculateAnimationSubtractor(strokeDasharray, mins, secs) {
    let subtractor;

    if (mins === 0) {
        subtractor = strokeDasharray / secs;

        // "... - 0.001" is because the "toFixed()" method rounds the number to the number of decimal points specified
        // and that sometimes creates a number bigger than the original one,
        // and that causes the final value of the "strokeDasharray" property to be a negative number
        // and that  causes some problem for us.
        return subtractor.toFixed(3) - 0.001;
    }

    subtractor = strokeDasharray / (mins * 60 + secs);

    return subtractor.toFixed(2) - 0.001;
}

const TimerC = () => {
    const [time, setTime] = useState("");

    const pathRemainingRef = useRef();

    useEffect(() => {
        const formattedTime = formatTime(TIME_LIMIT_MINS, TIME_LIMIT_SECS);

        setTime(formattedTime);
    }, []);

    useEffect(() => {
        let time;
        let strokeDasharray = 283;
        let subtractor = calculateAnimationSubtractor(
            strokeDasharray,
            TIME_LIMIT_MINS,
            TIME_LIMIT_SECS
        );

        let timeLeftMins = TIME_LIMIT_MINS;
        let timeLeftSecs = TIME_LIMIT_SECS;

        const interval = setInterval(() => {
            if (timeLeftSecs === 0) {
                if (timeLeftMins === 0) {
                    clearInterval(interval);

                    return;
                }

                timeLeftSecs = 59;
                timeLeftMins -= 1;
            } else {
                timeLeftSecs -= 1;
            }

            strokeDasharray -= subtractor;
            pathRemainingRef.current.style.strokeDasharray = `${strokeDasharray} 283`;

            time = formatTime(timeLeftMins, timeLeftSecs);

            setTime(time);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        pathRemainingRef.current.style.stroke = APP_COLORS.COLOR_PRIMARY;
    }, []);

    return (
        <div className="timer-c">
            <svg
                className="timer-c__svg"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g className="timer-c__c1">
                    <circle
                        className="timer-c__path-elapsed"
                        cx="50"
                        cy="50"
                        r="45"
                    />

                    <path
                        id="timer-c__path-remaining"
                        strokeDasharray="283 283"
                        className={`timer-c__path-remaining`}
                        ref={pathRemainingRef}
                        d="
                            M 50, 50
                            m -45, 0
                            a 45,45 0 1,0 90,0
                            a 45,45 0 1,0 -90,0
                        "
                    ></path>
                </g>
            </svg>

            <span className="timer-c__time">{time}</span>
        </div>
    );
};

export default TimerC;
