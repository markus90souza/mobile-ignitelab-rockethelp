import { Heading, HStack, IconButton, Text, VStack, FlatList, Center, useTheme } from 'native-base';
import { ChatTeardropText, SignOut } from 'phosphor-react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Logo from './../assets/logo_secondary.svg'
import Auth from '@react-native-firebase/auth'
import Firestore from '@react-native-firebase/firestore'
import { Alert } from 'react-native';
import { dateFormat } from '../utils/FirebaseDateFormat';
import { Loading, Button, Filter,Order, OrderProps } from '../components/index';

export function Home() {
  const { navigate } = useNavigation()
  const { colors } = useTheme()
  const [statusSelected, setstatusSelected] = useState<'open' | 'closed'>('open')
  const [isLoading, setIsLoading] = useState(false)
  const [orders, setOrders] = useState<OrderProps[]>([])

  const handleNewOrder = () => {
    navigate('new')
  }

  const handleLogout = () => {
    Auth()
      .signOut()
      .catch( e => {
        return (
          Alert.alert('Sair', 'Não foi possivel sair')
        )
      })
  }

  const handleOpenOrderDetails = ( orderId: string ) => {
    navigate('details', {
      orderId
    })
  }

  useEffect(() => {
    setIsLoading(true)
    const subscriber =  Firestore()
      .collection('orders')
      // .where('status', '==', statusSelected)
      .onSnapshot( snapshot => {
        console.log(snapshot)
        const data = snapshot.docs.map(doc => {
          console.log(doc.data())
          const {patrimony, description, status, created_at} = doc.data()
          return {
            id: doc.id,
            patrimony,
            description,
            status,
            when: dateFormat(created_at)
          }
        })

        setOrders(data)
        setIsLoading(false)
      })

      return subscriber
  },[statusSelected])

  return (

    <VStack flex={1} pb={6} bg={'gray.700'}>
      <HStack
        w={'full'}
        alignItems={'center'}
        justifyContent={'space-between'}
        bg={'gray.600'}
        pt={12}
        pb={5}
        px={6}
      >
        <Logo />

        <IconButton 
          onPress={handleLogout}
          icon={<SignOut size={26} color={colors.gray['300']} />}
        />

      </HStack>

      <VStack flex={1} px={6}>
        <HStack
        w={'full'}
        alignItems={'center'}
        justifyContent={'space-between'}
        mt={8}
        mb={4}
      >
          <Heading color={'gray.100'}>Solicitações</Heading>
          <Text color={'gray.200'}>{orders.length}</Text>
        </HStack>

        <HStack space={3} mb={8}>
          
          <Filter 
            title={'Abertos'}
            type={'open'}
            onPress={() => setstatusSelected('open')}
            isActive={statusSelected === 'open'}
            
          />

          <Filter 
            title={'Fechados'}
            type={'closed'}
            onPress={() => setstatusSelected('closed')}
            isActive={statusSelected === 'closed'}
          />

        </HStack>     

        {
          isLoading 
          ? 
          <Loading /> 
          :
          <FlatList 
            data={orders}
            keyExtractor={order => order.id}
            renderItem={ ({ item }) => <Order data={item} onPress={() => handleOpenOrderDetails(item.id)}  />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 80
            }}
            ListEmptyComponent={() => (
              <Center>
                <ChatTeardropText  size={40} color={colors.gray[300]}/>
                <Text color={'gray.300'} fontSize={'xl'} mt={6} textAlign={'center'}>
                  você ainda não possui {'\n'}
                  solicitações {
                    statusSelected === 'open' ? 'em aberto' : 'finalizados'
                  }
                </Text>
              </Center>
            )}
          />
        }
  

        <Button 
          title={'Nova Solicitação'}
          onPress={handleNewOrder}
        />
      </VStack>

    
    </VStack>
  );
}