import Image from 'next/image';
import star from '../assets/not-found.png';

export default function NotFound() {
  return (
    <div className="w-[90vw] h-[80vh] flex justify-center items-center gap-12">
      <Image src={star} width={200} height={200} alt="Death star" />
      <p className="text-yellow text-2xl">
        <span className="line-through">Planet</span> Page not found
      </p>
    </div>
  );
}
