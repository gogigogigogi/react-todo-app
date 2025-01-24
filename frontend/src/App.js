import ListContainer from './components/ListContainer';
import './style/common.scss';
function App() {
  console.log(process.env.REACT_APP_API_SERVER);
  return (
    <>
      <h1>Todo app</h1>
      <ListContainer />
    </>
  );
}

export default App;
