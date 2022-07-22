import { VStack, HStack, useTheme, Text, Box } from 'native-base';
import { IconProps } from 'phosphor-react-native';


type CardDetailsProps = {
  title: string
  description?: string
  footer?: string
  icon: React.ElementType<IconProps>
  children?: React.ReactNode
}

const  CardDetails = ({
  icon: Icon,
  title,
  children,
  description,
  footer = null
}: CardDetailsProps) =>{

  const { colors } = useTheme()
  return (
    <VStack bg={'gray.600'} p={5} mt={5} rounded={'sm'}>
      <HStack alignItems={'center'} mb={4}>
        <Icon color={colors.primary[700]} />
        <Text ml={2} color={'gray.300'} fontSize={'sm'} textTransform={'uppercase'}>
          {title}
        </Text>
      </HStack>

      {
        !!description && 
        <Text fontSize={'md'} color={'gray.100'}>
          {description}
        </Text>
      }

      { children }

      {
        !!footer &&
        <Box borderTopWidth={1} borderTopColor={'gray.400'} mt={3} >
          <Text mt={3} color={'gray.300'} fontSize={'sm'}>
            {footer}
          </Text>
        </Box>
      }

    </VStack>
  );
}

export { CardDetails }