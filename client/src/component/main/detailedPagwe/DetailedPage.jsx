import React from "react";
import { connect } from "react-redux";
import { fetchFromMultipleTablesStart } from "../../../redux/multipleTables/actions";
import { withRouter } from "react-router-dom";
import SubHeader from "./../../header/SubHeader";
import { createRecordStart } from "./../../../redux/main/actions";

import { Box } from "@material-ui/core/";
import ContentDetailsCard from "./ContentDetailsCard";
import TableTypeTwo from "./../../table/TableTypeTwo";

const DetailedPage = ({
  content,
  loading,
  fetchFromMultipleTablesStart,
  history,
  category,
  create,
  setImage,
  setImageCN,
}) => {
  React.useEffect(() => {
    const pathname = history.location.pathname;

    const arr = pathname.split("/");
    fetchFromMultipleTablesStart({ id: arr[4], route: arr[3] });
  }, []);

  if (loading) return <div>loading ...</div>;
  if (!content) return <div>no record</div>;
  return (
    <div>
      <SubHeader category={category} />
      <Box mb={3}>
        <ContentDetailsCard record={content} />
      </Box>
      <Box mb={3}>
        <TableTypeTwo
          content_id={content.id}
          category="setimage"
          create={create}
          records={setImage}
          columns={setImageCN}
        />
      </Box>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.multiTables.loading,
  content: state.multiTables.parant,
  setImage: state.multiTables.child_1,
  setImageCN: state.multiTables.child_1_column_names,
});

const mapDispatchToProps = (dispatch) => ({
  fetchFromMultipleTablesStart: (payload) =>
    dispatch(fetchFromMultipleTablesStart(payload)),
  create: (payload) => dispatch(createRecordStart(payload)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DetailedPage)
);
