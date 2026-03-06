
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import Sha256Hasing from '../componenets/Sha256Hasing.jsx';
import HexToAscii from '../componenets/HexToAscii.jsx';
import JsonToSchema from '../componenets/JsonSchema.jsx';
import JsonToXml from '../componenets/JsonToXml.jsx';
import XmlToJson from '../componenets/XmlToJson.jsx';
import Praveen from '../componenets/Praveen.jsx';

export const route = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: 'sha256', element: <Sha256Hasing/> } , 
      { path: 'hash', element: <HexToAscii/> }  ,
      { path: 'json-schema', element: <JsonToSchema/> }  ,
      { path: 'json-xml', element: <JsonToXml /> }  ,
      { path: 'xml-json', element: <XmlToJson/> }  ,
      { path: 'Hmmm-Praveen', element: <Praveen/> }  
      
      ],
    errorElement: <h1>Error</h1>,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <RouterProvider router={route} />
  </StrictMode>,
)
