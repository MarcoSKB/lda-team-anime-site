import { Fragment, useEffect, useRef } from 'react'

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react'
import { X } from 'lucide-react'

import { Button } from '@/components/ui'

import SearchInput from './SearchInput'
import SearchList from './SearchList'

interface Props {
  isSearchOpen: boolean
  handleSearchState: (state: boolean) => void
}

const SearchBody: React.FC<Props> = ({ isSearchOpen, handleSearchState }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [isSearchOpen])

  return (
    <Transition show={isSearchOpen} unmount={false} as={Fragment}>
      <Dialog
        unmount={false}
        open={isSearchOpen}
        onClose={() => handleSearchState(false)}
        className='fixed inset-0 z-[60] flex h-screen p-4'
      >
        <TransitionChild
          as={Fragment}
          unmount={false}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <DialogBackdrop className='fixed inset-0 z-[60] bg-black/30 transition duration-300 ease-out data-[closed]:opacity-0' />
        </TransitionChild>
        <div className='fixed inset-0 z-[60] flex w-screen items-center justify-center p-4'>
          <TransitionChild
            as={Fragment}
            unmount={false}
            enter='ease-out duration-200'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-150'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <DialogPanel className='bg-secondary absolute top-0 left-1/2 flex w-full max-w-[768px] origin-top -translate-x-1/2 flex-col gap-2 px-1.5 py-2 transition duration-150 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 md:top-[68px] md:rounded-md md:px-2'>
              <div className='flex gap-2 md:gap-2.5'>
                <SearchInput ref={inputRef} />
                <Button
                  intent='secondary'
                  onClick={() => handleSearchState(false)}
                  className='flex items-center gap-2 self-end p-2'
                >
                  <X width={20} height={20} />
                  <span className='sr-only md:not-sr-only'>Закрыть</span>
                </Button>
              </div>
              <SearchList />
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  )
}

export default SearchBody
