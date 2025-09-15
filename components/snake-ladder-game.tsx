"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Volume2, VolumeX, Play, Users } from "lucide-react"

// Game configuration
const BOARD_SIZE = 10
const TOTAL_SQUARES = 100

// Predefined snakes and ladders with detailed descriptions
const SNAKES = {
  16: 6, // Head at 16, tail at 6
  47: 26, // Head at 47, tail at 26
  49: 11, // Head at 49, tail at 11
  56: 53, // Head at 56, tail at 53
  62: 19, // Head at 62, tail at 19
  64: 60, // Head at 64, tail at 60
  87: 24, // Head at 87, tail at 24
  93: 73, // Head at 93, tail at 73
  95: 75, // Head at 95, tail at 75
  98: 78, // Head at 98, tail at 78
}

const LADDERS = {
  1: 38, // Bottom at 1, top at 38
  4: 14, // Bottom at 4, top at 14
  9: 21, // Bottom at 9, top at 21
  21: 42, // Bottom at 21, top at 42
  28: 84, // Bottom at 28, top at 84
  36: 44, // Bottom at 36, top at 44
  51: 67, // Bottom at 51, top at 67
  71: 91, // Bottom at 71, top at 91
  80: 100, // Bottom at 80, top at 100
}

interface Player {
  id: number
  name: string
  position: number
  color: string
  icon: string
}

