import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'

export type OrderFirestoreDTO = {
  patrimony: string
  description: string
  status: 'closed' | 'open'
  solution?: string
  created_at: FirebaseFirestoreTypes.Timestamp
  closed_at?: FirebaseFirestoreTypes.Timestamp
}