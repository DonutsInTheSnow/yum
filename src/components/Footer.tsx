export default function Footer() {
  return (
    <footer className="bg-[#19478e] text-white text-center md:my-5 md:w-[225px] md:h-[110px] md:rounded-[10px] md:shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] md:mx-auto">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="font-semibold md:font-medium md:mx-auto pb-2">
          <p className="text-[27px] font-itim md:pt-1.5">Yum Shop</p>
          <p className="text-[13px] mt-[-5px]" style={{letterSpacing: '3px'}}>WOLFEBORO</p>
          <p className="hover:underline focus:underline">(603) 555-1234</p>
        </div>
      </div>
    </footer>
  );
}

