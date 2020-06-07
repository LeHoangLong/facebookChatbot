import React, { Component } from 'react';
import '../common/common.css';
import '../common/reset.css';

export const PageNumberNavigator = (props) => {
    let backwardStyle = {};
    let backwardDisabled = false;
    if (props.pageNumber === 1){
        backwardStyle = {
            color: 'grey'
        }
        backwardDisabled = true;
    }

    let forwardStyle = {};
    let forwardDisabled = false;
    if (props.pageNumber === props.numOfPages){
        forwardStyle = {
            color: 'grey'
        }
        forwardDisabled = true;
    }
    
    return (
        <div className="d-flex justify-content-center h6_font_size mt-3 mb-2">
            <div className="fas fa-fast-backward border_1px p-2 d-flex align-items-center" style={ backwardStyle } disabled={ backwardDisabled } onClick={() => { if (!backwardDisabled) props.onGoToPage(1) }}></div>
            <div className="fas fa-step-backward border_1px p-2 d-flex align-items-center" style={ backwardStyle } disabled={ backwardDisabled } onClick={() => { if (!backwardDisabled) props.onGoToPage( props.pageNumber - 1)}}></div>
            <div className="border_1px p-2"> { props.pageNumber } </div>
            <div className="fas fa-step-forward border_1px p-2 d-flex align-items-center" style={ forwardStyle } disabled={ forwardDisabled } onClick={() => { if (!forwardDisabled) props.onGoToPage( props.pageNumber + 1)}}></div>
            <div className="fas fa-fast-forward border_1px p-2 d-flex align-items-center" style={ forwardStyle } disabled={ forwardDisabled } onClick={() => { if (!forwardDisabled) props.onGoToPage( props.numOfPages )}}></div>
        </div>
    )
}
