import "./App.css";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Comment } from "react-loader-spinner";
import axios from "axios";
import Typewriter from "typewriter-effect/dist/core";
const Filter = require("bad-words");

function App() {
  //Pressing enter also submits the form
  document.onkeydown = function (event) {
    if (event.key == "Enter") {
      purifyResponse();
    }
  };

  const [show, setShow] = useState(false);

  const handleClose = () => window.location.reload();

  return (
    <div className="App">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="text-center">
            Watch your profanity
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column align-items-center">
          <p>Please be respectful to the AI.</p>
          <img src={require("./images/watch-your-profanity.gif")} alt="" />
        </Modal.Body>
      </Modal>
      <div id="background"></div>
      <img src={require("./images/background.png")} alt="" id="bg-top" />
      <img src={require("./images/background.png")} alt="" id="bg" />
      <div className="container-fluid">
        <div className="row t1 d-flex flex-column justify-content-center align-items-center">
          <div className="header d-flex col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 text-center justify-content-center align-items-center">
            <h1 className="display-4 m-0 " id="welcome">
              Welcome to AI Jokes
            </h1>
            <img
              src={require("./images/logo.png")}
              id="logo"
              className="mx-4"
            />
          </div>
          <div className="col-12 my-3">
            <p className="text-center p-0 m-0" id="mobile-p">
              Tell me a joke about...
            </p>
          </div>
          <div className="col-10 mb-4 d-flex justify-content-center align-items-center">
            <p className="d-inline m-0" id="desktop-p">
              Tell me a joke about...
            </p>
            <input type="text" className="mx-1" id="subject"></input>
            <button onClick={purifyResponse}>Generate</button>
          </div>
          <div
            className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 p-0 text-center d-flex flex-column justify-content-center t1"
            id="response"
          >
            <div id="loading" className="d-flex justify-content-center d-none">
              <Comment
                visible={true}
                height="80"
                width="80"
                ariaLabel="comment-loading"
                wrapperStyle={{}}
                wrapperClass="comment-wrapper"
                color="#fff"
                backgroundColor="#1a1765"
              />
            </div>
            <p className="m-0" id="answer"></p>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 d-flex justify-content-center joke">
            <p className="text-center">Want to write a poem instead? </p>
            <a href="https://ai-poem-writer.netlify.app/" id="jokes">
              Click Here
            </a>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 footer">
            <p className="small text-center">
              Made with ❤️ by Isabelle Anno.{" "}
              <a
                href="https://github.com/isabelleanno/AI-Jokes"
                target="_blank"
              >
                See my GitHub repository
              </a>
              ! Icon made by{" "}
              <a
                href="https://www.flaticon.com/authors/rohim"
                target="_blank"
                title="Rohim"
              >
                {" "}
                Rohim
              </a>{" "}
              from{" "}
              <a
                href="https://www.flaticon.com/"
                target="_blank"
                title="Flaticon"
              >
                flaticon.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  function purifyResponse() {
    document.getElementById("loading").classList.remove("d-none");
    console.log("loading");
    let userinput = document.getElementById("subject").value.trim();
    const filter = new Filter();
    //Make sure not an empty string
    if (userinput === "" || userinput == " ") {
      alert("Please type a joke subject before submitting");
      //Profanity filter #1: we are using the bad words npm package: https://www.npmjs.com/package/bad-words */
    } else if (filter.isProfane(userinput)) {
      setShow(true);
    } else {
      //Profanity filter #2: The bad words npm package doesn't cover everything, so I made a big regular expression.
      var re =
        /((fuck*)|(shit*)|(bitch*)|(porn*)|(assh*)|(ballsack*)|(whore*)|(hentai*)|(butts*)|(racist*)|(cunt*))/;
      //teehee lol ^ https://www.youtube.com/watch?v=25f2IgIrkD4
      let profanityFilter2 = re.test(userinput);
      if (profanityFilter2 === true) {
        setShow(true);
      } else {
        //Yay, it passed! Send to handleSubmit() function
        handleSubmit(userinput);
      }
    }
    //Makes a call to SheCodes AI API using axios
    function handleSubmit(userinput) {
      let apiKey = "f7o330d7cc44511d503ab6b4tdbb899b";
      let prompt = `Tell me a joke about ${userinput}`;
      let context =
        "Please be appropriate and only tell the joke and punchline.";

      let apiURL = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;
      axios.get(apiURL).then(handleResponse);
    }

    //handles the response by displaying it on the screen using a cool typewriter animation
    function handleResponse(response) {
      document.getElementById("loading").classList.add("d-none");
      new Typewriter("#answer", {
        strings: `${response.data.answer}`,
        autoStart: true,
        delay: 20,
      });
    }
  }

  /*The function below makes sure the user input is respectful and is not just an empty string.
The user input is first checked for content, then it goes through TWO profanity filters.
 If it passes all the tests, it gets passed to the handleResponse function which is responsible for the axios request. */
}
export default App;
