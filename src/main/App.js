import React from 'react';

import Rotas from './rotas';
import Navbar from '../components/navbar'
import ProvedorAutenticacao from './provedorAutenticacao';

import "toastr/build/toastr.min.js";

import 'bootswatch/dist/litera/bootstrap.css';

import '../style.css';
import "toastr/build/toastr.css";


import 'primeicons/primeicons.css'
import 'primereact/resources/themes/nova-light/theme.css'
import 'primereact/resources/primereact.min.css'

class App extends React.Component {

  render(){
    return(
      <ProvedorAutenticacao>
        <Navbar/>
        <div className="container">
          <Rotas/>
        </div>
        </ProvedorAutenticacao>
    )   
  }
}

export default App;
