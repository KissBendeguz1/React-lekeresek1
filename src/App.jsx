import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

export const App = () => {
  const [chess, setChess] = useState([]);
  const [car, setCar] = useState([]);
  const [hiba, setHiba] = useState("");
  const [id, setId] = useState(null);
  //sakk lekeres async awaitel
  const sakkBetoltes = async () => {
    try {
      const response = await axios.get("https://chess.sulla.hu/chess");
      setChess(response.data);
    } catch (error) {
      console.error("Error fetching chess data:", error);
    }
  };

  sakkBetoltes();

  //auto lekerese iife-vel
  function handleCarId(e) {
    e.preventDefault();
    const Id = e.currentTarget.elements.idInput.value;
    console.log("Fetching car data for ID:", Id);

    (async () => {
      setCar([]);
      setHiba("");

      try {
        const response = await axios.get(`https://cars.sulla.hu/cars/${Id}`);
        setCar([response.data]);
      } catch (error) {
        setHiba("Hiba történt az autó lekérése során.");
      }
    })();
  }

  return (
    <>
      <div>
        {chess.map((item) => (
          <div className="chessItem" key={item.id}>
            <div>
              <h2>{item.name}</h2>
              <p>Megnyert világbajnokság: {item.world_ch_won}</p>
              <p>Születési dátum: {item.birth_date}</p>
              <p>
                Profil oldal:{" "}
                <a
                  href={item.profile_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.profile_url}
                </a>
              </p>
            </div>
            <div>
              <img src={item.image_url} alt={item.name} />
            </div>
            <hr />
          </div>
        ))}
      </div>
      <form onSubmit={handleCarId}>
        <label>
          Autó Id: <input name="idInput" type="number" />{" "}
        </label>
        <button type="submit">Autó keresése</button>
      </form>
      {hiba ? (
        <p>{hiba}</p>
      ) : (
        car.map((item) => (
          <div className="carItem" key={item.id}>
            <h2>Típus: {item.car_name}</h2>
            <p>Szín: {item.car_color}</p>
          </div>
        ))
      )}
    </>
  );
};

export default App;
