import {
  Card,
  CardActions,
  CardContent,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import "./style.scss";
import ButtonV2 from "../../common/button/ButtonV2";
import tutorial_img from "../../../image/exam.png";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { Link } from "react-router-dom";
import rank from "../../../image/trophy.png";
import question from "../../../image/question.png";
import score from "../../../image/target.png";
import time from "../../../image/Group8307.png";
import { useState } from "react";
import { format_second_to_minutes } from "../../helpers";

const useStyles = makeStyles({
  root: {
    maxWidth: 275,
  },
  title: {
    fontSize: 20,
  },
});
export default function Exam(props) {
  const [tutorial, setTutorial] = useState(false);
  const classes = useStyles();
  
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
            <div className="result">
              <div className="result-item result-rank">
                <img src={rank} alt="" />
              </div>
              <div className="result-item result-score">
                <img src={score} alt="" />
                {props.showResult}/{props.data.length}
              </div>
              <div className="result-item result-question">
                <img src={question} alt="" />
                {props.showResult * 1}
              </div>
              <div className="result-item result-time">
                <img src={time} alt="" />
                {format_second_to_minutes(2700-props.time)}
              </div>
            </div>
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
                    width="120px"
                    margin="unset"
                    padding="10px 10px"
                    background="rgb(167, 86, 252)"
                    backgroundColor="#B8B5FF"
                    borderRadius="100px"
                    onClick={() => setTutorial(false)}
                  >
                    <ArrowBackIosIcon />
                    Quay lại
                  </ButtonV2>
                  <Link to="/question">
                    <ButtonV2
                      width="150px"
                      margin="unset"
                      padding="10px 10px"
                      background="rgb(167, 86, 252)"
                      backgroundColor="#B8B5FF"
                      borderRadius="100px"
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
                  color="black"
                  backgroundColor="#00E4E3"
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
