import { useState, useRef } from "react"
import { Heading, Icon, useTheme, VStack ,AlertDialog , Button as NBButton, Center} from "native-base"
import { Envelope, Key } from "phosphor-react-native"
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import Logo from './../assets/logo_primary.svg'

import Auth from '@react-native-firebase/auth'
import { Alert, Keyboard, TouchableNativeFeedback } from "react-native"


const SignIn = () => {

  const { colors } = useTheme()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [isLoading, setIsloading] = useState(false)

  const handleSignIn = () => {
    if(!email || !password){
      return (
        Alert.alert('Entrar', 'Seu email ou senha estão incorretos ou em branco')
      )
    }

      setIsloading(true)

      Auth()
        .signInWithEmailAndPassword(email, password)
        .then( response => {
          console.log(response)
        })
        .catch( e => {
          console.log(e)
          setIsloading(false)
          if(e.code === 'auth/invalid-email'){
            return (
              Alert.alert('Entrar', 'Email Invalido')
            )
          }

          if(e.code === 'auth/wrong-password'){
            return (
              Alert.alert('Entrar', 'Senha Inválida')
            )
          }

          if(e.code === 'auth/user-not-found'){
            return (
              Alert.alert('Entrar', 'Usuario não encontrado ')
            )
          }
        })
      
     
    
  }

  return (

    <TouchableNativeFeedback onPress={Keyboard.dismiss}>


    <VStack flex={1} alignItems={'center'} bg={'gray.600'} px={8} pt={24}>

      <Logo />

      <Heading color={'gray.100'} fontSize={'xl'} mt={20} mb={6}>
        Acesse sua conta 
      </Heading>

      <Input 
        placeholder={'seu@email.com'}
        keyboardType={'email-address'}
        mb={4}
        InputLeftElement={
          <Icon 
            ml={4} 
            as={<Envelope color={colors.gray[300]} />} 
          />
        }
        onChangeText={ e => setEmail(e)}
      />
      <Input 
        placeholder={'Senha'} 
        mb={8}
        onChangeText={setPassword}
        secureTextEntry
        InputLeftElement={
          <Icon 
            ml={4} 
            as={<Key color={colors.gray[300]} />} 
          /> 
        }
      />

      <Button 
        title={'Entrar'}
        w={'full'}
        onPress={handleSignIn}
        isLoading={isLoading}
      />
    </VStack>
    </TouchableNativeFeedback>
  )
}

export { SignIn }