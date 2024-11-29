import { useEffect, useState } from 'react'
import { updateAlert } from 'services/alert'
import { AlertEntity } from 'common/alert'
import { useAlertListener } from 'hooks/useAlertListener'
import { Power } from 'lucide-react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const [alertState, setAlertState] = useState<AlertEntity | null>()
  const [timer, setTimer] = useState(0)
  const [distance, setDistance] = useState(0)
  const [blink, setBlink] = useState(false)

  const isSystemActive = alertState?.int === 1 && alertState?.alertstate === 1

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

  useEffect(() => {
    if (alertState?.distance) {
      setDistance(alertState.distance)
    }
  }, [alertState?.distance])

  const handleClick = async () => {
    if (!alertState) {
      console.error('Alert not found')
      return
    }
    await updateAlert('test', { int: alertState.int ? 0 : 1 })
    const message = alertState.int ? 'Sistema desativado' : 'Sistema ativado'
    toast(message, { type: 'info' })
  }

  const handleChangeDistance = async (distance: number) => {
    await updateAlert('test', { distance })
    toast('Distância alterada com sucesso!', { type: 'success' })
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
    <div>
      <ToastContainer />
      <div className="relative grid h-screen grid-cols-11 gap-4">
        <div className="col-span-3 flex flex-col gap-4 bg-slate-300 px-6 py-4 shadow-xl">
          <div>
            <h1 className="text-3xl font-bold">
              Sistema de segurança <br /> de piscina
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <p className="text-lg">
              O sistema está{' '}
              <span className="text-xl font-bold">
                {alertState?.int === 1 ? 'ativado' : 'desativado'}
              </span>
            </p>
            <div
              className="size-7 rounded-full shadow-green-500"
              style={{
                backgroundColor: alertState?.int === 1 ? 'green' : 'red'
              }}
            ></div>
          </div>

          <button
            onClick={handleClick}
            className="my-14 flex size-40 items-center justify-center self-center rounded-full border border-zinc-700 bg-[#ECEBDE] p-2 shadow-custom-inset transition-all hover:bg-[#ECEBDE]/70 active:bg-[#C1BAA1]/70"
          >
            <Power size={28} />
          </button>

          <div className="flex flex-col gap-1">
            <label className="font-medium">Distância do sensor</label>
            <div className="flex items-center gap-1">
              <input
                type="number"
                value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
                className="w-36 rounded border border-black bg-gray-200 px-3 py-1"
              />
              <p>cm</p>
              <button
                onClick={() => handleChangeDistance(distance)}
                className="ml-4 flex items-center justify-center self-center rounded-xl border border-zinc-700 bg-[#ECEBDE] p-2 shadow-custom-inset transition-all hover:bg-[#ECEBDE]/70 active:bg-[#C1BAA1]/70"
              >
                Alterar
              </button>
            </div>
          </div>
        </div>

        <div className="col-span-7 flex items-center justify-center">
          {isSystemActive && (
            <div className="flex flex-col items-center gap-6">
              <div
                className="flex h-64 w-[500px] items-center justify-center rounded"
                style={{
                  backgroundColor: blink ? 'red' : 'black',
                  color: blink ? 'black' : 'white'
                }}
              >
                <h1 className="text-3xl font-bold">MENINO(A) CAIU</h1>
              </div>

              <p className="text-xl font-semibold">
                O MENINO(A) caiu faz {timer} segundos
              </p>
            </div>
          )}

          {!isSystemActive && (
            <div className="flex flex-col items-center gap-6">
              <p className="text-xl">Tudo tranquilo...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
