import { useState } from 'react'
import './Accordion.css'

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <div className="accordion">
      {items.map((item, index) => (
        <div key={index} className={`accordion__item ${openIndex === index ? 'accordion__item--open' : ''}`}>
          <button
            className="accordion__trigger"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            aria-expanded={openIndex === index}
          >
            <span className="accordion__title">{item.title}</span>
            <svg
              className="accordion__chevron"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          <div className="accordion__content">
            <div className="accordion__inner">{item.content}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
