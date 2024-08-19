/* eslint-disable react/prop-types */


const Card = ({img, title, description}) => {
  return (
    <>
        <div className="flex flex-col w-full rounded overflow-hidden shadow-lg bg-white">
          <figure className="w-full">
            <img className="w-full h-64 object-cover"  src={img} alt="Sunset in the mountains" />
          </figure>
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{title}</div>
            <p className="text-gray-700 text-base font-bold">
              {description}
            </p>
          </div>
       
        </div>
    </>
  )
}

export default Card
