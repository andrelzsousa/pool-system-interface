import { useEffect, useState } from 'react'
import { updateAlert } from 'services/alert'
import { AlertEntity } from 'common/alert'
import { useAlertListener } from 'hooks/useAlertListener'
import { Power } from 'lucide-react'

function App() {
  const [alertState, setAlertState] = useState<AlertEntity | null>()
  const [timer, setTimer] = useState(0)
  const [distance, setDistance] = useState(0)
  const [blink, setBlink] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setBlink((prev) => !prev)
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    if (alertState?.alertstate === 1) {
      const interval = setInterval(() => {
        setTimer((prev) => prev + 1)
      }, 1000)

      return () => {
        clearInterval(interval)
      }
    }
  }, [alertState?.alertstate])

  useEffect(() => {
    if (alertState?.alertstate === 0) {
      setTimer(0)
    }
  }, [alertState?.alertstate])

  const handleClick = async () => {
    if (!alertState) {
      console.error('Alert not found')
      return
    }
    await updateAlert('test', { int: alertState.int ? 0 : 1 })
  }

  const handleChangeDistance = async (distance: number) => {
    await updateAlert('test', { distance })
  }

  useAlertListener('test', (alertData) => {
    if ('error' in alertData) {
      console.error(alertData.error)
      return
    }
    setAlertState(alertData)
  })

  if (!alertState)
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Carregando...</p>
      </div>
    )

  return (
    <div className="relative flex h-screen flex-col items-center justify-center gap-4">
      {alertState?.alertstate === 1 && (
        <div
          className="absolute top-10 flex h-64 w-1/2 items-center justify-center"
          style={{
            backgroundColor: blink ? 'red' : 'black',
            color: blink ? 'black' : 'white'
          }}
        >
          <h1 className="text-3xl font-bold">MENINO(A) CAIU</h1>
        </div>
      )}

      <p>O MENINO(A) caiu faz {timer} segundos</p>

      <div className="flex flex-col items-center gap-4">
        <div
          className="size-10 rounded-full shadow-yellow-500/50"
          style={{
            backgroundColor: alertState?.int === 1 ? 'green' : 'red'
          }}
        ></div>
        <p>{alertState?.int === 1 ? 'Ativado' : 'Desativado'}</p>
      </div>
      <button
        onClick={handleClick}
        className="flex w-20 items-center justify-center rounded border border-black bg-gray-200 p-2"
      >
        <Power />
      </button>

      <div className="flex items-center gap-4">
        <p>{alertState.distance} cm</p>
        <input
          type="number"
          value={distance}
          onChange={(e) => setDistance(Number(e.target.value))}
          className="rounded border border-black bg-gray-200 p-1"
        />
        <button onClick={() => handleChangeDistance(distance)}>Alterar</button>
      </div>
    </div>
  )
}

export default App
