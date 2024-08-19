import Card from "./ui/Card"
import pet from '../assets/pets.jpg'
import petcard from '../assets/petdocard.jpg'
import cat from '../assets/cat.jpg'
import rabbit from '../assets/rabbit.jpg'
import style from '../styles/cardssection.module.scss'

const CardsSection = () => {
  return (
    <>
    <section className="bg-rose-300 py-10 container-fluid  ">
      <div className={style.cards}>
    <Card 
      img={pet}
      title="Mascotas"
      description={'La vida de las mascotas es increible, perros, gatos, conejo, pájaros, tortugas, incluso serpientes, todas ellas merecemos cuidado, amparo y alegria, en este sitio encontraras facilmente turnos para que tu mascota se sienta como una reina.'} 
    />
     <Card 
      img={petcard}
      title="Perros"
      description={'Perros son amigables y leales. Suelen ser muy cariñosos y jugarinos, son muy fáciles de cuidar y pueden ser muy divertidos de tener en casa.'}
    />
     <Card 
      img={ cat}
      title="Gatos"
      description={'Gatos son amigables y lindos, suelen ser muy juguetones, activos y tienen una personalidad única. Son muy fáciles de cuidar y pueden ser muy divertidos de tener en casa.'}
    />
     <Card 
      img={rabbit}
      title="Conejos"
      description={'Conejos son juguetones, activos y con una personalidad única. Son muy fáciles de cuidar y pueden ser muy divertidos de tener en casa.'}
    />
      </div>

    </section>
    </>
  )
}

export default CardsSection
