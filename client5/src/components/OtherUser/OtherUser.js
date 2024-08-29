import { Container, Typography, Grid } from "@material-ui/core";
import ChatBox from "./Chat/Box.js";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import img from "../Profile/profilepic.png";
import useStyles from "./styles.js";
import { getProfile } from "../../actions/User.js";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard/Dashboard.js";
import { useHistory } from "react-router-dom";
import { getBooks } from "../../actions/Books.js";

const OtherUser = ({ match }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [err, setErr] = useState(false);
  const books = useSelector((state) => state.books);
  const sender = JSON.parse(localStorage.getItem("profile")).profile;

  const userId = match.params.userId;
  const history = useHistory();

  useEffect(() => {
    dispatch(getProfile(userId));
    dispatch(getBooks());
  }, [dispatch, userId]);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    college: "",
    location: "",
  });

  useEffect(() => {
    if (user) {
      setUserData({
        name: user.name,
        email: user.email,
        college: user.college,
        location: user.location,
      });
    }
  }, [user]);

  useEffect(() => {
    if (userId === sender.id) {
      history.push("/profile");
    }
  }, [userId, sender.id, history]);

  useEffect(() => {
    if (user.msg) {
      setErr(true);
    } else {
      setErr(false);
    }
  }, [user]);

  return (
    <div className={classes.container}>
      <ArrowBackIcon
        className={classes.back}
        onClick={() => history.goBack()}
        fontSize="large"
      />

      <div className={classes.topBox}>
        <Container className={classes.head}>
          <img
            className={classes.pic}
            src={user?.profilePic || img}
            alt="Profile Pic"
            width="175"
            height="190"
            loading="lazy"
          />

          <div className={classes.userDetails}>
            <Typography variant="h4" color="textPrimary" className={classes.name}>
              {user?.name}
            </Typography>
            <Typography className={classes.headUser}>
              College: {user?.college}
            </Typography>
            <Typography className={classes.headUser}>
              Location: {user?.location}
            </Typography>
          </div>

          <div className={classes.listing1}>
            <Typography className={classes.listNumber}>
              {books.filter((book) => book.owner === userId).length}
            </Typography>
            <Typography className={classes.listLetter}>
              Total Listing
            </Typography>
          </div>

          <div className={classes.listing2}>
            <Typography className={classes.listNumber}>
              {books.filter((book) => book.owner === userId && book.isSold).length}
            </Typography>
            <Typography className={classes.listLetter}>Ads Sold</Typography>
          </div>
        </Container>
      </div>

      <Grid container style={{ padding: "10px" }}>
        <Grid item xs={12} sm={8}>
          <Dashboard userId={userId} />
        </Grid>
        <Grid item xs={12} sm={4}>
          {user ? <ChatBox sender={sender} /> : <Typography>ChatBox ...Loading</Typography>}
        </Grid>
      </Grid>
    </div>
  );
};

export default OtherUser;
