import { randomUUID } from "crypto"

export class DatabaseMemory{
#reparos = new Map()

list(search){
    return Array.from(this.#reparos.entries()).map((reparosArray) =>{
    // acessando primeira posição
        const id = reparosArray[0]
        const data = reparosArray[1]

        return{
            id,
            ...data
        }
    })
    .filter(reparo => {
        if (search){
            return reparo.titulo.includes(search)
        }
        return true
    })
}
create(reparo){
    const reparoId = randomUUID()
    this.#reparos.set(reparoId, reparo)
}
update(id, reparo){
    this.#reparos.set(id, reparo)
}
delete(id, reparo){
    this.#reparos.delete(id, reparo)
}
}