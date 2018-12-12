import React, {PureComponent} from 'react';
import {NavigateWrapper} from './style';

function test(){

}

@test
class Navigate extends PureComponent{

    render(){

        return <NavigateWrapper>这是导航组件</NavigateWrapper>
    }
}

export default Navigate;
