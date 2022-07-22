import { Box, Circle, HStack, IPressableProps, Pressable, Text, useTheme, VStack } from 'native-base';
import { CircleWavyCheck, ClockAfternoon, Hourglass } from 'phosphor-react-native';

export type OrderProps = {
  id: string
  patrimony: string
  when: string
  status: 'open' | 'closed'
}

type Props = IPressableProps &{
  data: OrderProps
}

export function Order({ data, ...rest }: Props) {

  const {colors} = useTheme()
  const statusType = data.status === 'open' ? colors.secondary[700] : colors.green[300]
  return (
    <Pressable {...rest}>
     <HStack
      bg={'gray.600'}
      rounded={'sm'}
      overflow={'hidden'}
      alignItems={'center'}
      justifyContent={'space-between'}
      mb={4}
    >
      <Box 
        h={'full'}
        w={2}
        bg={statusType}
      />

      <VStack flex={1} ml={5} my={5}>
        <Text color={'white'} fontSize={'md'}>Patrimonio  {data.patrimony}</Text>
        <HStack alignItems={'center'}>
          <ClockAfternoon color={colors.gray[300]} size={16}  />
          <Text color={'gray.200'} fontSize={'xs'} ml={1}>{data.when}</Text>
        </HStack>
      </VStack>

      <Circle bg={'gray.500'} mr={5} w={12} h={12}>
        {data.status === 'closed' ? <CircleWavyCheck size={24} color={statusType} /> : <Hourglass  size={24} color={statusType}/>}
      </Circle>
    
     </HStack>
    </Pressable>
  );
}