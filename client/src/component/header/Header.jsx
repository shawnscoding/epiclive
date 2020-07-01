import React from "react";
import styled from "styled-components";
import HeaderMunu from "./HeaderMenu";
import FeedBackModal from "../Modals/feedback/FeedbackModal";
import { textPrimary } from "../../styled-component/Variable";

const Container = styled.div`
  background: #fff;
  grid-column: 3 / 14;
  /* border-bottom: 5px solid #dff2ff; */

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ItemBoxLeft = styled.div`
  padding: 0 30px;

  h1 {
    font-size: 2rem;
    color: ${textPrimary};
  }

  /* svg {
      font-size: 3rem;
      background-color: #fff;
      padding: 3px;
      color: #000;
      margin-top: 3px;
      border: 1px solid #000;
      border-radius: 2px;
      cursor: pointer;
    } */
`;

const ItemBoxRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding-right: 20px;
  div {
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    h1 {
      font-size: 2rem;
    }
    p {
      font-size: 1.2rem;
    }
    svg {
      font-size: 2rem;
    }
  }
`;

const Header = ({ setShrink, shrink }) => {
  return (
    <Container>
      <ItemBoxLeft>
        {/* <div onClick={() => setShrink(!shrink)}>
          <MenuIcon />
        </div> */}
        <h1>통합 CMS</h1>
      </ItemBoxLeft>
      <ItemBoxRight>
        <FeedBackModal />
        <HeaderMunu />
        <HeaderMunu admin={true} />
      </ItemBoxRight>
    </Container>
  );
};

export default Header;
