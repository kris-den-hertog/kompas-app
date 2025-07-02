import Image from "next/image"
import FoldMenu from "./menu"
import Today from "./today";

interface navItems {
    parkId: string;
}

export default function Nav({parkId}: navItems) {
    return(  <div className="w-full items-center flex flex-col sticky top-5 z-40">
    <nav className="w-full grid grid-cols-3 items-center">
                <div className="pl-4">
                    <a href="./" className="text-main-500 bg-main-300 px-4 py-2 rounded-lg">Terug</a>
                </div>

                <div className="flex justify-center">
                    <Image
                        src="/logo.svg"
                        width={100}
                        height={100}
                        alt="Logo"
                        priority
                    />
                </div>

                <div className="flex justify-end pr-4">
                    <FoldMenu parkId={parkId} />
                </div>
            </nav>
            <Today parkId={parkId} />

            </div>)
}