import {
  Card,
  CardActions,
  CardContent,
  CircularProgress, List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Typography
} from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import tutorial_img from "../../../image/exam.png";
import time from "../../../image/Group8307.png";
import question from "../../../image/question.png";
import score from "../../../image/target.png";
import rank from "../../../image/trophy.png";
import ButtonV2 from "../../common/button/ButtonV2";
import { format_second_to_minutes } from "../../helpers";
import "./style.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 275,
  },
  title: {
    fontSize: 20,
  },
  titleV2: {
    flexGrow:1,
  },
}));
export default function Exam(props) {
  const [tutorial, setTutorial] = useState(false);
  const classes = useStyles();
  function resetData() {
    props.setListResult([]);
    props.setendResult(false);
  }
  console.log("dataExam",props.dataAccount);
  return (
    <div className="header__content exam">
      <div className="exam__content">
        <div className="exam__content_left">
          <div className="item">Study for MCT</div>
          <div className="item">Study for MCT</div>
          <div className="item">Study for MCT</div>
          <div className="item">Study for MCT</div>
        </div>
        <div className="exam__content_right">
          {props.endResult ? (
            <>
              <div className="result">
                <div className="result-item result-rank">
                  <img src={rank} alt="" />

                  <List>
                    <ListItem>
                      <ListItemText>Họ và Tên</ListItemText>
                      <ListItemText className={classes.titleV2}>Điểm</ListItemText>
                      <ListItemSecondaryAction>
                        Thời Gian
                      </ListItemSecondaryAction>
                    </ListItem>

                    {props.isSuccessAccount ? (
                      props.dataAccount
                        .slice()
                        .sort((a, b) =>
                          b.point - a.point === 0
                            ? a.time - b.time
                            : b.point - a.point
                        )
                        .map(
                          (item, index) =>
                            index < 7 &&
                            item.point >= 7 && (
                              <ListItem key={index}>
                                <ListItemText >
                                  {item.firstName} {item.lastName}
                                </ListItemText>
                                <ListItemText className={classes.titleV2}>{item.point}</ListItemText>
                                <ListItemSecondaryAction>
                                  {format_second_to_minutes(item.time)}
                                </ListItemSecondaryAction>
                              </ListItem>
                            )
                        )
                    ) : (
                      <div>
                        <CircularProgress />
                      </div>
                    )}
                  </List>
                  
                </div>
                <div className="result-item result-score">
                  <img src={score} alt="" />
                  <h1 className="text-result">
                    {props.showResult}/{props.data.length}
                    <div className="view-result">
                      <div className="main__ratings_header">
                        <p>Đáp án</p>
                      </div>
                      <div className="view-result__number">
                        {props.data.map((item, index) => (
                          <span
                            key={index}
                            onClick={() => console.log(item.id)}
                            className={`view-result__number-box 
                            ${
                              props.listResult.filter(
                                (i) =>
                                  i.result_choise === item.result_true &&
                                  i.id_question === item.id
                              ).length !== 0
                                ? "success2"
                                : "fail2"
                            }
                              `}
                          >
                            {index + 1}
                          </span>
                        ))}
                      </div>
                    </div>
                  </h1>
                </div>
                <div className="result-item result-question">
                  <img src={question} alt="" />
                  <h1 className="text-result">{props.showResult * 1} </h1>
                </div>
                <div className="result-item result-time">
                  <img src={time} alt="" />
                  <h1 className="text-result">
                    {format_second_to_minutes(2700 - props.time)}
                  </h1>
                </div>
              </div>
              <ButtonV2
                width="120px"
                margin="20px 0"
                padding="10px 10px"
                background="rgb(167, 86, 252)"
                backgroundcolor="#B8B5FF"
                borderradius="100px"
                onClick={resetData}
              >
                <ArrowBackIosIcon />
                Quay lại
              </ButtonV2>
            </>
          ) : tutorial ? (
            <div className="tutorial">
              <div className="tutorial__img">
                <img width="509px" height="474px" src={tutorial_img} alt="" />
              </div>
              <div className="tutorial__content">
                <h1>Bài Kiểm Tra Toán (10 câu hỏi)</h1>
                <h2>Nội Quy và Quy Định</h2>
                <ul className="tutorial__content_item">
                  <li>
                    Thí sinh phải hoàn thành 10 câu hỏi đơn trong khung thời
                    gian 45 phút
                  </li>
                  <li>
                    Không có tài liệu được phép cho đánh giá này. Thí sinh được
                    cung cấp bảng có thể tẩy xóa và bút dạ. Một máy tính được
                    cung cấp trên màn hình. Xin lưu ý rằng thí sinh không được
                    phép lấy bất kỳ tài liệu nào khỏi trung tâm khảo thí.
                  </li>
                  <li>
                    Mỗi câu trả lời đúng sẽ nhận được một điểm. Nhiều câu trả
                    lời không được tính
                  </li>
                  <li>
                    Thí sinh sẽ không thể tạm dừng phiên và quay lại. Sau khi
                    bắt đầu, đồng hồ sẽ tiếp tục chạy ngay cả khi bạn nghỉ ngơi.
                  </li>
                </ul>
                <div className="tutorial__button">
                  <ButtonV2
                    width="150px"
                    margin="unset"
                    padding="10px 10px"
                    background="rgb(167, 86, 252)"
                    backgroundcolor="#B8B5FF"
                    borderradius="100px"
                    onClick={() => setTutorial(false)}
                  >
                    <ArrowBackIosIcon />
                    Quay lại
                  </ButtonV2>
                  <Link to="/question">
                    <ButtonV2
                      margin="unset"
                      background="rgb(167, 86, 252)"
                      backgroundcolor="#B8B5FF"
                      borderradius="100px"
                    >
                      Bắt đầu thi
                      <ArrowForwardIosIcon />
                    </ButtonV2>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <Card className={classes.root}>
              <CardContent>
                <Typography className={classes.title}>
                  Đề kiểm tra 1 tiết
                </Typography>
                <Typography variant="body2" component="p">
                  Gồm 10 câu
                  <br />
                  Thời gian 45 phút
                </Typography>
              </CardContent>
              <CardActions>
                <ButtonV2
                  margin="unset"
                  width="100px"
                  padding="5px"
                  background="rgb(167, 86, 252)"
                  backgroundcolor="#B8B5FF"
                  onClick={() => setTutorial(true)}
                >
                  Bắt đầu
                </ButtonV2>
              </CardActions>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
