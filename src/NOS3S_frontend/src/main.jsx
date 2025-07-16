import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';


import { AuthClient } from '@dfinity/auth-client';
import { createActor, canisterId } from '../../declarations/NOS3S_backend';
import { HttpAgent } from '@dfinity/agent'; 
// Un agente es una API usada para interactuar con la API publica de ICP y lo canisters desplegados dentro de la blockchain. 
// Estos agentes cuentan con un soporte de autenticacion atraves de la libreria auth-client, que es la que usa el servicio de Internet Identity.
// Existen dos maneras para gestionar la duración de la sesión, la primera de ellas es establecer un tiempo de vida a la autenticación mediante el maxTimeToLive
// y la segunda es el idle Manager, que se encarga de monitorear la ausencia de interacciones con la pagina o aplicacion mediante la actividad de los perifericos
// automaticamente la sesion se cierra tras 10 min de inactividad, sin embargo este valor puede cambar para una mayor personalizacion

const environment = process.env.DFX_NETWORK === 'local'
const localHost = "http://localhost:4943"
const productionHost = "https://ic0.app";


const init = async () => {
  const authClient = await AuthClient.create()

  if (await authClient.isAuthenticated()){
    handleAuthenticated(authClient)
    
  } else {
    await authClient.login({
      
      maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000), // Establece una cantidad en dias (en este caso 7) en las que la autenticacion sera valida
      identityProvider: environment? `http://${process.env.CANISTER_ID_INTERNET_IDENTITY}.localhost:4943/` : "https://identity.ic0.app", 
      onSuccess: async () => {
        handleAuthenticated(authClient)
        window.location.reload()
      }
      
    })

  }
  
}

async function logout(){
  const authClient = await AuthClient.create()
  console.log("Loggin out")
  await authClient.logout()
  console.log("Logged out")
  window.location.reload()

}

async function handleAuthenticated(authClient) {
  
  const identity = authClient.getIdentity()
  const agent = new HttpAgent ({
    identity, 
    host: environment? localHost : productionHost,
  })
  const actor = createActor(canisterId, {
    agent
  })

  const userPrincipal = identity._principal.toString();
  console.log(userPrincipal)


  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App userPrincipal={userPrincipal} actor={actor} logout={logout}/>
    </React.StrictMode>,
  );
  
}

init()