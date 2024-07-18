import Image from 'next/image';
import maleIcon from '../../assets/img/icons/male.png';

export const Male = () => {
  return <Image src={maleIcon} width={20} height={20} alt="male" />;
};
