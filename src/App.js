import React from 'react';
import ChatApp from './components/ChatApp';
import './assets/App.css';
import 'antd/dist/antd.css';

import { useAuth0 } from "./providers/Auth0Provider";


const App = () => {
  const { loading } = useAuth0();

  if (loading) {
    return (
      <div>Loading...</div>
    );
  }
  return <ChatApp />
}

export default App;
