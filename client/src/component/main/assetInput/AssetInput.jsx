import React, { Component } from "react";
import SubHeader from "./../../header/SubHeader";
import RecievedFiles from "./../../fileInput/RecievedFiles";
import FileInput from "../../fileInput/FileInput";
import { checkFileType } from "../../../utils/Helper";
import { v4 as uuidv4 } from "uuid";
import {
  textPrimary,
  primaryDark,
  primaryHover,
} from "../../../styled-component/Variable";
import { MuiButton } from "../../../styled-component/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { FlexEnd, FlexCenter } from "../../../styled-component/Layout";
import { connect } from "react-redux";
import { insertFileToS3 } from "./insertFileToS3";
import axios from "axios";

class AssetInput extends Component {
  state = {
    files: [],
    imageTypes: [],
    fileTypes: [],
    videoTypes: []
  };
  async componentDidMount() {
      try {
        const codetypes =  JSON.stringify(["1100", "1110", "1120" ])
          const config = {
            headers: {
              "Content-Type": "application/json",
              codetypes: codetypes,
            },
          };
      
          const res = await axios.get("/api/commoncode/", config);
          const data = res.data;
          let imageTypes = [];
          let fileTypes = [];
          let videoTypes = [];
          for (const obj of data ) {
            if(obj.codetype === 1100){
              videoTypes.push(obj.cname)
            } else if (obj.codetype === 1110){
              imageTypes.push(obj.cname)

            } else if (obj.codetype === 1120){
              fileTypes.push(obj.cname)
            }
          }
          this.setState((pre) => ({
            ...pre,
            imageTypes,
            fileTypes,
            videoTypes
          }));

      } catch (err) {
          console.log(err, "err in AssetInput")
      }
  }

  getProgress = (progress, id) => {
    const { files } = this.state;

    const newArr = files.map((file) => {
      if (file.id === id) {
        console.log("runed ds sd");
        file.progress = progress;
      }
      return file;
    });

    this.setState({
      ...this.state,
      files: newArr,
    });
  };
  handleDrop = (files) => {
    let fileList = this.state.files;
    const { 
      imageTypes,
            fileTypes,
            videoTypes
     } = this.state
    for (let i = 0; i < files.length; i++) {
      const type = checkFileType(files[i].type);
      let purposes;
      if (type === "image") {
        purposes = imageTypes ;
      } else if (type === "video") {
        purposes = videoTypes;
      } else if (type === "file") {
        purposes =fileTypes;
      } else {
        alert("unsupported file extenssion");
        return;
      }

      files[i].purposes = purposes;
      files[i].id = uuidv4();
      files[i].selectedPurpose = undefined;
      files[i].progress = 0;

      fileList.push(files[i]);
    }
    this.setState({ files: fileList });
  };

  handleClickFileInput = (e) => {
    if (e.target.files) {
      const { 
        imageTypes,
              fileTypes,
              videoTypes
       } = this.state
      let files = e.target.files;
      let fileList = [];
      for (let i = 0; i < files.length; i++) {
        const type = checkFileType(files[i].type);
        let purposes;
        if (type === "image") {
          purposes = imageTypes;
        } else if (type === "video") {
          purposes = videoTypes;
        } else if (type === "file") {
          purposes = fileTypes;
        } else {
          alert("unsupported file extenssion");
          return;
        }

        files[i].purposes = purposes;
        files[i].id = uuidv4();
        files[i].selectedPurpose = undefined;
        files[i].progress = 0;

        fileList.push(files[i]);
      }

      this.setState({
        files: [...this.state.files, ...fileList],
      });
    }
  };

  handleSelectChange = (e, file) => {
    const { files } = this.state;

    for (let i = 0; i < files.length; i++) {
      if (files[i].id === file.id) {
        files[i].selectedPurpose = e.target.value;
      }
    }

    this.setState({
      files: files,
    });
  };

  handleSubmit = () => {
    const { files } = this.state;
    const { auth } = this.props;

    for (const obj of files) {
      if (!obj.selectedPurpose) {
        alert("Please select the purpose !");
        return;
      }
    }

    if (files.length !== 0 && files) {
      insertFileToS3(auth, files, this.getProgress);
    } else {
      alert("There is no file to upload !");
      return;
    }
  };

  render() {
    const { files } = this.state;
    const { category } = this.props;

    return (
      <React.Fragment>
        <SubHeader category={category} />

        <FileInput
          handleClickFileInput={this.handleClickFileInput}
          handleDrop={this.handleDrop}
        />

        <RecievedFiles
          handleSelectChange={this.handleSelectChange}
          files={files}
        />
        <FlexCenter>
          <FlexEnd width="50%">
            <MuiButton
              startIcon={<AddCircleOutlineIcon />}
              onClick={() => this.handleSubmit()}
              variant="contained"
              cr={textPrimary}
              bg={primaryDark}
              border={primaryHover}
              sz="1.5rem"
            >
              Upload
            </MuiButton>
          </FlexEnd>
        </FlexCenter>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(AssetInput);
