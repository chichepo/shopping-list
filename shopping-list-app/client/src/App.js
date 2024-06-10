import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import CollapsibleTable from "./components/collapsibleTable";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <CollapsibleTable />
      </div>
    </Provider>
  );
}

export default App;
