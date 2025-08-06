import React, { useState } from 'react';

function CounterExam(props) {

    const [count, setCount] =useState(0);

    const addCount = () =>{
        setCount(count + 1);
    }

     const minusCount = () =>{
        setCount(count - 1);
    }

    return (
        <div>
            <header>
                <h2>카운터 예제</h2>
            </header>
            <div>
                <p>결과 : {count}</p>
            </div>
            <button type='button' onClick={addCount}>증가하기</button>
            <button type='button' onClick={minusCount}>감소하기</button>
        </div>
    );
}

export default CounterExam;