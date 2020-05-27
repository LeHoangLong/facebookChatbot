import React, { Component, useEffect, useState } from 'react';
import '../common/common.css'
import { useInView } from 'react-intersection-observer';

export const BottomScroll = (props) => {
    let [ref, inView, entry] = useInView({
        root: props.root
    });

    let [margin_bot, setMarginBot] = useState(0);
    let [isTouching, setIsTouching] = useState(false);

    useEffect(() => {
        let interval;
        if (inView){
            props.onBottomReached();
        }

        //console.log('isTouching: ' + isTouching);
        //console.log('inView: ' + inView);

        if (isTouching){
            if (inView){
                interval = setInterval(() => {
                    setMarginBot(margin_bot => {
                        margin_bot = margin_bot * 1.5 + 1;
                        if (margin_bot > 100){
                            return 50;
                        }else if (margin_bot < 0){
                            return 0;
                        }else{
                            return margin_bot;
                        }
                    })
                }, 10)
            }
        }else{
            interval = setInterval(() => {
                setMarginBot(margin_bot => {
                    margin_bot = margin_bot - 1;
                    if (margin_bot > 0){
                        return margin_bot;
                    }else{
                        return 0;
                    }
                })
            }, 10)
        }
            
        return () => clearInterval(interval);
    }, [inView, isTouching]);

    return (
        <div className="overflow_y_scroll" onTouchStart={() => setIsTouching(true)} onTouchEnd={() => setIsTouching(false)}>
            <div style={ { paddingBottom: margin_bot + 'px' }}>
                { props.children }
            </div>
            <div ref={ref}></div>
        </div>
    )
}

