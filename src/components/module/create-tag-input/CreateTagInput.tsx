'use client'

import { memo, useState } from 'react'

import { CheckIcon, PlusIcon } from 'lucide-react'

import {
  Tags,
  TagsContent,
  TagsEmpty,
  TagsGroup,
  TagsInput,
  TagsItem,
  TagsList,
  TagsTrigger,
  TagsValue,
} from '@/components/ui'

type Tag = { id: string; label: string }

interface Props {
  suggestions: Tag[]
  onChange?: (values: string[]) => void
  value?: string[]
  placeholder?: string
}

const CreateTagInput: React.FC<Props> = memo((props) => {
  const {
    suggestions,
    onChange,
    value,
    placeholder = 'Выполните поиск или создайте тег...',
  } = props
  const [selected, setSelected] = useState<string[]>(value || [])
  const [newTag, setNewTag] = useState<string>('')
  const [tags, setTags] = useState<Tag[]>(suggestions)

  const handleRemove = (id: string) => {
    if (!selected.includes(id)) return
    const updated = selected.filter((v) => v !== id)
    setSelected(updated)
    onChange?.(updated)
  }

  const handleSelect = (label: string) => {
    if (selected.includes(label)) {
      handleRemove(label)
      return
    }
    const updated = [...selected, label]
    setSelected(updated)
    onChange?.(updated)
  }

  const handleCreateTag = () => {
    if (!newTag.trim()) return
    const label = newTag.trim()
    const id = label

    const newTagObj = { id, label }
    setTags((prev) => [...prev, newTagObj])
    const updated = [...selected, label]
    setSelected(updated)
    onChange?.(updated)
    setNewTag('')
  }

  const filteredTags = tags.filter(
    (tag) =>
      tag.label.toLowerCase().includes(newTag.toLowerCase()) &&
      !selected.includes(tag.id),
  )

  return (
    <Tags className='max-w-[300px]'>
      <TagsTrigger
        intent='secondary'
        className='hover:bg-background border-secondary border-1 border-solid active:hover:scale-100'
      >
        {selected.map((tagLabel) => (
          <TagsValue
            key={tagLabel}
            onRemove={() => handleRemove(tagLabel)}
            variant='secondary'
          >
            {tagLabel}
          </TagsValue>
        ))}
        {selected.length === 0 && (
          <span className='text-muted-foreground px-2 py-px'>
            {placeholder}
          </span>
        )}
      </TagsTrigger>
      <TagsContent>
        <TagsInput
          value={newTag}
          onValueChange={setNewTag}
          placeholder={placeholder}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && newTag.trim()) {
              e.preventDefault()
              handleCreateTag()
            }
          }}
        />

        <TagsList>
          {filteredTags.length === 0 ? (
            <TagsEmpty>
              {newTag ? (
                <button
                  className='mx-auto flex cursor-pointer items-center gap-2'
                  onClick={handleCreateTag}
                  type='button'
                >
                  <PlusIcon className='text-muted-foreground' size={14} />
                  Создать новый тэг: {newTag}
                </button>
              ) : (
                'Тэги не найдены.'
              )}
            </TagsEmpty>
          ) : (
            <TagsGroup>
              {filteredTags.map((tag) => (
                <TagsItem
                  key={tag.id}
                  value={tag.label}
                  onSelect={() => handleSelect(tag.label)}
                >
                  {tag.label}
                  {selected.includes(tag.label) && (
                    <CheckIcon className='text-muted-foreground' size={14} />
                  )}
                </TagsItem>
              ))}
            </TagsGroup>
          )}
        </TagsList>
      </TagsContent>
    </Tags>
  )
})

export default CreateTagInput
