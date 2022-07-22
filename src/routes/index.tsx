import { NavigationContainer } from "@react-navigation/native"
import Auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { SignIn } from "../screens/SignIn"
import { AppRoutes } from "./app.routes"
import { useState, useEffect } from "react"
import { Loading } from "../components/Loading"


const Routes = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<FirebaseAuthTypes.User>()

  useEffect(() => {
    
    const subscriber = Auth().onAuthStateChanged(response => {
      setUser(response)
    })
    
    setIsLoading(false)

    return subscriber
  }, [])

  if(isLoading){
    return <Loading />
  }

  return (
    <NavigationContainer>
      { user ? <AppRoutes /> : <SignIn /> }
    </NavigationContainer>
  )
}

export { Routes }