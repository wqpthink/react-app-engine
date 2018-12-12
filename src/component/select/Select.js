import React, {PureComponent, Fragment} from 'react';
import withSelect from './withSelect';
import {
    SelectProvider,
    SelectInputCase,
    SelectInput,
    SelectDropdown,
    SelectResultCase,
    SelectResultItem
} from './style/style';


@withSelect
class Select extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            dropdown_state: false,
            select_input_focus: false,
            select_result_panel_mouseenter: false,
            select_input_value: '',
            select_data: []
        }
        this.inputValueChange = this.inputValueChange.bind(this);
        this.inputOnFocus = this.inputOnFocus.bind(this);
        this.inputOnBlur = this.inputOnBlur.bind(this);
        this.selectResultPanelMouseenter = this.selectResultPanelMouseenter.bind(this);
        this.selectResultPanelMouseleave = this.selectResultPanelMouseleave.bind(this);
        this.selectResultItemOnMouseDown = this.selectResultItemOnMouseDown.bind(this);
    }

    inputValueChange = (input) => {
        this.setState({
            select_input_value: input.value
        });
    }

    /**
     * 聚焦事件
     */
    inputOnFocus = () => {
        const data = [
            {
                text: "这是第一行",
                value: 1
            },
            {
                text: "这是第二行",
                value: 2
            },
            {
                text: "这是第三行",
                value: 3
            },
            {
                text: "这是第四行",
                value: 4
            },
            {
                text: "这是第五行",
                value: 5
            },
            {
                text: "这是第六行",
                value: 6
            },
            {
                text: "这是第七行",
                value: 7
            }
        ];

        this.setState({
            dropdown_state: true,
            select_input_focus: true,
            select_data: data
        });
    }

    /**
     * 失焦事件
     */
    inputOnBlur = () => {
        this.setState({
            dropdown_state: false,
            select_input_focus: false,
            select_data: []
        });
    }

    /**
     * 鼠标移入结果面板之上
     */
    selectResultPanelMouseenter = () => {
        this.setState({
            select_result_panel_mouseenter: true
        });
    }

    /**
     * 鼠标离开结果面板
     */
    selectResultPanelMouseleave = () => {
        this.setState({
            select_result_panel_mouseenter: false
        });
    }

    /**
     * 结果面板item点击事件
     */
    selectResultItemOnMouseDown = (item_text, item_value) => {
        this.setState({
            select_input_value: item_text
        });

        console.log(item_value);
    }

    getSelectResultCase = () => {
        const {select_input_focus, select_result_panel_mouseenter, select_data} = this.state;
        if(select_input_focus || select_result_panel_mouseenter){
            return (<SelectResultCase
                onMouseEnter={() => this.selectResultPanelMouseenter}
                onMouseLeave={() => this.selectResultPanelMouseleave}>
                {
                    select_data.map((item,index) =>
                        <SelectResultItem
                            key={index}
                            onMouseDown={() => {this.selectResultItemOnMouseDown(item.text, item.value)}}>
                            {item.text}
                        </SelectResultItem>
                    )
                }
            </SelectResultCase>);
        }else{
            return null;
        }
    }

    render(){
        return (
            <SelectProvider width={'250px'}>
                <SelectInputCase>
                    <SelectInput
                        ref={(input)=>this.input_node_dom = input}
                        value={this.state.select_input_value}
                        onFocus={this.inputOnFocus}
                        onBlur={this.inputOnBlur}
                        onChange={()=>this.inputValueChange(this.input_node_dom)}/>
                    <SelectDropdown>
                        <i className ={"iconfont " + (this.state.dropdown_state?'icon-dropdown-open':'icon-dropdown-close')}/>
                    </SelectDropdown>
                </SelectInputCase>
                {this.getSelectResultCase()}
            </SelectProvider>
        )
    }
}

export default Select;
