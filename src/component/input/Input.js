import React,{PureComponent} from 'react'
import {InputWrapper} from './style';
import withInput from './withInput';

@withInput
class Input extends PureComponent {
    render(){
        return (
            <InputWrapper/>
        )
    }
}

export default Input
