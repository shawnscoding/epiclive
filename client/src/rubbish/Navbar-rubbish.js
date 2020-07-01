import React, { useState } from "react";
import styled from "styled-components";
import { navbarItem } from "../../utils/Data";
import { withRouter } from "react-router-dom";
import StopRoundedIcon from "@material-ui/icons/StopRounded";

const Container = styled.div`
  background: #efefef;
  grid-column: 1 / 3;
`;

const SubContainer = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
`;

const LinkBox = styled.li`
  display: flex;
  cursor: pointer;
  transition: background-color 0.3s ease;

  :hover {
    background-color: #e6e6e6bf;
    div {
      svg {
        color: #02106f;
      }
      p {
        color: #02106f;
      }
    }
  }

  :active {
    background-color: #fdfdfdbf;
  }

  div {
    padding: 1.5rem 0 1.5rem 4rem;
    flex-grow: 4;
    display: flex;
    justify-content: flex-start;
    svg {
      font-size: 2.3rem;
      margin-right: 2rem;
      color: ${(props) => (props.selected ? "#02106f" : "#02106f94")};
    }

    p {
      color: ${(props) => (props.selected ? "#02106f" : "#02106fb5")};
    }
  }

  .arrowDown {
    flex-grow: 1;
    display: flex;
    padding: 0 15px 0 0;

    div {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-bottom: -3px;
      i {
        border: solid #0e1a6f;
        border-width: 0 3px 3px 0;
        display: inline-block;
        padding: 4px;
        transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
      }
      :hover i {
        border: solid #fffffff0;
        border-width: 0 3px 3px 0;
      }
    }
  }

  .arrowUp {
    flex-grow: 1;
    display: flex;
    padding: 0 15px 0 0;

    div {
      display: flex;
      justify-content: flex-end;

      align-items: center;
      margin-bottom: -3px;
      i {
        border: solid #ffffff94;
        border-width: 0 3px 3px 0;
        display: inline-block;
        padding: 4px;
        transform: rotate(225deg);
        -webkit-transform: rotate(225deg);
      }
      :hover i {
        border: solid #fffffff0;
        border-width: 0 3px 3px 0;
      }
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
    align-items: center;
    justify-content: flex-start;
    color: #02106f;
    height: 33px;
    display: flex;
    padding: 0 0 0 5rem;

    :hover {
      background-color: #e6e6e6bf;
    }
    :active {
      background-color: #fdfdfdbf;
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

const Text = styled.p`
  font-size: 1.3rem;
  color: #fff;
  margin-top: 4px;
`;

const Navbar = ({ history, shrink, category }) => {
  const [renderSubLink, setRenderSubLink] = useState(null);

  // !! brilliant
  React.useEffect(() => {
    if (category) {
      const currentLink = navbarItem.filter((item) => item.params === category);

      setRenderSubLink(currentLink[0].id);
    }
  }, []);

  const handleClickDropDown = (id) => {
    if (renderSubLink === null) {
      setRenderSubLink(id);
    } else if (renderSubLink === id) {
      setRenderSubLink(null);
    } else if (renderSubLink && renderSubLink !== id) {
      setRenderSubLink(id);
    }
  };

  const handleClickLink = (params, id) => {
    setRenderSubLink(id);
    history.push(`/dashboard/mbc/${params}`);
  };

  console.log(renderSubLink, "renderSubLink");
  return (
    <Container>
      <SubContainer>
        {navbarItem &&
          navbarItem.map((item) => (
            <React.Fragment key={item.id}>
              <LinkBox selected={category === item.params ? "selected" : null}>
                <div onClick={() => handleClickLink(item.params, item.id)}>
                  {item.icon}
                  {shrink ? null : <Text>{item.link}</Text>}
                </div>
                {/* {item.subLink && (
                  <React.Fragment>
                    {!shrink ? (
                      renderSubLink === item.id ? (
                        <div
                          className="arrowUp"
                          onClick={() =>
                            handleClickDropDown(item.id, item.link)
                          }
                        >
                          <div>
                            <i></i>
                          </div>
                        </div>
                      ) : (
                        <div
                          className="arrowDown"
                          onClick={() =>
                            handleClickDropDown(item.id, item.link)
                          }
                        >
                          <div>
                            <i></i>
                          </div>
                        </div>
                      )
                    ) : null}
                  </React.Fragment>
                )} */}
              </LinkBox>
              <SubLink>
                {!shrink &&
                  item.subLink &&
                  renderSubLink === item.id &&
                  item.subLink.map((link) => (
                    <li key={link}>
                      <StopRoundedIcon />
                      <p>{link}</p>
                    </li>
                  ))}
              </SubLink>
            </React.Fragment>
          ))}
      </SubContainer>
    </Container>
  );
};

export default withRouter(Navbar);
