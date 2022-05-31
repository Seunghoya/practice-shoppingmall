import { atom, selectorFamily, useRecoilValue } from "recoil";

const cartState = atom<Map<string, number>>({
  key: "cartstate",
  default: new Map()
})

export const cartItemSelector = selectorFamily<number | undefined, string>({
  key: 'cartItem',
  get: 
    (id:string) => ({ get }) => {
    const carts = get(cartState)
    return carts.get(id)
    },
  set:
    (id:string) =>
    ({ get, set }, newValue) => {
      if(typeof newValue === "number") {
        const newCart = new Map([...get(cartState)])
          .set(id, newValue)
        console.log(newCart)
        set(cartState, newCart)
      }
    }
})