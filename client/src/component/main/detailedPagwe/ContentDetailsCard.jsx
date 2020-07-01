import React from "react";
import { renderObjWithOutIdInDetailsPage } from "../../../utils/Helper";
import {
  FlexEquallyGrow,
  ColumnDirection,
  FlexEnd,
} from "./../../../styled-component/Layout";
import { CardContent, Card } from "@material-ui/core";

const ContentDetailsCard = ({ record }) => {
  return (
    <Card>
      <CardContent>
        <FlexEquallyGrow>
          <ColumnDirection>
            {renderObjWithOutIdInDetailsPage(record)}
          </ColumnDirection>

          <FlexEnd>
            <img
              style={{ width: "400px", hegiht: "300px" }}
              src="https://imagefile-input-tokyo.s3-ap-northeast-1.amazonaws.com/2020-05-15+(2).png"
            />
          </FlexEnd>
        </FlexEquallyGrow>
      </CardContent>
    </Card>
  );
};

export default ContentDetailsCard;
