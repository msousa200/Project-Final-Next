import { useState } from "react";

type CounterProps = {
  name: string;
  age: number;
};

export const Counter = ({ name, age }: CounterProps) => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
    console.log(`Number incremented: ${count + 1}`);
  };

  return (
    <div>
      <h1>
        {name} is {age} years old
      </h1>
      <h2>Counter: {count}</h2>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
};