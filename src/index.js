import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './css/bootstrap.css';

class Consola extends React.Component {

  constructor(props) {
    super(props);
    this.state = {date: new Date(),
      name:User1.name,
    };
    this.accion1 = this.accion1.bind(this);
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

  accion1(dato) {
    if(dato == 'retirar'){
      window.alert('desea retirar');
    }
    else if(dato == 'ingresar'){
      window.alert('desea ingresar');
    }
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    const Name = <Welcome name={this.state.name} />;
    return (
    <div>
      <center>
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