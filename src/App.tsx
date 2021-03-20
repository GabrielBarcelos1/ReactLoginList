import Routes from "./routes/routes";
import Provider from "./store/Provider";
function App() {
  return (
    <Provider>
      <Routes />
    </Provider>
  );
}

export default App;
