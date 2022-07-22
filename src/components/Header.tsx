import { Heading, HStack, IconButton, useTheme, StyledProps } from 'native-base';
import { CaretLeft } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';

type HeaderProps = StyledProps & {
  title: string
}

export function Header({ title, ...rest }: HeaderProps) {
  const { colors } = useTheme()
  const { goBack } = useNavigation()
  const handleGoBack = () => {
    goBack()
  }
  return (
    <HStack 
      w={'full'} alignItems={'center'} justifyContent={'space-between'} bg={'gray.600'} 
      pt={12} pb={6} {...rest}>
        <IconButton 
          icon={<CaretLeft size={24}  color={colors.gray[200]}/>}
          onPress={handleGoBack}
        />

        <Heading flex={1} color={'gray.100'} textAlign={'center'} fontSize={'lg'} ml={-6}>
          {title}
        </Heading>
    </HStack>
  );
}