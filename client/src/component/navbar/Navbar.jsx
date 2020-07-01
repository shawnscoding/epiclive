import React, { useState } from "react";
import styled from "styled-components";
import { navbarItem } from "../../utils/Data";
import { withRouter, Link } from "react-router-dom";
import StopRoundedIcon from "@material-ui/icons/StopRounded";
import {
  textPrimary,
  primaryLight,
  primaryHover,
  primaryDark,
} from "../../styled-component/Variable";
import { LinkText } from "./../../styled-component/Text";

const Container = styled.div`
  background: ${primaryLight};
  grid-column: 1 / 3;
  grid-row: 1 / 3;
  justify-content: center;
`;

const SubContainer = styled.ul`
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  list-style: none;
`;

const LinkBox = styled.li`
  display: flex;
  cursor: pointer;
  transition: background-color 0.3s ease;

  :hover {
    background-color: ${primaryHover};
    div {
      svg {
        color: ${textPrimary};
      }
      p {
        color: ${textPrimary};
        font-weight: bold;
      }
    }
  }

  :active {
    background-color: ${primaryDark};
  }

  div {
    padding: 1.5rem 0 1.5rem 4rem;
    flex-grow: 4;
    display: flex;
    justify-content: flex-start;
    svg {
      font-size: 2.3rem;
      margin-right: 2rem;
      color: ${(props) => (props.selected ? textPrimary : "#02106f94")};
    }

    p {
      color: ${(props) => (props.selected ? textPrimary : "#02106fb5")};
      font-weight: ${(props) => (props.selected ? "bold" : "400")};
    }
  }
`;

const SubLink = styled.ul`
  display: flex;
  list-style: none;
  flex-direction: column;

  cursor: pointer;

  li {
    transition: background-color 0.3s ease;
    background-color: ${(props) => props.selected};

    align-items: center;
    justify-content: flex-start;
    color: ${textPrimary};
    height: 33px;
    display: flex;
    padding: 0 0 0 5rem;

    :hover {
      background-color: ${primaryHover};
    }
    :active {
      background-color: ${primaryDark}f;
    }
    p {
      font-size: 1.2rem;
      letter-spacing: 0.5px;
    }
    svg {
      font-size: 1rem;
      margin-right: 5px;
    }
  }
`;

const Navbar = ({ history, shrink, category }) => {
  const [renderSubLink, setRenderSubLink] = useState(null);

  // $$ brilliant
  // $$ brilliant again !! !
  const [currentLink, setCurrentLink] = useState(null);
  React.useEffect(() => {
    if (category) {
      const res = navbarItem.filter((item) => item.params === category);
      if (res.length !== 0) {
        setCurrentLink(category);
        setRenderSubLink(res[0].id);
      } else {
        const res = category.split(".");
        const link = navbarItem.filter((item) => item.params === res[0]);
        setCurrentLink(link[0].params);

        setRenderSubLink(link[0].id);
      }
    }
  }, [category]);

  const handleClickLink = (params) => {
    history.push(`/dashboard/mbc/${params}`);
  };

  return (
    <Container>
      <SubContainer>
        {navbarItem &&
          navbarItem.map((item) => (
            <React.Fragment key={item.id}>
              <LinkBox
                selected={currentLink === item.params ? "selected" : null}
              >
                <div onClick={() => handleClickLink(item.params, item.id)}>
                  {item.icon}
                  {shrink ? null : <LinkText>{item.link}</LinkText>}
                </div>
              </LinkBox>
              {!shrink &&
                item.subLink &&
                renderSubLink === item.id &&
                item.subLink.map((link) => (
                  <SubLink
                    key={link.link}
                    selected={
                      currentLink === link.params ? `${primaryHover}` : null
                    }
                  >
                    <li onClick={() => handleClickLink(link.params, item.id)}>
                      <StopRoundedIcon />
                      <p>{link.link}</p>
                    </li>
                  </SubLink>
                ))}
            </React.Fragment>
          ))}
      </SubContainer>
    </Container>
  );
};

export default withRouter(Navbar);
