import React from "react";
import "./App.scss";

import BtnC from "./components/btn-c/BtnC";
import TimerC from "./components/timer-c/TimerC";

function App() {
    return (
        <div className="app">
            <BtnC
                disabled
                filled
                xLarge
                icon={<TimerC />}
                opt={{ gap: "1rem" }}
            >
                ارسال مجدد
            </BtnC>
        </div>
    );
}

export default App;
