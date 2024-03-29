import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css'; 
import { AuthProvider } from './components/context/AuthContext';
import { Provider } from 'react-redux';
import { store } from "./store"
import './styles.css'
import 'bootstrap/dist/css/bootstrap.css'; 
import { FormProvider } from './components/FormatoESP/FormProvide'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <AuthProvider>
    <FormProvider>
      <App />
    </FormProvider>
    
    </AuthProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
