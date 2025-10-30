'use client'

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'
import { ChevronDownIcon } from 'lucide-react'

import {
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

import { GenresList } from '@/types/anime.types'
import { Result } from '@/types/fetch.types'
import { ANIME_STATUS_TITLE, ANIME_VOICEOVER_TYPE } from '@/utils/global-vars'

import { FiltersType, useFilters } from './hooks/useFilters'

type FilterProps = {
  setValue: React.Dispatch<React.SetStateAction<FiltersType>>
  value: FiltersType
  genres: Result<GenresList[]> | null
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
              id={status}
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
              htmlFor={status}
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
  let tagsOption: GenresList[] = []
  if (genres && genres.type == 'ok') {
    tagsOption = Array.from(
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
            tagsOption.map(
              (tag): MultiSelectOption => ({
                label: tag.name,
                value: tag.name,
              }),
            ) || []
          }
          onValueChange={onChange}
          defaultValue={value.tags}
          className='hover:scale-100 active:hover:scale-100'
          popoverClassName='max-w-full min-w-[266px]'
          animationConfig={{
            badgeAnimation: 'none',
            popoverAnimation: 'none',
            optionHoverAnimation: 'none',
          }}
          modalPopover
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
              id={voiceover}
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
              htmlFor={voiceover}
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
            htmlFor='episode-from'
            className='text-foreground w-full font-normal'
          >
            от
          </FieldLabel>
          <span className='h-[1px] w-[16px]' />
          <FieldLabel
            htmlFor='episode-to'
            className='text-foreground w-full self-end font-normal'
          >
            до
          </FieldLabel>
        </div>
        <div className='flex items-center gap-2'>
          <Input
            id='episode-from'
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
            id='episode-to'
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
            htmlFor='rating-from'
            className='text-foreground w-full font-normal'
          >
            от
          </FieldLabel>
          <span className='h-[1px] w-[16px]' />
          <FieldLabel
            htmlFor='rating-to'
            className='text-foreground w-full self-end font-normal'
          >
            до
          </FieldLabel>
        </div>
        <div className='flex items-center gap-2'>
          <Input
            id='rating-from'
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
            id='rating-to'
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

const FilterMenu: React.FC<Props> = ({ genres }) => {
  const { filtersValue, setFiltersValue } = useFilters()

  return (
    <div className='dark:border-secondary sticky top-[88px] hidden h-fit max-h-[calc(100dvh-108px)] w-full max-w-[232px] flex-col rounded-md border border-solid border-black/15 bg-transparent py-2 pr-[2px] pl-[12px] md:flex md:pr-1 lg:max-w-[300px] lg:py-3 lg:pl-[14px]'>
      <ScrollArea className='flex max-h-full flex-col items-start justify-start pr-2.5 text-start'>
        <ul className='flex flex-col gap-2 px-[2px]'>
          {filters.map(({ label, component: Filter }, idx) => (
            <li key={label}>
              {idx !== 0 && <FieldSeparator />}
              <Disclosure defaultOpen>
                <DisclosureButton className='group text-foreground/70 flex w-full justify-between py-1.5 font-[Roboto_Flex] font-medium antialiased lg:py-2'>
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
    </div>
  )
}

export default FilterMenu
