import React, { Component } from 'react';

export class NavigationBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            display: 'flex'
        }
    }

    static getDerivedStateFromProps(props, state) {
        console.log(props.currentPage);
        let found = false;
        for (let i = 0; i < props.pages.length; i++){
            if (props.pages[i].id.includes(props.currentPage)){
                found = true
            }
        }

        if (found){
            return {
                display: 'flex'
            }
        }else{
            return {
                display: 'none'
            }
        }
    }

    createHeaders() {
        let header_list = [];
        let found = false;
        console.log('this.props.pages:');
        console.log(this.props.pages);
        for (let i = 0; i < this.props.pages.length; i++){
            header_list.push(
                <div onClick={() => this.props.goToPage(i) } style={ this.props.pages[i].id.includes(this.props.currentPage)? this.props.activeStyle : this.props.inactiveStyle } key={i} className="flex-grow-1 d-flex flex-column align-items-center p-3">
                    <div className="h5_font_size"> <i className={ this.props.pages[i].icon }></i> </div>
                    <div className={ this.props.textClass=== undefined? "h7_font_size" : this.props.textClass}> { this.props.pages[i].text } </div>
                </div>
            )
        }
        return header_list;
    }

    render() {
        return (
            <nav style={{ display: this.state.display }} className="w-100">
                { this.createHeaders() }
            </nav>
        )
    }
}

export default NavigationBar;