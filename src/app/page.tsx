'use client'

import { Button, Container, Group, Stack, Text } from '@mantine/core'
import { useCounter, useInterval } from '@mantine/hooks'
import { useEffect, useMemo, useState } from 'react'

const WEIGHT_COSTS: { [key: number]: number } = {
  2: 25,
  4: 50,
  8: 100,
  16: 200,
  32: 400,
  64: 800,
  128: 1600,
  256: 3200,
  512: 6400,
  1024: 12800,
}

const HP_BY_LEVELS: { [key: number]: number } = {
  1: 8,
  2: 16,
  3: 32,
  4: 64,
  5: 128,
  6: 256,
  7: 512,
  8: 1024,
  9: 2048,
  10: 4096,
  11: 8192,
  12: 16384,
}

type TItem = { id: number; name: string; cost: number; extra_weight: number }

const ITEMS: Array<TItem> = [
  {
    id: 1,
    name: 'Copper mine',
    cost: 1024,
    extra_weight: 8,
  },
  {
    id: 2,
    name: 'Iron mine',
    cost: 2048,
    extra_weight: 32,
  },
  {
    id: 3,
    name: 'Silver mine',
    cost: 4096,
    extra_weight: 128,
  },
  {
    id: 4,
    name: 'Gold mine',
    cost: 8192,
    extra_weight: 512,
  },
  {
    id: 5,
    name: 'Platinum mine',
    cost: 16384,
    extra_weight: 2048,
  },
]

export default function Home() {
  const [level, setLevel] = useCounter(1, { min: 1, max: 12 })
  const [golds, setGolds] = useState<number>(30)
  const [weight, setWeight] = useState<number>(1)
  const [extraWeight, setExtraWeight] = useState<number>(0)
  const [goldRequired, setGoldRequired] = useState<number>(WEIGHT_COSTS[2])
  const [items, setItems] = useState<Array<TItem>>([])

  const canUpgrade = useMemo(() => {
    return golds >= goldRequired
  }, [goldRequired, golds])

  const interval = useInterval(() => {
    setGolds(golds + 1 * weight + extraWeight)
  }, 1000)

  useEffect(() => {
    interval.start()
    return interval.stop
  }, [])

  const handleUpgradeWeight = () => {
    const cost = weight + weight
    const weightCost = typeof WEIGHT_COSTS[cost] === 'undefined' ? null : WEIGHT_COSTS[cost]
    if (!weightCost || golds < weightCost) {
      return
    }
    setGolds(golds - weightCost)
    setWeight(cost)
    setGoldRequired(WEIGHT_COSTS[cost + cost])
    setLevel.increment()
  }

  const handleBuyItem = (item: TItem) => {
    if (item.cost > golds) return
    setGolds(golds - item.cost)
    setExtraWeight(extraWeight + item.extra_weight)
    setItems([...items, item])
  }

  return (
    <Container fluid>
      <Group>
        <Text>Golds: {golds}</Text>
        <Text>Weight: {weight + extraWeight}</Text>
        <Text>Level: {level}</Text>
        <Text>HP: {HP_BY_LEVELS[level]}</Text>
      </Group>

      <Button color="orange" disabled={!canUpgrade} onClick={() => handleUpgradeWeight()}>
        Use {goldRequired} golds
      </Button>

      <Text fw={600}>Tools:</Text>
      <Group>
        {ITEMS.map((item) => (
          <Button key={`tool-${item.id}`} disabled={golds < item.cost} onClick={() => handleBuyItem(item)}>
            Buy {item.name} (+ {item.extra_weight} golds/s) - Price: {item.cost}
          </Button>
        ))}
      </Group>

      <Stack>
        {items &&
          items.length > 0 &&
          items.map((item, index: number) => (
            <Text key={`owned-tool-${item.id}-${index}`}>
              {item.name} + {item.extra_weight} golds
            </Text>
          ))}
      </Stack>
    </Container>
  )
}
