import { useState } from 'react'

export default function LoginExam() {
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!userId.trim() && !password.trim()) {
      alert('아이디와 비밀번호를 입력하세요')
      return
    }
    if (!userId.trim()) {
      alert('아이디를 입력하세요')
      return
    }
    if (!password.trim()) {
      alert('비밀번호를 입력하세요')
      return
    }

    // 로그인 성공 팝업
    alert(`로그인 성공: ${userId}`)
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 360, margin: '40px auto' }}>
      <h2>로그인</h2>

      <div style={{ marginBottom: 12 }}>
        <label htmlFor="login-id">아이디</label>
        <input
          id="login-id"
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="아이디 입력"
          style={{ display: 'block', width: '100%', padding: 8, boxSizing: 'border-box' }}
        />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label htmlFor="login-pw">비밀번호</label>
        <input
          id="login-pw"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호 입력"
          style={{ display: 'block', width: '100%', padding: 8, boxSizing: 'border-box' }}
        />
      </div>

      <button type="submit">로그인</button>
    </form>
  )
}
