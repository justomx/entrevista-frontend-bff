import type { Request, Response } from 'express'

const orderComparator = (first: any, second: any): number => first.id - second.id
const dice = {
  sides: 10,
  roll: function () {
    return Math.floor(Math.random() * this.sides) + 1
  },
}
const isError = (): string | boolean => {
  if (dice.roll() === 1) return 'WAIT_TEN_SECONDS'
  else if (dice.roll() === 2) return '500'
  return false
}

const sleep = async (seconds: number): Promise<void> => {
  await new Promise((resolve) => {
    setTimeout(resolve, seconds)
  })
}

export async function getOrders(req: Request, res: Response): Promise<unknown> {
  const error = isError()
  if (error === 'WAIT_TEN_SECONDS') {
    await sleep(10_000)
  } else if (error === '500') {
    res.status(532).json({ error: 'Better luck next time!!' })
  }

  const sort = req.query?.sort?.toString()

  if (sort === 'ASC') {
    return res.json({ data: ordersMock.sort(orderComparator), sort, total: 210, difficulty: error })
  } else if (sort === 'DESC') {
    return res.json({
      data: ordersMock.sort(orderComparator).reverse(),
      sort,
      total: 210,
      difficulty: error,
    })
  }

  return res.json({ data: ordersMock, sort: 'NONE', total: 210, difficulty: error })
}

const ordersMock = [
  {
    id: 13076,
    date: '2024-01-17T19:32:22.027Z',
    zone: {
      name: 'Abarrotes',
      url: 'https://static.justo.mx/images/atlas/abarrotes_material.png',
      color: '#FF6D76',
    },
  },
  {
    id: 13078,
    date: '2024-01-17T21:32:22.027Z',
    zone: {
      name: 'Abarrotes',
      url: 'https://static.justo.mx/images/atlas/abarrotes_material.png',
      color: '#FF6D76',
    },
  },
  {
    id: 13077,
    date: '2024-01-17T20:32:22.027Z',
    zone: {
      name: 'Alto Valor',
      url: 'https://static.justo.mx/images/atlas/alto_valor_material.png',
      color: '#EA80FC',
    },
  },
  {
    id: 13079,
    date: '2024-01-10T21:32:22.027Z',
    zone: {
      name: 'Congelados',
      url: 'https://static.justo.mx/images/atlas/congelados_material.png',
      color: '#448AFF',
    },
  },
]
