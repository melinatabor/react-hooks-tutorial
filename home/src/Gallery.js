import React, { useState, useEffect } from "react";
import PICTURES from './data/pictures';

const SECONDS = 1000;
const minimunDelay = 1 * SECONDS;
const minimunIncrement = 1; 

const Gallery = () => {
    const [index, setIndex] = useState(0);
    const [delay, setDelay] = useState(3 * SECONDS);
    const [increment, setIncrement] = useState(1);

    useEffect(() => {
        console.log('delay', delay, 'increment', increment);
        const interval = setInterval(() => {
            setIndex(storedIndex => {
                return (storedIndex+increment)%PICTURES.length;
            })
        }, delay);

        return () => {
            console.log('remove last interval');
            clearInterval(interval);
        };

    }, [delay, increment])

    // useEffect(() => {
    //     fetchFoo
    //     .then(result => proccessData(index, result));
    // });

    // console.log('index',index);

    const updateDelay = event => {
        const delay = Number(event.target.value) * SECONDS;

        setDelay(delay < minimunDelay ? minimunDelay : delay);
    }

    const updateIncrement = event => {
        const increment = Number(event.target.value);

        setIncrement(increment < minimunIncrement ? minimunIncrement : increment);
    }

    return (
        <div className="Gallery">
            <img 
                src={PICTURES[index].image}
                alt="gallery"
            />
            <div className="multiform">
                <div>
                    Gallery transition delay (seconds):
                    <input type="number" onChange={updateDelay} />
                </div>
                <div>
                    Gallery increment:
                    <input typer='number' onChange={updateIncrement} />
                </div>
            </div>
        </div>
    )
}

export default Gallery;