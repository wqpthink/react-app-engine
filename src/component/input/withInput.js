import React,{Fragment} from 'react'
import {SpanWrapper} from './style';

 const withInput = WrappedComponent => props => (
    <Fragment>
        <SpanWrapper display={props.display}>{props.text}</SpanWrapper><WrappedComponent/>
    </Fragment>
 );

export default withInput
