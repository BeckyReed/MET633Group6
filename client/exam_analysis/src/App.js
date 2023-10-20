import logo from './logo.svg';
import './App.css';
import Content from './Content';
import Header from './Header';

  export function AddLibrary(libraryURL) {
  const script = document.createElement('script');
  script.src = libraryURL;
  script.async = true;
  document.body.appendChild(script);
}  

function App() {
  return (
    <div className="App">
      {AddLibrary("https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js")}
      {AddLibrary("https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.4.1/jspdf.debug.js")}
      <Header/>
      <Content/>
    </div>
  );
} 

export default App;


