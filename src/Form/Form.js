const Form = () => {
  return (
    <main>
      <form>
        <input className="up" type={"text"} placeholder={""}></input>
        <input className="down" type={"text"} placeholder={""}></input>
        <button>Get a new meme image</button>
      </form>
      <div>
        <img src={''} />
      </div>
    </main>
  );
};

export default Form;
