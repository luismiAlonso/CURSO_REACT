import useScroll from './useCroll'

function ScrollComponent() {
  const { scrollToTop } = useScroll()

  return (
    <div>
      {/* Contenido de tu página */}

      <button onClick={scrollToTop} className="fixed bottom-4 right-4 bg-blue-500 text-white p-2 rounded-full">
        <svg
          className="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 8"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7"
          ></path>
        </svg>
      </button>
    </div>
  )
}

export default ScrollComponent
