import { useState } from 'react'

const HOBBIES = ['영화', '음악감상', '산책', '게임하기']

export default function HobbiesExam() {
    
  const [selected, setSelected] = useState([])
  const [result, setResult] = useState('')

  const handleChange = (e) => {
    const { value, checked } = e.target
    setSelected((prev) =>
      checked ? [...prev, value] : prev.filter((v) => v !== value)
    )
  }

  const showHobbies = () => {
    setResult(selected.length > 0 ? selected.join(', ') : '선택 없음')
  }

  return (
    <div>
      <h2>취미 선택</h2>
      {HOBBIES.map((hobby) => (
        <label key={hobby}>
          <input
            type="checkbox"
            value={hobby}
            checked={selected.includes(hobby)}
            onChange={handleChange}
          />
          {hobby}
        </label>
      ))}
      <div>
        <button onClick={showHobbies}>확인</button>
      </div>
      <p data-testid="result">{result}</p>
    </div>
  )
}
