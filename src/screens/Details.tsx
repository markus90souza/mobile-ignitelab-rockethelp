import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { VStack , Text, HStack, useTheme, ScrollView, Box} from 'native-base';



import Firestore from '@react-native-firebase/firestore'
import { OrderFirestoreDTO } from '../DTOS/OrderFirestoreDTO';
import { dateFormat } from '../utils/FirebaseDateFormat';

import { CircleWavyCheck, DesktopTower, Hourglass , Clipboard, ClipboardText} from 'phosphor-react-native';

import { Button, Input, Loading, CardDetails, Header,
  OrderProps  } from '../components/index';



type OrderParams = {
  orderId: string
}

type OrderDetailsProps = OrderProps & {
  description: string
  solution: string;
  closed: string
}

const  Details = () => {
  const { params } = useRoute()
  const { orderId } = params as OrderParams
  const [isLoading, setIsLoading] = useState(true)
  const [solution, setSolution] = useState('')
  const [order, setOrder] = useState<OrderDetailsProps>({} as OrderDetailsProps)

  const { goBack } = useNavigation()

  const handleOrderClose = () => {

    if(!solution){
      return Alert.alert('Erro', 'Campo solução vazio')
    }

    Firestore()
      .collection<OrderFirestoreDTO>('orders')
      .doc(orderId)
      .update({
        status: 'closed',
        solution,
        closed_at : Firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        goBack()
      })
      .catch((e) => {
        console.log(e)
      })
  }

  useEffect(() => {
    Firestore()
      .collection<OrderFirestoreDTO>('orders')
      .doc(orderId)
      .get()
      .then(doc => {
        const { created_at, description, patrimony, status, closed_at, solution } = doc.data()
        const closed = closed_at ? dateFormat(closed_at) : null

        setOrder({
          id: doc.id,
          patrimony,
          description,
          status,
          solution,
          when: dateFormat(created_at),
          closed
        })

        setIsLoading(false)
      })

  }, [])

  if(isLoading ){
    return <Loading />
  }
  const { colors } = useTheme()
  return (
    

    <VStack flex={1} bg={'gray.700'} >
      <Box bg={'gray.600'} px={6}>
        <Header title={'Solicitação'} />
      </Box>

    <HStack bg={'gray.500'} justifyContent={'center'} py={4}>
      {
        order.status === 'closed' 
          ? 
        <CircleWavyCheck  size={22} color={colors.green[300]} />
          :
        <Hourglass size={22} color={colors.secondary[700]} /> 
      }
      <Text fontSize={'sm'} textTransform={'uppercase'} ml={2} 
      color={order.status === 'closed' ? colors.green[300] : colors.secondary[700]}>
        {
          order.status === 'closed' ? 'Finalizado' : 'Em andamento'
        }
      </Text>

    </HStack>

    <ScrollView mx={5} showsVerticalScrollIndicator={false}>
        <CardDetails 
          title={'Equipamento'}
          icon={DesktopTower}
          description={`Patrimônio #${order.patrimony}`}
     
        />

        <CardDetails 
          title={'Descrição do problema'}
          icon={ClipboardText}
          description={order.description}
          footer={`Registrado em ${order.when}`}
        />

        <CardDetails 
          title={'Solução'}
          icon={CircleWavyCheck}
          description={order.solution}
          footer={order.closed && `Encerrado em ${order.closed}`}
        >
          {
            order.status === 'open' &&
            <Input 
            placeholder={'Descrição da solução'}
            onChangeText={setSolution}
            h={24}
            textAlignVertical={'top'}
            multiline
          />
          }
    
          </CardDetails>

      </ScrollView>
      {
        order.status === 'open' && 
        <Button 
          title='Encerrar solicitação'
          m={5}
          isLoading={isLoading}
          onPress={handleOrderClose}
          
        />
      }
    </VStack>
  );
}

export {
   Details
}