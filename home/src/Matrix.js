import React, { useState } from "react";
import MATRIX_FRAMES from './data/matrix';
import { useDynamicTransition } from "./hooks";

const minimunDelay = 10;
const minimunIncrement = 1;

const Matrix = () => {
    const [delay, setDelay] =useState(500);
    const [increment, setIncrement] =useState(5);

    // Como se repite la logica de la galeria hicimos un custom hook y lo aplicamos.
    const index = useDynamicTransition({
        delay, increment, length: MATRIX_FRAMES.length
    });

    const updateDelay = event => {
        const delay = Number(event.target.value);
        setDelay( delay < minimunDelay ? minimunDelay : delay);
    }
    const updateIncrement = event => {
        const increment= Number(event.target.value);
        setIncrement( increment < minimunIncrement ? minimunIncrement : increment);
    }


    return (
        <div className="Matrix">
            <img src={MATRIX_FRAMES[index]} alt='matrix-animation' />
            <div className="multiform">
                <div>
                    Frame transition delay (seconds):
                    <input type='number' onChange={updateDelay} />
                </div>
                <div>
                    Frame increment:
                    <input type='number' onChange={updateIncrement} />
                </div>
            </div>
        </div>
    )
}

export default Matrix;
