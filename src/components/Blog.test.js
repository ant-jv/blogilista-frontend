import React, { useTransition } from "react"
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {

    test('Renders only blog title and author by default', () => {

        const blog = {
            author: 'Test-author',
            id: '123456',
            likes: 11,
            title: 'Test-title',
            url: 'test-url',
            user: {
                id: '9876',
                name: 'Test User',
                username: 'testuser',
            }
        }

        render(<Blog blog={blog}></Blog>)

        const blogElement = screen.getByText('Test-title Test-author')
        expect(blogElement).toBeDefined()
        const additionalInfo = screen.getByTestId('additional-info')
        expect(additionalInfo).toHaveStyle("display: none")
    })

    test('Likes and url show if show-button clicked.', async () => {      
        
        const blog = {
            author: 'Test-author',
            id: '123456',
            likes: 11,
            title: 'Test-title',
            url: 'test-url',
            user: {
                id: '9876',
                name: 'Test User',
                username: 'testuser',
            }
        }

        render(<Blog blog={blog}></Blog>)

        const user = userEvent.setup()
        const showButton = screen.getByText('Show')
        await user.click(showButton)

        const additionalInfo = screen.getByTestId('additional-info')
        expect(additionalInfo).not.toHaveStyle("display: none")
    })

    test('If like button is clicked twice the handler is called twice', async () => {

        const blog = {
            author: 'Test-author',
            id: '123456',
            likes: 11,
            title: 'Test-title',
            url: 'test-url',
            user: {
                id: '9876',
                name: 'Test User',
                username: 'testuser',
            }
        }

        const mockHandler = jest.fn()

        render(<Blog blog={blog} like={mockHandler}></Blog>)
        
        const user = userEvent.setup()
        const showButton = screen.getByText('Show')
        await user.click(showButton)
        const likeButton = screen.getByText('Like')
        await user.click(likeButton)
        await user.click(likeButton)

        expect(mockHandler.mock.calls).toHaveLength(2)
    })

})