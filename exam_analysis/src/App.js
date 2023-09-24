import logo from './logo.svg';
import './App.css';
import Content from './Content';
import Header from './Header';

/* export function AddLibrary(libraryURL) {
  const script = document.createElement('script');
  script.src = libraryURL;
  script.async = true;
  document.body.appendChild(script);
} */

function App() {
  return (
    <div className="App">
      <Header/>
      <Content/>

{/*       {AddLibrary(
        'https://cdn.sheetjs.com/xlsx-0.20.0/package/dist/xlsx.full.min.js'
      )} */}
    </div>
  );
} 

export default App;
