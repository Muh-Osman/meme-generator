import pic from '../Assets/download.png'

const Form = () => {
  return (
    <main>
      <form>
        <input className="up" type={"text"} placeholder={"Top Text"}></input>
        <input className="down" type={"text"} placeholder={"Bottom Text"}></input>
        <button>Get a new meme image 🖼️</button>
      </form>
      <div className='img-box'>
        <img src={pic} />
        <div className='up-text'>Shut up</div>
        <div className='down-text'>and take my money</div>
      </div>
    </main>
  );
};

export default Form;
