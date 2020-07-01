import axios from "axios";
import AWS from "aws-sdk";
import { checkFileType } from "./../../../utils/Helper";

export const insertFileToS3 = (auth, files, getProgress) => {
  console.log("------------user files");
  console.log(auth, files);
  // !! this url below is different from that in gateway
  const { token, user } = auth;
  const { id, workspace_id } = user;
  // !! find out if i need to have workspace_id
  // tommorow
  axios
    .post(
      "https://cqvfwe05v9.execute-api.ap-northeast-1.amazonaws.com/prod/api/auth/login2",
      {
        id: id,
        token: token,
        target: workspace_id,
      }
    )
    .then(function (response) {
      statusChangeCallback({
        files: files,
        getProgress: getProgress,
        status: "connected",
        workspace_id: workspace_id,
        authResponse: {
          userId: id,
          accessToken: response.data.token,
          IdentityId: response.data.identityId,
        },
      });
    })
    .catch(function (error) {
      console.log(error);
    });
};

function statusChangeCallback(response) {
  const DeveloperProviderName = "cognito-identity.amazonaws.com";
  const files = response.files;
  const getProgress = response.getProgress;
  const workspace_id = response.workspace_id;
  const userId = response.authResponse.userId;
  if (response.status === "connected") {
    console.log("Welcome!  Fetching your information.... ");
    var managerList = [];
    const AWS_REGION = "ap-northeast-1";

    var AWSCognitoPoolId =
      "ap-northeast-1:1c5ec57c-f1ff-428d-aa6e-090b175bed15";
    AWS.config.update({ region: AWS_REGION });
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: AWSCognitoPoolId,
      IdentityId: response.authResponse.IdentityId,
      Logins: {
        [DeveloperProviderName]: response.authResponse.accessToken,
        // 'login.epiclive.cms': response.authResponse.accessToken
      },
    });
    AWS.config.credentials.get(function () {
      if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          const type = checkFileType(files[i].type);
          const file = files[i];
          const purpose = files[i].selectedPurpose;
          console.log("type---------------");
          console.log(type);
          console.log(purpose);
          if (!purpose) {
            alert("Please, select purpose on the file ");
            return;
          }

          const imagePath = `imagefile-input-tokyo/image/react/${userId}/type/${purpose}`;
          const videoPath = `mediafile-input-tokyo/video/react/${userId}/type/${purpose}`;
          const filePath = `file-input-tokyo/file/react/${userId}/type/${purpose}`;
          if (type === "image") {
            const bucket = new AWS.S3({
              params: { Bucket: imagePath },
            });
            aws_upload(file, bucket, getProgress);
          } else if (type === "video") {
            const bucket = new AWS.S3({
              params: { Bucket: videoPath },
            });
            console.log("runed  ! bucket 2 ");
            aws_upload(file, bucket, getProgress);
          } else if (type === "file") {
            const bucket = new AWS.S3({
              params: { Bucket: filePath },
            });
            aws_upload(file, bucket, getProgress);
          } else {
            alert("unsupported file extenssion");
          }
        }
      }
    });
  } else {
    alert("sorry something went wrong !! ");
  }
}

function aws_upload(file, bucket, getProgress) {
  const { name, type, id } = file;

  //  Unsupported body payload object
  const params = {
    Key: name,
    ContentType: type,
    Body: file,
    ACL: "public-read",
  };
  const options = { partSize: 10 * 1024 * 1024, queueSize: 1 };
  const manager = bucket.upload(params, options, function (err, data) {
    console.log(err, data);
  });
  manager.on("httpUploadProgress", function (progress) {
    console.log("progress ", progress); // { loaded: 4915, total: 192915, part: 1, key: 'foo.jpg' }
    const str = progress.key.split("/");
    const key = str[5];
    const status = (progress.loaded / progress.total) * 100;
    getProgress(status, id);
  });
}
