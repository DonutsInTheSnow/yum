import Link from 'next/link';

export default function Home() {
  return (
      <div className="relative z-10 flex flex-col items-center justify-start h-full text-white px-4 pt-52 md:pt-48 lg:pt-36">
        <h1
          className="text-[48px] md:text-[100px] font-itim text-center"
          style={{ textShadow: '0 4px 4px #000000' }}
        >
          Yum Shop
        </h1>
        <h2
          className="text-[32px] md:text-[58px] font-kaushan text-center"
          style={{
            WebkitTextStroke: '1px #000000',
            WebkitTextFillColor: '#fb8005'
          }}
        >
          A New England Treatery
        </h2>
        <Link href="/orderForm">
          <button className="bg-[#fb8005] text-black px-6 py-3 rounded hover:bg-black focus:bg-black hover:text-[#fb8005] focus:text-[#fb8005] text-2xl mt-10 cursor-pointer" style={{ boxShadow: '0 0 5px rgba(0,0,0,.75)' }}>
            Order for Pick-up
          </button>
        </Link>
      </div>
  );
}
