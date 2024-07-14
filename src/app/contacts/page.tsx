import Image from 'next/image';
import { developer } from '@/constants/developer';

export default function Contants() {
  return (
    <main>
      <section className="flex justify-center items-center flex-col h-[80vh]">
        <h2 className="text-primary text-2xl font-bold mb-24">
          Test assignment was developed by Artem Zakharchuk
        </h2>
        {developer.map((contact) => (
          <div className="flex justify-between w-44" key={contact.id}>
            <a
              className="text-primary text-2xl font-bold mb-24 hover:text-yellow"
              href={contact.link}
              target="_blank"
            >
              {contact.name}
            </a>
            
            <a className='contents' href={contact.link} target="_blank">
              <Image
                src={contact.icon}
                width={30}
                height={30}
                className={`h-7 w-7 cursor-pointer hover:scale-[110%]`}
                alt={`${contact.name} icon`}
              />
            </a>
          </div>
        ))}
      </section>
    </main>
  );
}
