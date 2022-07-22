import { Button as NBButton, IButtonProps, Heading } from 'native-base';

type ButtonProps = IButtonProps & {
 title: string
}

export function Button( {title, ...rest}:ButtonProps) {
  return (
    <NBButton
      bg={'green.700'}
      h={14}
      fontSize={'sm'}
      rounded={'sm'}
      _pressed={{
        bg: 'green.500'
      }}
    {...rest}>
      <Heading color={'white'} fontSize={'sm'}>{title}</Heading>
    </NBButton>
  );
}