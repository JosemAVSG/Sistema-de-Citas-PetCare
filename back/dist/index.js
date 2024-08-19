"use strict";
const suma = (a, b) => {
    let sum = Number(a) + b;
    return sum;
};
console.log(suma("1", 2));
const Doctor = {
    nombre: "Jose",
    apellido: "Avila",
    edad: 25,
    carrera: {
        matricula: 123456,
        nombre: "Doctor",
        especialidad: "Cirujano",
        facultad: "Medicina",
        promedio: 4.5
    }
};
const ingeniero = {
    nombre: "Andres",
    apellido: "Hernandez",
    edad: 25,
    carrera: {
        matricula: 123456,
        nombre: "Ingeniero",
        especialidad: "Ingeniero",
        facultad: "Medicina",
        promedio: 4.5
    }
};
const programador = {
    nombre: "Andres",
    apellido: "Hernandez",
    edad: 25,
    carrera: {
        matricula: 123456,
        nombre: "Programador",
        especialidad: "Programador",
        facultad: "Medicina",
        promedio: 4.5
    }
};
const universidad = {
    nombre: "Henry Bootcamp",
    egresados: [programador, ingeniero, Doctor]
};
