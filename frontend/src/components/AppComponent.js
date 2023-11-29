
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchComponent from './SearchComponent';
import ResultComponent from './ResultComponent';


function AppComponent() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<SearchComponent />} />
          <Route path="/results" element={<ResultComponent />} />
        </Routes>
      </Router>
    </div>
    
  );

}

export default AppComponent;
