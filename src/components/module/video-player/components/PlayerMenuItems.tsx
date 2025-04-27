import {
  Menu,
  type MenuPlacement,
  Tooltip,
  type TooltipPlacement,
  useCaptionOptions,
  useVideoQualityOptions,
} from '@vidstack/react'
import { ChevronLeftIcon, ChevronRightIcon, SettingsIcon } from 'lucide-react'

import { Icon } from '@/components/ui'

import { buttonClass, tooltipClass } from './PlayerActions'

interface SettingsProps {
  placement: MenuPlacement
  tooltipPlacement: TooltipPlacement
}

interface SubmenuButtonProps {
  label: string
  hint: string
  disabled?: boolean
}

interface RadioProps extends Menu.RadioProps {
  iconName: React.ComponentProps<typeof Icon>['name']
}

const menuClass =
  'animate-out fade-out slide-out-to-bottom-2 data-[open]:animate-in data-[open]:fade-in data-[open]:slide-in-from-bottom-4 flex h-[var(--menu-height)] max-h-[400px] min-w-[260px] flex-col gap-1 overflow-y-auto overscroll-y-contain rounded-md bg-black/50 p-2 font-sans text-[15px] font-medium outline-none transition-[height] duration-300 will-change-[height] data-[resizing]:overflow-hidden'

const submenuClass =
  'hidden w-full flex-col items-start justify-center outline-none data-[keyboard]:mt-[3px] data-[open]:inline-block'

export const Settings: React.FC<SettingsProps> = ({
  placement,
  tooltipPlacement,
}) => {
  return (
    <Menu.Root className='parent'>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <Menu.Button className={buttonClass}>
            <SettingsIcon className='group-hover:text-accent h-6 w-6 transform transition duration-200 ease-in-out group-data-[open]:rotate-90' />
          </Menu.Button>
        </Tooltip.Trigger>
        <Tooltip.Content className={tooltipClass} placement={tooltipPlacement}>
          Настройки
        </Tooltip.Content>
      </Tooltip.Root>
      <Menu.Content className={menuClass} placement={placement}>
        <CaptionSubmenu />
        <QualitySubmenu />
      </Menu.Content>
    </Menu.Root>
  )
}

const CaptionSubmenu: React.FC = () => {
  const options = useCaptionOptions({ off: 'Выключить' })
  const hint = options.selectedTrack?.label ?? 'Выкл'

  return (
    <Menu.Root>
      <SubmenuButton label='Субтитры' hint={hint} disabled={options.disabled} />
      <Menu.Content className={submenuClass}>
        <Menu.RadioGroup
          className='flex w-full flex-col'
          value={options.selectedValue}
        >
          {options.map(({ label, value, select }) => (
            <Radio
              iconName='subtitle'
              value={value}
              onSelect={select}
              key={value}
            >
              {label}
            </Radio>
          ))}
        </Menu.RadioGroup>
      </Menu.Content>
    </Menu.Root>
  )
}

const QualitySubmenu: React.FC = () => {
  const options = useVideoQualityOptions({ auto: 'Авто', sort: 'descending' })
  const currentQualityHeight = options.selectedQuality?.height
  const hint =
    options.selectedValue !== 'auto' && currentQualityHeight
      ? `${currentQualityHeight}p`
      : `Авто${currentQualityHeight ? ` (${currentQualityHeight}p)` : ''}`

  return (
    <Menu.Root>
      <SubmenuButton label='Качество' hint={hint} disabled={options.disabled} />
      <Menu.Content className={submenuClass}>
        <Menu.RadioGroup value={options.selectedValue}>
          {options.map(({ label, value, select }) => (
            <Radio iconName='tv' value={value} onSelect={select} key={value}>
              {label}
            </Radio>
          ))}
        </Menu.RadioGroup>
      </Menu.Content>
    </Menu.Root>
  )
}

const Radio: React.FC<RadioProps> = ({ children, iconName, ...props }) => {
  return (
    <Menu.Radio
      className='ring-media-focus group relative flex w-full cursor-pointer items-center justify-start rounded-sm p-2.5 outline-none select-none data-[focus]:ring-[3px] data-[hocus]:bg-white/10'
      {...props}
    >
      <Icon
        name={iconName}
        className='group-data-[checked]:text-accent h-6 w-6 text-white'
      />
      <span className='group-data-[checked]:text-accent ml-2 text-white'>
        {children}
      </span>
    </Menu.Radio>
  )
}

const SubmenuButton: React.FC<SubmenuButtonProps> = ({
  label,
  hint,
  disabled,
}) => {
  return (
    <Menu.Button
      className='ring-media-focus parent left-0 z-10 flex w-full cursor-pointer items-center justify-start rounded-sm bg-black/60 p-2.5 outline-none select-none ring-inset aria-disabled:hidden data-[focus]:ring-[3px] data-[hocus]:bg-white/10 data-[open]:sticky data-[open]:-top-2.5'
      disabled={disabled}
    >
      <ChevronLeftIcon className='parent-data-[open]:block mr-1.5 -ml-0.5 hidden h-[18px] w-[18px]' />
      <span className='parent-data-[open]:ml-0 ml-1.5'>{label}</span>
      <span className='ml-auto text-sm text-white/50'>{hint}</span>
      <ChevronRightIcon className='parent-data-[open]:hidden ml-0.5 h-[18px] w-[18px] text-sm text-white/50' />
    </Menu.Button>
  )
}
