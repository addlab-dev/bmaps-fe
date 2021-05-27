import React from 'react';
import Header from './Header/Header'
const Layout = (props) => {
    return (
        <React.Fragment>
            <div className="h-screen bg-appbg">
            <Header/>
            {props.children}
            </div>
        </React.Fragment>
    )
}
export default Layout;