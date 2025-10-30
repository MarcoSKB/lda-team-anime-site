'use client'

import { useState } from 'react'

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui'

import CreateTitleForm from '../create-title-form/CreateTitleForm'

interface Props {
  updateData: () => Promise<void>
}

const CreateTitle: React.FC<Props> = ({ updateData }) => {
  const [formStep, setFormStep] = useState(0)

  const nextFormStep = () => {
    setFormStep((prev) => Math.min(prev + 1, 2))
  }
  const prevFormStep = () => {
    setFormStep((prev) => Math.max(prev - 1, 0))
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button intent='secondary'>Создать тайтл</Button>
      </DialogTrigger>
      <DialogContent className='max-h-[90vh] w-[50vw] min-w-[512px] overflow-y-auto sm:max-w-none'>
        <DialogHeader>
          <DialogTitle>Добавить новое аниме</DialogTitle>
          <DialogDescription>
            Заполните данные для добавления нового тайтла.
          </DialogDescription>
        </DialogHeader>
        <div className='pointer-events-none mx-auto flex w-full max-w-[320px] items-center justify-center'>
          <div
            className={`flex min-h-[42px] min-w-[42px] items-center justify-center rounded-full text-center text-lg font-semibold transition ease-in ${formStep >= 0 ? 'bg-accent' : 'bg-secondary'}`}
          >
            1
          </div>
          <hr
            className={`h-1 w-full border-none transition ease-in ${formStep >= 1 ? 'bg-accent' : 'bg-secondary'}`}
          />
          <div
            className={`flex min-h-[42px] min-w-[42px] items-center justify-center rounded-full text-center text-lg font-semibold transition ease-in ${formStep >= 1 ? 'bg-accent' : 'bg-secondary'}`}
          >
            2
          </div>
          <hr
            className={`h-1 w-full border-none transition ease-in ${formStep >= 2 ? 'bg-accent' : 'bg-secondary'}`}
          />
          <div
            className={`flex min-h-[42px] min-w-[42px] items-center justify-center rounded-full text-center text-lg font-semibold transition ease-in ${formStep >= 2 ? 'bg-accent' : 'bg-secondary'}`}
          >
            3
          </div>
        </div>
        <CreateTitleForm
          step={formStep}
          toNextStep={nextFormStep}
          toPrevStep={prevFormStep}
          updateData={updateData}
        />
      </DialogContent>
    </Dialog>
  )
}

export default CreateTitle
