import { BinanceCreateOrderResponse, BinanceOrderQueryResponse } from '../../types'
import { getApi, postApi } from './tools'

export const binanceApi = {
  createOrder: (terminalType: string, momentId: string, quantity: string): Promise<BinanceCreateOrderResponse> =>
    postApi('/binance/order', { terminalType, momentId, quantity }),
  closeOrder: (prepayId: string): Promise<any> => postApi('/binance/order/close', { prepayId }),
  getOrderStatus: (prepayId: string): Promise<BinanceOrderQueryResponse> => getApi(`/binance/order/status/${prepayId}`),
}
