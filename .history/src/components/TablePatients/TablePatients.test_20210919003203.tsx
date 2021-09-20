import { render, screen } from '@testing-library/react'
import {TablePatients} from './TablePatients'

describe('TablePatients Components', () => {
  test('Se a Table está sendo renderizada', () => {
    const {} = render(<TablePatients />)
  })
})