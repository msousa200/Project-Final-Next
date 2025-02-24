import {useMemo, useState} from 'react';

const HeavyCalculator = () => {
    const [counter, setCounter] = useState(0);
    const heavyNumber = useMemo(() => {
        console.log('Calculating...');
        return counter ** 2;
    }, [counter]);

    return (
        <div>
            <h1>Heavy Calculator</h1>
            <h2>Heavy number: {heavyNumber}</h2>
            <button onClick={() => setCounter(counter + 1)}>Increment</button>
        </div>
    );
}

export default HeavyCalculator;