import Link from "next/link";

export default function Home() {
  return (<div className="w-[100vw] h-[100vh] bg-main-100 flex items-center justify-center flex-col">
    <h1 className="text-2xl mb-10">Homepage under construction</h1>
   <Link href={"./efteling"}><button className="text-xl bg-copper py-2 px-5 rounded-[4px] text-white">Start API</button></Link>
  </div>);
}
