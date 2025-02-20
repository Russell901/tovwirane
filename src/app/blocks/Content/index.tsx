import { cn } from '@/utilities/cn'
import React from 'react'
import RichText from 'src/app/components/RichText'
import Image from 'next/image' // Assuming you're using Next.js for image optimization

import type { Page } from '../../../payload-types'

import { CMSLink } from '../../components/Link'

type Props = Extract<Page['layout'][0], { blockType: 'content' }>

export const ContentBlock: React.FC<
  {
    id?: string
  } & Props
> = (props) => {
  const { columns } = props

  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  }

  return (
    <div className="container my-16">
      <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-16">
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { enableLink, link, richText, size, image, imageAlignment } = col

            return (
              <div
                className={cn(`col-span-4 lg:col-span-${colsSpanClasses[size]}`, {
                  'md:col-span-2': size !== 'full',
                })}
                key={index}
              >
                <div className={`flex ${imageAlignment === 'right' ? 'flex-row-reverse' : ''}`}>
                  {image && (
                    <div className="w-1/2">
                      <Image src={image.url} alt={image.alt || ''} width={500} height={300} />
                    </div>
                  )}
                  <div className="w-1/2">
                    <RichText content={richText} enableGutter={false} />
                    {enableLink && <CMSLink {...link} />}
                  </div>
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}
