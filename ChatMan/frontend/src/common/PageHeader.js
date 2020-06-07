import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import GoBackIconContainer from '../common/GoBackIconContainer'
import '../common/reset.css'

class PageHeader extends Component {
    render(){
        return (
            <Navbar bg='light' className="p-0 w-100">
                <Navbar.Collapse id="responsive-navbar-nav" className="w-100 text-nowrap pt-4 pb-4 pl-3 pr-3">
                    <GoBackIconContainer></GoBackIconContainer>
                    <div className="h5_font_size ml-4 font-weight-bold">{ this.props.pageName}</div>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default PageHeader;
