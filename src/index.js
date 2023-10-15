import React from 'react';
import ReactDOM from 'react-dom/client';
import DataWrap from './DataWrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DataWrap/>
  </React.StrictMode>
);
