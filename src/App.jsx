import "./App.scss";
import Form from "./components/Form/Form";
import EmojiGenerator from "./components/EmojiGenerator/EmojiGenerator";

function App() {
  return (
    <div className="App">
      <Form />
      <EmojiGenerator
        emojis={["❤️", "❄️", "❄️", "❄️", "❄️", "🌟", "🎉"]}
        count={100}
      />
    </div>
  );
}

export default App;
