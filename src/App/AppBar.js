import React from "react";
import styled, {css} from "styled-components";

const Logo = styled.div`
  font-size: 1.5em;
`;
const Bar = styled.div`
  display: grid;
  margin-bottom: 40px;
  grid-template-columns: 180px auto 100px 100px;
`;
const ControlButtonEl = styled.div`
  cursor: pointer;
  text-align: center;
  ${props =>
    props.active &&
    css`
      text-shadow: 5px 5px 30px #03ff03;
    `}
`;
function toProperCase(lower) {
    return lower.charAt(0).toUpperCase() + lower.substr(1)
}
function ControlButton({ name, active }) {
  return (
  <ControlButtonEl active={active}> 
  {toProperCase(name)}
  </ControlButtonEl>);
}
export default function() {
  return (
    <Bar>
      <Logo>CryptoBoard</Logo>
      <div></div>
      <ControlButton name='dashboard'/>
      <ControlButton active name='setting'/>
    </Bar>
  );
}
