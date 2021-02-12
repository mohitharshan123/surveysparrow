import React, {useState} from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Box from "@material-ui/core/Box";
import MessageRoundedIcon from "@material-ui/icons/MessageRounded";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { makeStyles } from "@material-ui/core/styles";
import ExploreOffIcon from "@material-ui/icons/ExploreOff";

const renderTime = (item, classes) => {
  return (
    <div className="timer">
      <div className="value">
        {item.type === "message" ? (
          <MessageRoundedIcon
            className={classes.icon}
            onClick={() => redirectToPage(item.link)}
          ></MessageRoundedIcon>
        ) : (
          <CloudUploadIcon
            onClick={() => redirectToPage(item.link)}
          ></CloudUploadIcon>
        )}
      </div>
    </div>
  );
};

const redirectToPage = (link) => {
  window.open(link, "_blank");
};

function ListItem({ item }) {
  const classes = useStyles();
  const timeCreated = new Date(item.time_created);
  const destroyedAt = new Date(timeCreated.getTime() + item.ttl * 1000);
  var dif = (destroyedAt.getTime() - new Date().getTime()) / 1000;
  const [showCountDown, setshowCountDown] = useState(true)
  return (
    <div>
      <Box m={2} display="flex" flexDirection="row" className="flexBox">
        <div className="timer-wrapper">
          {dif > 0 && showCountDown ? (
            <CountdownCircleTimer
              isPlaying
              duration={dif}
              size={150}
              trailColor={"#d9d9d9"}
              colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
              onComplete={() => setshowCountDown(false)}
            >
              {renderTime(item, classes)}
            </CountdownCircleTimer>
          ) : (
            <a
              className={classes.expired}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExploreOffIcon></ExploreOffIcon>
              {"    "} {item.link}
            </a>
          )}
        </div>
      </Box>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  expired: {
    background: "#fa5f01",
    borderRadius: "30px",
    padding: "20px",
  },
  icon: {
  cursor:"pointer"
  }
}));

export default ListItem;
