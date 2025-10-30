const EpisodeNotExist: React.FC = () => {
  return (
    <div className='flex aspect-video w-full items-center justify-center rounded-md bg-black'>
      <div className='flex max-w-[600px] flex-col gap-0.5 px-6'>
        <span className='text-base text-white md:text-lg'>
          Эпизод ещё не вышел.
        </span>
        <span className='text-sm text-white/80 md:text-base'>
          Все новости о релизах и обновлениях вы найдёте в нашем Telegram.
        </span>
      </div>
    </div>
  )
}

export default EpisodeNotExist
