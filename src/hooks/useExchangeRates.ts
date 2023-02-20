import { useEffect, useState } from 'react'

export const exchangeRatesUrl = 'https://api.coinbase.com/v2/exchange-rates?currency=EUR'

export const useExchangeRates = (): { eurUsdcRate: number; eurUsdtRate: number } => {
  const [eurUsdcRate, setEurUsdcRate] = useState<number>(0)
  const [eurUsdtRate, setEurUsdtRate] = useState<number>(0)

  const getExchangeRateInfo = () => {
    fetch(exchangeRatesUrl)
      .then((response) => response.json())
      .then((data) => {
        setEurUsdcRate(data.data.rates['USDC'])
        setEurUsdtRate(data.data.rates['USDT'])
      })
      .catch((e) => console.error('Error getting rates', e))
  }

  useEffect(() => {
    getExchangeRateInfo()
  }, [])

  return {
    eurUsdcRate,
    eurUsdtRate
  }
}
