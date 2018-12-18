import styled from 'styled-components';

export const SelectProvider = styled.div`
    width: ${props => props.width || '60px'};
    height:auto;
`;

export const SelectInputCase = styled.div`
    display: inline-block;
    width:100%;
    height:30px;
    padding: 0 1px 1px 1px;
    border: 1px solid #cccccc;
    border-radius: 5px;
    :hover{
        border-color: #1890ff;
        ::shadow{
            box-shadow: 20px 20px 40px 10px #4CC8FF;
        }
    }
`;

export const SelectInput = styled.input.attrs({
    value: props => props.value || ''
})`
    border: none;
    outline: none;
    padding: 0px;
    min-width: 20px;
    min-height: 20px;
    height: 30px;
    width: 90%;
    line-height: 30px;
    margin-left: 2px;
`;

export const SelectDropdown = styled.label`
    margin-left: 1px;
    height: 30px;
    line-height: 30px;
    vertical-align: middle;
    .icon-dropdown-open{
        color: #1890ff;
    }
    .icon-dropdown-close{
        color: #666666;
    }
`;

export const SelectResultCase = styled.div`
    width: 100%;
    margin-top: 5px;
    border: 1px solid #cccccc;
    background: whitesmoke;
    border-radius: 5px;
    display: inline-block;
`;

export const SelectResultItem = styled.div`
    display: inline-block;
    width: 98%;
    height: 30px;
    padding: 3px 3px;
    :hover{
        color: white;
        background: #1890ff;
        border-radius: 3px;
    }
`;
