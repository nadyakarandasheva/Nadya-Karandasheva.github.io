import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Каких целей хотите достичь: повысить квалификацию.
        </p>
        <p>
          Какими технологиями хотите овладеть: работа с изображениями (зум, рисование на изображении и тд), использование популярных паттернов в работе.
        </p>
        <p>
          Какими технологиями уже владеете: HTML, CSS, JS, TS, React.
        </p>
        <p>
          Расскажите о себе и своем опыте: студентка магистратуры направления веб-технологии, 2 года работаю FE разработчиком.
        </p>
      </header>
    </div>
  );
}

export default App;
