
import { VStack , KeyboardAvoidingView} from 'native-base';
import { useState } from 'react';
import { Alert, TouchableWithoutFeedback, Keyboard  } from 'react-native';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { Input } from '../components/Input';

import Firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native';


export function Register() {
  const { goBack } = useNavigation()

  const [isLoading, setIsLoading] = useState(false)
  const [patrimony, setPatrimony] = useState("")
  const [description, setDescription] = useState("")

  const handleNewOrder =  async () => {
    if(!patrimony || !description){
      return (
        Alert.alert('Nova solicitação', 'Preencha todos campos')
      )
    }

    setIsLoading(true)

    Firestore()
      .collection('orders')
      .add({
        patrimony,
        description,
        status: 'open',
        created_at: Firestore.FieldValue.serverTimestamp() 
      })
      .then(() => {
        Alert.alert('Solicitação', 'Solicitação registrada com sucesso')
        goBack()
      })
      .catch(e  => {
        setIsLoading(false)
        return (
          Alert.alert('Erro', 'Erro ao enviar solicitação')
        )
      })

  }
 
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>   
      <KeyboardAvoidingView style={{ flex: 1}}>
        <VStack flex={1} p={6} bg={'gray.600'}>

          <Header title='Solicitação' />

          <Input 
            mt={3}
            placeholder={'Numero do patrimonio'}
            onChangeText={ t => setPatrimony(t)}
          />

          <Input 
            flex={1}
            mt={5}
            textAlignVertical={'top'}
            placeholder={'Descrição do problema'}
            multiline
            onChangeText={t => setDescription(t)}
          />

          <Button 
            title={'Cadastrar'} mt={5}
            onPress={handleNewOrder}
            isLoading={isLoading}
          />

        </VStack>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}