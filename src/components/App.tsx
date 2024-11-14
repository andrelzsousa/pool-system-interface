import { useEffect, useState } from 'react'
import { updateAlert } from 'services/alert'
import { AlertEntity } from 'common/alert'
import { useAlertListener } from 'hooks/useAlertListener'
import { Power } from 'lucide-react'

function App() {
  const [alertState, setAlertState] = useState<AlertEntity | null>()

  const [blink, setBlink] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setBlink((prev) => !prev)
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  const handleClick = async () => {
    if (!alertState) {
      console.error('Alert not found')
      return
    }
    await updateAlert('test', { int: alertState.int ? 0 : 1 })
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
          <h1 className="text-3xl font-bold">MENINO CAIU</h1>
        </div>
      )}

      <p>{alertState?.int === 1 ? 'Ativado' : 'Desativado'}</p>
      <button
        onClick={handleClick}
        className="flex w-20 items-center justify-center rounded border border-black bg-gray-200 p-2"
      >
        <Power />
      </button>
    </div>
  )
}

export default App
