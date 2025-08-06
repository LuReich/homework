import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import TodoList from '../exam/TodoList';

describe('TodoList 컴포넌트', () => {
    let alertMock;

    beforeEach(() => {
        alertMock = vi.spyOn(window, 'alert').mockImplementation(() => { });
    });

    afterEach(() => {
        alertMock.mockRestore();
    });

    it('초기에는 할 일이 없다.', () => {
        render(<TodoList />);
        // 할 일 목록에 실제 데이터가 없는지 검사
        const tbody = screen.getByRole('table').querySelector('tbody');
        // tbody의 자식 <tr> 개수는 0이어야 함
        expect(tbody.children.length).toBe(0);
    });

    it('할 일을 입력하지 않고 추가 버튼을 누르면 경고창이 뜬다.', async () => {
        render(<TodoList />);
        const user = userEvent.setup();
        const addBtn = screen.getByRole('button', { name: '추가' });

        await user.click(addBtn);

        expect(alertMock).toHaveBeenCalledWith('할일을 입력');
    });

    it('할 일을 입력하고 추가 버튼을 누르면 목록에 추가된다.', async () => {
        render(<TodoList />);
        const user = userEvent.setup();
        const input = screen.getByLabelText('할 일');
        const addBtn = screen.getByRole('button', { name: '추가' });

        await user.type(input, 'abcd');
        await user.click(addBtn);

        expect(screen.getByText('abcd')).toBeInTheDocument();
    });

    it('여러 개의 할 일을 추가하면 모두 목록에 표시되고, 추가 후 input 창이 비워진다.', async () => {
        render(<TodoList />);
        const user = userEvent.setup();
        const input = screen.getByLabelText('할 일');
        const addBtn = screen.getByRole('button', { name: '추가' });

        await user.type(input, '첫 번째');
        await user.click(addBtn);

        // 첫 번째 추가 후 input 창이 비워졌는지 확인
        expect(input.value).toBe('');

        await user.type(input, '두 번째');
        await user.click(addBtn);

        // 두 번째 추가 후 input 창이 비워졌는지 확인
        expect(input.value).toBe('');

        expect(screen.getByText('첫 번째')).toBeInTheDocument();
        expect(screen.getByText('두 번째')).toBeInTheDocument();
    });
    it('할 일을 추가할 때 아이디가 1씩 증가한다.', async () => {
        render(<TodoList />);
        const user = userEvent.setup();
        const input = screen.getByLabelText('할 일');
        const addBtn = screen.getByRole('button', { name: '추가' });

        await user.type(input, '첫 번째');
        await user.click(addBtn);
        await user.clear(input);
        await user.type(input, '두 번째');
        await user.click(addBtn);

        // 여기서 row 는 tr
        const id = Array.from(screen.getAllByRole('row'))
            .slice(1) // 첫 번째 행은 아이디 할 일 이므로 제외, 즉 thead 부분의 tr 이다.
            .map(row => row.querySelector('td'));

        expect(id[0].textContent).toBe('1');
        expect(id[1].textContent).toBe('2');
    });
});