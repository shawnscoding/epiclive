import React from "react";
import SubHeader from "./../../header/SubHeader";
import { SpaceAround } from "../../../styled-component/Layout";
import PieChartStatistics from "./VODrank";
import { connect } from "react-redux";

const Rank = ({ category, records }) => {
  return (
    <React.Fragment>
      <SubHeader category={category} />
      <SpaceAround align="flex-start">
        <PieChartStatistics
          records={records}
          category={category}
          title="VOD Rank"
          render="pie"
        />
        <PieChartStatistics render="bar" records={records} title="VOD Rank" />
        <PieChartStatistics render="line" records={records} title="VOD Rank" />
      </SpaceAround>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  records: state.main.rankRecord,
});

export default connect(mapStateToProps)(Rank);
