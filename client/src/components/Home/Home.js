import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AddIcon from "@material-ui/icons/Add";
import "./Home.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import List from "./List/List";
import axios from "axios";
import { useHistory } from "react-router-dom";

import {
  FormControl,
  Input,
  Radio,
  RadioGroup,
  FormControlLabel,
  InputLabel,
  Button,
} from "@material-ui/core";
import api from "../../services/api";

function Home() {
  const history = useHistory();
  const classes = useStyles();
  const [type, setType] = useState("link");
  const [items, setItems] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [ttl, setttl] = useState(60);
  const [text, setText] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      history.push("/");
      return;
    }
    async function fetchItems() {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      const createdItems = await api.get("/items", { headers });
      setItems(createdItems.data.items);
    }
    toast("Welcome");
    fetchItems();
  }, [history]);

  const handleTypeChange = (e) => setType(e.target.value);

  const getData = () =>
    type === "link"
      ? { url: text, ttl: parseInt(ttl) }
      : { message: text, ttl: parseInt(ttl) };

  const create = async (e) => {
    e.preventDefault();
    const url =
      type === "link"
        ? "https://url.api.stdlib.com/temporary@0.3.0/create/"
        : "https://url.api.stdlib.com/temporary@0.3.0/messages/create/";
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    await axios.post(url, getData()).then(({ data }) => {
      const item = {
        type,
        link: type === "link" ? data.link_url : data.message_url,
        key_string: data.key,
        user_id: localStorage.getItem("user_id"),
        ttl: ttl,
        time_created: new Date(),
      };
      setItems([...items, item]);
      api.post("/items", item, { headers }).then(() => {
        setExpanded(false);
        clearInputs();
      });
    });
  };

  const clearInputs = () => {
    setText("");
    setttl(60);
  };

  const handleLogout = () => {
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
            <Button
              className={classes.logout}
              onClick={handleLogout}
              color="primary"
            >
              Logout
            </Button>{" "}
          </AccordionSummary>
          <AccordionDetails>
            <form>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  value={type}
                  onChange={handleTypeChange}
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
                <InputLabel htmlFor="text">Enter {type}</InputLabel>
                <Input
                  fullWidth={true}
                  id="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  aria-describedby="my-helper-text"
                />
              </FormControl>
              <FormControl className={classes.inputField}>
                <InputLabel htmlFor="time">Destroy in (sec)</InputLabel>
                <Input
                  onChange={(e) => setttl(e.target.value)}
                  fullWidth={true}
                  value={ttl}
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
              <Button
                type="submit"
                color="primary"
                className={classes.submit}
                onClick={create}
              >
                Create
              </Button>
            </form>
          </AccordionDetails>
        </Accordion>
        {items ? <List items={items}></List> : "Loading..."}
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
