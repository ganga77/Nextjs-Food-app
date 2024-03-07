import Header from "../components/layout/Header";
import Hero from "../components/layout/Hero";
import HomeMenu from "../components/layout/HomeMenu";
import SectionHeaders from "../components/layout/SectionHeaders";
export default function Home() {
  return (
    <>
    
    <Hero />
    <HomeMenu />
    <section className="text-center my-16">
      <SectionHeaders mainHeader={"Our Story"} subHeader={"About Us"}/>
      <p className="max-w-2xl mx-auto mt-4 text-gray-500">Lorem Ipsum</p>
    </section>
      </>
  );
}
