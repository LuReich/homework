import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import CounterExam from '../exam/CounterExam';

describe('CounterExam 컴포넌트', () => {

    it('화면 출력 테스트', () => {

        render(<CounterExam/>);
    });

    const user = userEvent.setup();

    it('초기 카운트는 0', () => {
        render(<CounterExam />);
        expect(screen.getByText(/결과 : 0/)).toBeInTheDocument();
    });

    it('증가하기 버튼 클릭 시 카운트 증가', async () => {
        render(<CounterExam />);
        const addCount = screen.getByText('증가하기');
        await user.click(addCount);
        expect(screen.getByText(/결과 : 1/)).toBeInTheDocument();
    });

    it('감소하기 버튼 클릭 시 카운트 감소', async () => {
        render(<CounterExam />);
        const minusCount = screen.getByText('감소하기');
        await user.click(minusCount);
        expect(screen.getByText(/결과 : -1/)).toBeInTheDocument();
    });

    it('증가 후 감소 동작', async () => {
        render(<CounterExam />);
        const addCount = screen.getByText('증가하기');
        const minusCount = screen.getByText('감소하기');
        await user.click(addCount);
        await user.click(addCount);
        await user.click(minusCount);
        expect(screen.getByText(/결과 : 1/)).toBeInTheDocument();
    });

    it('헤더 텍스트 렌더링', () => {
        render(<CounterExam />);
        expect(screen.getByText('카운터 예제')).toBeInTheDocument();
    });
    
});