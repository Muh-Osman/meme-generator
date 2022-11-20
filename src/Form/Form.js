import pic from "../Assets/download.jpg";
import { useState, useEffect } from "react";

const Form = () => {
  // Save input value to show it in image
  const [upValue, setUpValue] = useState("");
  const [downValue, setDownValue] = useState("");

  // Prevent refresh page after submit the form
  const submit = (e) => {
    e.preventDefault();
  };
  
  // Generate random image
  function generateImage() {
    const memesArray = memsData.data.memes
    const randomNum = Math.floor(Math.random() * memesArray.length)
    const url = memesArray[randomNum].url
  }
  
  useEffect(() => {
    // fetch('https://api.imgflip.com/get_memes')
    .then((response) => response.json())
    .then((data) => console.log(data));

  }, []);


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
        <div
          className="up-text"
          dangerouslySetInnerHTML={{ __html: upValue }}
        ></div>
        <div
          className="down-text"
          dangerouslySetInnerHTML={{ __html: downValue }}
        ></div>
      </div>
      <p>
        API used <a href="https://imgflip.com/api">imgflip</a>
      </p>
    </main>
  );
};

export default Form;
