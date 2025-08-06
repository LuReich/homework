import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import LoginExam from '../exam/LoginExam';

describe('LoginExam.jsx', () => {
  let alertMock;

  beforeEach(() => {
    alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    alertMock.mockRestore();
  });

  it('화면이 정상적으로 출력된다.', () => {
    render(<LoginExam />);
    expect(screen.getByLabelText('아이디')).toBeInTheDocument();
    expect(screen.getByLabelText('비밀번호')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '로그인' })).toBeInTheDocument();
  });

  it('아이디와 비밀번호 모두 입력하지 않으면 경고창이 뜬다.', async () => {
    render(<LoginExam />);
    const user = userEvent.setup();
    const loginBtn = screen.getByRole('button', { name: '로그인' });

    await user.click(loginBtn);

    expect(alertMock).toHaveBeenCalledWith('아이디와 비밀번호를 입력하세요');
  });

  it('아이디만 입력하지 않으면 경고창이 뜬다.', async () => {
    render(<LoginExam />);
    const user = userEvent.setup();
    const passwd = screen.getByLabelText('비밀번호');
    const loginBtn = screen.getByRole('button', { name: '로그인' });

    await user.type(passwd, '1234');
    await user.click(loginBtn);

    expect(alertMock).toHaveBeenCalledWith('아이디를 입력하세요');
  });

  it('비밀번호만 입력하지 않으면 경고창이 뜬다.', async () => {
    render(<LoginExam />);
    const user = userEvent.setup();
    const id = screen.getByLabelText('아이디');
    const loginBtn = screen.getByRole('button', { name: '로그인' });

    await user.type(id, 'testuser');
    await user.click(loginBtn);

    expect(alertMock).toHaveBeenCalledWith('비밀번호를 입력하세요');
  });

  it('아이디와 비밀번호를 모두 입력하면 성공 알림이 뜬다.', async () => {
    render(<LoginExam />);
    const user = userEvent.setup();
    const id = screen.getByLabelText('아이디');
    const passwd = screen.getByLabelText('비밀번호');
    const loginBtn = screen.getByRole('button', { name: '로그인' });

    await user.type(id, 'asdf');
    await user.type(passwd, '1234');
    await user.click(loginBtn);

    expect(alertMock).toHaveBeenCalledWith('로그인 성공: asdf');
  });
});