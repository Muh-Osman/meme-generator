import { useState, useEffect } from "react";

const Form = () => {
  // Prevent refresh page after submit the form
  const submit = (e) => {
    e.preventDefault();
  };

  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "https://i.imgflip.com/1ur9b0.jpg",
  });

  const [allMemes, setAllMemes] = useState([]);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes));
  }, []);

  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
  }

  function handelChange(e) {
    const { name, value } = e.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  return (
    <main>
      <form onSubmit={submit}>
        <input
          className="up"
          type="text"
          name="topText"
          placeholder="Top Text"
          onChange={handelChange}
          value={meme.topText}
        ></input>

        <input
          className="down"
          type="text"
          name="bottomText"
          placeholder="Bottom Text"
          onChange={handelChange}
          value={meme.bottomText}
        ></input>

        <button type="submit" onClick={getMemeImage}>
          Get a new meme image 🖼️
        </button>
      </form>

      <div className="img-box">
        <img src={meme.randomImage} />
        <div className="up-text">{meme.topText}</div>
        <div className="down-text">{meme.bottomText}</div>
      </div>
      <p>
        API used <a href="https://imgflip.com/api">imgflip</a>
      </p>
    </main>
  );
};

export default Form;
