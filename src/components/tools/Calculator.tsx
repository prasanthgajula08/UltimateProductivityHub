import React, { useState } from 'react';
import { RotateCcw, Divide, X, Minus, Plus, Equal } from 'lucide-react';

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [isNewNumber, setIsNewNumber] = useState(true);

  const handleNumber = (num: string) => {
    if (isNewNumber) {
      setDisplay(num);
      setIsNewNumber(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperator = (op: string) => {
    setEquation(display + ' ' + op + ' ');
    setIsNewNumber(true);
  };

  const calculate = () => {
    try {
      const expression = equation + display;
      const sanitizedExpression = expression
        .replace('×', '*')
        .replace('÷', '/');
      const result = eval(sanitizedExpression);
      setDisplay(Number(result.toFixed(8)).toString());
      setEquation('');
      setIsNewNumber(true);
    } catch (error) {
      setDisplay('Error');
      setEquation('');
      setIsNewNumber(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setEquation('');
    setIsNewNumber(true);
  };

  const CalcButton = ({ 
    onClick, 
    className = '', 
    children 
  }: { 
    onClick: () => void, 
    className?: string, 
    children: React.ReactNode 
  }) => (
    <button
      onClick={onClick}
      className={`h-14 rounded-xl flex items-center justify-center
                 bg-gradient-to-r from-purple-500/10 to-pink-500/10
                 hover:from-purple-500/20 hover:to-pink-500/20
                 transition-all duration-300 hover:scale-105
                 group relative overflow-hidden
                 text-xl font-semibold ${className}`}
    >
      {children}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-pink-500/0 
                    group-hover:from-purple-500/5 group-hover:to-pink-500/5 
                    transition-all duration-300" />
    </button>
  );

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="bg-white/5 p-6 rounded-2xl mb-4 border border-white/10">
        {equation && (
          <div className="text-right h-6 text-gray-400 font-mono mb-1">
            {equation}
          </div>
        )}
        <div className="text-right">
          <span className="text-4xl font-bold tracking-wider bg-gradient-to-r 
                         from-pink-500 to-purple-500 text-transparent bg-clip-text">
            {display}
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        <CalcButton
          onClick={clear}
          className="col-span-2 bg-gradient-to-r from-red-500/10 to-orange-500/10
                    hover:from-red-500/20 hover:to-orange-500/20"
        >
          <div className="flex items-center gap-2">
            <RotateCcw size={18} />
            <span>Clear</span>
          </div>
        </CalcButton>
        <CalcButton onClick={() => handleOperator('÷')}>
          <Divide size={20} />
        </CalcButton>
        <CalcButton onClick={() => handleOperator('×')}>
          <X size={20} />
        </CalcButton>
        
        {[7, 8, 9].map(num => (
          <CalcButton key={num} onClick={() => handleNumber(num.toString())}>
            {num}
          </CalcButton>
        ))}
        <CalcButton onClick={() => handleOperator('-')}>
          <Minus size={20} />
        </CalcButton>
        
        {[4, 5, 6].map(num => (
          <CalcButton key={num} onClick={() => handleNumber(num.toString())}>
            {num}
          </CalcButton>
        ))}
        <CalcButton onClick={() => handleOperator('+')}>
          <Plus size={20} />
        </CalcButton>
        
        {[1, 2, 3].map(num => (
          <CalcButton key={num} onClick={() => handleNumber(num.toString())}>
            {num}
          </CalcButton>
        ))}
        <CalcButton
          onClick={calculate}
          className="row-span-2 bg-gradient-to-r from-emerald-500/10 to-teal-500/10
                    hover:from-emerald-500/20 hover:to-teal-500/20"
        >
          <Equal size={20} />
        </CalcButton>
        
        <CalcButton
          onClick={() => handleNumber('0')}
          className="col-span-2"
        >
          0
        </CalcButton>
        <CalcButton onClick={() => handleNumber('.')}>
          .
        </CalcButton>
      </div>
    </div>
  );
};

export default Calculator;