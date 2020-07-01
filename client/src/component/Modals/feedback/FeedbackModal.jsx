import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import MoodIcon from "@material-ui/icons/Mood";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import { MuiButton } from "../../../styled-component/Button";
import { HeadTwo, Close } from "../../../styled-component/Text";
import { Text } from "../../../styled-component/Text";
import { FeedBackModalContainer } from "./../../../styled-component/ModalContainer";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const FeedBackModal = () => {
  const [open, setOpen] = React.useState(false);
  const [emoji, setEmoji] = React.useState(1);

  const [feedback, setFeedback] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setFeedback(e.target.value);
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>
        <ChatBubbleOutlineIcon />
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <FeedBackModalContainer selectedEmoji={emoji}>
          <div className="header">
            <HeadTwo color="#eee">Feedback</HeadTwo>
            <Close onClick={handleClose}>x</Close>
          </div>
          <div className="iconBox">
            <div>
              <Text>Experience</Text>
            </div>
            <div>
              <div onClick={() => setEmoji(1)}>
                <MoodIcon />
              </div>
              <div onClick={() => setEmoji(2)}>
                <SentimentSatisfiedIcon />
              </div>
              <div onClick={() => setEmoji(3)}>
                <SentimentVeryDissatisfiedIcon />
              </div>
            </div>
          </div>
          <div className="feedback-input">
            <textarea
              value={feedback}
              onChange={handleChange}
              placeholder="feedback"
              id="w3mission"
              rows="8"
              cols="55"
            ></textarea>
          </div>
          <div className="buttonGroup">
            <MuiButton
              bg="inherit"
              size="large"
              cr="#eee"
              border="#000"
              onClick={handleClose}
            >
              Cancel
            </MuiButton>
            <MuiButton
              bg="inherit"
              size="large"
              cr="#eee"
              border="#000"
              onClick={handleClose}
            >
              Submit Feedback
            </MuiButton>
          </div>
        </FeedBackModalContainer>
      </Dialog>
    </div>
  );
};

export default FeedBackModal;
