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

    const img = document.getElementById('img');
    const btn = document.getElementById('btn');
    btn.style.opacity = "0.7";
    btn.innerHTML='Loading...'

    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;

    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));

    img.addEventListener("load", event => {
      if (img.complete && img.naturalHeight !== 0) {
        
        btn.innerHTML='Get a new meme image 🖼️'
        btn.style.opacity = "1";
      }
    });

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

        <button id="btn" type="submit" onClick={getMemeImage}>
          Get a new meme image 🖼️
        </button>
      </form>

      <div className="img-box">
        <img id="img" src={meme.randomImage} />
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
