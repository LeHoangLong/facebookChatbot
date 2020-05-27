import React, { useState } from 'react';

export const SearchBox = (props) => {
    let [styleClass, setStyleClass] = useState('low_background');
    let [inputStyleClass, setInputStyleClass] = useState('low_background');

    function focusHandler (){
        setStyleClass('border_1px');
        setInputStyleClass('');
    }
    
    function blurHandler (){
        setStyleClass('low_background');
        setInputStyleClass('low_background');
    }

    return (
        <div className={`${styleClass} rounded  pl-4 ml-2 d-flex h6_font_size align-items-center ${props.className}`}>
            <div className="fas fa-search">
            </div>
            <input autocomplete="no" onFocus={focusHandler} onBlur={blurHandler} type="text" className={`${inputStyleClass} flex-grow-1 mt-2 ml-2 mb-2 no_outline w-100 border-0 `} id="search_box">
            </input>
        </div>
    )
}
