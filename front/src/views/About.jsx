import hero from "../assets/mujer-tiro-completo-perro-estudio.webp";

const About = () => {
  return (
    <>
      <section className="bg-rose-300 py-20 container-fluid">
        <div className="max-w-screen-xl  px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl  tracking-tight text-center mb-10 sm:text-4xl">
              Acerca de Petcare
            </h2>
            <div className="flex flex-row gap-10 ">
              <div className="self-center">
              <p className="mt-2 max-w-2xl text-lg self-start text-black ">
                Petcare es una aplicación que te permite reservar turnos de
                manera fácil y rápida para cuidar a tu mascota. Estás en el
                lugar correcto para programar tus turnos de manera online y
                asegurarte de que tu mascota reciba atención de la mejor
                calidad.
              </p>
              <p className=" mt-2 max-w-2xl text-lg  text-black">
                Asimimo a la mejor experiencia para las mascotas en el mercado
                de turnos. Estamos comprometidos a ofrecerte la mejor
                experiencia en cuidado de mascotas, asegurándote de que tus
                amigos de cuatro patas reciban la atención que merecen. Nuestra
                plataforma se desenvuelve en un entorno seguro y amigable, donde
                podrás reservar turnos de manera fácil y acceder a servicios de
                alta calidad. Acompaña a tu mascota en su camino hacia una salud
                óptima y disfruta de un servicio de alta calidad.
              </p>

              </div>
              <img
                className="rounded-3xl shadow-2xl rotate-6 "
                src={hero}
                alt="hero"
                width={"50%"}
                height={"50%"}
              />
            </div>
            <h3 className="mt-8 text-2xl font-semibold">Misión</h3>
            <p className="mt-2 text-lg text-black">
              Nuestra misión es brindar a los amantes de las mascotas una
              plataforma en la que puedan reservar turnos de manera fácil y
              rápida, asegurándose de que su mascota reciba la mejor atención
              posible.{" "}
            </p>

            <h3 className="mt-8 text-2xl font-semibold">Visión</h3>
            <p className="mt-2 text-lg text-black">
              Nuestra visión es convertirnos en la plataforma líder en el
              mercado de turnos para mascotas, logrando posicionarnos como la
              opción de elección para los dueños de mascotas que buscan
              brindarles la mejor atención a sus animales de compañía.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
