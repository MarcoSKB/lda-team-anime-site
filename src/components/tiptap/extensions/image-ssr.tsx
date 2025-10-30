import { Node } from '@tiptap/core'

// eslint-disable-next-line
type HTMLChild = [string, Record<string, any>?, ...(string | HTMLChild)[]]

const ImageNode = Node.create({
  name: 'image',
  inline: false,
  group: 'block',
  draggable: true,
  selectable: true,

  addAttributes() {
    return {
      src: { default: null },
      alt: { default: '' },
      title: { default: '' },
      width: { default: null },
      height: { default: null },
      caption: { default: '' },
      aspectRatio: { default: null },
      align: { default: 'center' },
    }
  },

  parseHTML() {
    return [{ tag: 'figure' }, { tag: 'img[src]' }]
  },

  renderHTML({ HTMLAttributes }) {
    const { caption, align, ...imgAttrs } = HTMLAttributes

    const cleanImgAttrs = Object.fromEntries(
      Object.entries(imgAttrs).filter(([, v]) => v != null && v !== ''),
    )

    const figureClass = 'relative m-0 flex flex-col'

    let alignClass = '!mx-auto'
    if (align === 'left') alignClass = '!ml-0 !mr-auto'
    else if (align === 'right') alignClass = '!ml-auto !mr-0'

    const imgClass = [
      'rounded-lg transition-shadow duration-200 hover:shadow-lg',
      'block',
      alignClass,
    ].join(' ')

    const children: HTMLChild[] = [
      ['img', { ...cleanImgAttrs, class: imgClass }],
    ]

    if (caption) {
      children.push([
        'figcaption',
        {
          class:
            'text-sm text-gray-500 mt-2 ' +
            (align === 'left'
              ? 'text-left'
              : align === 'right'
                ? 'text-right'
                : 'text-center'),
        },
        caption,
      ])
    }

    return ['figure', { class: figureClass }, ...children]
  },
})

export default ImageNode
