import { useState } from 'react'
import './App.css'

function App() {
  const [currentValue, setCurrentValue] = useState('');
  const [displayValue, setDisplayValue] = useState('0');
  const [displayOperator, setDisplayOperator] = useState('');
  const [reset, setReset] = useState(false);

  const clearDisplay = displayValue !== '0' && currentValue !== '0';
  const clearText = clearDisplay ? 'C' : 'AC';

  const inputDigit = (number: number): void => {
    setDisplayValue(prev => prev === '0' || reset ? number.toString() : prev + number.toString());
    if (reset) {
      setReset(false);
    }
  }

  const inputDecimal = () => {
    if (!displayValue.includes('.')) {
      setDisplayValue(prev => prev + '.');
    }
  }

  const toggleClear = () => {
    setDisplayValue('0');
    setCurrentValue('');
    setDisplayOperator('');
  }

  const toggleSign = () => {
    setDisplayValue(prev => {
      if (parseFloat(prev) === 0) {
        return prev;
      }
      return String(parseFloat(prev) * -1)
    });
  }

  const togglePercent = () => {
    setDisplayValue((prev) => {
      let value = parseFloat(prev);

      if (value === 0) return prev;

      value /= 100;

      return String(value);
    });
  }

  const evaluate = (operator: string): number => {
    let value = parseFloat(displayValue);

    if (operator === '+') {
      value = parseFloat(currentValue) + value;
    } else if (operator === '-') {
      value = parseFloat(currentValue) - value;
    } else if (operator === '*') {
      value = parseFloat(currentValue) * value;
    } else if (operator === '/') {
      value = parseFloat(currentValue) / value;
      const digit = value.toString().length;
      value = parseFloat(value.toFixed(Math.min(digit, 8)));
    }

    return value;
  }
  const setOperator = (symbol: string) => {
    if (!displayOperator && symbol !== '=') {
      setDisplayOperator(symbol);
      setCurrentValue(displayValue);
      setReset(true);
      return;
    }

    if (reset) {
      setDisplayOperator(symbol);
      return;
    }

    const value = evaluate(displayOperator);

    if (symbol === '=') {
      setDisplayOperator('');
      setDisplayValue(String(value));
      setCurrentValue('');
      return;
    }

    setDisplayOperator(symbol);
    setDisplayValue(String(value));
    setCurrentValue(String(value));
    setReset(true);
  }

  return (
    <>
    <section id="app">
      <div className="calculator">
        <div className="calculator-display">
          <span className='auto-scaling-text' style={{ fontSize: displayValue.length > 8 ? '.5em' : displayValue.length > 5 ? '.75em' : '' }}>{displayValue}</span>
          <span className='operator-display'>{displayOperator}</span>
        </div>
        <div className="calculator-keypad">
          <div className="input-keys">
            <div className="function-keys">
              <button type="button" className="calculator-key key-clear" onClick={() => toggleClear()}>{clearText}</button>
              <button type="button" className="calculator-key key-sign" onClick={() => toggleSign()}>±</button>
              <button type="button" className="calculator-key key-percent" onClick={() => togglePercent()}>%</button>
            </div>
            <div className="digit-keys">
              <button type="button" className="calculator-key key-0" onClick={() => inputDigit(0)}>0</button>
              <button type="button" className="calculator-key key-dot" onClick={() => inputDecimal()}>●</button>
              <button type="button" className="calculator-key key-1" onClick={() => inputDigit(1)}>1</button>
              <button type="button" className="calculator-key key-2" onClick={() => inputDigit(2)}>2</button>
              <button type="button" className="calculator-key key-3" onClick={() => inputDigit(3)}>3</button>
              <button type="button" className="calculator-key key-4" onClick={() => inputDigit(4)}>4</button>
              <button type="button" className="calculator-key key-5" onClick={() => inputDigit(5)}>5</button>
              <button type="button" className="calculator-key key-6" onClick={() => inputDigit(6)}>6</button>
              <button type="button" className="calculator-key key-7" onClick={() => inputDigit(7)}>7</button>
              <button type="button" className="calculator-key key-8" onClick={() => inputDigit(8)}>8</button>
              <button type="button" className="calculator-key key-9" onClick={() => inputDigit(9)}>9</button>
            </div>
          </div>
          <div className="operator-keys">
            <button type="button" className="calculator-key key-divide" onClick={() => setOperator('/')}>÷</button>
            <button type="button" className="calculator-key key-multiply" onClick={() => setOperator('*')}>×</button>
            <button type="button" className="calculator-key key-subtract" onClick={() => setOperator('-')}>−</button>
            <button type="button" className="calculator-key key-add" onClick={() => setOperator('+')}>+</button>
            <button type="button" className="calculator-key key-equals" onClick={() => setOperator('=')}>=</button>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default App
