import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Step_1 from "./ContentForm";
import SetImageForm from "./SetImageForm";
import { Box } from "@material-ui/core";
import { connect } from "react-redux";
import { insertToMultipleTablesStart } from "./../../redux/multipleTables/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return [
    "Create Content",
    "Set VOD for this content",
    "Set Image for this content",
  ];
}

function getStepContent(stepIndex, props) {
  const { imageForm, setImageForm } = props;
  switch (stepIndex) {
    case 0:
      return <Step_1 {...props} />;
    case 1:
      return <SetImageForm setImageForm={setImageForm} form={imageForm} />;
    case 2:
      return "Ready to submit!";
    default:
      return;
  }
}

const ContentForm = (props) => {
  const { form, imageForm, create, category } = props;
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleSubmit = () => {
    const formatForm = { contentForm: form, imageForm };

    create({ form: formatForm, category });
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            {getStepContent(activeStep, props)}
            <Box mb={2}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                >
                  Next
                </Button>
              )}
            </Box>
          </div>
        )}
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  create: (data) => dispatch(insertToMultipleTablesStart(data)),
});

export default connect(null, mapDispatchToProps)(ContentForm);
