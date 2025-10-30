import { Mark } from '@tiptap/core'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    spoiler: {
      toggleSpoiler: () => ReturnType
    }
  }
}

export const Spoiler = Mark.create({
  name: 'spoiler',

  parseHTML() {
    return [
      {
        tag: 'span[data-spoiler]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'span',
      { ...HTMLAttributes, 'data-spoiler': 'true', class: 'spoiler' },
      0,
    ]
  },

  addCommands() {
    return {
      toggleSpoiler:
        () =>
        ({ commands }) => {
          return commands.toggleMark(this.name)
        },
    }
  },

  addKeyboardShortcuts() {
    return {
      'Mod-Shift-S': () => this.editor.commands.toggleSpoiler(),
    }
  },
})
