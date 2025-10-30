'use client'

import { useState } from 'react'

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'
import { IconArrowLeft } from '@tabler/icons-react'
import { ChevronDownIcon, FilterIcon } from 'lucide-react'

import {
  Button,
  Checkbox,
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  Input,
  MultiSelect,
  MultiSelectOption,
  ScrollArea,
} from '@/components/ui'

import { useMediaQuery } from '@/hooks/useMediaQuery'
import { GenresList } from '@/types/anime.types'
import { Result } from '@/types/fetch.types'
import { ANIME_STATUS_TITLE, ANIME_VOICEOVER_TYPE } from '@/utils/global-vars'

import { FiltersType, useFilters } from './hooks/useFilters'

type FilterProps = {
  setValue: React.Dispatch<React.SetStateAction<FiltersType>>
  value: FiltersType
  genres: Result<GenresList[]>
}

const TitleStatusFilter: React.FC<FilterProps> = ({ setValue, value }) => {
  return (
    <FieldSet>
      <FieldLegend variant='label'>
        Фильтрация по текущему состоянию выхода тайтла.
      </FieldLegend>
      <FieldGroup className='gap-3'>
        {ANIME_STATUS_TITLE.map((status) => (
          <Field key={status} orientation='horizontal'>
            <Checkbox
              id={`mobile-${status}`}
              className='dark:border-white/50'
              value={status}
              checked={value.status?.includes(
                ANIME_STATUS_TITLE.findIndex((value) => value == status),
              )}
              onCheckedChange={(checked) => {
                setValue((prev) => ({
                  ...prev,
                  status: checked
                    ? [
                        ...(prev.status || []),
                        ANIME_STATUS_TITLE.findIndex(
                          (value) => value == status,
                        ),
                      ]
                    : (prev.status || []).filter(
                        (s) =>
                          s !==
                          ANIME_STATUS_TITLE.findIndex(
                            (value) => value == status,
                          ),
                      ),
                }))
              }}
            />
            <FieldLabel
              htmlFor={`mobile-${status}`}
              className='text-foreground font-normal'
            >
              {status}
            </FieldLabel>
          </Field>
        ))}
      </FieldGroup>
    </FieldSet>
  )
}

const TitleGenresFilter: React.FC<FilterProps> = ({
  setValue,
  value,
  genres,
}) => {
  let options: GenresList[] = []
  if (genres && genres.type == 'ok') {
    options = Array.from(
      new Map(
        genres.data.map((item) => [item.name.toLowerCase().trim(), item]),
      ).values(),
    )
  }

  const onChange = (tags: string[]) => {
    setValue({
      ...value,
      tags,
    })
  }

  return (
    <FieldSet>
      <FieldLegend variant='label'>Фильтрация по тэгам тайтла.</FieldLegend>
      <FieldGroup className='gap-3'>
        <MultiSelect
          placeholder='Ключевые слова для аниме'
          options={
            options.map(
              (tag): MultiSelectOption => ({
                label: tag.name,
                value: tag.name,
              }),
            ) || []
          }
          onValueChange={onChange}
          defaultValue={value.tags}
          className='hover:scale-100 active:hover:scale-100'
          popoverClassName='w-[276px] min-w-[276px]'
          animationConfig={{
            badgeAnimation: 'none',
            popoverAnimation: 'none',
            optionHoverAnimation: 'none',
          }}
          responsive
        />
      </FieldGroup>
    </FieldSet>
  )
}

const TitleVoiceoverFilter: React.FC<FilterProps> = ({ setValue, value }) => {
  return (
    <FieldSet>
      <FieldLegend variant='label'>
        Фильтрация по типу озвучки аниме.
      </FieldLegend>
      <FieldGroup className='gap-3'>
        {ANIME_VOICEOVER_TYPE.map((voiceover) => (
          <Field key={voiceover} orientation='horizontal'>
            <Checkbox
              id={`mobile-${voiceover}`}
              className='dark:border-white/50'
              value={voiceover}
              checked={value.voiceover?.includes(
                ANIME_VOICEOVER_TYPE.findIndex((value) => value == voiceover),
              )}
              onCheckedChange={(checked) => {
                setValue((prev) => ({
                  ...prev,
                  voiceover: checked
                    ? [
                        ...(prev.voiceover || []),
                        ANIME_VOICEOVER_TYPE.findIndex(
                          (value) => value == voiceover,
                        ),
                      ]
                    : (prev.voiceover || []).filter(
                        (s) =>
                          s !==
                          ANIME_VOICEOVER_TYPE.findIndex(
                            (value) => value == voiceover,
                          ),
                      ),
                }))
              }}
            />
            <FieldLabel
              htmlFor={`mobile-${voiceover}`}
              className='text-foreground font-normal'
            >
              {voiceover}
            </FieldLabel>
          </Field>
        ))}
      </FieldGroup>
    </FieldSet>
  )
}

