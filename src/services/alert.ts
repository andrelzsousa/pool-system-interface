import { get, getDatabase, ref, update } from 'firebase/database'
import firebaseApp from '../config/firebase'
import { AlertEntity } from 'common/alert'

const database = getDatabase(firebaseApp)

export const getAlert = async (collectId: string) => {
  try {
    const collectRef = ref(database, collectId)
    const snapshot = await get(collectRef)

    if (snapshot.exists()) {
      return { id: collectId, ...snapshot.val() }
    } else {
      return { error: 'Collect not found' }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error)
    return { error: error.message }
  }
}

export const updateAlert = async (uid: string, data: Partial<AlertEntity>) => {
  try {
    const userRef = ref(database, uid)
    await update(userRef, data)
    return { error: null }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error)
    return { error: error.message }
  }
}
