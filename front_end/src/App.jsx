import "./App.css";

function App() {
  const handleAdd = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const author = form.author.value;
    const books = { name, author };
    fetch("http://localhost:3000/books", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(books),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        form.reset();
      });
  };
  return (
    <>
      <h1>Book Management!!</h1>
      <form onSubmit={handleAdd}>
        <input type="text" name="name" placeholder="book name" />
        <br />
        <br />
        <input type="text" name="author" placeholder="author name" />
        <br />
        <br />
        <button>Add</button>
      </form>
    </>
  );
}

export default App;
