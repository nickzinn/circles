import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'
import App from '../src/App.tsx'

test('renders name', async () => {
  const { getByText } = render(<App />)

  await expect.element(getByText('Material UI Vite example')).toBeInTheDocument()

})