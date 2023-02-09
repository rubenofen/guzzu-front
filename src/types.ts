export type SVGProps = {
  size?: number
  fill?: string
  className?: string
  style?: React.CSSProperties
}

export enum Devices {
  mobileS = '(max-width:320px)',
  mobileM = '(max-width:375px)',
  mobileL = '(max-width:425px)',
  tablet = '(max-width:768px)',
  laptop = '(max-width:1024px)',
  laptopL = '(max-width:1440px)',
  desktop = '(max-width:2560px)'
}

/* Context */
export interface Action<T> {
  type: string
  payload: T
}

export type BinanceCreateOrderResponse = {
  code: string
  data: {
    checkoutUrl: string
    deeplink: string
    expireTime: number
    prepayId: string
    qrContent: string
    qrcodeLink: string
    terminalType: string
    universalUrl: string
  }
  result: string
  status: string
}

export type BinanceOrderQueryResponse = {
  code: string
  data: {
    merchantId: string
    prepayId: string
    status: string
  }
  errorMessage: string
  status: string
}
