import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import AddBlogForm from './AddBlogForm'
import userEvent from '@testing-library/user-event'

test('Correct information is send to the callback function', async () => {
  const user = userEvent.setup()
  const saveBlog = jest.fn()

  render(<AddBlogForm saveBlog={saveBlog} />)

  const inputs = screen.getAllByRole('textbox')
  const addBlogButton = screen.getByText('add blog')

  await user.type(inputs[0], 'Test-title')
  await user.type(inputs[1], 'Test-author')
  await user.type(inputs[2], 'test-url')

  await user.click(addBlogButton)

  expect(saveBlog.mock.calls).toHaveLength(1)
  expect(saveBlog.mock.calls[0][0].title).toBe('Test-title')
  expect(saveBlog.mock.calls[0][0].author).toBe('Test-author')
  expect(saveBlog.mock.calls[0][0].url).toBe('test-url')
})
