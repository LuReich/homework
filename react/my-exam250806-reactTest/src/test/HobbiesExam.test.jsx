import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import HobbiesExam from '../exam/HobbiesExam';

describe('HobbiesExam 컴포넌트', () => {
  it('초기에는 결과가 비어있다.', () => {
    render(<HobbiesExam />);
    const result = screen.getByTestId('result');
    expect(result.textContent).toBe('');
  });

  it('아무것도 선택하지 않고 확인을 누르면 "선택 없음"이 출력된다.', async () => {
    render(<HobbiesExam />);
    const user = userEvent.setup();
    const confirmBtn = screen.getByRole('button', { name: '확인' });
    await user.click(confirmBtn);
    const result = screen.getByTestId('result');
    expect(result.textContent).toBe('선택 없음');
  });

  it('취미를 2개 선택하고 확인을 누르면 선택한 취미가 출력된다.', async () => {
    render(<HobbiesExam />);
    const user = userEvent.setup();
    const movieCheck = screen.getByLabelText('영화');
    const gameCheck = screen.getByLabelText('게임하기');
    const confirmBtn = screen.getByRole('button', { name: '확인' });

    await user.click(movieCheck);
    await user.click(gameCheck);
    await user.click(confirmBtn);

    const result = screen.getByTestId('result');
    expect(result.textContent).toBe('영화, 게임하기');
  });

  it('모든 체크 후 "영화"를 언체크했다가 다시 체크해도 결과는 체크박스 순서대로 출력된다.', async () => {
  render(<HobbiesExam />);
  const user = userEvent.setup();

  const movieCheck = screen.getByLabelText('영화');
  const musicCheck = screen.getByLabelText('음악감상');
  const walkCheck = screen.getByLabelText('산책');
  const gameCheck = screen.getByLabelText('게임하기');
  const confirmBtn = screen.getByRole('button', { name: '확인' });

  // 모두 체크
  await user.click(movieCheck);
  await user.click(musicCheck);
  await user.click(walkCheck);
  await user.click(gameCheck);

  // "영화" 체크 해제 후 다시 체크
  await user.click(movieCheck);
  await user.click(movieCheck);

  await user.click(confirmBtn);

  const result = screen.getByTestId('result');
  expect(result.textContent).toBe('영화, 음악감상, 산책, 게임하기');
});
});