import Image from "next/image";

export default function AboutUs() {
  return (
    <div className="bg-gray-100 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10">About Us</h1>
        <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-16">
          <div className="max-w-lg">
            <Image src="/logo.png" alt="About Us" width={600} height={400} className="rounded-lg" />
          </div>
          <div className="max-w-lg">
            <h2 className="text-2xl font-semibold mb-4">Who We Are</h2>
            <p className="text-gray-700 mb-6">
              At Paji Car Wale, we are passionate about providing our customers with the finest selection of high-quality cars
              and exceptional service. With years of experience in the automotive industry, we have established ourselves
              as a trusted name in the market.
            </p>
            <p className="text-gray-700 mb-6">
              Our showroom showcases a diverse range of vehicles, from luxury sedans to rugged SUVs, catering to the
              preferences and needs of every driver. We take pride in offering meticulously inspected pre-owned cars and
              new models from top manufacturers.
            </p>
            <p className="text-gray-700 mb-6">
              At Paji Car Wale, customer satisfaction is our top priority. Our team of dedicated professionals is committed to
              providing personalized assistance, expert advice, and a seamless buying experience from start to finish.
            </p>
          </div>
        </div>
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
  <div className="max-w-xs flex flex-col items-center h-64"> {/* Added h-64 */}
    <Image src="/IMG_2265.png" alt="Image 1" width={300} height={200} className="rounded-full" />
    <h4>Full Stack Engineer</h4>
  </div>
  <div className="max-w-xs flex flex-col items-center h-64"> {/* Added h-64 */}
    <Image src="/bc_1.jpg" alt="Image 2" width={300} height={200} className="rounded-full" />
    <h4>Front End Engineer</h4>
  </div>
  <div className="max-w-xs flex flex-col items-center h-64"> {/* Added h-64 */}
    <Image src="/demopaji.jpeg" alt="Image 3" width={300} height={200} className="rounded-full" />
    <h4>Back End Engineer</h4>
  </div>
  <div className="max-w-xs flex flex-col items-center h-64"> {/* Added h-64 */}
    <Image src="/rohit1.png" alt="Image 4" width={300} height={200} className="rounded-full" />
    <h4>Heavy Duty</h4>
  </div>
</div>

      </div>
    </div>
  );
}
