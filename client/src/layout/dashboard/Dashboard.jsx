import React from "react";
import styled from "styled-components";
import Navbar from "../../component/navbar/Navbar";
import Header from "./../../component/header/Header";
import Board from "./../../component/board/Board";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  clearTableOnRouteChange,
  getCurrentCategory,
} from "../../redux/main/actions";
import CreateModal from "../../component/Modals/create/CreateModal";
import EditModal from "../../component/Modals/edit/EditModal";
import SearchPopup from "./../../component/popup/SearchPopup";
import { checkIfUserLogin } from "../../redux/auth/actions";

const Container = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    props.shrink ? "25px 25px 50px" : "repeat(13, 1fr)"};
  grid-template-rows: 50px calc(100vh - 50px);
`;

const Dashboard = ({
  match,
  loading,
  clearTableOnRouteChange,
  getCurrentCategory,
  checkIfUserLogin,
  user,
}) => {
  const { category } = match.params;

  React.useEffect(() => {
    if (category !== null) {
      clearTableOnRouteChange();
      getCurrentCategory({ category });
    }
    if (user === null) {
      checkIfUserLogin();
    }
  }, [category]);

  const [shrink, setShrink] = React.useState(false);
  if (!category) return <div>dd</div>;
  return (
    <Container shrink={shrink ? "shrink" : null}>
      <Header shrink={shrink} setShrink={setShrink} />
      <Navbar category={category} shrink={shrink} />
      <Board category={category} />
      <CreateModal loading={loading} category={category} />
      <EditModal loading={loading} category={category} />
      <SearchPopup loading={loading} category={category} />
    </Container>
  );
};

const mapStateToProps = (state) => ({
  loading: state.main.loading,
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
  clearTableOnRouteChange: () => dispatch(clearTableOnRouteChange()),
  getCurrentCategory: (category) => dispatch(getCurrentCategory(category)),
  checkIfUserLogin: () => dispatch(checkIfUserLogin()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Dashboard)
);
