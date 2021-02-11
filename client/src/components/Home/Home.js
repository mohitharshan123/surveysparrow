import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AddIcon from "@material-ui/icons/Add";
import "./Home.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import List from "./List/List";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createItem, getItems, onLogout } from "../../redux/actions/items";
import CircularProgress from "@material-ui/core/CircularProgress";

import {
  FormControl,
  Input,
  Radio,
  RadioGroup,
  FormControlLabel,
  InputLabel,
  Button,
} from "@material-ui/core";

function Home() {
  const history = useHistory();
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [postData, setpostData] = useState({
    type: "link",
    text: "",
    ttl: 60,
  });
  const data = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      history.push("/");
      return;
    }
    dispatch(getItems());
  }, [history, dispatch, localStorage.getItem("token")]);

  const getData = () =>
    postData.type === "link"
      ? { url: postData.text, ttl: parseInt(postData.ttl) }
      : { message: postData.text, ttl: parseInt(postData.ttl) };

  const create = async (e) => {
    e.preventDefault();
    const url =
      postData.type === "link"
        ? "https://url.api.stdlib.com/temporary@0.3.0/create/"
        : "https://url.api.stdlib.com/temporary@0.3.0/messages/create/";
    dispatch(createItem(url, postData.type, getData()));
    setExpanded(false);
  };

  const logout = (e) => {
    e.preventDefault();
    dispatch(onLogout());
    localStorage.clear();
    history.push("/");
  };

  return (
    <div className="home-wrapper">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className={classes.root}>
        <Accordion
          className={classes.accordion}
          classes={{ expanded: classes.expanded }}
          expanded={expanded}
        >
          <AccordionSummary
            onClick={() => setExpanded(true)}
            expandIcon={<AddIcon className={classes.addButton} />}
          >
            {" "}
            <Button color="primary" className={classes.logout} onClick={(e)=>logout(e)}>
              Logout
            </Button>
          </AccordionSummary>
          <AccordionDetails>
            <form onSubmit={create}>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  value={postData.type}
                  onChange={(e) =>
                    setpostData({ ...postData, type: e.target.value })
                  }
                >
                  <FormControlLabel
                    value="link"
                    control={<Radio />}
                    label="Link"
                  />
                  <FormControlLabel
                    value="message"
                    control={<Radio />}
                    label="Message"
                  />
                </RadioGroup>
              </FormControl>
              <FormControl className={classes.inputField}>
                <InputLabel htmlFor="text">Enter {postData.type}</InputLabel>
                <Input
                  fullWidth={true}
                  id="text"
                  value={postData.text}
                  onChange={(e) =>
                    setpostData({ ...postData, text: e.target.value })
                  }
                  aria-describedby="my-helper-text"
                />
              </FormControl>
              <FormControl className={classes.inputField}>
                <InputLabel htmlFor="time">Destroy in (sec)</InputLabel>
                <Input
                  onChange={(e) =>
                    setpostData({ ...postData, ttl: e.target.value })
                  }
                  fullWidth={true}
                  value={postData.ttl}
                  id="time"
                  type="number"
                  aria-describedby="my-helper-text"
                />
              </FormControl>
              <Button
                type="submit"
                color="primary"
                className={classes.submit}
                onClick={(e) => {
                  e.preventDefault();
                  setExpanded(false);
                }}
              >
                Cancel
              </Button>
              <Button type="submit" color="primary" className={classes.submit}>
                Create
              </Button>
            </form>
          </AccordionDetails>
        </Accordion>
        {data.isLoading && <CircularProgress color="secondary" />}
        {!data.isLoading && data.items?.length > 0 && (
          <List items={data.items}></List>
        )}
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  accordion: {
    width: "100%",
    height: "100%",
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    boxShadow: " 5px 5px 5px rgba(0, 0, 0, 0.924);",
  },
  addButton: {
    background: "linear-gradient(to right, #ad5389, #3c1053)",
    fontSize: "90px",
    position: "absolute",
    borderRadius: "50%",
    color: "white",
    marginRight: "130px",
    marginTop: "50px",
  },
  expanded: {
    "&$expanded": {
      margin: "4px 0",
    },
  },
  inputField: {
    width: "100%",
    marginTop: "20px",
    "&&&:before": {
      borderBottom: "none",
    },
    "&&:after": {
      borderBottom: "none",
    },
  },
  submit: {
    marginTop: "20px",
  },
  logout: {
    borderRadius: "30px",
  },
}));
export default Home;
