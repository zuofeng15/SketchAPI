/* globals expect, test */

import { Gradient, GradientType } from '../Gradient'

test('should create a default gradient', () => {
  const gradient = Gradient.from({})
  expect(String(gradient._object.class())).toBe('MSGradient')
  expect(gradient.toJSON()).toEqual({
    gradientType: 'Linear',
    from: { x: 0.5, y: 0 },
    to: { x: 0.5, y: 1 },
    stops: [],
  })
})

test('should create a gradient with a specific type', () => {
  const gradient = Gradient.from({ gradientType: GradientType.Angular })
  expect(gradient.toJSON()).toEqual({
    gradientType: 'Angular',
    from: { x: 0.5, y: 0 },
    to: { x: 0.5, y: 1 },
    stops: [],
  })
})

test('should create a gradient with a specific from and to coordinates', () => {
  const gradient = Gradient.from({
    from: {
      x: 1,
      y: 0.5,
    },
    to: {
      x: 2,
      y: 5,
    },
  })
  expect(gradient.toJSON()).toEqual({
    gradientType: 'Linear',
    from: { x: 1, y: 0.5 },
    to: { x: 2, y: 5 },
    stops: [],
  })
})

test('should change the from', () => {
  const gradient = Gradient.from({})
  expect(gradient.toJSON()).toEqual({
    gradientType: 'Linear',
    from: { x: 0.5, y: 0 },
    to: { x: 0.5, y: 1 },
    stops: [],
  })
  gradient.from.x = 0.7
  expect(gradient.toJSON()).toEqual({
    gradientType: 'Linear',
    from: { x: 0.7, y: 0 },
    to: { x: 0.5, y: 1 },
    stops: [],
  })

  gradient.from.y = 0.1
  expect(gradient.toJSON()).toEqual({
    gradientType: 'Linear',
    from: { x: 0.7, y: 0.1 },
    to: { x: 0.5, y: 1 },
    stops: [],
  })

  gradient.from = {
    x: 0.1,
    y: 0.4,
  }
  expect(gradient.toJSON()).toEqual({
    gradientType: 'Linear',
    from: { x: 0.1, y: 0.4 },
    to: { x: 0.5, y: 1 },
    stops: [],
  })
})

test('should change the to', () => {
  const gradient = Gradient.from({})
  expect(gradient.toJSON()).toEqual({
    gradientType: 'Linear',
    from: { x: 0.5, y: 0 },
    to: { x: 0.5, y: 1 },
    stops: [],
  })
  gradient.to.x = 0.7
  expect(gradient.toJSON()).toEqual({
    gradientType: 'Linear',
    from: { x: 0.5, y: 0 },
    to: { x: 0.7, y: 1 },
    stops: [],
  })

  gradient.to.y = 0.1
  expect(gradient.toJSON()).toEqual({
    gradientType: 'Linear',
    from: { x: 0.5, y: 0 },
    to: { x: 0.7, y: 0.1 },
    stops: [],
  })

  gradient.to = {
    x: 0.1,
    y: 0.4,
  }
  expect(gradient.toJSON()).toEqual({
    gradientType: 'Linear',
    from: { x: 0.5, y: 0 },
    to: { x: 0.1, y: 0.4 },
    stops: [],
  })
})
