const weekList = [
  'Неделя',
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Воскресение',
]

const WeekGroupSkeleton: React.FC = () => {
  return (
    <div>
      <div className='dark:bg-secondary mx-auto mb-3 flex w-fit flex-wrap justify-center gap-y-1 rounded-xl border-1 border-solid border-[#e2e7f1] p-2 md:mb-4 md:gap-2 dark:border-none'>
        {weekList.map((week) => (
          <div
            key={week}
            className='text-foreground pointer-events-none cursor-default rounded-lg px-3 py-1 text-sm leading-6 transition-colors ease-in-out outline-none md:text-base'
          >
            {week}
          </div>
        ))}
      </div>
      <div className='flex flex-wrap gap-2'>
        {[...new Array(6)].map((_, idx) => (
          <div
            key={idx}
            className='dark:border-secondary relative z-0 flex min-h-[152px] max-w-[420px] min-w-[164px] flex-[33%] overflow-hidden rounded-md border border-solid border-[#e2e7f1]'
          >
            <div className='flex w-full flex-col items-center justify-center gap-1 px-3 py-2'>
              <div className='dark:bg-secondary h-[20px] w-[50%] min-w-[152px] animate-pulse rounded-md bg-gray-500' />
              <div className='dark:bg-secondary h-[18px] w-[20%] min-w-[128px] animate-pulse rounded-md bg-gray-500' />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WeekGroupSkeleton
