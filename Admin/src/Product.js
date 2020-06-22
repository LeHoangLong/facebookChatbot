import React, { useState, useRef } from "react"

export const Product = (props) => {
    let showEdit = props.showEdit;
    let root = useRef(null);
    let edit_box = useRef(null);
    let expand_button = useRef(null);
    let height = 0;
    if (showEdit && root){
        height = root.current.getBoundingClientRect().height;
    }

    window.addEventListener('click', e => {
        if (edit_box.current && expand_button.current){
            if (!edit_box.current.contains(e.target) && props.showEdit){
                props.onToggleShowEdit(false);
            }
        }
    });

    return (
        <div className="position-relative p-4" ref={root} >
            <div className="d-flex w-100">
                <p className="flex-grow-1 h5_font_size font-weight-bold">
                    { props.product.name }
                </p>
                <div className="d-flex flex-column">
                    <i role="button" aria-label="Expand" ref={expand_button} onClick={e => {props.onToggleShowEdit(!showEdit); e.stopPropagation()}} className="fas fa-ellipsis-h mb-2 faded_hoverable cursor_pointer"></i>
                </div>
            </div>
            <div className="mt-2">
                Number: { props.product.number }
            </div>
            <div className="mt-2">
                Description: { props.product.description }
            </div>
            <div ref={edit_box} className="position-absolute bg-light d-flex flex-column" style={{ overflow: 'hidden', height: `${height}px`, left: '100%', top: '0', transition: 'height 0.5s', boxSizing: 'border-box'}}>
                <i role="button" aria-label="Edit"  className="p-2 fas fa-edit faded_hoverable cursor_pointer border flex-grow-1" onClick={ props.onEditClicked }>Edit</i>
                <i role="button" aria-label="Delete"  className="p-2 fas fa-trash faded_hoverable cursor_pointer border flex-grow-1">Delete</i>
            </div>
        </div>
    )
}


