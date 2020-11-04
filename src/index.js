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
    this.valorEsp = this.valorEsp.bind(this);
    this.ingreso = this.ingreso.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.cambiarFase = this.cambiarFase.bind(this);
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  cambiarFase(faseN){
    this.setState({
      fase: faseN
    });
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  accion1(dato) {
    if(dato === 'retirar'){
      this.cambiarFase('retirar')
    }
    else if(dato === 'ingresar'){
      this.cambiarFase('ingresar')
    }
  }

  retiro(retiro) {
    if(retiro <= this.state.ahorros){
      this.setState({
        ahorros: this.state.ahorros - retiro
      });
      this.cambiarFase('exito')
    }
    else{
      this.cambiarFase('fracaso')
    }
  }

  ingreso(adicion) {
      this.setState({
        ahorros: this.state.ahorros + adicion
      });
      this.cambiarFase('exito')
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
        this.cambiarFase('exito')
      }
      else{
        this.cambiarFase('fracaso')
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
      this.cambiarFase('exito')
    }
    event.preventDefault();
  }

  valorEsp(){
    this.setState({
      fasePrev: this.state.fase
    });
    this.cambiarFase('valorEsp')
  }

  render() {
    const Name = <Welcome name={this.state.name} />;
    const panelRetiro= <ContruirOpt data={this.retiro} inicio={this.cambiarFase} ValEsp={this.valorEsp}/>;
    const panelIngreso= <ContruirOpt data={this.ingreso} inicio={this.cambiarFase} ValEsp={this.valorEsp}/>;
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
          <button class="btn btn-primary" onClick={this.cambiarFase.bind(this, "consulta")}>
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
        <button class="btn btn-success btn-ancho" onClick={this.cambiarFase.bind(this, "inicio")}>
          volver al menu principal
        </button>
      </div>
      }

      {this.state.fase === "retirar" &&
      <div class="caja">
      <p>Escoge un valor especifico para retirar</p>
      {panelRetiro}
      </div>
      }

      {this.state.fase === "ingresar" &&
        <div class="caja">
      <p>Escoge un valor especifico para ingresar</p>
      {panelIngreso}
      </div>
      }

    {this.state.fase === "exito" &&
      <div class="caja">
        <p>La transaccion fue un exito, gracias por escogernos</p>
        <p>Tu saldo final es:</p>
        <h1>{this.state.ahorros}</h1>
        <br></br>
        <button class="btn btn-primary btn-ancho" onClick={this.cambiarFase.bind(this, "inicio")}>
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
        <button class="btn btn-primary btn-ancho" onClick={this.cambiarFase.bind(this, "inicio")}>
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

class ContruirOpt extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);
  }

  handleChange(value) {
    this.props.data(value);
  }

  handleChange2(value) {
    this.props.inicio(value);
  }

  handleChange3() {
    this.props.ValEsp();
  }

  render() {
  const opts1 = [50, 200, 400];
  const opts2 = [100, 300, 500];
  const listItems1 = opts1.map((opt) =>
        <div>
        <button class="btn btn-success btn-ancho separate" onClick={this.handleChange.bind(this, opt)} >
        {opt}
        </button>
        </div>
  );
  const listItems2 = opts2.map((opt) =>
       <div>
        <button class="btn btn-success btn-ancho separate" onClick={this.handleChange.bind(this, opt)} >
        {opt}
        </button>
        </div>
  );
  return (
    <div >
          <table  cellpadding="10%">
          <tr>
          <td class="separate">
          {listItems1}
          <button class="btn btn-success btn-ancho" onClick={this.handleChange3.bind(this)}>
          Valor especifico
          </button>
          </td>
          <td class="separate">
          {listItems2}
          <button class="btn btn-danger btn-ancho" onClick={this.handleChange2.bind(this, "inicio")}>
          Cancelar transacción
          </button>
          </td>
          </tr>
          </table>
    </div>
    );
  }
}

ReactDOM.render(<Consola/>,
 document.getElementById('root')
 );