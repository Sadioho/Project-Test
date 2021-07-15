import {
  Backdrop,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fade,
  FormControlLabel,
  makeStyles,
  Modal,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import AccessAlarmsIcon from "@material-ui/icons/AccessAlarms";
import "./style.scss";
import ButtonV2 from "../../common/button/ButtonV2";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useHistory } from "react-router-dom";
import { Spinner } from "../../spinner/Spinner";
import {
  countResult,
  defaultChecked,
  filterByResult,
  format_second_to_minutes,
} from "../../helpers";
import Clock from "../../clock/Clock";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "400px",
    textAlign: "center",
  },
}));
export default function ListQuestion(props) {

  const classes = useStyles();
  const history = useHistory();
  
  const [open, setOpen] = useState(false);
  const [timeCountDown, setTimeCountDown] = useState(0);
  const [timePause, setTimePause] = useState(0);

  const data = props.data;
  const dataLength = props.data.length;
  const [numberQuestion, setNumberQuestion] = useState(0);

  const handleOpen = () => {
    setOpen(true);
    setTimePause(timeCountDown);
  };
  const handleClose = () => {
    setOpen(false);
  };

  async function handleFinish() {
    props.setendResult(true);
    history.push("/");
    let count = countResult(props.listResult, data, 0);
    props.setShowResult(count);
    props.setTime(timePause);

    let time = 2700 - timePause;
    let point = count * 1;
    let id = JSON.parse(localStorage.getItem("my-info")).id;
    let dataPatch = {
      time: time,
      point: point,
    };
    let checkPoint = props.listUser.find((item) => item.id === id);
    if (checkPoint.point === null && checkPoint.time === null) {
      await fetch(`http://localhost:3000/users/${id}`, {
        method: "PATCH",
        body: JSON.stringify(dataPatch),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      // stateGlobal.setreload(ramdomID);
    } else {
      if (checkPoint.point < point) {
        await fetch(`http://localhost:3000/users/${id}`, {
          method: "PATCH",
          body: JSON.stringify(dataPatch),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        // stateGlobal.setreload(ramdomID);
      }
      if (checkPoint.point === point) {
        if (checkPoint.time > time) {
          await fetch(`http://localhost:3000/users/${id}`, {
            method: "PATCH",
            body: JSON.stringify(dataPatch),
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          });
          // stateGlobal.setreload(ramdomID);
        }
      }
    }
  }

  console.log(props.listUser);

  const [listItemQuestion, setlistItemQuestion] = useState(false);
  const [listReview, setlistReview] = useState([]);

  function handleResult(i, id) {
    const obj = {
      result_choise: i.result_answer,
      id_question: id,
    };
    const check = props.listResult.filter((item) => item.id_question !== id);
    check
      ? props.setListResult([...check, obj])
      : props.setListResult([...props.listResult, obj]);
  }
  function plus() {
    setNumberQuestion(numberQuestion + 1);
  }
  function minus() {
    setNumberQuestion(numberQuestion - 1);
  }

  function setCheck(data, id) {
    const obj = {
      id_question: id,
      checked: data,
    };
    const check = listReview.filter((item) => item.id_question !== id);
    check
      ? setlistReview([...check, obj])
      : setlistReview([...listReview, obj]);
  }

  return (
    <div className="header__content exam list-question ">
      <div className="list-question__header">
        <Container className="list-question__header_content">
          <p>{dataLength} Câu hỏi</p>
          <div className="list-question__clock">
            <AccessAlarmsIcon className="icon-clock" />
            <p>
              <span>Thời gian còn lại</span>{" "}
              <Clock
                setTimeCountDown={setTimeCountDown}
                setTimePause={setTimePause}
              />
            </p>
          </div>
        </Container>
      </div>
      <div className="list-question__content">
        {props.isLoading ? (
          <Container className="list-question__header_question">
            <div className="list-question__header_content-question">
              <h3>{data[numberQuestion].name}</h3>
              <p>{data[numberQuestion].question}</p>
            </div>
            <RadioGroup
              className="radio-result"
              aria-label="gender"
              name="gender1"
            >
              {data[numberQuestion].results.map((i, index) => (
                <FormControlLabel
                  key={index}
                  className="item-result"
                  onChange={() => handleResult(i, data[numberQuestion].id)}
                  name={data[numberQuestion].name}
                  value={i.result_answer}
                  control={<Radio color="primary" />}
                  label={`${i.name_answer}. ${i.result_answer}`}
                  checked={defaultChecked(
                    props.listResult,
                    data[numberQuestion],
                    i
                  )}
                />
              ))}
            </RadioGroup>
            <div>
              <MoreHorizIcon
                fontSize="large"
                className="icon-dots"
                onClick={() => setlistItemQuestion(!listItemQuestion)}
              />
              {listItemQuestion && (
                <div className="list-result">
                  {data.map((item, index) => (
                    <span
                      className={filterByResult(
                        listReview,
                        props.listResult,
                        item
                      )}
                      key={item.id}
                      onClick={() => setNumberQuestion(index)}
                    >
                      {index + 1}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Container>
        ) : (
          <Spinner></Spinner>
        )}
      </div>

      <div className="list-question__footer">
        <Container className="list-question__footer_content-1">
          <div className="list-question__footer_content">
            <ButtonV2
              width="150px"
              margin="unset"
              padding="10px 10px"
              background="#7b4fff"
              backgroundColor="#B8B5FF"
              borderRadius="100px"
              onClick={minus}
            >
              <ArrowLeftIcon />
              Quay Lại
            </ButtonV2>
            <ButtonV2
              width="150px"
              margin="0 10px"
              padding="10px 10px"
              background="#7b4fff"
              backgroundColor="#B8B5FF"
              borderRadius="100px"
              onClick={plus}
            >
              Câu kế tiếp
              <ArrowRightIcon />
            </ButtonV2>
          </div>
          <div className="list-question__finish">
            <FormControlLabel
              control={
                <Checkbox
                  checked={defaultChecked(
                    listReview,
                    data[numberQuestion],
                    null
                  )}
                  onChange={(e) =>
                    setCheck(e.target.checked, data[numberQuestion].id)
                  }
                  name="checkedA"
                />
              }
              label="Xem lại"
            />

            <ButtonV2
              width="150px"
              margin="0 10px"
              padding="10px 10px"
              background="#7b4fff"
              backgroundColor="#B8B5FF"
              borderRadius="100px"
              onClick={handleOpen}
            >
              Nộp bài
            </ButtonV2>
          </div>
        </Container>
      </div>

      {/* <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        keepMounted
        disablePortal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">
              {data.length - props.listResult.length > 0
                ? `Bạn còn  ${
                    data.length - props.listResult.length
                  }  câu chưa trả lời 😩`
                : "Bạn đã làm xong bài thi 😍"}
            </h2>
            <h4>Thời gian còn ⌚{format_second_to_minutes(timePause)}</h4>
            <p>Bạn đồng ý nộp bài ?? </p>
            <div className="modal-button">
              <ButtonV2
                width="150px"
                margin="0 10px"
                padding="10px 10px"
                background="#7b4fff"
                backgroundColor="#B8B5FF"
                borderRadius="100px"
                onClick={handleFinish}
              >
                Nộp bài
              </ButtonV2>
              <ButtonV2
                width="150px"
                margin="0 10px"
                padding="10px 10px"
                background="#7b4fff"
                backgroundColor="#B8B5FF"
                borderRadius="100px"
                onClick={handleClose}
              >
                Làm tiếp
              </ButtonV2>
            </div>
          </div>
        </Fade>
      </Modal> */}





<Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Modal title
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          </Typography>
          <Typography gutterBottom>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
            lacus vel augue laoreet rutrum faucibus dolor auctor.
          </Typography>
          <Typography gutterBottom>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
            scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
            auctor fringilla.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>











    </div>
  );
}
