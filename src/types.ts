export type Rating = {
  rate: number
  count: number
}

export type Product = {
  id: number
  title: string
  price: number
  description: string
  category: string
  rating: Rating
  image: string
}