/** @format */

import { useEffect, useState } from "react";
import {idlFactory } from "declarations/wallet_backend";

function App() {
  const [greeting, setGreeting] = useState("");
  const [actor, setActor] = useState();
  // const canisterId = "bkyz2-fmaaa-aaaaa-qaaaq-cai";
  const canisterId = "bkyz2-fmaaa-aaaaa-qaaaq-cai";
  useEffect(() => {
    initWallet();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    actor
      .greet(name)
      .then((greeting) => {
        console.log(greeting);
        setGreeting(greeting);
      })
      .catch((err) => console.log(err));
    return false;
  }

  async function initWallet() {
    await window.ic.plug.requestConnect({
      whitelist: [canisterId]
    });
    const actor = await window.ic.plug.createActor({
      canisterId: canisterId,
      interfaceFactory: idlFactory
    });
    setActor(actor);
  }

  return (
    <main>
      <img src="/logo2.svg" alt="DFINITY logo" />
      <br />
      <br />
      <form action="#" onSubmit={handleSubmit}>
        <label htmlFor="name">Enter your name: &nbsp;</label>
        <input id="name" alt="Name" type="text" />
        <button type="submit">Click Me!</button>
      </form>
      <section id="greeting">{greeting}</section>
    </main>
  );
}

export default App;
