import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((res) => res.json())
      .then((toysData) => setToys(toysData));
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function addToy(newToy) {
    setToys((toys) => [...toys, newToy]);
  }

  function updateToy(updatedToy) {
    setToys((toys) =>
      toys.map((toy) => (toy.id === updatedToy.id ? updatedToy : toy))
    );
  }

  function removeToy(id) {
    setToys((toys) => toys.filter((toy) => toy.id !== id));
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={addToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} onUpdateToy={updateToy} onRemoveToy={removeToy} />
    </>
  );
}

export default App;
