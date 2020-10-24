import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './css/bootstrap.css';

class Consola extends React.Component {

  constructor(props) {
    super(props);
    this.state = {date: new Date(),
      name:User1.name,
      ahorros:User1.Ahorro,
      valor:"",
      fase:"inicio",
      fasePrev:"",
    };
    this.accion1 = this.accion1.bind(this);
    this.retiro = this.retiro.bind(this);
    this.inicio = this.inicio.bind(this);
    this.consultar = this.consultar.bind(this);
    this.valorEsp = this.valorEsp.bind(this);
    this.ingreso = this.ingreso.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  inicio(){
    this.setState({
      fase: 'inicio'
    });
  }

  consultar(){
    this.setState({
      fase: 'consulta'
    });
  }

  valorEsp(){
    this.setState({
      fasePrev: this.state.fase
    });
    this.setState({
      fase: 'valorEsp'
    });
  }

  accion1(dato) {
    if(dato === 'retirar'){
      this.setState({
        fase: 'retirar'
      });
    }
    else if(dato === 'ingresar'){
      this.setState({
        fase: 'ingresar'
      });
    }
  }

  retiro(retiro) {
    if(retiro <= this.state.ahorros){
      this.setState({
        ahorros: this.state.ahorros - retiro
      });
      this.setState({
        fase: 'exito'
      });
    }
    else{
      this.setState({
        fase: 'fracaso'
      });
    }
  }

  ingreso(adicion) {
      this.setState({
        ahorros: this.state.ahorros + adicion
      });
      this.setState({
        fase: 'exito'
      });
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  handleChange(event) {
    this.setState({
      valor: event.target.value
    });
  }

  handleSubmit(event) {
    let dato = parseInt(this.state.valor, 10);
    if(this.state.fasePrev === 'retirar'){
      if(this.state.valor <= this.state.ahorros){
        this.setState({
          ahorros: this.state.ahorros - dato
        });
        this.setState({
          valor: ""
        });
        this.setState({
          fase: 'exito'
        });
      }
      else{
        this.setState({
          fase: 'fracaso'
        });
        this.setState({
          valor: ""
        });
      }
    }
    else if(this.state.fasePrev === 'ingresar'){
      this.setState({
        ahorros: this.state.ahorros + dato
      });
      this.setState({
        valor: ""
      });
      this.setState({
        fase: 'exito'
      });
    }
    event.preventDefault();
  }

  render() {
    const Name = <Welcome name={this.state.name} />;
    return (
    <div class="container">
      <center>
      {this.state.fase === "inicio" &&
      <div class="caja">
      {Name}
      <h1>Bienvenido a banca johan!</h1>
      <h2>La hora es {this.state.date.toLocaleTimeString()}.</h2>
      <p>¿En que podemos ayudarte el día de hoy?</p>
      <table>
        <tr>
          <td>
          <button class="btn btn-primary" onClick={this.accion1.bind(this, 'retirar')}>
          Retirar dinero
          </button>
          </td>
          <td>
          <button class="btn btn-primary" onClick={this.accion1.bind(this, 'ingresar')}>
          Ingresar dinero
          </button>
          </td>
        </tr>
      </table>
      <table>
        <tr>
          <td>
          <button class="btn btn-primary" onClick={this.consultar.bind(this)}>
          Consultar saldo
          </button>
          </td>
        </tr>
      </table>
      </div>
      }

      {this.state.fase === "consulta" &&
      <div class="caja">
        <p>Tu saldo actual es:</p>
        <h1>{this.state.ahorros}</h1>
        <br></br>
        <button class="btn btn-success btn-ancho" onClick={this.inicio.bind(this)}>
          volver al menu principal
        </button>
      </div>
      }

      {this.state.fase === "retirar" &&
      <div class="caja">
      <p>Escoge un valor especifico para retirar</p>
      <table>
        <tr>
          <td>
          <button class="btn btn-success btn-ancho" onClick={this.retiro.bind(this, 50)}>
          50
          </button>
          </td>
          <td>
          <button class="btn btn-success btn-ancho" onClick={this.retiro.bind(this, 100)}>
          100
          </button>
          </td>
        </tr>
        <tr>
          <td>
          <button class="btn btn-success btn-ancho" onClick={this.retiro.bind(this, 200)}>
          200
          </button>
          </td>
          <td>
          <button class="btn btn-success btn-ancho" onClick={this.retiro.bind(this, 300)}>
          300
          </button>
          </td>
        </tr>
        <tr>
          <td>
          <button class="btn btn-success btn-ancho" onClick={this.retiro.bind(this, 400)}>
          400
          </button>
          </td>
          <td>
          <button class="btn btn-success btn-ancho" onClick={this.retiro.bind(this, 500)}>
          500
          </button>
          </td>
        </tr>
        <tr>
          <td>
          <button class="btn btn-success btn-ancho" onClick={this.valorEsp.bind(this)}>
          Valor especifico
          </button>
          </td>
          <td>
          <button class="btn btn-danger btn-ancho" onClick={this.inicio.bind(this)}>
          Cancelar transacción
          </button>
          </td>
        </tr>
      </table>
      </div>
      }

      {this.state.fase === "ingresar" &&
        <div class="caja">
      <p>Escoge un valor especifico para ingresar</p>
      <table>
        <tr>
          <td>
          <button class="btn btn-success btn-ancho" onClick={this.ingreso.bind(this, 50)}>
          50
          </button>
          </td>
          <td>
          <button class="btn btn-success btn-ancho" onClick={this.ingreso.bind(this, 100)}>
          100
          </button>
          </td>
        </tr>
        <tr>
          <td>
          <button class="btn btn-success btn-ancho" onClick={this.ingreso.bind(this, 200)}>
          200
          </button>
          </td>
          <td>
          <button class="btn btn-success btn-ancho" onClick={this.ingreso.bind(this, 300)}>
          300
          </button>
          </td>
        </tr>
        <tr>
          <td>
          <button class="btn btn-success btn-ancho" onClick={this.ingreso.bind(this, 400)}>
          400
          </button>
          </td>
          <td>
          <button class="btn btn-success btn-ancho" onClick={this.ingreso.bind(this, 500)}>
          500
          </button>
          </td>
        </tr>
        <tr>
          <td>
          <button class="btn btn-success btn-ancho" onClick={this.valorEsp.bind(this)}>
          Valor especifico
          </button>
          </td>
          <td>
          <button class="btn btn-danger btn-ancho" onClick={this.inicio.bind(this)}>
          Cancelar transacción
          </button>
          </td>
        </tr>
      </table>
      </div>
      }

    {this.state.fase === "exito" &&
      <div class="caja">
        <p>La transaccion fue un exito, gracias por escogernos</p>
        <p>Tu saldo final es:</p>
        <h1>{this.state.ahorros}</h1>
        <br></br>
        <button class="btn btn-primary btn-ancho" onClick={this.inicio.bind(this)}>
          Volver al inicio
        </button>
      </div>
    }

{this.state.fase === "fracaso" &&
      <div class="caja">
        <p>La transaccion fue un fracaso, no dispones de suficiente dinero para realizar un retiro de ese estilo</p>
        <p>Tu saldo actual es:</p>
        <h1>{this.state.ahorros}</h1>
        <br></br>
        <button class="btn btn-primary btn-ancho" onClick={this.inicio.bind(this)}>
          Volver al inicio
        </button>
      </div>
    }

{this.state.fase === "valorEsp" &&
      <div class="caja">
        <form onSubmit={this.handleSubmit}>
        <label>
          Ingresa el valor especifico para la transaccion:&nbsp;
          <input type="number" value={this.state.valor} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      </div>
    }

      </center>
    </div>
  );  
  }
}



const User1 = {
  name: 'Alveiro',
  lastName: 're Alveiro',
  password: 'kevin-gay',
  Ahorro: 10000,
};

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

ReactDOM.render(<Consola/>,
 document.getElementById('root')
 );