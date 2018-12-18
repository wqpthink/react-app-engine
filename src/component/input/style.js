import styled from 'styled-components';

export const InputWrapper = styled.input`
    width: ${props => props.width || '120px'};
    height: ${props => props.height || '25px'};
    outline: none;
    border: ${props => props.border || '1px solid #ccc'};
    border-radius: 3px;
    caret-color: #CFCFCF;
    padding-left: 5px;
    :hover{
        /* border-color: #0D8AE6; */
        caret-color: #0D8AE6;
        box-shadow: 0 0 1px 1px #0D8AE6;
    }
`;

export const SpanWrapper = styled.span`
    padding: 1px 3px;
    color: ${props => props.color || '#000'};
    display: ${props => props.display || 'none'}
`;