export function SnakeLadderGame() {
  const [gameStarted, setGameStarted] = useState(false)
  const [playerNames, setPlayerNames] = useState(["", ""])
  const [players, setPlayers] = useState<Player[]>([])
  const [currentPlayer, setCurrentPlayer] = useState(0)
  const [diceValue, setDiceValue] = useState(1)
  const [isRolling, setIsRolling] = useState(false)
  const [gameWinner, setGameWinner] = useState<Player | null>(null)
  const [lastMove, setLastMove] = useState<string>("")
  const [animatingSquare, setAnimatingSquare] = useState<number | null>(null)
  const [movingPlayer, setMovingPlayer] = useState<number | null>(null)
  const [isMusicOn, setIsMusicOn] = useState(true)
  const audioContextRef = useRef<AudioContext | null>(null)

  const startGame = () => {
    if (playerNames[0].trim() && playerNames[1].trim()) {
      setPlayers([
        { id: 1, name: playerNames[0].trim(), position: 0, color: "bg-blue-500", icon: "🔵" },
        { id: 2, name: playerNames[1].trim(), position: 0, color: "bg-red-500", icon: "🔴" },
      ])
      setGameStarted(true)
    }
  }

  const initAudioContext = useCallback(() => {
    if (typeof window !== "undefined" && !audioContextRef.current) {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
        if (AudioContextClass) {
          audioContextRef.current = new AudioContextClass()
        }
      } catch (error) {
        console.log("[v0] Audio context not supported:", error)
      }
    }
  }, [])

  useEffect(() => {
    initAudioContext()
  }, [initAudioContext])

  const playTone = useCallback(
    (type: "snake" | "ladder" | "move") => {
      if (!isMusicOn || !audioContextRef.current) return

      try {
        const ctx = audioContextRef.current

        if (ctx.state === "suspended") {
          ctx.resume()
        }

        const oscillator = ctx.createOscillator()
        const gainNode = ctx.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(ctx.destination)

        if (type === "snake") {
          // Descending tone for snake
          oscillator.frequency.setValueAtTime(400, ctx.currentTime)
          oscillator.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.5)
          gainNode.gain.setValueAtTime(0.3, ctx.currentTime)
          gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5)
          oscillator.start(ctx.currentTime)
          oscillator.stop(ctx.currentTime + 0.5)
        } else if (type === "ladder") {
          // Ascending tone for ladder
          oscillator.frequency.setValueAtTime(200, ctx.currentTime)
          oscillator.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.6)
          gainNode.gain.setValueAtTime(0.3, ctx.currentTime)
          gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6)
          oscillator.start(ctx.currentTime)
          oscillator.stop(ctx.currentTime + 0.6)
        } else {
          // Simple beep for regular move
          oscillator.frequency.setValueAtTime(300, ctx.currentTime)
          gainNode.gain.setValueAtTime(0.2, ctx.currentTime)
          gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2)
          oscillator.start(ctx.currentTime)
          oscillator.stop(ctx.currentTime + 0.2)
        }
      } catch (error) {
        console.log("[v0] Audio playback error:", error)
      }
    },
    [isMusicOn],
  )

  const rollDice = useCallback(() => {
    if (isRolling || gameWinner) return

    initAudioContext()

    setIsRolling(true)
    setLastMove("")

    let rollCount = 0
    const rollInterval = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * 6) + 1)
      rollCount++
      if (rollCount >= 8) {
        clearInterval(rollInterval)

        const finalDiceValue = Math.floor(Math.random() * 6) + 1
        setDiceValue(finalDiceValue)

        const player = players[currentPlayer]
        let newPosition = player.position + finalDiceValue
        setMovingPlayer(player.id)

        // Check if player reaches or exceeds 100
        if (newPosition >= TOTAL_SQUARES) {
          newPosition = TOTAL_SQUARES
          setGameWinner(player)
          setLastMove(`${player.name} wins the game! 🎉`)
        } else {
          // Animate movement step by step
          let currentPos = player.position
          const moveInterval = setInterval(() => {
            currentPos++
            setPlayers((prev) => prev.map((p) => (p.id === player.id ? { ...p, position: currentPos } : p)))

            if (currentPos >= newPosition) {
              clearInterval(moveInterval)
              setMovingPlayer(null)
              playTone("move")

              // Check for snakes and ladders after movement animation
              setTimeout(() => {
                if (SNAKES[newPosition as keyof typeof SNAKES]) {
                  const snakeEnd = SNAKES[newPosition as keyof typeof SNAKES]
                  setLastMove(`${player.name} got bitten by a snake! Slid from ${newPosition} to ${snakeEnd} 🐍`)
                  setAnimatingSquare(newPosition)
                  playTone("snake")

                  setTimeout(() => {
                    setPlayers((prev) => prev.map((p) => (p.id === player.id ? { ...p, position: snakeEnd } : p)))
                    setAnimatingSquare(null)
                  }, 600)
                } else if (LADDERS[newPosition as keyof typeof LADDERS]) {
                  const ladderEnd = LADDERS[newPosition as keyof typeof LADDERS]
                  setLastMove(`${player.name} climbed a ladder! Rose from ${newPosition} to ${ladderEnd} 🪜`)
                  setAnimatingSquare(newPosition)
                  playTone("ladder")

                  setTimeout(() => {
                    setPlayers((prev) => prev.map((p) => (p.id === player.id ? { ...p, position: ladderEnd } : p)))
                    setAnimatingSquare(null)
                  }, 600)
                } else {
                  setLastMove(`${player.name} rolled ${finalDiceValue} and moved to square ${newPosition}`)
                }
              }, 300)
            }
          }, 150)
        }

        // Switch to next player
        if (!gameWinner) {
          setTimeout(() => {
            setCurrentPlayer((prev) => (prev + 1) % players.length)
          }, 1000)
        }

        setIsRolling(false)
      }
    }, 100)
  }, [currentPlayer, players, isRolling, gameWinner, playTone, initAudioContext])

  const resetGame = () => {
    setPlayers((prev) => prev.map((p) => ({ ...p, position: 0 })))
    setCurrentPlayer(0)
    setDiceValue(1)
    setGameWinner(null)
    setLastMove("")
    setAnimatingSquare(null)
    setMovingPlayer(null)
  }

  const backToSetup = () => {
    setGameStarted(false)
    setPlayers([])
    setPlayerNames(["", ""])
    resetGame()
  }

  const getSnakeLadderInfo = (squareNumber: number) => {
    const snakeEnd = SNAKES[squareNumber as keyof typeof SNAKES]
    const ladderEnd = LADDERS[squareNumber as keyof typeof LADDERS]

    if (snakeEnd) {
      return { type: "snake", start: squareNumber, end: snakeEnd, symbol: "🐍" }
    }
    if (ladderEnd) {
      return { type: "ladder", start: squareNumber, end: ladderEnd, symbol: "🪜" }
    }
    return null
  }

  const getSquareContent = (squareNumber: number) => {
    const playersOnSquare = players.filter((p) => p.position === squareNumber)
    const snakeLadderInfo = getSnakeLadderInfo(squareNumber)

    return (
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Square number */}
        <span className="absolute top-0.5 left-0.5 text-[10px] font-bold text-muted-foreground bg-background/80 px-1 rounded">
          {squareNumber}
        </span>

        {/* Snake or Ladder with visual path */}
        {snakeLadderInfo && (
          <div className="flex flex-col items-center relative">
            {/* Visual path indicator */}
            <div
              className={`absolute inset-0 ${
                snakeLadderInfo.type === "snake"
                  ? "bg-gradient-to-b from-red-200 to-red-400"
                  : "bg-gradient-to-t from-green-200 to-green-400"
              } opacity-30 rounded`}
            />

            <div
              className={`text-xl z-10 ${
                animatingSquare === squareNumber
                  ? snakeLadderInfo.type === "snake"
                    ? "animate-snake-bite"
                    : "animate-ladder-climb"
                  : ""
              }`}
            >
              {snakeLadderInfo.symbol}
            </div>
            <div className="text-[10px] text-muted-foreground font-bold z-10 bg-background/80 px-1 rounded">
              {snakeLadderInfo.type === "snake" ? `↓${snakeLadderInfo.end}` : `↑${snakeLadderInfo.end}`}
            </div>
          </div>
        )}

        {/* Enhanced Players with bigger, more creative pieces */}
        {playersOnSquare.length > 0 && (
          <div className="absolute bottom-0.5 right-0.5 flex gap-0.5">
            {playersOnSquare.map((player) => (
              <div
                key={player.id}
                className={`relative ${movingPlayer === player.id ? "animate-bounce" : ""}`}
                title={player.name}
              >
                <div
                  className={`w-6 h-6 rounded-full ${player.color} border-2 border-white shadow-lg flex items-center justify-center text-xs`}
                >
                  {player.icon}
                </div>
                {movingPlayer === player.id && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-ping" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  const renderBoard = () => {
    const squares = []

    for (let row = BOARD_SIZE - 1; row >= 0; row--) {
      const rowSquares = []
      const isEvenRow = row % 2 === 0

      for (let col = 0; col < BOARD_SIZE; col++) {
        const squareNumber = row * BOARD_SIZE + (isEvenRow ? col + 1 : BOARD_SIZE - col)
        const snakeLadderInfo = getSnakeLadderInfo(squareNumber)

        rowSquares.push(
          <div
            key={squareNumber}
            className={`
              aspect-square border-2 border-slate-300 hover:bg-muted/50 transition-all duration-200
              ${squareNumber === 100 ? "bg-gradient-to-br from-yellow-200 to-yellow-400 border-yellow-500 shadow-lg" : ""}
              ${squareNumber === 1 ? "bg-gradient-to-br from-blue-200 to-blue-400 border-blue-500 shadow-lg" : ""}
              ${snakeLadderInfo?.type === "snake" ? "bg-gradient-to-br from-red-100 to-red-200 border-red-300" : ""}
              ${snakeLadderInfo?.type === "ladder" ? "bg-gradient-to-br from-green-100 to-green-200 border-green-300" : ""}
              ${!snakeLadderInfo && squareNumber !== 1 && squareNumber !== 100 ? "bg-gradient-to-br from-slate-50 to-slate-100" : ""}
            `}
            title={
              snakeLadderInfo
                ? `${snakeLadderInfo.type === "snake" ? "Snake" : "Ladder"}: ${snakeLadderInfo.start} → ${snakeLadderInfo.end}`
                : `Square ${squareNumber}`
            }
          >
            {getSquareContent(squareNumber)}
          </div>,
        )
      }

      squares.push(
        <div key={row} className="grid grid-cols-10 gap-1">
          {rowSquares}
        </div>,
      )
    }

    return squares
  }

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-purple-600 flex items-center justify-center gap-2">
              <Users className="w-8 h-8" />
              Snake & Ladder
            </CardTitle>
            <p className="text-muted-foreground">Enter player names to start the game</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-blue-600 flex items-center gap-2">🔵 Player 1 Name</label>
                <Input
                  value={playerNames[0]}
                  onChange={(e) => setPlayerNames([e.target.value, playerNames[1]])}
                  placeholder="Enter first player name"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-red-600 flex items-center gap-2">🔴 Player 2 Name</label>
                <Input
                  value={playerNames[1]}
                  onChange={(e) => setPlayerNames([playerNames[0], e.target.value])}
                  placeholder="Enter second player name"
                  className="mt-1"
                />
              </div>
            </div>
            <Button
              onClick={startGame}
              disabled={!playerNames[0].trim() || !playerNames[1].trim()}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
              size="lg"
            >
              <Play className="w-4 h-4 mr-2" />
              Start Game
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-4">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            🎲 Snake & Ladder
          </h1>
          <p className="text-muted-foreground">Classic board game with modern design</p>
        </div>

        {/* Game Status */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Game Status</span>
              <div className="flex gap-2">
                <Button
                  onClick={() => setIsMusicOn(!isMusicOn)}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  {isMusicOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  {isMusicOn ? "Music On" : "Music Off"}
                </Button>
                <Button onClick={resetGame} variant="outline" size="sm">
                  Reset Game
                </Button>
                <Button onClick={backToSetup} variant="outline" size="sm">
                  New Players
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Current Player */}
            {!gameWinner && (
              <div className="flex items-center gap-2">
                <span className="font-medium">Current Turn:</span>
                <Badge variant="secondary" className={`${players[currentPlayer].color} text-white text-lg px-3 py-1`}>
                  {players[currentPlayer].icon} {players[currentPlayer].name}
                </Badge>
              </div>
            )}

            {/* Winner */}
            {gameWinner && (
              <div className="text-center p-4 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg border-2 border-yellow-400">
                <h2 className="text-2xl font-bold text-orange-600 mb-2">🎉 {gameWinner.name} Wins! 🎉</h2>
                <p className="text-muted-foreground">Congratulations on reaching square 100!</p>
              </div>
            )}

            {/* Last Move */}
            {lastMove && (
              <div className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800 font-medium">{lastMove}</p>
              </div>
            )}

            {/* Player Positions */}
            <div className="grid grid-cols-2 gap-4">
              {players.map((player) => (
                <div
                  key={player.id}
                  className="flex items-center gap-2 p-2 bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg"
                >
                  <div
                    className={`w-6 h-6 rounded-full ${player.color} flex items-center justify-center text-sm border-2 border-white shadow`}
                  >
                    {player.icon}
                  </div>
                  <span className="font-medium">{player.name}:</span>
                  <Badge variant="outline" className="bg-white">
                    Square {player.position}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl">
          <CardContent className="p-6">
            <div className="bg-gradient-to-br from-amber-50 to-orange-100 p-4 rounded-lg border-2 border-amber-200">
              <div className="space-y-1 max-w-3xl mx-auto">{renderBoard()}</div>
            </div>
          </CardContent>
        </Card>

        {/* Dice and Controls */}
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-4">
              {/* Enhanced Dice */}
              <div className="text-center space-y-2">
                <div
                  className={`
                    w-24 h-24 bg-gradient-to-br from-white to-gray-100 border-4 border-purple-400 rounded-xl 
                    flex items-center justify-center text-5xl font-bold text-purple-600 shadow-xl
                    ${isRolling ? "animate-spin" : "hover:scale-105 transition-transform"}
                  `}
                >
                  {diceValue}
                </div>
                <p className="text-sm text-muted-foreground font-medium">Dice Value</p>
              </div>

              {/* Roll Button */}
              <Button
                onClick={rollDice}
                disabled={isRolling || !!gameWinner}
                size="lg"
                className="px-8 py-3 text-lg font-semibold bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-lg"
              >
                {isRolling ? "Rolling..." : "🎲 Roll Dice"}
              </Button>

              {/* Game Rules */}
              <div className="text-center text-sm text-muted-foreground max-w-md space-y-1">
                <p className="font-medium">🐍 Snakes will slide you down • 🪜 Ladders will lift you up</p>
                <p>First player to reach square 100 wins!</p>
                <p className="text-xs">🔊 Music plays different tones for snakes vs ladders</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
