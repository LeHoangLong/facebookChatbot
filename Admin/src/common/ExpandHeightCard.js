import React, { useState } from 'react';
import { Transition } from 'react-transition-group';

export const ExpandHeightCard = (props) => {
    let [show, setShow] = useState(false);
    setTimeout(() => {
        setShow(true);
    }, 200)

    const transitionStyle = {
        entering: {maxHeight: 0},
        entered: {maxHeight: props.maxHeight === undefined? 500 : props.maxHeight},
        exiting: {maxHeight: 'auto'},
        exited: {maxHeight: 0}
    }

    const itemStyle = {
        maxHeight: 0,
        transition: `max-height ${props.duration}ms ease-in-out`,
        overflow: 'hidden',
        boxSizing: 'border-box',
    }

    return (
        
        <Transition in={ props.in && show } timeout={ 0 } >
            {state => (
                <div style={{...props.style, ...itemStyle, ...transitionStyle[state]}}>
                    { props.children }
                </div>
            )}
        </Transition>
    )

}
