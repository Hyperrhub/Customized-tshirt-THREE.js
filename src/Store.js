import { proxy } from "valtio";

const state = proxy({
    intro : true,
    colors:['#ccc', '#EFBD4E' ,'#80C670' ,'#726DE8' , '#353934', 'purple', 'red'],
    decals: ['react', 'three2', 'pmndrs'],
    selectedColor :'#EFBD4E',
    selectedDecal: 'react'
})

export {state}