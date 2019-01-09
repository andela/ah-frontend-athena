import React from 'react';
import notFound from '../../assets/images/notFound.png'
import './notFound.scss'
import {MDBContainer} from "mdbreact";


const NotFound = () => {
        return(
            <MDBContainer className="w-75 mt-5 pt-5">
                <div style={{textAlign:'center'}}>
                    <h1>Page Not Found</h1>
                    <img src={notFound} alt="NotFoud"/>
                </div>
            </MDBContainer>
        )
    }
export default NotFound;