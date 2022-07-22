import { Button, IButtonProps, Text, useTheme} from 'native-base';

type FilterProps = IButtonProps & {
  title: string
  isActive?: boolean
  type: 'open' | 'closed'
}

export function Filter( { title, type, isActive = false, ...rest } : FilterProps) {

  const {colors} = useTheme()

  const colorType = type === 'open' ? colors.secondary[700] : colors.green[300]
  return (
    <Button 
      variant={'outline'} 
      borderWidth={isActive ? 1 : 0 } 
      borderColor={colorType}
      bg={'gray.600'}
      flex={1}
      size={'sm'}
      {...rest}
    >
      <Text 
        textTransform={'uppercase'}
        fontSize={'xs'}
        color={isActive ? colorType : 'gray.300'}>{title}</Text>
    </Button>
  );
}