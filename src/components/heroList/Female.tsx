import Image from 'next/image';
import femaleIcon from '../../assets/img/icons/female.png';

export const Female = () => {
  return <Image src={femaleIcon} width={20} height={20} alt="female" />;
};
