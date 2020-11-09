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
    this.retiroConsigna = this.retiroConsigna.bind(this);
    this.valorEsp = this.valorEsp.bind(this);
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

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  cambiarFase(faseN){
    this.setState({
      fase: faseN
    });
  }
  
  handleSubmit(event) {
    let dato = parseInt(this.state.valor, 10);
    if(this.state.fasePrev === 'retirar'){
        dato = 0 - dato
    }
    this.setState({ valor: ""});
    this.retiroConsigna(dato)
  }

  retiroConsigna(Value) {
    if(this.state.fase === "retirar"){
      Value = 0 - Value
    }
    Value = this.state.ahorros + Value
    if(Value >= 0){
      this.setState({
        ahorros: Value
      });
      this.cambiarFase('exito')
    }
    else{
      this.cambiarFase('fracaso')
    }
  }

  handleChange(event) {
    this.setState({
      valor: event.target.value
    });
  }

  valorEsp(){
    this.setState({fasePrev: this.state.fase});
    this.cambiarFase('valorEsp')
  }

  render() {
    const Name = <Welcome name={this.state.name} />;
    const panelRetiro= <ContruirOpt data={this.retiroConsigna} inicio={this.cambiarFase} ValEsp={this.valorEsp}/>;
    const panelIngreso= <ContruirOpt data={this.retiroConsigna} inicio={this.cambiarFase} ValEsp={this.valorEsp}/>;
    return (
    <div class="container">
      <center>  
      {this.state.fase === "inicio" &&
      <div class="caja">
      <center>
      {Name}
      <h1>Bienvenido a banca johan!</h1>
      <h2>La hora es {this.state.date.toLocaleTimeString()}.</h2>
      <p>¿En que podemos ayudarte el día de hoy?</p>
      <div class="grid grid-pad">
          <button class="btn btn-primary btn-ancho" onClick={this.cambiarFase.bind(this, 'retirar')}>
          Retirar dinero
          </button>
          <button class="btn btn-primary btn-ancho" onClick={this.cambiarFase.bind(this, 'ingresar')}>
          Ingresar dinero
          </button>
          <button class="btn btn-primary btn-ancho" onClick={this.cambiarFase.bind(this, "consulta")}>
          Consultar saldo
          </button>
      </div>
      </center>
      </div>
      }

      {(this.state.fase === "retirar" || this.state.fase === "ingresar") &&
      <div class="caja">
      {panelRetiro}
      </div>
      }

      {(this.state.fase === "consulta" || this.state.fase === "exito" || this.state.fase === "fracaso") &&
      <div class="caja">
        {this.state.fase === "exito" && <p>La transaccion fue un exito, gracias por escogernos</p>}
        {this.state.fase === "fracaso" && <p>La transaccion fue un fracaso, no dispones de suficiente dinero para realizar un retiro de ese estilo</p>}
        <p>Tu saldo actual es:</p>
        <h1>{this.state.ahorros}</h1>
        <br></br>
        <button class="btn btn-success btn-ancho" onClick={this.cambiarFase.bind(this, "inicio")}>
          volver al menu principal
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
  const opts1 = [500, 1000, 1500, 2000, 2500, 3000];
  const listItems1 = opts1.map((opt) =>
        <button class="btn btn-success btn-ancho" onClick={this.handleChange.bind(this, opt)} >
        {opt}
        </button>
  );
  return (
    <div class="grid grid-pad">
          <p>Escoge un valor especifico para transaccion</p>
          <br></br>
          {listItems1}
          <button class="btn btn-success btn-ancho" onClick={this.handleChange3.bind(this)}>
          Valor especifico
          </button>
          <button class="btn btn-danger btn-ancho" onClick={this.handleChange2.bind(this, "inicio")}>
          Cancelar transacción
          </button>
    </div>
    );
  }
}

ReactDOM.render(<Consola/>,
 document.getElementById('root')
 );