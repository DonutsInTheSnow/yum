import Image from 'next/image';

export default function About() {
  return (
    <>
      <div className="pt-14 md:p-8 pb-28 mx-auto bg-[#9B6027] flex flex-col min-h-full">
        <div className="w-full h-auto pt-14 md:p-8 mx-auto text-white bg-[#184790]">
          <h1 className="text-[38px] md:text-[48px] lg:text-[64px] md:mt-14 font-itim mb-3">Yum Since Day One</h1>
          <section className="mx-auto grid grid-cols-1 md:grid-cols-2 md:gap-0 pb-12 items-center">
            <div className="w-full flex justify-center items-center mb-3 md:mb-0">
              <Image
                src="/images/yum-about.webp"
                alt="Yum about"
                width={700}
                height={467}
                sizes="(min-width: 1024px) 700px, (min-width: 768px) 500px, 100vw"
                className="w-full max-w-[700px] h-auto object-cover rounded-md"
              />
            </div>
            <div className="w-full md:ml-auto">
              <p className="p-4 text-[19px] font-medium text-left md:text-right">
                Since 1948, Grandma Lotte Kelly&apos;s little bakery in Wolfeboro has been a quiet powerhouse—scratch-made, no shortcuts. The aroma of her legendary frosted and sugar-sanded gingerbread cookies still charges the air every morning. The ovens are a constant roar, pumping out specialty donuts, fresh-baked bread, pies, and custom cakes with relentless precision. Stop by at dawn for coffee paired with panoramic lake views, or swing back at dusk for ice cream on the patio, where the day winds down in golden light.
              </p>
            </div>
          </section>
        </div>

        <div className="w-full h-auto pt-14 md:p-8 mx-auto bg-white">
          <h2 className="text-[38px] md:text-[48px] lg:text-[58px] text-[#9B6027] font-itim">A New England Treatery</h2>
          <section className="mx-auto grid grid-cols-1 md:grid-cols-2 md:gap-10 text-white pb-12 items-center">
            <div className="w-full md:ml-auto">
              <p className="p-4 text-[#1d293b] text-[19px] font-medium text-left md:text-right">
                Those gingerbread cookies? They&apos;re the stuff of local legend—the kind that put this place on the map. But that&apos;s just the opening act. Inside, the ovens crank out everything from donuts to puff pastries, decorated cakes to turnovers, a full arsenal for every sweet tooth on the prowl. And the ice cream parlor? It&apos;s a magnet, pulling in boaters and strollers alike, turning ordinary summer days into something electric.</p>
            </div>
            <div className="w-full flex justify-center items-center mb-3 md:mb-0">
              <Image
                src="/images/treatery.webp"
                alt="Yum about"
                width={700}
                height={467}
                sizes="(min-width: 1024px) 700px, (min-width: 768px) 500px, 100vw"
                className="w-full max-w-[700px] h-auto object-cover rounded-md"
              />
            </div>
          </section>
        </div>

        <div className="w-full h-auto pt-14 md:p-8 mx-auto bg-[#9B6027] text-white">
          <h2 className="text-[38px] md:text-[48px] lg:text-[52px] font-itim pb-7">For Your Custom Needs</h2>
          <section className="mx-auto grid grid-cols-1 md:grid-cols-2 md:gap-10 pb-12 items-center">
            <div className="w-full flex justify-center items-center mb-3 md:mb-0">
              <Image
                src="/images/custom-needs.webp"
                alt="Yum about"
                width={700}
                height={467}
                sizes="(min-width: 1024px) 700px, (min-width: 768px) 500px, 100vw"
                className="w-full max-w-[700px] h-auto object-cover rounded-md"
              />
            </div>
            <div className="w-full md:ml-auto">
              <p className="p-4 text-[19px] font-medium text-left md:text-right">
                Looking for something custom? You&apos;ve come to the right place. Pre-orders for cakes, breads, and giant donut and cookie runs aren&apos;t just business—they&apos;re a challenge met with artistry. The bakers and decorator wizards leap into action, turning your ideas into edible masterpieces. This is where craft meets showmanship, every order a fresh performance.
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
