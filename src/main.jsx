// FIXME: En realidad es de Backend. Hay errores en Backend que se devuelven directo en el controlador como res.status(400).json({message:"Blabla"}) y hay otros que se mandan desde el controlador a un global error handler haciendo next( new AppError("Blabla",400)).
//    Los primeros tienen que ser usados en errores puntuales, los segundos en errores que se repiten muchas veces en distintos controlador.
// FIXME: Trabajar bien el password validation en los forms. Hay que conectarlo con MongoDB? Hay que crear una regla de validación que esté bien tuned con MongoDB? Verlo

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
