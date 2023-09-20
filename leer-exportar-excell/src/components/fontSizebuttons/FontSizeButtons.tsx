import React from 'react'
import useFontSize from '../fontSizebuttons/useFontSize'

function FontSizeButtons() {
  const { aumentarFuente, reducirFuente } = useFontSize();

  return (
    <div>
      <button onClick={aumentarFuente} type="button">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M11 11V8H13V11H16V13H13V16H11V13H8V11H11Z" fill="#ffffff" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3 12C3 16.9706 7.02944 21 12 21H18C19.6569 21 21 19.6569 21 18V12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12ZM12 5C15.866 5 19 8.13401 19 12C19 15.866 15.866 19 12 19C8.13401 19 5 15.866 5 12C5 8.13401 8.13401 5 12 5Z"
            fill="#ffffff"
          />
        </svg>
      </button>
      <button onClick={reducirFuente} type="button">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M 11 11 H 16 V 13 H 8 V 11 Z" fill="#ffffff" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3 12C3 16.9706 7.02944 21 12 21H18C19.6569 21 21 19.6569 21 18V12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12ZM12 5C15.866 5 19 8.13401 19 12C19 15.866 15.866 19 12 19C8.13401 19 5 15.866 5 12C5 8.13401 8.13401 5 12 5Z"
            fill="#ffffff"
          />
        </svg>
      </button>
    </div>
  )
}

export default FontSizeButtons;
