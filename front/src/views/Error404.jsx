import { Link } from "react-router-dom";
const Error404 = () => {
  return (
   <>
   <div className="flex justify-center align-middle bg-gradient-to-b from-rose-300 to-rose-500 ">
      <main className="grid min-h-screen place-items-center w-full  justify-center bg-gray px-6 py-24 sm:py-32 lg:px-8">
    <div className="text-center">
      <p className=" font-semibold text-black text-5xl">404</p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-withe-200 sm:text-5xl">Page not found</h1>
      <p className="mt-6 text-base leading-7 text-withe-200">Sorry, we couldn’t find the page you’re looking for.</p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Link
          to="/"
          className="rounded-md  bg-rose-300 px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-rose-600 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Go back home
        </Link>
        <a href="#" className="text-sm font-semibold text-withe-200">
          Contact support <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </div>
  </main>
    </div>
   </>
  )
}

export default Error404
