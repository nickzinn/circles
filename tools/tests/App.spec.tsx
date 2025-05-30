import { describe, expect, test } from 'vitest'
import { render } from 'vitest-browser-react'
import App from '../src/App.tsx'
import { page, userEvent } from '@vitest/browser/context'


describe('Routing tests', () => {
  test('check home route test', async () => {
    const screen = render(<App />)

    await expect.element(screen.getByText('Play Asteroids')).toBeInTheDocument();
    

  });

  test('about route test', async () => {
    render(<App />)
    await expect.element(page.getByText('Play Asteroids')).toBeInTheDocument();

    await userEvent.click(page.getByText(/about/i), {
      timeout: 1_000,
    });

    
    //await expect.element(page.getByText(/Circles/i)).toBeInTheDocument();
    //await screen.getByText(/close/i).click();
    // await expect.element(screen.getByText('Play Asteroids')).toBeInTheDocument();

  });
  // test('Play asteroids route test', async () => {
  //   const screen = render(<App />)
  //   await expect.element(screen.getByText('Play Asteroids')).toBeInTheDocument();

  //   await userEvent.click(screen.getByText(/play asteroids/i), {
  //     timeout: 1_000,
  //   });

    
  //   //await expect.element(screen.getByText(/Circles/i)).toBeInTheDocument();
    
  // })


});
