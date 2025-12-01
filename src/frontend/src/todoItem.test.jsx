import React from 'react';
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TodoItem } from './todoItem';  // adjust import as needed


jest.mock('./trash.png', () => 'trash.png');  // Mock the trash image if needed

describe('App Component', () => {
  const mockDeleteTodo = jest.fn();
  const mockChangeTodoDone = jest.fn();

  jest.mock('./trash.png', () => 'trash.png');  // Mock the trash image if needed
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
