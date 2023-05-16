import { useState, useEffect, useRef, useCallback } from "react";
// npm install --save html-to-image --legacy-peer-deps
import { toPng } from 'html-to-image'; //html-to-image library 





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
      // Check if image loaded
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


    //  Download meme image (html-to-image library )
    const ref = useRef(null)

    const downloadMemeImg = useCallback(() => {
      if (ref.current === null) {
        return
      }
  
      toPng(ref.current, { cacheBust: true, })
        .then((dataUrl) => {
          const link = document.createElement('a')
          link.download = 'meme.png'
          link.href = dataUrl
          link.click()
        })
        .catch((err) => {
          console.log(err)
        })
    }, [ref])



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


      <div ref={ref} className="img-box">
        <img id="img" src={meme.randomImage} alt="meme" />
        <div className="up-text">{meme.topText}</div>
        <div className="down-text">{meme.bottomText}</div>
      </div>
      
      <button className="download-btn" onClick={() => downloadMemeImg()}>
          <svg
          xmlns="http://www.w3.org/2000/svg"
          enableBackground="new 0 0 30 30"
          version="1.1"
          viewBox="0 0 30 30"
          xmlSpace="preserve"
        >
          <path d="M6 19v-2a1 1 0 00-2 0v2a1 1 0 002 0zM10 5a1 1 0 001 1h2a1 1 0 000-2h-2a1 1 0 00-1 1zM5 14a1 1 0 001-1v-2a1 1 0 00-2 0v2a1 1 0 001 1zM23 6h1v1a1 1 0 002 0V6a2 2 0 00-2-2h-1a1 1 0 000 2zM16 5a1 1 0 001 1h2a1 1 0 000-2h-2a1 1 0 00-1 1zM7 24H6v-1a1 1 0 00-2 0v1a2 2 0 002 2h1a1 1 0 000-2zM6 7V6h1a1 1 0 000-2H6a2 2 0 00-2 2v1a1 1 0 002 0zM24 11v2.001a1 1 0 002 0V11a1 1 0 00-2 0z"></path>
          <g>
            <path d="M25 16h-1.764a2 2 0 01-1.789-1.106l-.171-.342a1 1 0 00-.894-.552h-4.764a.998.998 0 00-.894.553l-.171.342A2.002 2.002 0 0112.764 16H11a1 1 0 00-1 1v8a1 1 0 001 1h14a1 1 0 001-1v-8a1 1 0 00-1-1zm-7 9a4 4 0 110-8 4 4 0 010 8z"></path>
            <circle cx="18" cy="21" r="2"></circle>
          </g>
        </svg>
      </button>

      <p>
        API used <a href="https://imgflip.com/api">imgflip</a>
      </p>

    </main>
  );
};

export default Form;
