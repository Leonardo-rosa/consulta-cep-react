
import './App.css';
import { useState } from 'react';

function App() {

  const [endereco, setEndereco] = useState( {} );

  function manipularEndereco(evento){


    const cep = evento.target.value

    setEndereco({
      cep
    })

    if (cep && cep.length === 8 ) {
      //obter o cep
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(resposta => resposta.json())
      .then(dados => {
        setEndereco(enderecoAntigo => {
          return{
            ...enderecoAntigo,
            rua: dados.logradouro,
            bairro: dados.bairro,
            cidade: dados.localidade,
            estado: dados.uf
          }
        })
      })
    }

  }
  return (
    <div className="App">
      <header className="App-header">
        <input placeholder='Digite o cep' onChange={manipularEndereco} />
        <ul>
          <li><b>CEP</b>: {endereco.cep}</li>
          <li><b>Bairro:</b> {endereco.bairro}</li>
          <li><b>Cidade:</b> {endereco.cidade}</li>
          <li><b>Estado:</b> {endereco.estado}</li>
        </ul>
      </header>
    </div>
  );
}

export default App;