const TitleEpisodeFilter: React.FC<FilterProps> = ({ setValue, value }) => {
  return (
    <FieldSet>
      <FieldLegend variant='label'>
        Укажите диапазон по числу серий тайтла.
      </FieldLegend>
      <FieldGroup className='gap-1'>
        <div className='flex justify-between gap-2'>
          <FieldLabel
            htmlFor='mobile-episode-from'
            className='text-foreground w-full font-normal'
          >
            от
          </FieldLabel>
          <span className='h-[1px] w-[16px]' />
          <FieldLabel
            htmlFor='mobile-episode-to'
            className='text-foreground w-full self-end font-normal'
          >
            до
          </FieldLabel>
        </div>
        <div className='flex items-center gap-2'>
          <Input
            id='mobile-episode-from'
            intent='default'
            type='number'
            inputMode='numeric'
            pattern='[0-9]*'
            min={1}
            onInput={(e) => {
              e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '')
            }}
            onChange={(e) => {
              const newValue =
                e.target.value === '' ? undefined : Number(e.target.value)
              setValue((prev) => ({
                ...prev,
                minEp: newValue,
              }))
            }}
            value={value.minEp !== undefined ? String(value.minEp) : ''}
          />
          <span className='bg-foreground h-[1px] w-[16px]' />
          <Input
            id='mobile-episode-to'
            intent='default'
            type='number'
            inputMode='numeric'
            pattern='[0-9]*'
            min={1}
            onInput={(e) => {
              e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '')
            }}
            onChange={(e) => {
              const newValue =
                e.target.value === '' ? undefined : Number(e.target.value)
              setValue((prev) => ({
                ...prev,
                maxEp: newValue,
              }))
            }}
            value={value.maxEp !== undefined ? String(value.maxEp) : ''}
          />
        </div>
      </FieldGroup>
    </FieldSet>
  )
}

const TitleRatingFilter: React.FC<FilterProps> = ({ setValue, value }) => {
  return (
    <FieldSet>
      <FieldLegend variant='label'>
        Показывать тайтлы с рейтингом в выбранном диапазоне.
      </FieldLegend>
      <FieldGroup className='gap-1'>
        <div className='flex justify-between gap-2'>
          <FieldLabel
            htmlFor='mobile-rating-from'
            className='text-foreground w-full font-normal'
          >
            от
          </FieldLabel>
          <span className='h-[1px] w-[16px]' />
          <FieldLabel
            htmlFor='mobile-rating-to'
            className='text-foreground w-full self-end font-normal'
          >
            до
          </FieldLabel>
        </div>
        <div className='flex items-center gap-2'>
          <Input
            id='mobile-rating-from'
            intent='default'
            type='number'
            inputMode='numeric'
            pattern='[0-9]*'
            onInput={(e) => {
              e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '')
            }}
            onChange={(e) => {
              const newValue =
                e.target.value === '' ? undefined : Number(e.target.value)
              setValue((prev) => ({
                ...prev,
                minRating: newValue,
              }))
            }}
            value={value.minRating !== undefined ? String(value.minRating) : ''}
          />
          <span className='bg-foreground h-[1px] w-[16px]' />
          <Input
            id='mobile-rating-to'
            intent='default'
            type='number'
            inputMode='numeric'
            pattern='[0-9]*'
            onInput={(e) => {
              e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '')
            }}
            onChange={(e) => {
              const newValue =
                e.target.value === '' ? undefined : Number(e.target.value)
              setValue((prev) => ({
                ...prev,
                maxRating: newValue,
              }))
            }}
            value={value.maxRating !== undefined ? String(value.maxRating) : ''}
          />
        </div>
      </FieldGroup>
    </FieldSet>
  )
}

const filters = [
  { label: 'Статус релиза', component: TitleStatusFilter },
  { label: 'Тэги', component: TitleGenresFilter },
  { label: 'Тип озвучки', component: TitleVoiceoverFilter },
  { label: 'Серия', component: TitleEpisodeFilter },
  { label: 'Рейтинг', component: TitleRatingFilter },
]

interface Props {
  genres: Result<GenresList[]>
}

const FilterMenuMobile: React.FC<Props> = ({ genres }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { filtersValue, setFiltersValue } = useFilters()
  const isMobile = useMediaQuery('(max-width: 768px)')

  if (!isMobile) return null

  return (
    <>
      <Button
        intent='secondary'
        className='md:hidden'
        icon={<FilterIcon height={19} width={19} />}
        onClick={() => setIsOpen(true)}
      >
        Фильтры
      </Button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className='relative z-50'
      >
        <div className='fixed inset-0 bg-black/40' aria-hidden='true' />
        <div className='fixed inset-0 z-50 flex w-screen items-center justify-end'>
          <DialogPanel className='bg-background h-full max-h-screen min-h-full w-full max-w-[320px] rounded-none px-4 py-3 sm:max-w-[320px]'>
            <div className='flex gap-2'>
              <Button
                intent='secondary'
                icon={<IconArrowLeft height={19} width={19} />}
                onClick={() => setIsOpen(false)}
              />
              <DialogTitle className='font-bold'>Фильтры</DialogTitle>
            </div>
            <ScrollArea className='flex max-h-full flex-col items-start justify-start pt-3 pr-3 pb-12 text-start'>
              <ul className='flex flex-col gap-2'>
                {filters.map(({ label, component: Filter }, idx) => (
                  <li key={label}>
                    {idx !== 0 && <FieldSeparator />}
                    <Disclosure defaultOpen>
                      <DisclosureButton className='group text-foreground/70 flex w-full justify-between py-2 font-[Roboto_Flex] font-medium antialiased'>
                        {label}
                        <ChevronDownIcon className='w-5 transition-all group-data-open:rotate-180' />
                      </DisclosureButton>
                      <DisclosurePanel className='mb-1.5 w-full text-gray-500'>
                        <Filter
                          setValue={setFiltersValue}
                          value={filtersValue}
                          genres={genres}
                        />
                      </DisclosurePanel>
                    </Disclosure>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}

export default FilterMenuMobile
