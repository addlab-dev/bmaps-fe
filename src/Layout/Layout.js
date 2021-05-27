import React, { Fragment } from 'react';
import Header from './Header/Header'

const Layout = (props) => {
    
    return (
        <React.Fragment>
            <div className="lg:grid lg:grid-cols-6 lg:grid-rows-10 h-screen bg-appbg">
            <Header/>
            {props.children}
            </div>
        </React.Fragment>
    )
}
export default Layout;