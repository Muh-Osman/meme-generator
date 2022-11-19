import pic from "../Assets/download.jpg";
import { useState, useEffect } from "react";

const Form = () => {


  const [upValue, setUpValue] = useState("");
  const [downValue, setDownValue] = useState("");

  const upDiv = document.getElementById("updiv");
  const downdiv = document.getElementById("downdiv");

  useEffect(()=>{},[])
  

  const submit = (e) => {
    e.preventDefault();
  };

  function generateImage() {
    // fetch('https://api.imgflip.com/get_memes')
  }



  return (
    <main>
      <form onSubmit={submit}>
        <input
          className="up"
          type="text"
          placeholder="Top Text"
          onChange={(event) => setUpValue(event.target.value)}
        ></input>

        <input
          className="down"
          type="text"
          placeholder="Bottom Text"
          onChange={(event) => setDownValue(event.target.value)}
        ></input>

        <button type="submit" onClick={generateImage}>
          Get a new meme image 🖼️
        </button>
      </form>

      <div className="img-box">
        <img src={pic} />
        <div className="up-text" id="updiv" dangerouslySetInnerHTML={{ __html: upValue }}></div>
        <div className="down-text" id="downdiv" dangerouslySetInnerHTML={{ __html: downValue }}></div>
      </div>
    </main>
  );
};

export default Form;
