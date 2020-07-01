import React from "react";
import { ColumnDirection, SpaceAround } from "../../styled-component/Layout";
import { FlexCenterWithAni } from "../../styled-component/Animation";
import { HeadThree, Text } from "./../../styled-component/Text";
import {
  TableContainer,
  ColumnNamesSecondary,
  TableBodySecondary,
} from "./../../styled-component/Table";
import { v4 } from "uuid";
import {
  FormControl,
  InputLabel,
  Select,
  LinearProgress,
} from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";

const RecievedFiles = ({ files, handleSelectChange }) => {
  return (
    <FlexCenterWithAni>
      <ColumnDirection
        my={3}
        width="50%"
        border={2}
        borderColor="secondary.dark"
      >
        <TableContainer style={{ marginBottom: "3rem" }} cellspacing="0">
          <ColumnNamesSecondary clLength={4}>
            <tr>
              <th>
                <HeadThree>File Type</HeadThree>
              </th>
              <th>
                <HeadThree> File Name</HeadThree>
              </th>
              <th>
                <HeadThree>Type</HeadThree>
              </th>
              <th>
                <HeadThree>Progress Bar</HeadThree>
              </th>
            </tr>
          </ColumnNamesSecondary>
          {files === ""
            ? null
            : files.map((file) => (
                <tbody key={v4()}>
                  <TableBodySecondary flex="center" clLength={4}>
                    <td>
                      <Text transform="uppercase">{file.type}</Text>
                    </td>
                    <td>{file.name}</td>
                    <td>
                      {file.purposes === "noType" ? (
                        <FormControl disabled>
                          <InputLabel htmlFor="age-native-simple">
                            Type
                          </InputLabel>
                          <Select native></Select>
                        </FormControl>
                      ) : (
                        <FormControl>
                          <InputLabel htmlFor="age-native-simple">
                            Type
                          </InputLabel>
                          <Select
                            onChange={(e) => handleSelectChange(e, file)}
                            native
                            value={
                              file.selectedPurpose === undefined
                                ? null
                                : file.selectedPurpose
                            }
                            inputProps={{
                              name: "Type",
                              id: "age-native-simple",
                            }}
                          >
                            <option value="" />
                            {file.purposes.map((purpose) => (
                              <option key={uuidv4()} value={purpose}>
                                {purpose}
                              </option>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    </td>

                    <LinearProgress
                      style={{
                        margin: "auto",
                        width: "70%",
                        borderRadius: "10px",
                        height: " 13px",
                      }}
                      variant="determinate"
                      value={file.progress}
                    />
                  </TableBodySecondary>
                </tbody>
              ))}
        </TableContainer>
      </ColumnDirection>
    </FlexCenterWithAni>
  );
};

export default RecievedFiles;
