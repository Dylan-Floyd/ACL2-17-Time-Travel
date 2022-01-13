import { useState } from 'react'

export default function useTimeTravel(initalVal='2021-01-01') {
  const [history, setHistory] = useState([initalVal])
  const [index, setIndex] = useState(0)

  function save(val) {
    setHistory(prevHistory => {
      let newHistory = new Array(history.length + 1)
      for(let i = 0; i < prevHistory.length + 1; i++) {
        if(i < index + 1) {
          newHistory[i] = prevHistory[i]
        } else if (i === index + 1) {
          newHistory[i] = val
        } else {
          newHistory[i] = prevHistory[i-1]
        }
      }
      return newHistory
    })
    setIndex(prevIndex => prevIndex+1)
  }

  function undo() {
    setIndex(prevIndex => Math.max(0, prevIndex-1))
  }

  function redo() {
    setIndex(prevIndex => Math.min(history.length-1, prevIndex+1))
  }
  
  return {
    save,
    undo,
    redo,
    current: history[index]
  }
}
