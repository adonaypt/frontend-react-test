export interface Product {
  id: string
  brand: string
  model: string
  price: number
  imgUrl: string
}

export interface ProductDetail extends Omit<Product, 'price'> {
  price: string
  networkTechnology: string
  networkSpeed: string
  gprs: string
  edge: string
  announced: string
  status: string
  dimentions: string
  weight: string
  sim: string
  displayType: string
  displayResolution: string
  displaySize: string
  os: string
  cpu: string
  chipset: string
  gpu: string
  externalMemory: string
  internalMemory: string[]
  ram: string
  primaryCamera: string[] | string
  secondaryCmera: string[] | string
  speaker: string
  audioJack: string
  wlan: string[] | string
  bluetooth: string[] | string
  gps: string
  nfc: string
  radio: string
  usb: string
  sensors: string[] | string
  battery: string
  colors: string[]
  options: {
    colors: { code: number; name: string }[]
    storages: { code: number; name: string }[]
  }
}
