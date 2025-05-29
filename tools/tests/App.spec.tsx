import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'
import App from '../src/App.tsx'
import { page } from '@vitest/browser/context'



test('renders name', async () => {
  const screen = render(<App />)




  await expect.element(screen.getByText('Play Asteroids')).toBeInTheDocument();
  

})


