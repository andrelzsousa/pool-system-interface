import { getDatabase, ref, onValue } from 'firebase/database'
import firebaseApp from '../config/firebase'
import { useEffect } from 'react'
import { AlertEntity } from 'common/alert'

const database = getDatabase(firebaseApp)

export const useAlertListener = (
  alertId: string,
  onChange: (alertData: AlertEntity | { error: string }) => void
) => {
  useEffect(() => {
    const collectRef = ref(database, alertId)

    const unsubscribe = onValue(collectRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        onChange({ id: alertId, ...data })
      } else {
        onChange({ error: 'Collect not found' })
      }
    })

    return () => {
      unsubscribe()
    }
  }, [alertId, onChange])
}
