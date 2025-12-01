import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TodoItem } from './TodoItem';  // adjust import as needed

jest.mock('./trash.png', () => 'trash.png');  // Mock the trash image if needed

describe('TodoItem', () => {
    const mockDeleteTodo = jest.fn();
    const mockChangeTodoDone = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders with given title', () => {
        const { getByText } = render(
            <TodoItem 
                id={1} 
                title="Test Todo" 
                deleteTodo={mockDeleteTodo} 
                done={false} 
                changeTodoDone={mockChangeTodoDone} 
            />
        );
        
        expect(getByText('Test Todo')).toBeInTheDocument();
    });
});
