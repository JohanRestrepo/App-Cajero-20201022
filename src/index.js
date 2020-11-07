import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./css/bootstrap.css";

const Consola = () => {
  const [date, setDate] = useState(new Date());
  const [name, setName] = useState(User1.name);
  const [ahorros, setAhorros] = useState(User1.Ahorro);
  const [timerID, setTimerID] = useState(User1.Ahorro);
  const [valor, setValor] = useState("");
  const [fase, setFase] = useState("inicio");
  const [fasePrev, setFasePrev] = useState("");

  useEffect(() => {
    setTimerID(setInterval(() => tick(), 1000));
  }, []);

  useEffect(() => {
    setTimerID(setInterval(() => tick(), 1000));
    return componentWillUnmount;
  }, []);

  const componentWillUnmount  = () => {
    clearInterval(timerID);
  }

  const inicio = () => {
    setFase("inicio");
  }

  const consultar = () => {
    setFase("consulta");
  }

  const valorEsp = () => {
    setFasePrev(fase);
    setFase("valorEsp");
  }

  const accion1 = (dato) => {
    switch (dato) {
      case "retirar":
        setFase("retirar");
        break;
      case "ingresar":
        setFase("ingresar");
        break;
      default:
        break;
    }
  }

  const retiro = (retiroValor) => {
    if (retiroValor <= ahorros) {
      setAhorros(ahorros - retiroValor);
      setFase("exito");
    } else {
      setFase("fracaso");
    }
  }

  const ingreso = (adicion) => {
    setAhorros(ahorros + adicion);
    setFase("exito");
  }

  const tick = () => {
    setDate(new Date());
  }

  const handleChange = ({target : { value }}) => {
    setValor(value);
  }

  const handleSubmit = (event) => {
    let dato = parseInt(valor, 10);
    if (fasePrev === "retirar") {
      if (valor <= ahorros) {
        setAhorros(ahorros - dato);
        setValor("");
        setFase("exito");
      } else {
        setFase("fracaso");
        setValor("");
      }
    } else if (fasePrev === "ingresar") {
      setAhorros(ahorros + dato);
      setValor("");
      setFase("exito");
    }
    event.preventDefault();
  }

    const Name = <Welcome name={name} />;
    return (
      <div class="container">
        <center>
          {fase === "inicio" && (
            <div class="caja">
              {Name}
              <h1>Bienvenido a banca johan!</h1>
              <h2>La hora es {date.toLocaleTimeString()}.</h2>
              <p>¿En que podemos ayudarte el día de hoy?</p>
              <table>
                <tr>
                  <td>
                    <button
                      class="btn btn-primary"
                      onClick={accion1("retirar")}
                    >
                      Retirar dinero
                    </button>
                  </td>
                  <td>
                    <button
                      class="btn btn-primary"
                      onClick={accion1("ingresar")}
                    >
                      Ingresar dinero
                    </button>
                  </td>
                </tr>
              </table>
              <table>
                <tr>
                  <td>
                    <button
                      class="btn btn-primary"
                      onClick={consultar}
                    >
                      Consultar saldo
                    </button>
                  </td>
                </tr>
              </table>
            </div>
          )}

          {fase === "consulta" && (
            <div class="caja">
              <p>Tu saldo actual es:</p>
              <h1>{ahorros}</h1>
              <br></br>
              <button
                class="btn btn-success btn-ancho"
                onClick={inicio}
              >
                volver al menu principal
              </button>
            </div>
          )}

          {fase === "retirar" && (
            <div class="caja">
              <p>Escoge un valor especifico para retirar</p>
              <table>
                <tr>
                  <td>
                    <button
                      class="btn btn-success btn-ancho"
                      onClick={retiro(50)}
                    >
                      50
                    </button>
                  </td>
                  <td>
                    <button
                      class="btn btn-success btn-ancho"
                      onClick={retiro(100)}
                    >
                      100
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <button
                      class="btn btn-success btn-ancho"
                      onClick={retiro(200)}
                    >
                      200
                    </button>
                  </td>
                  <td>
                    <button
                      class="btn btn-success btn-ancho"
                      onClick={retiro(300)}
                    >
                      300
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <button
                      class="btn btn-success btn-ancho"
                      onClick={retiro(400)}
                    >
                      400
                    </button>
                  </td>
                  <td>
                    <button
                      class="btn btn-success btn-ancho"
                      onClick={retiro(500)}
                    >
                      500
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <button
                      class="btn btn-success btn-ancho"
                      onClick={valorEsp}
                    >
                      Valor especifico
                    </button>
                  </td>
                  <td>
                    <button
                      class="btn btn-danger btn-ancho"
                      onClick={inicio}
                    >
                      Cancelar transacción
                    </button>
                  </td>
                </tr>
              </table>
            </div>
          )}

          {fase === "ingresar" && (
            <div class="caja">
              <p>Escoge un valor especifico para ingresar</p>
              <table>
                <tr>
                  <td>
                    <button
                      class="btn btn-success btn-ancho"
                      onClick={ingreso(50)}
                    >
                      50
                    </button>
                  </td>
                  <td>
                    <button
                      class="btn btn-success btn-ancho"
                      onClick={ingreso(100)}
                    >
                      100
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <button
                      class="btn btn-success btn-ancho"
                      onClick={ingreso(200)}
                    >
                      200
                    </button>
                  </td>
                  <td>
                    <button
                      class="btn btn-success btn-ancho"
                      onClick={ingreso(300)}
                    >
                      300
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <button
                      class="btn btn-success btn-ancho"
                      onClick={ingreso(400)}
                    >
                      400
                    </button>
                  </td>
                  <td>
                    <button
                      class="btn btn-success btn-ancho"
                      onClick={ingreso(500)}
                    >
                      500
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <button
                      class="btn btn-success btn-ancho"
                      onClick={valorEsp}
                    >
                      Valor especifico
                    </button>
                  </td>
                  <td>
                    <button
                      class="btn btn-danger btn-ancho"
                      onClick={inicio}
                    >
                      Cancelar transacción
                    </button>
                  </td>
                </tr>
              </table>
            </div>
          )}

          {fase === "exito" && (
            <div class="caja">
              <p>La transaccion fue un exito, gracias por escogernos</p>
              <p>Tu saldo final es:</p>
              <h1>{ahorros}</h1>
              <br></br>
              <button
                class="btn btn-primary btn-ancho"
                onClick={inicio}
              >
                Volver al inicio
              </button>
            </div>
          )}

          {fase === "fracaso" && (
            <div class="caja">
              <p>
                La transaccion fue un fracaso, no dispones de suficiente dinero
                para realizar un retiro de ese estilo
              </p>
              <p>Tu saldo actual es:</p>
              <h1>{ahorros}</h1>
              <br></br>
              <button
                class="btn btn-primary btn-ancho"
                onClick={inicio}
              >
                Volver al inicio
              </button>
            </div>
          )}

          {fase === "valorEsp" && (
            <div class="caja">
              <form onSubmit={handleSubmit}>
                <label>
                  Ingresa el valor especifico para la transaccion:&nbsp;
                  <input
                    type="number"
                    value={valor}
                    onChange={handleChange}
                  />
                </label>
                <input type="submit" value="Submit" />
              </form>
            </div>
          )}
        </center>
      </div>
    );
}

const User1 = {
  name: "Alveiro",
  lastName: "re Alveiro",
  password: "kevin-gay",
  Ahorro: 10000,
};

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

ReactDOM.render(<Consola />, document.getElementById("root"));
