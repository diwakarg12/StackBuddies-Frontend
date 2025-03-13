import { Facebook, Instagram, Layers, Youtube } from "lucide-react"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="flex flex-col gap-y-4 sm:flex-row sm:gap-y-0 bg-black text-neutral-content items-center justify-between p-4">
        <aside className="flex gap-x-3 grid-flow-col items-center">
            <Link to={'/'} className="pl-2 text-2xl flex items-center">
          <Layers size={30} strokeWidth={'2.5px'} className="text-[#ff4081] transform -rotate-12" />
        </Link>
            <p className="font-medium">Copyright © {new Date().getFullYear()} - All right reserved</p>
        </aside>
        <nav className=" flex grid-flow-col gap-4">
            <a href="" target="_blank" className="hover:text-blue-600">
              <Facebook size={27} strokeWidth={'2px'} />
            </a>
            <a href="" target="_blank" className="hover:text-pink-500" >
              <Instagram size={27} strokeWidth={'2px'} />
            </a>
            <a href="" target="_blank" className="hover:text-red-700">
              <Youtube size={30} strokeWidth={'2px'} />
            </a>
        </nav>
    </footer>
  )
}

export default Footer