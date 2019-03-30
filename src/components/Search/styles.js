import styled, { css } from "styled-components";
import { Search } from "styled-icons/fa-solid/Search";

export const Root = styled.div`
  position: relative;
  display: grid;
  grid-gap: 1em;
`;

const focussed = css`
  background: ${props => props.theme.white};
  color: ${props => props.theme.darkBlue};
  cursor: text;
  width: 15em;
  padding: 0.6rem 0.9rem;
  margin: 0 0 0.5rem 0;
  vertical-align: middle;
  text-align: center;
`;

const collapse = css`
  width: 15em;
  cursor: pointer;
  padding: 0.6rem 0.9rem;
  margin: 0 0 0.5rem 0;
  vertical-align: middle;
  text-align: center;
  color: ${props => props.theme.lightBlue};
  ${props => props.focussed && focussed}
  margin-left: ${props => (props.focussed ? `-1.6em` : `-1.6em`)};
  padding-left: ${props => (props.focussed ? `1.6em` : `1.6em`)};
  ::placeholder {
    color: ${props => props.theme.gray};
  }
`;

const expand = css`
  background: ${props => props.theme.veryLightGray};
  width: 5em;
  margin-left: -1.6em;
  padding-left: 1.6em;
`;

export const Input = styled.input`
         outline: none;
         border: none;
         font-size: 1em;
         background: transparent;
         color: ${props => props.theme.lightBlue};
         transition: ${props => props.theme.shortTrans};
         border-radius: ${props => props.theme.smallBorderRadius};
         ${props => (props.collapse ? collapse : expand)};
       `;

export const Form = styled.form`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
`;

const list = css`
  position: absolute;
  right: 0;
  top: calc(100% + 0.5em);
  width: calc(4em + 40vw);
  max-width: 30em;
  box-shadow: 0 0 5px 0;
  padding: 0.7em 1em 0.4em;
  background: white;
  border-radius: ${props => props.theme.smallBorderRadius};
  > * + * {
    padding-top: 1em !important;
    border-top: 2px solid ${props => props.theme.darkGray};
  }
  li + li {
    margin-top: 0.7em;
    padding-top: 0.7em;
    border-top: 1px solid ${props => props.theme.lightGray};
  }
`;

const grid = css`
  ul {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(15em, 1fr));
    grid-gap: 1em;
    li {
      padding: 0.3em 0.5em;
      background: ${props => props.theme.veryLightGray};
      border-radius: ${props => props.theme.smallBorderRadius};
    }
  }
`;

export const HitsWrapper = styled.div`
  display: ${props => (props.show ? `grid` : `none`)};
  max-height: 80vh;
  overflow: scroll;
  ${props => (props.hitsAsGrid ? grid : list)};
  * {
    margin-top: 0;
    padding: 0;
  }
  ul {
    list-style: none;
  }
  mark {
    color: ${props => props.theme.lightBlue};
    background: ${props => props.theme.darkBlue};
  }
  header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.3em;
    h3 {
      color: ${props => props.theme.white};
      background: ${props => props.theme.gray};
      padding: 0.1em 0.4em;
      border-radius: ${props => props.theme.smallBorderRadius};
    }
  }
  h3 {
    margin: 0 0 0.5em;
  }
  h4 {
    margin-bottom: 0.3em;
  }
`;

export const By = styled.span`
  font-size: 0.6em;
  text-align: end;
  padding: 0;
`;
