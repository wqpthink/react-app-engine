import React, {PureComponent, Fragment} from 'react';
import '../../static/iconfont/iconfont.css';

const withSelect = (WrappedComponent) => class Select extends PureComponent{
    render(){
        return (
            <Fragment>
                这是一个SelectHOC组件
                <WrappedComponent />
            </Fragment>
        );
    }
}


export default withSelect;
