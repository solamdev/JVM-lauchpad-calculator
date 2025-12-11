// src/App.tsx
import React, { useState } from "react";
import "./App.css";

const resultadoInicial: string = "0";
const mensagemErro: string = "Erro";
const botoes: string[] = [
  "C",
  "(",
  ")",
  "/",
  "7",
  "8",
  "9",
  "*",
  "4",
  "5",
  "6",
  "-",
  "1",
  "2",
  "3",
  "+",
  "0",
  ".",
  "=",
];
const operadores: string[] = ["+", "-", "*", "/"];
const entradasNaoDigito: string[] = [...operadores, ".", "(", ")"];

export default function App() {
  const [expressao, setExpressao] = useState<string>("");
  const [resultado, setResultado] = useState<string>(resultadoInicial);

  const valorDisplay = expressao || resultado;

  const calcular = (expr: string): void => {
    if (!expr) {
      setResultado(resultadoInicial);
      return;
    }
    try {
      const resultadoNum = new Function("return " + expr)();

      let resultadoString = String(resultadoNum);

      if (!Number.isInteger(resultadoNum)) {
        resultadoString = resultadoNum.toFixed(8).replace(/\.?0+$/, "");
      }

      setResultado(resultadoString);
      setExpressao("");
    } catch (e) {
      setResultado(mensagemErro);
      setExpressao("");
    }
  };

  const lidarComEntrada = (valor: string): void => {
    if (valor === "C") {
      setExpressao("");
      setResultado(resultadoInicial);
      return;
    }
    if (valor === "=") {
      calcular(expressao);
      return;
    }

    const estaEmNovoCalculo =
      (resultado !== resultadoInicial && expressao === "") ||
      resultado === mensagemErro;

    if (estaEmNovoCalculo) {
      setExpressao(valor);
      setResultado(resultadoInicial);
      return;
    }

    const ultimoChar = expressao.slice(-1);
    const entradaAtualNaoDigito = entradasNaoDigito.includes(valor);
    const ultimoCharNaoDigito = entradasNaoDigito.includes(ultimoChar);

    if (
      ultimoCharNaoDigito &&
      entradaAtualNaoDigito &&
      !["(", ")"].includes(valor)
    ) {
      setExpressao((prev) => prev.slice(0, -1) + valor);
    } else {
      setExpressao((prev) => prev + valor);
    }
  };

  const obterClassesBotao = (valor: string) => {
    if (valor === "C") return "button secondary";
    if (operadores.includes(valor)) return "button operator";
    if (valor === "=") return "button equal";
    if (valor === "0") return "button zero-button";
    return "button";
  };

  return (
    <div className="calculator-container">
      <div className="calculator">
        <div className="display">{valorDisplay}</div>

        <div className="buttons">
          {botoes.map((valor) => (
            <button
              key={valor}
              className={obterClassesBotao(valor)}
              onClick={() => lidarComEntrada(valor)}
            >
              {valor === "*" ? "×" : valor === "/" ? "÷" : valor}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
