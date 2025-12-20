'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

const CELL_SIZE = 20;
const GRID_WIDTH = 20;
const GRID_HEIGHT = 20;
const INITIAL_SPEED = 150;

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Point = { x: number; y: number };

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState<Point[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Point>({ x: 15, y: 10 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const directionRef = useRef<Direction>('RIGHT');

  const generateFood = useCallback((currentSnake: Point[]): Point => {
    let newFood: Point;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_WIDTH),
        y: Math.floor(Math.random() * GRID_HEIGHT),
      };
    } while (currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, []);

  const resetGame = useCallback(() => {
    const initialSnake = [{ x: 10, y: 10 }];
    setSnake(initialSnake);
    setFood(generateFood(initialSnake));
    setDirection('RIGHT');
    directionRef.current = 'RIGHT';
    setGameOver(false);
    setScore(0);
    setIsPlaying(true);
  }, [generateFood]);

  const checkCollision = useCallback((head: Point, snakeBody: Point[]): boolean => {
    // Проверка столкновения со стеной
    if (head.x < 0 || head.x >= GRID_WIDTH || head.y < 0 || head.y >= GRID_HEIGHT) {
      return true;
    }
    // Проверка столкновения с собой
    return snakeBody.some(segment => segment.x === head.x && segment.y === head.y);
  }, []);

  // Обработка нажатий клавиш
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }

      if (e.key === ' ' && !isPlaying) {
        resetGame();
        return;
      }

      const currentDir = directionRef.current;

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (currentDir !== 'DOWN') {
            setDirection('UP');
            directionRef.current = 'UP';
          }
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          if (currentDir !== 'UP') {
            setDirection('DOWN');
            directionRef.current = 'DOWN';
          }
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (currentDir !== 'RIGHT') {
            setDirection('LEFT');
            directionRef.current = 'LEFT';
          }
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (currentDir !== 'LEFT') {
            setDirection('RIGHT');
            directionRef.current = 'RIGHT';
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, resetGame]);

  // Игровой цикл
  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const gameLoop = setInterval(() => {
      setSnake(currentSnake => {
        const head = { ...currentSnake[0] };
        const currentDirection = directionRef.current;

        switch (currentDirection) {
          case 'UP':
            head.y -= 1;
            break;
          case 'DOWN':
            head.y += 1;
            break;
          case 'LEFT':
            head.x -= 1;
            break;
          case 'RIGHT':
            head.x += 1;
            break;
        }

        if (checkCollision(head, currentSnake)) {
          setGameOver(true);
          setIsPlaying(false);
          return currentSnake;
        }

        const newSnake = [head, ...currentSnake];

        // Проверка съедания еды
        if (head.x === food.x && head.y === food.y) {
          setScore(s => s + 10);
          setFood(generateFood(newSnake));
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, INITIAL_SPEED);

    return () => clearInterval(gameLoop);
  }, [isPlaying, gameOver, food, checkCollision, generateFood]);

  // Отрисовка
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Очистка
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Рисуем сетку
    ctx.strokeStyle = '#16213e';
    for (let i = 0; i <= GRID_WIDTH; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL_SIZE, 0);
      ctx.lineTo(i * CELL_SIZE, GRID_HEIGHT * CELL_SIZE);
      ctx.stroke();
    }
    for (let i = 0; i <= GRID_HEIGHT; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * CELL_SIZE);
      ctx.lineTo(GRID_WIDTH * CELL_SIZE, i * CELL_SIZE);
      ctx.stroke();
    }

    // Рисуем еду
    ctx.fillStyle = '#e94560';
    ctx.beginPath();
    ctx.arc(
      food.x * CELL_SIZE + CELL_SIZE / 2,
      food.y * CELL_SIZE + CELL_SIZE / 2,
      CELL_SIZE / 2 - 2,
      0,
      Math.PI * 2
    );
    ctx.fill();

    // Рисуем змейку
    snake.forEach((segment, index) => {
      const gradient = ctx.createRadialGradient(
        segment.x * CELL_SIZE + CELL_SIZE / 2,
        segment.y * CELL_SIZE + CELL_SIZE / 2,
        0,
        segment.x * CELL_SIZE + CELL_SIZE / 2,
        segment.y * CELL_SIZE + CELL_SIZE / 2,
        CELL_SIZE / 2
      );

      if (index === 0) {
        gradient.addColorStop(0, '#4ade80');
        gradient.addColorStop(1, '#22c55e');
      } else {
        gradient.addColorStop(0, '#22c55e');
        gradient.addColorStop(1, '#16a34a');
      }

      ctx.fillStyle = gradient;
      ctx.fillRect(
        segment.x * CELL_SIZE + 1,
        segment.y * CELL_SIZE + 1,
        CELL_SIZE - 2,
        CELL_SIZE - 2
      );

      // Глаза для головы
      if (index === 0) {
        ctx.fillStyle = 'white';
        const eyeSize = 4;
        const eyeOffset = 5;

        let eye1X = segment.x * CELL_SIZE + CELL_SIZE / 2 - eyeOffset;
        let eye1Y = segment.y * CELL_SIZE + CELL_SIZE / 2 - eyeOffset;
        let eye2X = segment.x * CELL_SIZE + CELL_SIZE / 2 + eyeOffset;
        let eye2Y = segment.y * CELL_SIZE + CELL_SIZE / 2 - eyeOffset;

        if (directionRef.current === 'DOWN') {
          eye1Y = segment.y * CELL_SIZE + CELL_SIZE / 2 + eyeOffset;
          eye2Y = segment.y * CELL_SIZE + CELL_SIZE / 2 + eyeOffset;
        } else if (directionRef.current === 'LEFT') {
          eye1X = segment.x * CELL_SIZE + CELL_SIZE / 2 - eyeOffset;
          eye2X = segment.x * CELL_SIZE + CELL_SIZE / 2 - eyeOffset;
          eye1Y = segment.y * CELL_SIZE + CELL_SIZE / 2 - eyeOffset;
          eye2Y = segment.y * CELL_SIZE + CELL_SIZE / 2 + eyeOffset;
        } else if (directionRef.current === 'RIGHT') {
          eye1X = segment.x * CELL_SIZE + CELL_SIZE / 2 + eyeOffset;
          eye2X = segment.x * CELL_SIZE + CELL_SIZE / 2 + eyeOffset;
          eye1Y = segment.y * CELL_SIZE + CELL_SIZE / 2 - eyeOffset;
          eye2Y = segment.y * CELL_SIZE + CELL_SIZE / 2 + eyeOffset;
        }

        ctx.beginPath();
        ctx.arc(eye1X, eye1Y, eyeSize, 0, Math.PI * 2);
        ctx.arc(eye2X, eye2Y, eyeSize, 0, Math.PI * 2);
        ctx.fill();
      }
    });
  }, [snake, food]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-white mb-4">🐍 Змейка</h1>

      <div className="mb-4 text-xl text-white">
        Счёт: <span className="text-green-400 font-bold">{score}</span>
      </div>

      <div className="relative">
        <canvas
          ref={canvasRef}
          width={GRID_WIDTH * CELL_SIZE}
          height={GRID_HEIGHT * CELL_SIZE}
          className="border-4 border-green-500 rounded-lg shadow-2xl"
        />

        {!isPlaying && (
          <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center rounded-lg">
            {gameOver ? (
              <>
                <p className="text-red-500 text-3xl font-bold mb-2">Игра окончена!</p>
                <p className="text-white text-xl mb-4">Ваш счёт: {score}</p>
              </>
            ) : (
              <p className="text-white text-2xl mb-4">Добро пожаловать!</p>
            )}
            <button
              onClick={resetGame}
              className="px-6 py-3 bg-green-500 text-white text-xl font-bold rounded-lg hover:bg-green-600 transition-colors"
            >
              {gameOver ? 'Играть снова' : 'Начать игру'}
            </button>
            <p className="text-gray-400 mt-4 text-sm">Или нажмите Пробел</p>
          </div>
        )}
      </div>

      <div className="mt-6 text-gray-400 text-center">
        <p className="mb-2">Управление:</p>
        <p>↑ ↓ ← → или W A S D</p>
      </div>
    </div>
  );
}
